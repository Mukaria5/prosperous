export interface ProjectInquiry {
  fullName: string
  email: string
  projectType: string
  description: string
  company?: string
  budget?: string
  timeline?: string
  referenceUrl?: string
}

export type InquiryField = keyof ProjectInquiry
export type InquiryErrors = Partial<Record<InquiryField, string>>

export const projectTypes = [
  'Website Design & Development',
  'UI/UX Design',
  'Mobile App Design & Development',
  'E-commerce Website',
  'SaaS Product',
  'Branding & Digital Marketing',
  'Other',
]

export function validateProjectInquiry(values: ProjectInquiry): InquiryErrors {
  const errors: InquiryErrors = {}
  if (!values.fullName.trim()) errors.fullName = 'Enter your full name.'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.projectType) errors.projectType = 'Choose a project type.'
  if (!values.description.trim()) errors.description = 'Add a short description of your project.'
  if (values.referenceUrl?.trim()) {
    try {
      const url = new URL(values.referenceUrl.trim())
      if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('Invalid URL protocol')
    } catch {
      errors.referenceUrl = 'Enter a valid website URL, including https://.'
    }
  }
  return errors
}

/** Builds a mail draft URL; it does not send or store the inquiry. */
export function buildProjectInquiryMailto(to: string, inquiry: ProjectInquiry) {
  const subject = `Project inquiry — ${inquiry.fullName.trim()}`
  const body = [
    `Full name: ${inquiry.fullName.trim()}`,
    `Email: ${inquiry.email.trim()}`,
    `Project type: ${inquiry.projectType}`,
    `Company or brand: ${inquiry.company?.trim() || 'Not provided'}`,
    `Estimated budget: ${inquiry.budget || 'Not sure yet'}`,
    `Expected timeline: ${inquiry.timeline || 'Flexible / not provided'}`,
    `Reference URL: ${inquiry.referenceUrl?.trim() || 'Not provided'}`,
    '',
    'Project description:',
    inquiry.description.trim(),
  ].join('\n')

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
