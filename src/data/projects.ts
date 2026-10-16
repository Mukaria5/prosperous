export interface ProjectImage {
  /** Public path to an image under public/images/projects/. */
  src: string
  alt: string
}

export interface Project {
  id: string
  slug: string
  title: string
  category: string
  shortDescription: string
  longDescription?: string
  problem?: string
  solution?: string
  challenges?: string
  lessonsLearned?: string
  coverImage: ProjectImage | null
  screenshots: ProjectImage[]
  technologies: string[]
  tags?: string[]
  status?: string
  statusVerified?: boolean
  liveUrl?: string
  repositoryUrl?: string
  featured: boolean
  year?: number
}

// Technical stacks, deployment states and destinations remain unset until verified
// from project repositories or supplied by Prosperous.
export const projects: Project[] = [
  {
    id: 'arenyx', slug: 'arenyx', title: 'ARENYX', category: 'Sports Technology',
    shortDescription: 'A sports community platform concept focused on discovering venues and connecting players.',
    coverImage: { src: '/images/projects/arenyx-cover.png', alt: 'ARENYX sports community concept showing players competing on a football pitch beside the mobile app interface' }, screenshots: [], technologies: [], liveUrl: 'https://www.arenyx.app', status: 'Concept · implementation details awaiting verification', featured: true,
  },
  {
    id: 'safari', slug: 'safari', title: 'Safari', category: 'Web Design · Frontend Development',
    shortDescription: 'A modern safari website showcasing destinations, travel experiences and safari packages through immersive imagery, clear navigation and a streamlined enquiry experience.',
    coverImage: { src: '/images/projects/safari/cover.webp', alt: 'Safari website home page showing a Maasai Mara sunset, the headline “Where the wild comes alive,” and safari enquiry buttons' },
    screenshots: [], technologies: [], status: 'Independent project', featured: true,
  },
  {
    id: 'fitcoach-app', slug: 'fitcoach-app', title: 'FitCoach AI', category: 'Fitness & Technology',
    shortDescription: 'A fitness application project exploring a more structured, approachable way to engage with everyday activity.',
    coverImage: { src: '/images/projects/fitcoach-ai.png', alt: 'FitCoach AI landing page showing daily health habits and its AI accountability coach' }, screenshots: [], technologies: [],
    liveUrl: 'https://fit-coach-ai-omega.vercel.app/', status: 'Project details awaiting confirmation', featured: true,
  },
  {
    id: 'load-link-app', slug: 'load-link-app', title: 'Load Link App', category: 'Logistics & Technology',
    shortDescription: 'A logistics platform direction for bringing fleet and transport operations into a more connected workspace.', coverImage: { src: '/images/projects/load-link-app/cover.png', alt: 'Load Link fleet dashboard showing vehicle availability, utilisation, and maintenance status' }, screenshots: [], technologies: [],
    status: 'Project details awaiting confirmation', featured: true,
  },
  {
    id: 'medicare-plus', slug: 'medicare-plus', title: 'MediCare+', category: 'Healthcare',
    shortDescription: 'A unified healthcare mobile experience bringing appointments, consultations, medical records, symptom assessment, medicine delivery, and insurance access together.',
    coverImage: { src: '/images/projects/medicare-plus/cover.webp', alt: 'MediCare+ mobile app design showing a healthcare home dashboard and an AI symptom-checker conversation' },
    screenshots: [], technologies: [], tags: ['UI/UX Design', 'Healthcare', 'Mobile App', 'Product Design'], status: 'Mobile app UI/UX design', featured: true,
  },
  {
    id: 'pesaflow', slug: 'pesaflow', title: 'PesaFlow', category: 'Fintech',
    shortDescription: 'A mobile finance experience designed around digital wallet management, money transfers, bill payments, transaction history, savings insights, and financial goals.',
    coverImage: { src: '/images/projects/pesaflow/cover.webp', alt: 'PesaFlow mobile finance app design showing wallet balances, a send-money form, and savings goals' },
    screenshots: [], technologies: [], tags: ['UI/UX Design', 'Fintech', 'Mobile App', 'Personal Finance'], status: 'Mobile app UI/UX design', featured: true,
  },
]
