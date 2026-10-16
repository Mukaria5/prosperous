import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Container } from '../components/Foundation'
import { PageMeta } from '../components/PageMeta'

export function NotFoundPage() {
  return <><PageMeta title="Page not found — Prosperous Mukaria" description="This page could not be found. Return to Prosperous Mukaria’s portfolio homepage." /><section className="not-found-page"><Container><p className="eyebrow"><span className="eyebrow-rule" /> 404 · PAGE NOT FOUND</p><h1>This page<br />isn’t here.</h1><p>The page may have moved, or the address may be incorrect.</p><Link className="button button-primary" to="/"><ArrowLeft size={16} aria-hidden="true" /> Return home</Link></Container></section></>
}
