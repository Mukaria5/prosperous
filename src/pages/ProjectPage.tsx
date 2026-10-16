import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Container } from '../components/Foundation'
import { ProjectPreview } from '../components/ProjectCard'
import { PageMeta } from '../components/PageMeta'
import { projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { configuredExternalUrl } from '../data/siteConfig'

function DetailBlock({ label, text }: { label: string; text?: string }) {
  if (!text) return null
  return <section className="case-study-block"><p className="eyebrow"><span className="eyebrow-rule" /> {label}</p><p>{text}</p></section>
}

export function ProjectPage() {
  const { slug } = useParams()
  const index = projects.findIndex((project) => project.slug === slug)
  const project = projects[index]
  if (!project) return <><PageMeta title="Project not found — Prosperous Mukaria" description="This project case study could not be found." /><section className="case-study-page"><Container><p>That project could not be found.</p><Link className="text-link" to="/work">Back to selected work <ArrowLeft size={15} aria-hidden="true" /></Link></Container></section></>

  const nextProject = projects[(index + 1) % projects.length]
  const liveUrl = configuredExternalUrl(project.liveUrl)
  const repositoryUrl = configuredExternalUrl(project.repositoryUrl, ['github.com'])
  const description = project.shortDescription || `A ${project.category.toLowerCase()} project by Prosperous Mukaria.`
  const caseStudy = caseStudies[project.slug]

  return <><PageMeta title={`${project.title} — Projects by Prosperous Mukaria`} description={description} image={project.coverImage?.src} /><article className="case-study-page">
    <Container>
      <Link className="case-study-back" to="/work"><ArrowLeft size={15} aria-hidden="true" /> All projects</Link>
      <header className="case-study-heading"><p className="eyebrow"><span className="eyebrow-rule" /> {project.category}</p><h1>{project.title}</h1>{caseStudy && <p className="case-study-subtitle">{caseStudy.subtitle}</p>}<p className="case-study-overview">{description}</p>
        <div className="project-actions"><Link className="project-action" to="/contact">Discuss a similar project <ArrowUpRight size={15} aria-hidden="true" /></Link>{liveUrl && <a className="project-action" href={liveUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={15} aria-hidden="true" /></a>}{repositoryUrl && <a className="project-action" href={repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub repository <ArrowUpRight size={15} aria-hidden="true" /></a>}</div>
      </header>
      {caseStudy && <dl className="case-study-meta" aria-label="Project details">
        <div><dt>Industry</dt><dd>{caseStudy.industry}</dd></div>
        <div><dt>Project type</dt><dd>{caseStudy.projectType}</dd></div>
        <div><dt>Current status</dt><dd>{caseStudy.status}</dd></div>
      </dl>}
      {project.tags && project.tags.length > 0 && <ul className="project-tech project-tags case-study-tags" aria-label="Project tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
      <div className={`case-study-visual case-study-visual-${project.slug}`}><ProjectPreview image={project.coverImage} projectTitle={project.title} projectSlug={project.slug} /></div>
      {project.screenshots.length > 0 && <div className="project-screenshots case-study-screenshots">{project.screenshots.map((image) => <figure className="project-screenshot" key={image.src}><ProjectPreview image={image} projectTitle={project.title} /><figcaption>{image.alt}</figcaption></figure>)}</div>}
      {caseStudy ? <div className="case-study-content case-study-sections">
        {caseStudy.sections.map((section, sectionIndex) => <section className="case-study-section" key={section.heading}>
          <div className="case-study-section-index" aria-hidden="true">{String(sectionIndex + 1).padStart(2, '0')}</div>
          <div className="case-study-section-body"><h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul className="case-study-bullets">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            {section.points && <div className="case-study-points">{section.points.map((point) => <article className="case-study-point" key={point.title}><h3>{point.title}</h3><p>{point.description}</p></article>)}</div>}
          </div>
        </section>)}
        <aside className="case-study-takeaway"><p className="eyebrow"><span className="eyebrow-rule" /> KEY TAKEAWAY</p><p>{caseStudy.takeaway}</p></aside>
      </div> : <div className="case-study-content"><DetailBlock label="OVERVIEW" text={project.longDescription || project.shortDescription} /><DetailBlock label="OBJECTIVE" text={project.problem} /><DetailBlock label="SOLUTION" text={project.solution} /><DetailBlock label="CHALLENGES" text={project.challenges} /><DetailBlock label="LESSONS LEARNED" text={project.lessonsLearned} />
        {project.technologies.length > 0 && <section className="case-study-block"><p className="eyebrow"><span className="eyebrow-rule" /> TECHNOLOGIES</p><ul className="project-tech">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></section>}
        {!project.longDescription && !project.problem && !project.solution && !project.challenges && !project.lessonsLearned && project.technologies.length === 0 && <p className="case-study-note">More project details and visuals will be added as they’re confirmed.</p>}
      </div>}
      <div className="case-study-contact"><p>Have a similar challenge in mind?</p><Link className="button button-primary" to="/contact">Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      <nav className="case-study-next" aria-label="Other projects"><span>CONTINUE EXPLORING</span><Link to={`/work/${nextProject.slug}`}>{nextProject.title} <ArrowUpRight size={16} aria-hidden="true" /></Link></nav>
    </Container>
  </article></>
}
