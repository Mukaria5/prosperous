import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/Foundation'
import { SelectedWork } from '../components/SelectedWork'
import { ContactSection } from '../components/ContactFooter'
import { projects } from '../data/projects'
import { PageMeta } from '../components/PageMeta'
import { useTheme } from '../theme/themeContext'

export function Hero() {
  const { theme } = useTheme()
  const backgroundImage = theme === 'dark' ? '/images/hero/hero-dark.png' : '/images/hero/hero-light.png'

  return <section className="hero" aria-labelledby="hero-title">
    <div className={`hero-background hero-background--${theme}`} aria-hidden="true"><img className="hero-background-image" src={backgroundImage} alt="" fetchPriority="high" decoding="async" /></div>
    <Container className="hero-layout">
      <div className="hero-copy">
        <p className="eyebrow hero-enter hero-enter-1"><span className="eyebrow-rule" /> WEB DEVELOPER · UI/UX ENTHUSIAST · AI EXPLORER</p>
        <h1 id="hero-title" className="hero-enter hero-enter-2">I build digital<br />experiences<br />that <span>matter.</span></h1>
        <p className="hero-description hero-enter hero-enter-3">I design and build modern websites, web applications and AI-powered solutions that solve real problems and create lasting impact.</p>
        <div className="hero-meta glass-panel hero-enter hero-enter-3"><span className="location-marker" aria-hidden="true" /> NAIROBI, KENYA <span className="meta-divider" /> INDEPENDENT PRACTICE</div>
        <div className="hero-actions hero-enter hero-enter-4"><Link className="button button-primary" to="/work">View my work <ArrowDownRight size={16} aria-hidden="true" /></Link><Link className="button button-secondary glass-panel" to="/contact">Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </div>
      <div className="hero-footer"><span>PM <b>—</b> DIGITAL PRACTICE</span><Link to="/work">EXPLORE SELECTED WORK <ArrowDownRight size={14} aria-hidden="true" /></Link></div>
    </Container>
  </section>
}

function AboutPreview() {
  return <section className="about-section" aria-labelledby="home-about-title">
    <Container className="about-layout"><div className="about-heading"><p className="eyebrow"><span className="eyebrow-rule" /> A LITTLE ABOUT ME</p><span className="about-index">PM <i>—</i> NAIROBI, KE</span></div>
      <div className="about-copy"><h2 id="home-about-title">Technology meets<br />thoughtful <em>design.</em></h2><p className="about-description">I’m a developer and digital product creator based in Nairobi, Kenya, working across web development, UI/UX, and AI-assisted application development.</p><Link className="text-link" to="/about">More about me <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
    </Container>
  </section>
}

function ServicesPreview() {
  return <section className="services-preview"><Container className="services-preview-inner"><div><p className="eyebrow"><span className="eyebrow-rule" /> WAYS I CAN HELP</p><h2>Thoughtful digital<br />work, from idea to <em>launch.</em></h2></div><Link className="button button-secondary" to="/services">Explore services <ArrowUpRight size={15} aria-hidden="true" /></Link></Container></section>
}

export function HomePage() {
  return <><PageMeta title="Prosperous Mukaria — Digital Studio" description="Thoughtful websites, digital products, and AI-powered experiences by Prosperous Mukaria, a developer based in Nairobi, Kenya." /><Hero /><SelectedWork projects={projects.filter((project) => project.featured)} title="A selection of things I’ve built." showAllLink /><AboutPreview /><ServicesPreview /><ContactSection /></>
}
