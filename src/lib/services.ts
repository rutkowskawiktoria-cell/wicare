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
    name: 'Home Cleaning',
    subtitle: '',
    description: 'VIP cleaning for private homes and businesses in the northern suburbs of Copenhagen. Discreet, meticulous and tailored to your standards.',
    longDescription: 'Home Cleaning provides VIP cleaning for private homes and businesses across the northern suburbs of Copenhagen. Every detail is handled with discretion, precision, and an uncompromising commitment to quality. Our teams are background-checked and trained to a white-glove standard.',
    features: ['Private residences & estates', 'CEO-ready workspaces', 'White-glove finish', 'Smart product selection', 'Background-checked staff', 'Respectful of your home'],
    details: ['Thoughtfully selected products balanced for safety and efficacy', 'Flexible scheduling for mornings, evenings, weekends', 'Dedicated team assigned to your property'],
  },
  {
    slug: 'the-table',
    name: 'Private Dining & Catering',
    subtitle: '',
    description: 'Professional private chef experiences, exclusive dinner parties, and executive catering in the northern suburbs of Copenhagen.',
    longDescription: 'Private Dining & Catering is our flagship service. Our chef brings more than 13 years of experience, including Michelin-starred restaurants and the Danish Parliament, directly to your home or business. Whether it is an intimate dinner for two, a boardroom lunch, or a grand celebration, every dish is crafted with precision, creativity, and world-class technique.',
    features: ['Private chef dining', 'Corporate catering', 'Michelin pedigree', 'Bespoke menus', 'Wine pairing', 'Event planning'],
    details: ['13+ years of experience, including Michelin-starred restaurants and the Danish Parliament', 'Custom menu design for every occasion', 'Ingredient sourcing from premium Danish purveyors', 'Seamless setup, service, and cleanup'],
    highlight: true,
  },
  {
    slug: 'the-estate',
    name: 'Property & Garden Care',
    subtitle: '',
    description: 'Complete property management including gardening, construction, handyman services, dog walking, and watering plants.',
    longDescription: 'Property & Garden Care is your comprehensive solution for property and lifestyle needs. From expert landscaping and garden design to construction projects, handyman repairs, dog walking, and watering plants. Our skilled professionals deliver the same standard of excellence that defines every WiCare brand. One trusted partner handles it all.',
    features: ['Landscaping & gardening', 'Construction projects', 'Handyman services', 'Property maintenance', 'Dog walking', 'Watering plants'],
    details: ['Vetted, licensed professionals for every service', 'Full project management from concept to completion', 'Watering and tending your plants', 'Dog walking with photo updates', 'Transparent, fixed-price quotes'],
  },
]
