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
    longDescription: 'WiClean is our flagship service — the foundation of the WiCare Group. We provide premium residential cleaning for CEOs, executives, and high-net-worth individuals across Copenhagen. Every detail is handled with discretion, precision, and an uncompromising commitment to quality. Our teams are fully insured, background-checked, and trained to a white-glove standard.',
    features: ['Private residences & estates', 'CEO-ready workspaces', 'White-glove finish', 'Smart product selection', 'Background-checked staff', 'Fully insured'],
    details: ['Serving Copenhagen\'s most discerning clients since 2016', 'Thoughtfully selected products — balanced for safety and efficacy', 'Flexible scheduling — mornings, evenings, weekends', 'Dedicated team assigned to your property'],
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
    longDescription: 'WiHelp is your comprehensive solution for property and lifestyle needs. From expert landscaping and garden design to construction projects, handyman repairs, elite pet valet services, and specialized plant care — our skilled professionals deliver the same standard of excellence that defines every WiCare brand. One trusted partner handles it all.',
    features: ['Landscaping & gardening', 'Construction projects', 'Handyman services', 'Property maintenance', 'Elite pet valet & walks', 'Paw care & hygiene', 'Plant care & botanical expertise', 'Leaf dusting & precision watering'],
    details: ['Vetted, licensed professionals for every service', 'Full project management from concept to completion', 'Same-day service for urgent repairs', 'Expert plant care for luxury indoor greenery', 'GPS-tracked pet walks with photo updates', 'Transparent, fixed-price quotes'],
  },
  {
    slug: 'wi-shine',
    name: 'WiShine',
    subtitle: 'Executive Vehicle Detailing',
    description: 'On-site waterless car care while you work. Exterior wash, premium leather conditioning, dashboard sanitization, and interior vacuuming.',
    longDescription: 'WiShine brings the car detailer to you. While our team is inside your home cleaning, a certified auto-care specialist works on your vehicle in the driveway or garage. Waterless exterior wash technology means no mess, no noise, and a showroom-quality finish. Premium leather conditioning protects your investment, and interior sanitization ensures every surface is spotless.',
    features: ['Waterless exterior wash', 'Leather conditioning', 'Dashboard sanitization', 'Interior vacuuming', 'Clay bar treatment', 'Headlight restoration'],
    details: ['On-site service — no drop-off needed', 'Waterless technology — zero mess', 'Premium Saphir leather care products', 'Concurrent with WiClean or WiHelp visit'],
  },
  {
    slug: 'wi-wardrobe',
    name: 'WiWardrobe',
    subtitle: 'Garment & Shoe Valet',
    description: 'Professional shoe shining, luxury sneaker cleaning, lint-rolling bespoke suits, and dry-cleaning logistics. Your wardrobe, perfectly maintained.',
    longDescription: 'WiWardrobe ensures your wardrobe is always presentation-ready. Our valets professionally shine dress shoes, clean luxury sneakers, lint-roll bespoke suits, and manage the entire dry-cleaning cycle — collecting garments in branded bags, coordinating with our partner cleaner, and returning them directly to your closet.',
    features: ['Shoe shining & care', 'Sneaker cleaning', 'Suit lint-rolling', 'Dry-cleaning logistics', 'Garment organization', 'Seasonal rotation'],
    details: ['Premium Saphir shoe care products', 'Branded garment bags for dry-cleaning', 'Closet organization included', 'Zero travel — staff is already on-site'],
  },
  {
    slug: 'wi-scent',
    name: 'WiScent',
    subtitle: 'Ambient Atmosphere Management',
    description: 'Luxury scent management for a 5-star home experience. Refilling premium reed diffusers, swapping essential oils, and replacing air purifier filters.',
    longDescription: 'WiScent transforms your home into a sanctuary of curated fragrance. Our team manages every aspect of your ambient atmosphere — refilling luxury reed diffusers (Baobab, Dr. Vranjes), swapping essential oils in smart diffusers, and replacing air purifier filters so your home smells perfectly fresh the moment you walk in.',
    features: ['Reed diffuser refills', 'Essential oil swaps', 'Air purifier filters', 'Fragrance consultation', 'Seasonal scent rotation', 'Smart diffuser setup'],
    details: ['Premium fragrance brands marked up 30-50%', 'Seasonal rotation — fresh scents for every season', '5-minute touch-up during any visit', 'Personalized fragrance profile per room'],
  },
  {
    slug: 'wi-device',
    name: 'WiDevice',
    subtitle: 'Tech Sanitization & Cable Management',
    description: 'Medical-grade UV sanitization and microfiber screen-cleaning for all laptops, tablets, and remotes. Loose cables wrapped with premium leather ties.',
    longDescription: 'WiDevice tackles the tech clutter that standard cleaning avoids. Our specialists use medical-grade UV wands to sanitize every device you touch — phones, tablets, laptops, TV remotes — then clean screens with premium microfiber cloths. We finish by neatly bundling loose charging cables with Italian leather ties, transforming your desk and nightstand.',
    features: ['UV device sanitization', 'Screen cleaning', 'Leather cable ties', 'Remote sanitization', 'Keyboard cleaning', 'Charging station organization'],
    details: ['Medical-grade UV-C sanitization', 'Screen-safe cleaning solutions', 'Italian leather cable ties included', 'Perfect for home offices and media rooms'],
  },
]
