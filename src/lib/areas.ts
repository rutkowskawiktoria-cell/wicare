// Local area (town) landing pages for SEO — target "[service] + [town]" searches
// in the northern suburbs of Copenhagen. Each area has UNIQUE bilingual copy to
// avoid thin/duplicate "doorway" content.

export interface Area {
  slug: string;   // ASCII, URL-safe
  name: string;   // Display name (same DA/EN)
  postal: string; // Primary postal code (for LocalBusiness areaServed)
  nearby: string[]; // slugs of neighbouring areas for internal linking
  da: { intro: string; body: string };
  en: { intro: string; body: string };
}

export const areas: Area[] = [
  {
    slug: 'hellerup',
    name: 'Hellerup',
    postal: '2900',
    nearby: ['charlottenlund', 'gentofte', 'klampenborg'],
    da: {
      intro: 'WiCare leverer diskret VIP-rengøring, privat madlavning og havepleje til hjem og virksomheder i Hellerup. Vores baggrundstjekkede team kender Strandvejens villaer og lejligheder og arbejder efter dine standarder – hvert besøg.',
      body: 'Fra white-glove hjemmerengøring i en penthouse ved Tuborg Havn til en privat kok til middagsselskabet eller løbende havepleje af villahaven på Onsgårdsvej: én betroet partner håndterer det hele i Hellerup og nabokvartererne Charlottenlund og Gentofte. Ring, så aftaler vi et uforpligtende besøg.',
    },
    en: {
      intro: 'WiCare provides discreet VIP cleaning, private dining and garden care for homes and businesses in Hellerup. Our background-checked team knows the villas and apartments along Strandvejen and works to your standards on every visit.',
      body: 'From white-glove home cleaning in a penthouse by Tuborg Harbour to a private chef for your dinner party or ongoing garden care for a villa: one trusted partner handles it all across Hellerup and neighbouring Charlottenlund and Gentofte. Call us to arrange a no-obligation visit.',
    },
  },
  {
    slug: 'charlottenlund',
    name: 'Charlottenlund',
    postal: '2920',
    nearby: ['hellerup', 'klampenborg', 'gentofte'],
    da: {
      intro: 'I Charlottenlund tilbyder WiCare VIP-hjemmerengøring, privat kok og komplet ejendoms- og havepleje. Vi passer store villahaver og herskabslejligheder med samme omhu og præcision.',
      body: 'Bor du nær Charlottenlund Slotshave eller Skovshoved Havn, kender vi områdets ejendomme godt. Vi kombinerer rengøring, handyman-opgaver og havearbejde til én fast aftale, så du kun har én kontakt for hele hjemmet. Nabobyerne Hellerup og Klampenborg dækkes lige så nemt.',
    },
    en: {
      intro: 'In Charlottenlund, WiCare offers VIP home cleaning, a private chef and complete property and garden care. We look after large villa gardens and stately apartments with the same care and precision.',
      body: 'Whether you live near Charlottenlund Palace Park or Skovshoved Harbour, we know the area’s properties well. We combine cleaning, handyman work and gardening into a single standing agreement, so you have just one contact for the whole home. Neighbouring Hellerup and Klampenborg are covered just as easily.',
    },
  },
  {
    slug: 'klampenborg',
    name: 'Klampenborg',
    postal: '2930',
    nearby: ['charlottenlund', 'skodsborg', 'hellerup'],
    da: {
      intro: 'WiCare betjener Klampenborg og Bakken-området med diskret rengøring, privat madlavning og havepleje til villaer og strandnære ejendomme.',
      body: 'Tæt på Dyrehaven og Bellevue Strand stiller vi høje krav til diskretion og finish. Uanset om det er ugentlig hjemmerengøring, en kok til sommerfesten eller vedligeholdelse af haven, leverer vi en ensartet standard. Vi dækker også Skodsborg og Charlottenlund.',
    },
    en: {
      intro: 'WiCare serves Klampenborg and the Bakken area with discreet cleaning, private dining and garden care for villas and seafront properties.',
      body: 'Close to the Deer Park and Bellevue Beach, we hold ourselves to high standards of discretion and finish. Whether it’s weekly home cleaning, a chef for a summer party or garden maintenance, we deliver a consistent standard. We also cover Skodsborg and Charlottenlund.',
    },
  },
  {
    slug: 'gentofte',
    name: 'Gentofte',
    postal: '2820',
    nearby: ['hellerup', 'charlottenlund'],
    da: {
      intro: 'I Gentofte kommune tilbyder WiCare VIP-rengøring, privat kok og ejendoms- og havepleje til private hjem, kontorer og virksomheder.',
      body: 'Vi hjælper familier og virksomheder i Gentofte, Vangede og Dyssegård med alt fra grundig hjemmerengøring og vinduespudsning til catering og løbende havearbejde. Fleksibel planlægning morgen, aften og weekend – tilpasset din hverdag.',
    },
    en: {
      intro: 'In Gentofte municipality, WiCare offers VIP cleaning, a private chef and property and garden care for private homes, offices and businesses.',
      body: 'We help families and businesses across Gentofte, Vangede and Dyssegård with everything from thorough home cleaning and window cleaning to catering and ongoing gardening. Flexible scheduling mornings, evenings and weekends — fitted around your routine.',
    },
  },
  {
    slug: 'holte',
    name: 'Holte',
    postal: '2840',
    nearby: ['hoersholm', 'skodsborg', 'vedbaek'],
    da: {
      intro: 'WiCare dækker Holte og Rudersdal med diskret hjemmerengøring, privat madlavning og komplet havepleje til villaer og store grunde.',
      body: 'Rudersdals store haver og villaer kræver en partner, der kan koordinere anlægsgartner, handyman og rengøring under ét. Det gør vi – med faste teams, transparente priser og fokus på detaljen. Vi betjener også Hørsholm og Vedbæk.',
    },
    en: {
      intro: 'WiCare covers Holte and Rudersdal with discreet home cleaning, private dining and complete garden care for villas and large plots.',
      body: 'Rudersdal’s large gardens and villas call for a partner who can coordinate landscaping, handyman work and cleaning under one roof. That’s what we do — with dedicated teams, transparent pricing and an eye for detail. We also serve Hørsholm and Vedbæk.',
    },
  },
  {
    slug: 'hoersholm',
    name: 'Hørsholm',
    postal: '2970',
    nearby: ['rungsted', 'holte', 'vedbaek'],
    da: {
      intro: 'I Hørsholm leverer WiCare VIP-rengøring, privat kok og ejendoms- og havepleje til hjem og virksomheder – pålideligt og diskret.',
      body: 'Fra villaerne omkring Hørsholm Slotshave til boliger i Rungsted Kyst tilbyder vi ugentlig rengøring, catering til fejringer og løbende havearbejde. Én aftale, ét team, én kontakt. Nabobyerne Rungsted og Holte dækkes også.',
    },
    en: {
      intro: 'In Hørsholm, WiCare provides VIP cleaning, a private chef and property and garden care for homes and businesses — reliably and discreetly.',
      body: 'From the villas around Hørsholm Palace Garden to homes in Rungsted Kyst, we offer weekly cleaning, catering for celebrations and ongoing gardening. One agreement, one team, one contact. Neighbouring Rungsted and Holte are covered too.',
    },
  },
  {
    slug: 'rungsted',
    name: 'Rungsted',
    postal: '2960',
    nearby: ['hoersholm', 'vedbaek'],
    da: {
      intro: 'WiCare betjener Rungsted og Rungsted Kyst med diskret hjemmerengøring, privat madlavning og havepleje til strandvejsvillaer og lejligheder.',
      body: 'Langs Rungsted Havn og Strandvejen leverer vi white-glove rengøring, private kokke til middage og fuld havepleje – med den diskretion, områdets beboere forventer. Vi dækker også Hørsholm og Vedbæk.',
    },
    en: {
      intro: 'WiCare serves Rungsted and Rungsted Kyst with discreet home cleaning, private dining and garden care for Strandvejen villas and apartments.',
      body: 'Along Rungsted Harbour and Strandvejen we provide white-glove cleaning, private chefs for dinners and full garden care — with the discretion residents expect. We also cover Hørsholm and Vedbæk.',
    },
  },
  {
    slug: 'vedbaek',
    name: 'Vedbæk',
    postal: '2950',
    nearby: ['rungsted', 'skodsborg', 'holte'],
    da: {
      intro: 'I Vedbæk tilbyder WiCare VIP-rengøring, privat kok og komplet ejendoms- og havepleje til hjem nær kysten.',
      body: 'Vedbæks strandnære villaer fortjener en betroet partner til rengøring, havearbejde og handyman-opgaver. Vi samler det hele i én aftale med faste teams og klare priser. Skodsborg og Rungsted betjenes lige så nemt.',
    },
    en: {
      intro: 'In Vedbæk, WiCare offers VIP cleaning, a private chef and complete property and garden care for homes near the coast.',
      body: 'Vedbæk’s seaside villas deserve a trusted partner for cleaning, gardening and handyman work. We bring it all into one agreement with dedicated teams and clear pricing. Skodsborg and Rungsted are served just as easily.',
    },
  },
  {
    slug: 'skodsborg',
    name: 'Skodsborg',
    postal: '2942',
    nearby: ['klampenborg', 'vedbaek', 'holte'],
    da: {
      intro: 'WiCare dækker Skodsborg med diskret hjemmerengøring, privat madlavning og havepleje til kyst- og skovnære ejendomme.',
      body: 'Mellem Skodsborg Strand og Rude Skov leverer vi en ensartet, høj standard – uanset om det er rengøring, en kok til aftenen eller pasning af haven. Vi betjener også Klampenborg og Vedbæk.',
    },
    en: {
      intro: 'WiCare covers Skodsborg with discreet home cleaning, private dining and garden care for coastal and woodland properties.',
      body: 'Between Skodsborg Beach and Rude Forest we deliver a consistent, high standard — whether it’s cleaning, a chef for the evening or tending the garden. We also serve Klampenborg and Vedbæk.',
    },
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
