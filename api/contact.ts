import type { IncomingMessage, ServerResponse } from 'node:http'

const MAX_BODY_BYTES = 16_384
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_REQUESTS = 3
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

const projectTypes = [
  'Website Design & Development',
  'UI/UX Design',
  'Mobile App Design & Development',
  'E-commerce Website',
  'SaaS Product',
  'Branding & Digital Marketing',
  'Other',
]
const budgets = [
  'Under KSh 20,000',
  'KSh 20,000–50,000',
  'KSh 50,000–100,000',
  'KSh 100,000–250,000',
  'Above KSh 250,000',
  'Not sure yet',
]
const timelines = ['ASAP', 'Within 2–4 weeks', 'Within 1–3 months', 'Flexible']

type JsonRecord = Record<string, unknown>
type ContactRequest = IncomingMessage & { body?: unknown }

function logFailure(stage: string, httpStatus: number, details: Record<string, string | number> = {}) {
  console.error('[api/contact]', { stage, httpStatus, ...details })
}

function respond(response: ServerResponse, status: number, body: JsonRecord) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  if (status === 405) response.setHeader('Allow', 'POST')
  response.end(JSON.stringify(body))
}

function header(request: ContactRequest, name: string) {
  const value = request.headers[name.toLowerCase()]
  return Array.isArray(value) ? value[0] : value
}

function textField(body: JsonRecord, key: string, maxLength: number) {
  const value = body[key]
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length > maxLength) return null
  return trimmed
}

function optionalTextField(body: JsonRecord, key: string, maxLength: number) {
  if (body[key] === undefined || body[key] === null) return ''
  return textField(body, key, maxLength)
}

function isRateLimited(request: ContactRequest, now: number) {
  const address = header(request, 'x-forwarded-for')?.split(',')[0]?.trim()
    || header(request, 'x-real-ip')
    || 'unknown'
  const bucket = rateLimitBuckets.get(address)

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(address, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  } else if (bucket.count >= RATE_LIMIT_REQUESTS) {
    return true
  } else {
    bucket.count += 1
  }

  for (const [key, value] of rateLimitBuckets) {
    if (value.resetAt <= now) rateLimitBuckets.delete(key)
  }
  if (rateLimitBuckets.size > 5_000) {
    const oldestKey = rateLimitBuckets.keys().next().value
    if (oldestKey) rateLimitBuckets.delete(oldestKey)
  }
  return false
}

function sameOrigin(request: ContactRequest) {
  const origin = header(request, 'origin')
  if (!origin) return true
  try {
    const originHost = new URL(origin).host
    const requestHost = header(request, 'x-forwarded-host')?.split(',')[0]?.trim()
      || header(request, 'host')
    return Boolean(requestHost && originHost === requestHost)
  } catch {
    return false
  }
}

function parseBody(value: unknown): JsonRecord | null {
  try {
    const parsed: unknown = typeof value === 'string' ? JSON.parse(value) : value
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return parsed as JsonRecord
  } catch {
    return null
  }
}

function fail(response: ServerResponse, stage: string, status: number, message: string) {
  logFailure(stage, status)
  respond(response, status, { error: message })
}

export default async function handler(request: ContactRequest, response: ServerResponse): Promise<void> {
  if (request.method !== 'POST') {
    fail(response, 'method_not_allowed', 405, 'Method not allowed.')
    return
  }
  if (!sameOrigin(request)) {
    fail(response, 'origin_check', 403, 'Unable to submit this inquiry.')
    return
  }
  if (!header(request, 'content-type')?.toLowerCase().startsWith('application/json')) {
    fail(response, 'content_type', 415, 'Please submit your inquiry using the contact form.')
    return
  }

  const contentLength = Number(header(request, 'content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    fail(response, 'body_too_large', 413, 'Your inquiry is too large. Please shorten the details and try again.')
    return
  }

  let requestBody: unknown
  try {
    requestBody = request.body
  } catch {
    fail(response, 'body_parse', 400, 'Please check your details and try again.')
    return
  }
  const body = parseBody(requestBody)
  if (!body) {
    fail(response, 'body_parse', 400, 'Please check your details and try again.')
    return
  }
  let bodyBytes: number
  try {
    bodyBytes = Buffer.byteLength(JSON.stringify(body), 'utf8')
  } catch {
    fail(response, 'body_size_check', 400, 'Please check your details and try again.')
    return
  }
  if (bodyBytes > MAX_BODY_BYTES) {
    fail(response, 'body_too_large', 413, 'Your inquiry is too large. Please shorten the details and try again.')
    return
  }

  if (isRateLimited(request, Date.now())) {
    fail(response, 'rate_limit', 429, 'Too many inquiries were submitted from this connection. Please wait a few minutes and try again.')
    return
  }

  const honeypot = textField(body, 'website', 200)
  if (honeypot === null || honeypot !== '') {
    fail(response, 'honeypot', 400, 'Please check your details and try again.')
    return
  }

  const name = textField(body, 'fullName', 120)
  const email = textField(body, 'email', 254)
  const company = optionalTextField(body, 'company', 120)
  const projectType = textField(body, 'projectType', 100)
  const budget = optionalTextField(body, 'budget', 40)
  const timeline = optionalTextField(body, 'timeline', 40)
  const referenceUrl = optionalTextField(body, 'referenceUrl', 2048)
  const projectDescription = textField(body, 'description', 5_000)

  if (!name || !email || !projectType || !projectDescription || company === null || budget === null || timeline === null || referenceUrl === null) {
    fail(response, 'field_validation', 400, 'Please check your details and try again.')
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !projectTypes.includes(projectType)) {
    fail(response, 'email_or_project_validation', 400, 'Please check your email address and project type.')
    return
  }
  if (budget && !budgets.includes(budget)) {
    fail(response, 'budget_validation', 400, 'Please choose a valid budget range.')
    return
  }
  if (timeline && !timelines.includes(timeline)) {
    fail(response, 'timeline_validation', 400, 'Please choose a valid timeline.')
    return
  }
  if (referenceUrl) {
    try {
      const url = new URL(referenceUrl)
      if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('Invalid URL protocol')
    } catch {
      fail(response, 'reference_url_validation', 400, 'Please enter a valid reference URL using https:// or http://.')
      return
    }
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY
  const privateKey = process.env.EMAILJS_PRIVATE_KEY
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    const missingVariableCount = [serviceId, templateId, publicKey, privateKey].filter((value) => !value).length
    logFailure('emailjs_configuration', 503, { missingVariableCount })
    respond(response, 503, { error: 'The inquiry service is not configured yet. Please email directly instead.' })
    return
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)
  try {
    const providerResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          name,
          email,
          company,
          project_type: projectType,
          budget,
          timeline,
          reference_url: referenceUrl,
          project_description: projectDescription,
        },
      }),
    })
    if (!providerResponse.ok) {
      logFailure('emailjs_response', 502, { providerHttpStatus: providerResponse.status })
      respond(response, 502, { error: 'We couldn’t send your inquiry right now. Your details are still here; please try again or email directly.' })
      return
    }
    respond(response, 200, { success: true })
  } catch (error) {
    logFailure('emailjs_network', 502, { errorType: error instanceof Error ? error.name : 'UnknownError' })
    respond(response, 502, { error: 'We couldn’t reach the email service. Your details are still here; please try again or email directly.' })
  } finally {
    clearTimeout(timeout)
  }
}
