export interface CaseStudyPoint {
  title: string
  description: string
}

export interface CaseStudySection {
  heading: string
  paragraphs?: string[]
  points?: CaseStudyPoint[]
  bullets?: string[]
}

export interface CaseStudy {
  subtitle: string
  industry: string
  projectType: string
  status: string
  sections: CaseStudySection[]
  takeaway: string
}

/** Content is intentionally framed around verified project material and the supplied brief. */
export const caseStudies: Record<string, CaseStudy> = {
  arenyx: {
    subtitle: 'Making community sports easier to discover',
    industry: 'Sports technology',
    projectType: 'Sports community platform',
    status: 'Product development · release details to verify',
    sections: [
      { heading: 'Overview', paragraphs: [
        'ARENYX is a sports community platform concept designed to help people discover venues, connect with other players and take part in local sport. Its product direction brings together three ideas: Find. Play. Belong.',
        'The goal is to make finding a place to play and discovering a sporting community feel straightforward, engaging and accessible.'
      ] },
      { heading: 'The challenge', paragraphs: [
        'Finding a facility, learning what it offers and connecting with other players can mean piecing together information from social groups and individual venues. ARENYX explores how that discovery journey could be brought into one product.'
      ] },
      { heading: 'Objectives', bullets: [
        'Simplify sports and venue discovery.', 'Create an energetic, recognizable sports identity.',
        'Make venue information easier to browse and provide clear contact paths.',
        'Establish a foundation for community participation and future product growth.'
      ] },
      { heading: 'Product approach', paragraphs: [
        'I approached ARENYX as a product experience, considering how a person moves from choosing a sport to exploring a venue and deciding what to do next. Recognizable sports categories, strong imagery and direct actions help keep that path legible.',
        'The visual identity draws on sports culture while keeping a modern digital-product feel, with mobile usability as a central consideration.'
      ] },
      { heading: 'Product direction', points: [
        { title: 'Sports discovery', description: 'Organize activities such as football, basketball, tennis and padel into familiar categories.' },
        { title: 'Venue discovery', description: 'Present facilities, locations, imagery and relevant amenities through browsable venue details.' },
        { title: 'Direct contact', description: 'Prioritize a clear route to contact venues without implying a complete reservation or payment workflow.' },
        { title: 'Community connection', description: 'Leave room for players and local communities to find one another and participate.' },
        { title: 'Mobile-first interaction', description: 'Use readable type, clear touch targets and navigation suited to smaller screens.' }
      ] },
      { heading: 'Visual design', paragraphs: [
        'The direction pairs a bold sports-inspired identity and green accent with dark surfaces, high-contrast hierarchy and immersive sports imagery. Consistent iconography and responsive layouts support quick scanning.'
      ] },
      { heading: 'Technical considerations', paragraphs: [
        'Lovable was used during the design and development process. The initial Supabase setup included a waitlist table. Other backend integrations, features and deployment details need confirmation against the current product before they are described as complete. A progressive web app approach has been considered as a possible direction.'
      ] },
      { heading: 'Challenges and next steps', paragraphs: [
        'The product serves people looking for a place to play, communities seeking participants and venues seeking visibility. Keeping the initial scope focused on discovery and direct contact helps avoid making the experience unnecessarily complex.',
        'Next steps include validating the discovery journey, confirming venue information and current backend functionality, and testing accessibility and mobile usability. Booking features should follow only once operational requirements are clear.'
      ] },
      { heading: 'Current position', paragraphs: [
        'ARENYX has an established product direction and visual identity. Production readiness, live venue data, user activity and business outcomes have not been established here and should be verified before making claims about them.'
      ] }
    ],
    takeaway: 'ARENYX reflects an approach that combines product thinking, visual design and web development around a real discovery problem, with clear interactions and room for the product to grow.'
  },
  safari: {
    subtitle: 'A modern digital gateway to safari experiences',
    industry: 'Travel & Tourism',
    projectType: 'Safari website',
    status: 'Independent project · enquiry delivery to verify',
    sections: [
      { heading: 'Overview', paragraphs: [
        'Safari is an independent website project showcasing how a safari tourism business can present destinations, travel experiences and packages online. It brings together immersive landscape imagery, clear navigation and visible enquiry prompts.',
        'The work is independently presented in this portfolio. No client commission, approval or commercial launch is claimed.'
      ] },
      { heading: 'The challenge', paragraphs: [
        'Safari planning starts with inspiration and quickly leads to practical questions about destinations, experiences and possible itineraries. The website makes those options browsable and gives visitors clear next steps to request more information.'
      ] },
      { heading: 'Objectives', bullets: [
        'Present destinations, experiences and safari packages with a consistent visual identity.', 'Make travel options easy to browse and understand.',
        'Use clear navigation to help visitors move between key sections.',
        'Provide a visible enquiry path without implying unverified booking or payment functionality.'
      ] },
      { heading: 'Information architecture', points: [
        { title: 'Primary navigation', description: 'The supplied desktop view includes Home, Safaris, Destinations, Experiences, About, Blog and Contact, alongside a prominent Plan Your Safari action.' },
        { title: 'Destination and experience discovery', description: 'Navigation separates the main travel topics so visitors can move from the landing page toward more specific information.' },
        { title: 'Safari packages', description: 'The supplied journeys page organizes sample itineraries into image-led cards with location, duration, trip type and a concise summary.' }
      ] },
      { heading: 'Website components', points: [
        { title: 'Destination-led home page', description: 'A full-bleed Maasai Mara sunset image pairs a location label and headline with Explore Safaris and Plan My Trip actions.' },
        { title: 'Safari journey cards', description: 'The journeys view uses photography, trip duration and destination details to make different packages quick to scan.' },
        { title: 'Enquiry prompts', description: 'Plan Your Safari, Plan My Trip and Request Pricing actions make enquiry routes visible; their destinations and message delivery still need verification.' }
      ] },
      { heading: 'Visual design and responsive behavior', paragraphs: [
        'The design uses warm ivory surfaces, editorial serif display typography, restrained amber accents, fine dividers and large safari photography. The home page places its headline and calls to action over a darkened landscape, while the journeys page uses a structured image-led layout.',
        'The provided screenshots show desktop layouts. Mobile and tablet behavior has not been verified from the website source and should be checked before making claims about its responsive implementation.'
      ] },
      { heading: 'Enquiry experience and implementation', paragraphs: [
        'The visible calls to action guide visitors toward planning a trip or requesting pricing, creating a clear enquiry path in the interface. The screenshots do not establish whether the enquiry form sends successfully or where messages are delivered.',
        'The safari website source repository is not present in this portfolio repository, so its framework, detailed responsive behavior and external integrations cannot be independently verified. No booking, payment or other backend functionality is claimed.'
      ] },
      { heading: 'Current position', paragraphs: [
        'This is an independent portfolio project. The current visual is the supplied website screenshot; it contains no visible business logo or contact details. Package content and enquiry delivery should be verified against the website before publication as operational information.'
      ] }
    ],
    takeaway: 'The Safari website brings destination-led storytelling, browsable travel options and clear enquiry prompts together in one focused experience.'
  },
  'medicare-plus': {
    subtitle: 'Bringing everyday healthcare journeys into one mobile experience',
    industry: 'Healthcare',
    projectType: 'Mobile App UI/UX',
    status: 'Interface design · clinical and service integrations unverified',
    sections: [
      { heading: 'Overview', paragraphs: [
        'MediCare+ explores how a single mobile experience can bring everyday healthcare journeys together, including appointments, video consultations, medical records, symptom assessment, medicine delivery and insurance access.',
        'The supplied visual presents a home dashboard alongside a conversational symptom-checker screen. Names, appointment details and symptom dialogue in the image are illustrative screen content; the underlying services and integrations are not verified.'
      ] },
      { heading: 'The challenge', paragraphs: [
        'Healthcare experiences can feel fragmented when people must navigate separate channels for consultations, records and other services. The design challenge is to organize these journeys into a clear, approachable and consistent mobile interface without implying that a single screen replaces clinical care.'
      ] },
      { heading: 'Design approach', points: [
        { title: 'Unified dashboard', description: 'Bring key service shortcuts together in a home view so important actions are easy to find.' },
        { title: 'Appointment overview', description: 'Give upcoming consultation information and booking actions a clear place in the dashboard.' },
        { title: 'Conversational symptom checker', description: 'Present a guided symptom-assessment interface as a design flow, not a diagnosis or clinically validated tool.' },
        { title: 'Clear visual hierarchy', description: 'Use blue accents, readable typography and recognizable icons to organize healthcare information.' },
        { title: 'Consistent navigation', description: 'Keep a familiar navigation structure across the showcased mobile screens.' }
      ] },
      { heading: 'Screens showcased', bullets: [
        'Home dashboard with appointment information and service shortcuts.',
        'Symptom-checker conversation and selectable symptom list.',
        'Appointment overview and booking action represented in the dashboard.',
        'Healthcare service shortcuts for consultation, records, medicine delivery and insurance.'
      ] },
      { heading: 'Outcome and next steps', paragraphs: [
        'The supplied designs demonstrate a unified healthcare experience that brings common service entry points into one mobile interface. They do not establish live appointment booking, provider connections, medical record storage or delivery services. The promotional security and privacy wording visible in the screenshot is design copy, not a verified security claim or certification.',
        'Before real-world use, the design would need usability testing, accessibility validation, clinical safety review and privacy assessment. No clinical validation, regulatory compliance or provider integration is claimed.'
      ] }
    ],
    takeaway: 'MediCare+ shows how thoughtful information hierarchy can make a broad healthcare service experience easier to scan while keeping clinical and privacy responsibilities in view.'
  },
  pesaflow: {
    subtitle: 'Designing a clearer view of everyday money',
    industry: 'Fintech and personal finance',
    projectType: 'Mobile App UI/UX',
    status: 'Interface design · financial integrations unverified',
    sections: [
      { heading: 'Overview', paragraphs: [
        'PesaFlow is a fintech mobile app design exploring a streamlined experience for managing everyday money. It brings wallet balances, money transfers, bill payments, transaction history, savings insights and financial goals into one interface.',
        'The supplied screens show a wallet dashboard, a send-money form and a savings view. Visible amounts and activity are sample content in the design and do not represent verified financial data or real transactions. Payment-network and wallet marks are part of the mockup and do not verify live provider connections.'
      ] },
      { heading: 'The challenge', paragraphs: [
        'Financial applications need to communicate balances and payment details clearly while helping people complete transactions with confidence. Important information should be easy to scan without overwhelming the interface.'
      ] },
      { heading: 'Design approach', points: [
        { title: 'Wallet dashboard', description: 'Present total, available and savings balances in a clear summary.' },
        { title: 'Structured transfer flow', description: 'Separate recipient, amount, payment method and review steps so a transfer can be checked before confirmation.' },
        { title: 'Transaction history', description: 'Show recent activity in a scannable list for reviewing account movements.' },
        { title: 'Savings insights', description: 'Use a chart to represent progress over time and complement it with goal information.' },
        { title: 'Goal tracking', description: 'Make savings targets, such as an emergency fund or holiday, visible alongside progress.' },
        { title: 'Consistent visual system', description: 'Use a green-and-white interface with familiar financial controls and restrained information grouping.' }
      ] },
      { heading: 'Screens showcased', bullets: [
        'Wallet dashboard with balance summary and recent transactions.',
        'Send-money form with recipient, amount, payment method and review action.',
        'Savings dashboard with earnings chart and goal progress.',
        'Navigation for home, transactions, scan, savings and profile.'
      ] },
      { heading: 'Outcome and next steps', paragraphs: [
        'The designs bring everyday money management and savings information into a single mobile interface. They do not demonstrate live payments, bank connectivity or deployed transaction processing.',
        'Next steps include usability testing, defining detailed transaction and error states, completing security reviews, and planning any payment-provider integration. No real transactions, bank integrations, production deployment or security certification are claimed.'
      ] }
    ],
    takeaway: 'PesaFlow organizes wallet activity, transfers and savings goals into a focused interface, with clarity and trust as essential parts of the payment experience.'
  },
  'fitcoach-app': {
    subtitle: 'Exploring a more structured fitness experience',
    industry: 'Health and fitness',
    projectType: 'Fitness application',
    status: 'Portfolio project · implementation details to verify',
    sections: [
      { heading: 'Overview', paragraphs: [
        'FitCoach AI is a fitness application project exploring how a digital experience can help people organize and engage with everyday fitness activities. Fitness products need to clarify the next action, make relevant features easy to navigate and keep activity information understandable.',
        'This case study describes the product problem and design considerations. The final account of implemented workflows should be updated from the actual application.'
      ] },
      { heading: 'The challenge', paragraphs: [
        'Maintaining a routine can be difficult when plans, activities and progress are hard to organize. A product can add structure, but too many controls, statistics or recommendations can make it harder to know what to do next.'
      ] },
      { heading: 'Objectives', bullets: [
        'Explore a clear interface for a fitness-oriented application.', 'Organize relevant information into understandable screens.',
        'Make important actions easy to locate and establish a consistent visual language.',
        'Identify usability improvements through feedback and testing.'
      ] },
      { heading: 'Product approach', paragraphs: [
        'The experience should be organized around the tasks users need to complete rather than a collection of unrelated screens. A possible journey might involve reviewing a plan, selecting an activity and checking relevant progress, if those workflows are supported by the actual implementation.',
        'The precise user journey and feature set should be documented from the product itself, not assumed from its name.'
      ] },
      { heading: 'Experience considerations', points: [
        { title: 'Clear hierarchy', description: 'Make primary actions easy to identify and keep supporting information from competing with the main task.' },
        { title: 'Consistent navigation', description: 'Help users understand where they are and how to return to important areas.' },
        { title: 'Readable information', description: 'Use typography, spacing, contrast and grouping to make activity information easy to scan.' },
        { title: 'Mobile usability', description: 'Consider touch targets, layout and content density for smaller screens where mobile use is intended.' },
        { title: 'Progressive complexity', description: 'Introduce more advanced information when it helps users complete a task.' }
      ] },
      { heading: 'Interface direction', paragraphs: [
        'The visual direction emphasizes clarity, consistency and an approachable fitness aesthetic. Strong headings, steady spacing and considered accent colours can distinguish primary actions from supporting content. Genuine application screens are needed to demonstrate how this direction appears in the built product.'
      ] },
      { heading: 'Technical implementation', paragraphs: [
        'The framework, backend, database and integrations have not been established in the available project information. This case study therefore avoids assigning a technical stack or implying that planned workflows are complete.'
      ] },
      { heading: 'Validation and next steps', paragraphs: [
        'If activity information or exercise guidance is part of the product, privacy, clarity and responsible presentation should be assessed. Usability testing can establish whether people understand the interface and complete its main workflow; no testing results or fitness outcomes are claimed here.',
        'Next steps are to capture genuine screens, confirm the audience and feature set, document the actual stack, test the main workflow, and record feedback and resulting changes.'
      ] },
      { heading: 'Current position', paragraphs: [
        'FitCoach AI is part of the portfolio lineup, while implementation details and outcomes still need confirmation. Until genuine screens and workflows are verified, it should be presented as a project exploration rather than evidence of completed functionality.'
      ] }
    ],
    takeaway: 'FitCoach AI is an opportunity to organize a task-oriented fitness experience around clarity and usability. Its strongest case study will pair the actual interface with the decisions and learning behind it.'
  },
  'load-link-app': {
    subtitle: 'Bringing logistics workflows into a more connected experience',
    industry: 'Transport and logistics',
    projectType: 'Logistics management platform',
    status: 'Active project direction · feature readiness to verify',
    sections: [
      { heading: 'Overview', paragraphs: [
        'Load Link App is associated with a logistics platform direction for organizing operational information and coordinating transport workflows. The wider project focuses initially on logistics businesses in Kenya, where orders, vehicles, drivers, route information and financial records can otherwise be spread across separate systems.',
        'The aim is to give operations a clearer shared view and reduce reliance on disconnected spreadsheets and manual records.'
      ] },
      { heading: 'The challenge', paragraphs: [
        'Transport operations connect order intake, vehicle and driver assignment, route planning, trip monitoring and payment records. When these live in separate tools, it is harder to keep a consistent view, identify delays, review trip costs and reconcile records.'
      ] },
      { heading: 'Objectives', bullets: [
        'Create a central structure for transport operations.', 'Organize order, fleet, driver and client information.',
        'Explore distance-based pricing and improve trip-status visibility.',
        'Support structured payment and expense records, operational reporting and responsive business use.'
      ] },
      { heading: 'Product approach', paragraphs: [
        'The product direction separates logistics work into related modules inside a consistent interface. An order can connect a pickup and destination with a vehicle and driver, providing a basis for trip planning and relevant reporting.',
        'Structured forms, clear status information and map-assisted features are intended to support tasks without letting maps dominate the interface.'
      ] },
      { heading: 'Core modules', points: [
        { title: 'Orders', description: 'A proposed workflow for transport requests, pickup and drop-off locations, cargo details and status.' },
        { title: 'Fleet and drivers', description: 'Structured vehicle records and availability, with driver information and assignments where implemented.' },
        { title: 'Clients', description: 'A foundation for associating customer records with transport orders.' },
        { title: 'Route and distance', description: 'Documented development includes location lookup and distance-based charge calculation. A backend returned a distance and total charge for a test request; this does not validate every route scenario.' },
        { title: 'Finance and reporting', description: 'Payment, operational cost, trip, fuel and delivery records are part of the direction; implemented workflows and reporting accuracy require confirmation.' }
      ] },
      { heading: 'Technical implementation', paragraphs: [
        'The documented stack includes React, Vite and TypeScript for the frontend; Tailwind CSS for styling; FastAPI and Python for the API; and OpenRouteService for geocoding and routing-related functionality. Google Maps API was considered for mapping.',
        'Development work included frontend/backend communication, cross-origin configuration, location lookup and distance-based charge calculations. Live tracking, weather, toll data and detailed finance workflows depend on further integration and should not be described as operational without verification.'
      ] },
      { heading: 'Product decisions', points: [
        { title: 'Modular navigation', description: 'Separate orders, fleet, drivers, clients and finance so related tasks are easier to find.' },
        { title: 'Structured data entry', description: 'Use clear forms and validation to support accurate information across connected records.' },
        { title: 'Map-assisted planning', description: 'Use maps where they help with routes and location selection.' },
        { title: 'Operational visibility', description: 'Use status indicators and summaries with care, since their value depends on reliable data.' }
      ] },
      { heading: 'Challenges and next steps', paragraphs: [
        'A distance calculation alone does not make a logistics workflow reliable. Location resolution, pricing rules, error handling and agreement between frontend inputs and backend calculations all need deliberate validation. Routing can also vary with road data and configuration.',
        'Next steps include verifying endpoints and module readiness, testing calculations across locations, checking form and error states, confirming data relationships and access controls, and validating reporting against known examples.'
      ] },
      { heading: 'Current position', paragraphs: [
        'Load Link has a documented product direction, technology stack and development work around location lookup and distance-based pricing. Overall platform readiness depends on which modules and integrations are implemented and tested.'
      ] }
    ],
    takeaway: 'Load Link explores how logistics software can connect operational workflows, and why clear interface design must be paired with reliable data, tested business rules and a modular technical foundation.'
  }
}
