import { Bot, Braces, LayoutPanelTop, PlugZap, Smartphone, WandSparkles } from 'lucide-react'
import { Container } from './Foundation'

const capabilities = [
  { title: 'Frontend Development', text: 'Building clear, responsive interfaces that make digital products easy to use.', icon: Braces },
  { title: 'Responsive Website Development', text: 'Creating websites that adapt thoughtfully across screen sizes and devices.', icon: Smartphone },
  { title: 'UI/UX and Interface Design', text: 'Shaping useful journeys and consistent interfaces around people’s needs.', icon: LayoutPanelTop },
  { title: 'API Integration', text: 'Connecting interfaces to the services and data that power them.', icon: PlugZap },
  { title: 'AI-Powered Applications', text: 'Applying AI capabilities to practical product experiences.', icon: Bot },
  { title: 'Interactive Web Experiences', text: 'Adding purposeful interaction, motion, and feedback to the web.', icon: WandSparkles },
]

export function AboutCapabilities() {
  return <>
    <section className="about-section" id="about" aria-labelledby="about-title" tabIndex={-1}>
      <Container className="about-layout">
        <div className="about-heading">
          <p className="eyebrow"><span className="eyebrow-rule" /> ABOUT</p>
          <span className="about-index">PM <i>—</i> NAIROBI, KE</span>
        </div>
        <div className="about-copy">
          <h2 id="about-title">Technology meets<br />thoughtful <em>design.</em></h2>
          <div className="about-text-columns">
            <p>I’m a developer and digital product creator based in Nairobi, Kenya. My work spans web development, UI/UX, and AI-assisted application development.</p>
            <p>I build digital experiences that combine thoughtful design with practical technology. From websites and interactive interfaces to AI-powered applications, I enjoy turning ideas into useful, well-crafted digital products.</p>
          </div>
          <p className="approach-note"><span>MY APPROACH</span>I care about clarity, usability, performance, and the details that make digital products feel considered.</p>
        </div>
      </Container>
    </section>

    <section className="capabilities-section" aria-labelledby="capabilities-title">
      <Container>
        <header className="capabilities-heading">
          <div><p className="eyebrow"><span className="eyebrow-rule" /> WHAT I DO</p><h2 id="capabilities-title">Capabilities</h2></div>
          <p>A practical mix of design and development, shaped around the needs of each project.</p>
        </header>
        <ul className="capability-list">
          {capabilities.map(({ title, text, icon: Icon }, index) => <li className="capability-item" key={title}>
            <span className="capability-index">0{index + 1}</span>
            <span className="capability-icon"><Icon size={18} strokeWidth={1.5} aria-hidden="true" /></span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </li>)}
        </ul>
      </Container>
    </section>
  </>
}
