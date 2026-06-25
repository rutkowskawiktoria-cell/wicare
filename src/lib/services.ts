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
    slug: 'wi-clean',
    name: 'WiClean',
    subtitle: 'Executive Home Cleaning',
    description: 'Premium residential cleaning for CEOs and industry leaders. Discreet, meticulous, and tailored to the highest standards of luxury living.',
    longDescription: 'WiClean is our flagship service, the foundation of the WiCare Group. We provide premium residential cleaning for CEOs, executives, and high-net-worth individuals across Copenhagen. Every detail is handled with discretion, precision, and an uncompromising commitment to quality. Our teams are fully insured, background-checked, and trained to a white-glove standard.',
    features: ['Private residences & estates', 'CEO-ready workspaces', 'White-glove finish', 'Smart product selection', 'Background-checked staff', 'Fully insured'],
    details: ['Serving Copenhagen\'s most discerning clients since 2016', 'Thoughtfully selected products balanced for safety and efficacy', 'Flexible scheduling for mornings, evenings, weekends', 'Dedicated team assigned to your property'],
    highlight: true,
  },
  {
    slug: 'wi-cook',
    name: 'WiCook',
    subtitle: 'Private Dining & Catering',
    description: '13+ years of Michelin-star and Danish Parliament culinary expertise. Private chef experiences, exclusive dinner parties, and executive catering.',
    longDescription: 'WiCook brings Michelin-star and Danish Parliament culinary expertise directly to your home. Our chefs have cooked for heads of state, royalty, and the most demanding palates in Copenhagen. Whether it is an intimate dinner for two, a boardroom lunch, or a grand celebration, every dish is crafted with precision, creativity, and world-class technique.',
    features: ['Private chef dining', 'Corporate catering', 'Michelin pedigree', 'Bespoke menus', 'Wine pairing', 'Event planning'],
    details: ['13+ years of Michelin-star and Danish Parliament experience', 'Custom menu design for every occasion', 'Ingredient sourcing from premium Danish purveyors', 'Seamless setup, service, and cleanup'],
  },
  {
    slug: 'wi-help',
    name: 'WiHelp',
    subtitle: 'Premier Property & Lifestyle Care',
    description: 'Complete property management including gardening, construction, handyman services, elite pet care, and botanical expertise.',
    longDescription: 'WiHelp is your comprehensive solution for property and lifestyle needs. From expert landscaping and garden design to construction projects, handyman repairs, elite pet valet services, and specialized plant care. Our skilled professionals deliver the same standard of excellence that defines every WiCare brand. One trusted partner handles it all.',
    features: ['Landscaping & gardening', 'Construction projects', 'Handyman services', 'Property maintenance', 'Elite pet valet & walks', 'Plant care & botanical expertise', 'Leaf dusting & precision watering'],
    details: ['Vetted, licensed professionals for every service', 'Full project management from concept to completion', 'Expert plant care for luxury indoor greenery', 'GPS-tracked pet walks with photo updates', 'Transparent, fixed-price quotes'],
  },
]
