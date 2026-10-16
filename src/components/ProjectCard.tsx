import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project, ProjectImage } from '../data/projects'

export function ProjectPreview({ image, projectTitle, projectSlug, className = '' }: { image: ProjectImage | null; projectTitle: string; projectSlug?: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!image || failed) {
    return <div className={`project-preview-placeholder ${className}`} role="img" aria-label={`${projectTitle} visual concept, not a product screenshot`}>
      <div className={`preview-scene preview-scene--${projectSlug ?? 'concept'}`} aria-hidden="true"><span /><span /><span /></div>
      <span className="placeholder-mark" aria-hidden="true">{projectTitle.slice(0, 1)}</span>
      <span className="placeholder-label">VISUAL CONCEPT · NOT A SCREENSHOT</span>
      <span className="placeholder-rule" aria-hidden="true" />
    </div>
  }

  return <img className={`project-preview-image ${className}`} src={image.src} alt={image.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
}

function ProjectAction({ label, url }: { label: string; url?: string }) {
  if (!url || !isExternalUrl(url)) return null
  return <a className="project-action" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}><span>{label}</span><span className="project-action-icon"><ArrowUpRight size={15} aria-hidden="true" /></span></a>
}

function isExternalUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export function ProjectCard({ project, lead = false }: { project: Project; lead?: boolean }) {
  return <article className={`project-card project-card-${project.slug}${lead ? ' project-card-lead' : ''}`}>
    <Link className="project-card-visual project-card-visual-link" to={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
      <ProjectPreview image={project.coverImage} projectTitle={project.title} projectSlug={project.slug} />
    </Link>
    {project.screenshots.length > 0 && <div className="project-screenshots" aria-label={`${project.title} additional screenshots`}>
      {project.screenshots.map((image) => <figure className="project-screenshot" key={image.src}><ProjectPreview image={image} projectTitle={project.title} /><figcaption>{image.alt}</figcaption></figure>)}
    </div>}
    <div className="project-card-content glass-card">
      <div className="project-heading-row"><div><p className="project-category">{project.category}</p><h3>{project.title}</h3></div><span className="project-number" aria-hidden="true">/{project.id.toUpperCase()}</span></div>
      {project.shortDescription && <p className="project-description">{project.shortDescription}</p>}
      {project.statusVerified && project.status && <p className="project-status">{project.status}</p>}
      {project.tags && project.tags.length > 0 && <ul className="project-tech project-tags" aria-label="Project tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
      {project.technologies.length > 0 && <ul className="project-tech" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>}
      {project.longDescription && <p className="project-long-description">{project.longDescription}</p>}
      <div className="project-actions"><Link className="project-action" to={`/work/${project.slug}`}><span>View case study</span><span className="project-action-icon"><ArrowUpRight size={15} aria-hidden="true" /></span></Link><ProjectAction label="Live demo" url={project.liveUrl} /><ProjectAction label="Source code" url={project.repositoryUrl} /></div>
    </div>
  </article>
}
