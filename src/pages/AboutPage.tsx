import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { AboutCapabilities } from '../components/AboutCapabilities'
import { ServicesProcess } from '../components/ServicesProcess'
import { Container } from '../components/Foundation'
import { PageMeta } from '../components/PageMeta'

export function AboutPage() {
  return <><PageMeta title="About — Prosperous Mukaria" description="Meet Prosperous Mukaria, a developer and digital product creator in Nairobi working across web development, interface design, and AI-assisted applications." /><h1 className="sr-only">About Prosperous Mukaria</h1><AboutCapabilities /><ServicesProcess showServices={false} /><section className="page-link-band"><Container><p>Explore the work, or get in touch about an idea.</p><div><Link className="text-link" to="/work">Selected projects <ArrowUpRight size={15} aria-hidden="true" /></Link><Link className="text-link" to="/contact">Contact me <ArrowUpRight size={15} aria-hidden="true" /></Link></div></Container></section></>
}
