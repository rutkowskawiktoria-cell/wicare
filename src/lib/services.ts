export interface Service {
  slug: string
  name: string
  subtitle: string
  description: string
  longDescription: string
  features: string[]
  details: string[]
  highlight?: boolean
}

export const services: Service[] = [
  {
    slug: 'the-home',
    name: 'Cleaning – Homes & Businesses',
    subtitle: '',
    description: 'VIP cleaning for private homes and businesses in the northern suburbs of Copenhagen. Discreet, meticulous and tailored to your standards.',
    longDescription: 'WiCare provides VIP cleaning for private homes and businesses across the northern suburbs of Copenhagen. Every detail is handled with discretion, precision, and an uncompromising commitment to quality. Our teams are background-checked and trained to a white-glove standard.',
    features: ['Private residences & estates', 'Offices, clinics & showrooms', 'White-glove finish', 'Smart product selection', 'Background-checked staff', 'Respectful of your home'],
    details: ['Thoughtfully selected products balanced for safety and efficacy', 'Flexible scheduling for mornings, evenings, weekends', 'Dedicated team assigned to your property'],
  },
  {
    slug: 'the-table',
    name: 'Private Dining & Catering',
    subtitle: '',
    description: 'Private dinners, exclusive events and corporate catering by our chef, with 13+ years of experience including Michelin-starred restaurants and the Danish Parliament. Northern suburbs of Copenhagen.',
    longDescription: 'Private Dining & Catering is our flagship service. Our chef brings more than 13 years of experience, including Michelin-starred restaurants and the Danish Parliament, directly to your home or business. Whether it is an intimate dinner for two, a boardroom lunch, or a grand celebration, every dish is crafted with precision, creativity, and world-class technique.',
    features: ['Private chef dining', 'Corporate catering', 'Michelin experience', 'Bespoke menus', 'Wine pairing', 'Event planning'],
    details: ['13+ years of experience, including Michelin-starred restaurants and the Danish Parliament', 'Custom menu design for every occasion', 'Ingredient sourcing from premium Danish purveyors', 'Seamless setup, service, and cleanup'],
    highlight: true,
  },
  {
    slug: 'the-estate',
    name: 'Garden & Construction',
    subtitle: '',
    description: 'Garden work, landscaping and construction projects for homes and businesses in the northern suburbs of Copenhagen. Scope and price agreed with you.',
    longDescription: 'Garden & Construction covers everything outside and around your home or business: from garden work, landscaping and garden design to construction projects and property maintenance. The scope and price are always agreed with you. One trusted partner handles it all.',
    features: ['Garden work & landscaping', 'Garden design', 'Construction projects', 'Property maintenance'],
    details: ['Experienced professionals for every task', 'Full project management from concept to completion', 'Scope and price agreed with you before we start', 'One point of contact from start to finish'],
  },
]
