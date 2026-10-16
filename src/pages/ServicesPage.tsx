import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ServicesProcess } from '../components/ServicesProcess'
import { Container } from '../components/Foundation'
import { PageMeta } from '../components/PageMeta'

export function ServicesPage() {
  return <><PageMeta title="Services — Prosperous Mukaria" description="Website development, UI/UX design, practical AI-powered applications, and digital product work by Prosperous Mukaria." /><h1 className="sr-only">Services</h1><ServicesProcess /><section className="page-link-band"><Container><p>Tell me what you’re working on.</p><Link className="text-link" to="/contact">Discuss a project <ArrowUpRight size={15} aria-hidden="true" /></Link></Container></section></>
}
