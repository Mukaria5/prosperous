import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export function Container({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`container ${className}`} {...props} />
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{children && <div className="section-heading-aside">{children}</div>}</div>
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`} {...props} />
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`label ${className}`}>{children}</span>
}

export function ProjectCardShell({ children, className = '' }: HTMLAttributes<HTMLDivElement>) {
  return <article className={`project-shell ${className}`}>{children}</article>
}

export function Divider() { return <div className="divider" aria-hidden="true" /> }
export function AccentGlow({ className = '' }: { className?: string }) { return <span className={`accent-glow ${className}`} aria-hidden="true" /> }
