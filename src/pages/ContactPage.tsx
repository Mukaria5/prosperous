import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Container } from '../components/Foundation'
import { PageMeta } from '../components/PageMeta'
import { configuredEmail, configuredExternalUrl, siteConfig } from '../data/siteConfig'

const email = configuredEmail(siteConfig.email)
const linkedin = configuredExternalUrl(siteConfig.linkedinUrl, ['linkedin.com'])
const github = configuredExternalUrl(siteConfig.githubUrl, ['github.com'])

export function ContactPage() {
  const [formNotice, setFormNotice] = useState('')
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const senderEmail = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()
    if (!email) {
      setFormNotice('Email contact is not configured yet. Please use the listed social profiles instead.')
      return
    }
    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent(`From: ${name}\nReply to: ${senderEmail}\n\n${message}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setFormNotice('Your email app should open with this message ready to review and send. This website does not send or store it.')
  }

  return <><PageMeta title="Contact — Prosperous Mukaria" description="Contact Prosperous Mukaria about websites, digital products, UI/UX, and practical AI-powered applications." /><section className="contact-page" aria-labelledby="contact-page-title">
    <Container>
      <p className="eyebrow"><span className="eyebrow-rule" /> CONTACT</p>
      <div className="contact-page-heading"><h1 id="contact-page-title">Have an idea?<br />Let&apos;s make it <em>happen.</em></h1><p>I&apos;m open to discussing website projects, digital products, UI/UX work, and practical AI-powered solutions. If you have something in mind, let&apos;s talk.</p></div>
      <div className="contact-page-grid"><form className="contact-form" onSubmit={handleSubmit}>
        <h2>Send an enquiry</h2>
        <p className="contact-form-note">Submitting opens your email app with a draft. Nothing is sent or stored by this website.</p>
        <label htmlFor="contact-name">Your name</label><input className="glass-surface" id="contact-name" name="name" autoComplete="name" required />
        <label htmlFor="contact-email">Your email</label><input className="glass-surface" id="contact-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="contact-message">What would you like to make?</label><textarea className="glass-surface" id="contact-message" name="message" rows={5} required />
        <button className="button button-primary" type="submit">Open email draft <ArrowUpRight size={15} aria-hidden="true" /></button>
        <p className="contact-form-notice" role="status" aria-live="polite">{formNotice}</p>
      </form><aside className="contact-details" aria-label="Contact details">
        <div><span>EMAIL</span>{email ? <a href={`mailto:${email}`}>{email}<ArrowUpRight size={14} aria-hidden="true" /></a> : <p>Email contact is not configured.</p>}</div>
        <div><span>LOCATION</span><p>{siteConfig.location}</p></div>
        <div><span>PROFILES</span><p className="contact-profile-links">{linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>}{github && <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>}</p></div>
        {email && <a className="contact-direct-link" href={`mailto:${email}?subject=${encodeURIComponent('Project enquiry — Prosperous Mukaria')}`}><Mail size={15} aria-hidden="true" /> Email me directly</a>}
      </aside></div>
    </Container>
  </section></>
}
