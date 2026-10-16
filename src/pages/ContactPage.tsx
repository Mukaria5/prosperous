import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Foundation'
import { PageMeta } from '../components/PageMeta'
import { configuredEmail, configuredExternalUrl, siteConfig } from '../data/siteConfig'
import { projectTypes, validateProjectInquiry, type InquiryErrors, type InquiryField, type ProjectInquiry } from '../utils/projectInquiry'

const email = configuredEmail(siteConfig.email)
const linkedin = configuredExternalUrl(siteConfig.linkedinUrl, ['linkedin.com'])
const github = configuredExternalUrl(siteConfig.githubUrl, ['github.com'])

const initialValues: ProjectInquiry = {
  fullName: '',
  email: '',
  projectType: '',
  description: '',
  company: '',
  budget: '',
  timeline: '',
  referenceUrl: '',
}

export function ContactPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [formNotice, setFormNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submissionInProgress = useRef(false)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.currentTarget
    const field = name as InquiryField
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormNotice('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submissionInProgress.current) return

    const nextErrors = validateProjectInquiry(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      setFormNotice('Please review the highlighted fields.')
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    submissionInProgress.current = true
    setIsSubmitting(true)
    setFormNotice('Sending your inquiry…')
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          website: String(formData.get('website') || ''),
        }),
      })
      const result = await response.json() as { success?: boolean; error?: string }
      if (!response.ok || result.success !== true) {
        setFormNotice(result.error || 'We couldn’t send your inquiry. Your details are still here; please try again or email directly.')
        return
      }
      setFormNotice('Your inquiry was accepted by the email service. This does not confirm final delivery to the recipient’s inbox.')
    } catch {
      setFormNotice('We couldn’t reach the submission service. Your details are still here; please try again or email directly.')
    } finally {
      submissionInProgress.current = false
      setIsSubmitting(false)
    }
  }

  const describedBy = (field: InquiryField) => errors[field] ? `contact-${field}-error` : undefined

  return <><PageMeta title="Contact — Prosperous Mukaria" description="Share your project requirements with Prosperous Mukaria, a Nairobi-based developer and digital product creator." /><section className="contact-page" aria-labelledby="contact-page-title">
    <Container>
      <p className="eyebrow"><span className="eyebrow-rule" /> CONTACT</p>
      <div className="contact-page-heading"><h1 id="contact-page-title">Have an idea?<br />Let&apos;s make it <em>happen.</em></h1><p>Share a few details about what you&apos;re planning. I&apos;ll review your requirements and get back to you.</p></div>
      <div className="contact-page-grid"><form className="contact-form" onSubmit={handleSubmit} noValidate>
        <h2>Tell me about your project</h2>
        <p className="contact-form-note">Share a few details and your inquiry will be submitted to the email service for delivery to Prosperous. Your information is used to respond to this request.</p>
        <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" type="text" autoComplete="off" tabIndex={-1} /></div>
        <div className="contact-form-fields">
          <div className="contact-form-field">
            <label htmlFor="contact-fullName">Full name <span aria-hidden="true">*</span></label>
            <input className="glass-surface" id="contact-fullName" name="fullName" autoComplete="name" value={values.fullName} onChange={handleChange} required aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy('fullName')} />
            {errors.fullName && <p className="contact-field-error" id="contact-fullName-error" role="alert">{errors.fullName}</p>}
          </div>
          <div className="contact-form-field">
            <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
            <input className="glass-surface" id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} required aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} />
            {errors.email && <p className="contact-field-error" id="contact-email-error" role="alert">{errors.email}</p>}
          </div>
          <div className="contact-form-field">
            <label htmlFor="contact-projectType">Project type <span aria-hidden="true">*</span></label>
            <select className="glass-surface" id="contact-projectType" name="projectType" value={values.projectType} onChange={handleChange} required aria-invalid={Boolean(errors.projectType)} aria-describedby={describedBy('projectType')}>
              <option value="">Select a project type</option>
              {projectTypes.map((projectType) => <option key={projectType} value={projectType}>{projectType}</option>)}
            </select>
            {errors.projectType && <p className="contact-field-error" id="contact-projectType-error" role="alert">{errors.projectType}</p>}
          </div>
          <div className="contact-form-field">
            <label htmlFor="contact-company">Company or brand name <span className="contact-optional">Optional</span></label>
            <input className="glass-surface" id="contact-company" name="company" autoComplete="organization" value={values.company} onChange={handleChange} />
          </div>
          <div className="contact-form-field">
            <label htmlFor="contact-budget">Estimated budget <span className="contact-optional">Optional</span></label>
            <select className="glass-surface" id="contact-budget" name="budget" value={values.budget} onChange={handleChange}>
              <option value="">Choose a range (optional)</option>
              <option>Under KSh 20,000</option>
              <option>KSh 20,000–50,000</option>
              <option>KSh 50,000–100,000</option>
              <option>KSh 100,000–250,000</option>
              <option>Above KSh 250,000</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="contact-form-field">
            <label htmlFor="contact-timeline">Expected timeline <span className="contact-optional">Optional</span></label>
            <select className="glass-surface" id="contact-timeline" name="timeline" value={values.timeline} onChange={handleChange}>
              <option value="">Choose a timeline (optional)</option>
              <option>ASAP</option>
              <option>Within 2–4 weeks</option>
              <option>Within 1–3 months</option>
              <option>Flexible</option>
            </select>
          </div>
          <div className="contact-form-field contact-form-field--wide">
            <label htmlFor="contact-referenceUrl">Reference website or project URL <span className="contact-optional">Optional</span></label>
            <input className="glass-surface" id="contact-referenceUrl" name="referenceUrl" type="url" placeholder="https://example.com" value={values.referenceUrl} onChange={handleChange} aria-invalid={Boolean(errors.referenceUrl)} aria-describedby={describedBy('referenceUrl')} />
            {errors.referenceUrl && <p className="contact-field-error" id="contact-referenceUrl-error" role="alert">{errors.referenceUrl}</p>}
          </div>
          <div className="contact-form-field contact-form-field--wide">
            <label htmlFor="contact-description">Project description <span aria-hidden="true">*</span></label>
            <textarea className="glass-surface" id="contact-description" name="description" rows={6} placeholder="What are you looking to create, and what would you like it to help you achieve?" value={values.description} onChange={handleChange} required aria-invalid={Boolean(errors.description)} aria-describedby={describedBy('description')} />
            {errors.description && <p className="contact-field-error" id="contact-description-error" role="alert">{errors.description}</p>}
          </div>
        </div>
        <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending inquiry…' : 'Send Project Inquiry'} <ArrowUpRight size={15} aria-hidden="true" /></button>
        <p className="contact-form-notice" role="status" aria-live="polite">{formNotice}</p>
      </form><aside className="contact-details" aria-label="Contact details">
        <div><span>EMAIL</span>{email ? <a href={`mailto:${email}`}>{email}<ArrowUpRight size={14} aria-hidden="true" /></a> : <p>Email contact is not configured.</p>}</div>
        <div><span>LOCATION</span><p>{siteConfig.location}</p></div>
        <div><span>PROFILES</span><p className="contact-profile-links">{linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>}{github && <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>}</p></div>
        {email && <a className="contact-direct-link" href={`mailto:${email}?subject=${encodeURIComponent('Project inquiry — Prosperous Mukaria')}`}><Mail size={15} aria-hidden="true" /> Email me directly</a>}
        <Link className="contact-work-link" to="/work">Explore selected work <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </aside></div>
    </Container>
  </section></>
}
