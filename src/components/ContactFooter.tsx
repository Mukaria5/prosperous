import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './Foundation'
import { configuredEmail, configuredExternalUrl, siteConfig } from '../data/siteConfig'

const email = configuredEmail(siteConfig.email)
const linkedinUrl = configuredExternalUrl(siteConfig.linkedinUrl, ['linkedin.com'])
const githubUrl = configuredExternalUrl(siteConfig.githubUrl, ['github.com'])
const portfolioUrl = configuredExternalUrl(siteConfig.portfolioUrl)
const emailHref = email ? `mailto:${email}?subject=${encodeURIComponent('Project enquiry — Prosperous Mukaria')}` : null

function SocialLinks({ className = '' }: { className?: string }) {
  return <div className={`social-links ${className}`}>
    {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><span>LinkedIn</span><ArrowUpRight size={13} aria-hidden="true" /></a>}
    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)"><span>GitHub</span><ArrowUpRight size={13} aria-hidden="true" /></a>}
    {portfolioUrl && <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" aria-label="Portfolio website (opens in a new tab)"><ArrowUpRight size={15} aria-hidden="true" /><span>Website</span></a>}
  </div>
}

export function ContactSection() {
  return <section className="contact-section" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
    <span className="contact-glow" aria-hidden="true" />
    <Container className="contact-container">
      <p className="eyebrow"><span className="eyebrow-rule" /> CONTACT</p>
      <div className="contact-main">
        <h2 id="contact-title">Have an idea?<br />Let&apos;s make it <em>happen.</em></h2>
        <p className="contact-description">I&apos;m open to discussing website projects, digital products, UI/UX work, and practical AI-powered solutions. If you have something in mind, let&apos;s talk.</p>
        {emailHref && <a className="contact-cta" href={emailHref}>Start a project <ArrowUpRight size={19} aria-hidden="true" /></a>}
      </div>
      <div className="contact-bottom">
        <div className="contact-location"><span>BASED IN</span><strong>{siteConfig.location}</strong></div>
        {email && <a className="contact-email" href={`mailto:${email}`}><Mail size={15} aria-hidden="true" />{email}<ArrowUpRight size={13} aria-hidden="true" /></a>}
        <SocialLinks className="contact-socials" />
      </div>
    </Container>
  </section>
}

export function SiteFooter() {
  return <footer className="site-footer">
    <Container className="footer-content">
      <Link className="wordmark footer-wordmark" to="/" aria-label="Prosperous Mukaria, home"><span className="wordmark-monogram">PM<span>.</span></span><span className="wordmark-name">PROSPEROUS<br /><span>MUKARIA</span></span></Link>
      <span className="footer-location">{siteConfig.location}</span>
      <SocialLinks className="footer-socials" />
      <span className="copyright">© {new Date().getFullYear()} {siteConfig.name}</span>
      <a className="back-to-top" href="#top">Back to top <ArrowDown size={14} aria-hidden="true" /></a>
    </Container>
  </footer>
}
