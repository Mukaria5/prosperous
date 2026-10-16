import { Bot, Compass, LayoutTemplate, PenTool, RefreshCw, Wrench } from 'lucide-react'
import { Container } from './Foundation'

const services = [
  { title: 'Website Design & Development', text: 'Responsive, polished websites built around business goals, usability, and performance.', icon: LayoutTemplate },
  { title: 'UI/UX & Digital Product Design', text: 'Thoughtful interfaces, clear user journeys, and consistent digital experiences.', icon: PenTool },
  { title: 'AI-Powered Applications', text: 'Practical AI features and integrations designed around real user needs.', icon: Bot },
  { title: 'Web Application Development', text: 'Building interactive web applications around useful workflows and real product needs.', icon: RefreshCw },
]

const processSteps = [
  { number: '01', title: 'Discover', text: 'Understand the problem, users, goals, and constraints.', icon: Compass },
  { number: '02', title: 'Design', text: 'Plan the structure, experience, and visual direction.', icon: PenTool },
  { number: '03', title: 'Build', text: 'Implement the solution and refine its interactions.', icon: Wrench },
  { number: '04', title: 'Refine', text: 'Test responsiveness, usability, accessibility, and performance.', icon: RefreshCw },
]

export function ServicesProcess({ showServices = true, showProcess = true }: { showServices?: boolean; showProcess?: boolean }) {
  return <>
    {showServices && <section className="services-section" id="services" aria-labelledby="services-title" tabIndex={-1}>
      <Container>
        <header className="services-heading">
          <div><p className="eyebrow"><span className="eyebrow-rule" /> SERVICES</p><h2 id="services-title">Considered from<br />first thought to <em>finish.</em></h2></div>
          <p>Focused digital services to take an idea from a useful first step to a polished experience.</p>
        </header>
        <div className="service-list">
          {services.map(({ title, text, icon: Icon }, index) => <article className="service-item" key={title}>
            <span className="service-index">0{index + 1}</span>
            <span className="service-icon"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
            <div className="service-copy"><h3>{title}</h3><p>{text}</p></div>
          </article>)}
        </div>
      </Container>
    </section>}

    {showProcess && <section className="process-section" aria-labelledby="process-title">
      <Container>
        <header className="process-heading"><p className="eyebrow"><span className="eyebrow-rule" /> THE PROCESS</p><h2 id="process-title">How I work</h2></header>
        <ol className="process-steps">
          {processSteps.map(({ number, title, text }) => <li className="process-step" key={number}>
            <span className="process-number">{number}</span><h3>{title}</h3><p>{text}</p>
          </li>)}
        </ol>
      </Container>
    </section>}
  </>
}
