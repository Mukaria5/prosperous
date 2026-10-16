export interface SiteConfig {
  name: string
  location: string
  email: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl?: string
}

export const siteConfig: SiteConfig = {
  name: 'Prosperous Mukaria',
  location: 'Nairobi, Kenya',
  email: 'prodesignske@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/prosperous-mukaria-13b20422a/',
  githubUrl: 'https://github.com/Mukaria5',
  portfolioUrl: '',
}

export function configuredEmail(value: string) {
  const email = value.trim()
  if (!email || /YOUR_|example\.com/i.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email
}

export function configuredExternalUrl(value: string | undefined, allowedHosts?: string[]) {
  if (!value || /YOUR_/i.test(value)) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    if (allowedHosts && !allowedHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) return null
    return url.href
  } catch {
    return null
  }
}
