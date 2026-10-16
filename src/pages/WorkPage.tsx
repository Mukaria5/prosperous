import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SelectedWork } from '../components/SelectedWork'
import { projects } from '../data/projects'
import { PageMeta } from '../components/PageMeta'

export function WorkPage() {
  return <><PageMeta title="Selected Work — Prosperous Mukaria" description="Explore selected digital product, web, and application projects by Prosperous Mukaria." /><h1 className="sr-only">Selected work</h1><SelectedWork projects={projects} title="Selected projects." /><section className="page-link-band"><div className="container"><p>Have a project in mind?</p><Link className="text-link" to="/contact">Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></Link></div></section></>
}
