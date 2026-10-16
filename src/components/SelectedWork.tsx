import { Container } from './Foundation'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../data/projects'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export function SelectedWork({ projects, title = 'A selection of things I’ve built.', showAllLink = false }: { projects: readonly Project[]; title?: string; showAllLink?: boolean }) {
  return <section className="selected-work" id="work" aria-labelledby="work-title" tabIndex={-1}>
    <Container className="work-container">
      <header className="work-intro">
        <p className="eyebrow"><span className="eyebrow-rule" /> SELECTED WORK</p>
        <div className="work-title-row"><h2 id="work-title">{title}</h2><p>Digital experiences, products, and experiments combining thoughtful design with practical technology.</p></div>
      </header>
      {projects.length > 0 ? <div className="project-grid">{projects.map((project, index) => <ProjectCard project={project} key={project.id} lead={index === 0} />)}</div> : <p className="work-empty">Projects will appear here as they are added.</p>}
      {showAllLink && <Link className="text-link work-all-link" to="/work">View all projects <ArrowUpRight size={15} aria-hidden="true" /></Link>}
    </Container>
  </section>
}
