import { projectTypes } from '../src/utils/projectInquiry.ts'

const MAX_BODY_BYTES = 16_384
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_REQUESTS = 3
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

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

function json(body: JsonRecord, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
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

function isRateLimited(request: Request, now: number) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const address = forwardedFor || request.headers.get('x-real-ip') || 'unknown'
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

function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  try {
    const originHost = new URL(origin).host
    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
    const requestHost = forwardedHost || request.headers.get('host') || new URL(request.url).host
    return originHost === requestHost
  } catch {
    return false
  }
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405)
  }
  if (!sameOrigin(request)) {
    return json({ error: 'Unable to submit this inquiry.' }, 403)
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return json({ error: 'Please submit your inquiry using the contact form.' }, 415)
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: 'Your inquiry is too large. Please shorten the details and try again.' }, 413)
  }

  let body: JsonRecord
  try {
    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ error: 'Your inquiry is too large. Please shorten the details and try again.' }, 413)
    }
    const parsed: unknown = JSON.parse(rawBody)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return json({ error: 'Please check your details and try again.' }, 400)
    }
    body = parsed as JsonRecord
  } catch {
    return json({ error: 'Please check your details and try again.' }, 400)
  }

  if (isRateLimited(request, Date.now())) {
    return json({ error: 'Too many inquiries were submitted from this connection. Please wait a few minutes and try again.' }, 429)
  }

  const honeypot = textField(body, 'website', 200)
  if (honeypot === null || honeypot !== '') {
    return json({ error: 'Please check your details and try again.' }, 400)
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
    return json({ error: 'Please check your details and try again.' }, 400)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !projectTypes.includes(projectType as typeof projectTypes[number])) {
    return json({ error: 'Please check your email address and project type.' }, 400)
  }
  if (budget && !budgets.includes(budget)) {
    return json({ error: 'Please choose a valid budget range.' }, 400)
  }
  if (timeline && !timelines.includes(timeline)) {
    return json({ error: 'Please choose a valid timeline.' }, 400)
  }
  if (referenceUrl) {
    try {
      const url = new URL(referenceUrl)
      if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('Invalid URL protocol')
    } catch {
      return json({ error: 'Please enter a valid reference URL using https:// or http://.' }, 400)
    }
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY
  const privateKey = process.env.EMAILJS_PRIVATE_KEY
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return json({ error: 'The inquiry service is not configured yet. Please email directly instead.' }, 503)
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
      return json({ error: 'We couldn’t send your inquiry right now. Your details are still here; please try again or email directly.' }, 502)
    }
    return json({ success: true }, 200)
  } catch {
    return json({ error: 'We couldn’t reach the email service. Your details are still here; please try again or email directly.' }, 502)
  } finally {
    clearTimeout(timeout)
  }
}
