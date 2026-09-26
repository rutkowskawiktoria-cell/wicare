// Local area (town) landing pages for SEO — target "[service] + [town]" searches
// in the northern suburbs of Copenhagen. Each area has UNIQUE bilingual copy to
// avoid thin/duplicate "doorway" content.

export interface Area {
  slug: string;   // ASCII, URL-safe
  name: string;   // Display name (same DA/EN)
  postal: string; // Primary postal code (for LocalBusiness areaServed)
  municipality: string; // Kommune (groups the homepage map list)
  geo: [number, number]; // approx. town centre (lat, lon) for the illustrative coast map
  nearby: string[]; // slugs of neighbouring areas for internal linking
  da: { intro: string; body: string };
  en: { intro: string; body: string };
}

export const areas: Area[] = [
  {
    slug: 'hellerup',
    name: 'Hellerup',
    postal: '2900',
    municipality: 'Gentofte',
    geo: [55.7315, 12.571],
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
    slug: 'skovshoved',
    name: 'Skovshoved',
    postal: '2920',
    municipality: 'Gentofte',
    geo: [55.76, 12.589],
    nearby: ['charlottenlund', 'klampenborg', 'hellerup'],
    da: {
      intro: 'WiCare leverer diskret VIP-rengøring, privat madlavning og havepleje i Skovshoved – til villaerne langs Strandvejen og husene i den gamle fiskerlandsby.',
      body: 'Omkring Skovshoved Havn og de smalle stræder i den gamle bydel betyder detaljen alt. Vi tilbyder grundig hjemmerengøring, en privat kok til middagen med havudsigt og løbende pasning af haven – samlet i én aftale med et fast team. Charlottenlund og Klampenborg ligger lige om hjørnet.',
    },
    en: {
      intro: 'WiCare provides discreet VIP cleaning, private dining and garden care in Skovshoved — for the villas along Strandvejen and the houses of the old fishing village.',
      body: 'Around Skovshoved Harbour and the narrow lanes of the old village, details matter. We offer thorough home cleaning, a private chef for a dinner with a sea view and ongoing garden care — all in one agreement with a dedicated team. Charlottenlund and Klampenborg are just around the corner.',
    },
  },
  {
    slug: 'charlottenlund',
    name: 'Charlottenlund',
    postal: '2920',
    municipality: 'Gentofte',
    geo: [55.752, 12.578],
    nearby: ['hellerup', 'skovshoved', 'ordrup', 'klampenborg'],
    da: {
      intro: 'I Charlottenlund tilbyder WiCare VIP-hjemmerengøring, privat kok og komplet ejendoms- og havepleje. Vi passer store villahaver og herskabslejligheder med samme omhu og præcision.',
      body: 'Bor du nær Charlottenlund Slotshave eller Skovshoved Havn, kender vi områdets ejendomme godt. Vi kombinerer rengøring, havearbejde og byggeopgaver til én fast aftale, så du kun har én kontakt for hele hjemmet. Nabobyerne Hellerup og Klampenborg dækkes lige så nemt.',
    },
    en: {
      intro: 'In Charlottenlund, WiCare offers VIP home cleaning, a private chef and complete property and garden care. We look after large villa gardens and stately apartments with the same care and precision.',
      body: 'Whether you live near Charlottenlund Palace Park or Skovshoved Harbour, we know the area’s properties well. We combine cleaning, gardening and construction work into a single standing agreement, so you have just one contact for the whole home. Neighbouring Hellerup and Klampenborg are covered just as easily.',
    },
  },
  {
    slug: 'ordrup',
    name: 'Ordrup',
    postal: '2920',
    municipality: 'Gentofte',
    geo: [55.764, 12.556],
    nearby: ['charlottenlund', 'jaegersborg', 'gentofte'],
    da: {
      intro: 'I Ordrup tilbyder WiCare VIP-hjemmerengøring, privat kok og ejendoms- og havepleje til områdets villaer og herskabelige ejendomme.',
      body: 'Mellem Ordrup Krat og kunstmuseet Ordrupgaard ligger nogle af de mest velholdte villaer nord for byen. Vi sørger for, at hjemmet altid står skarpt – med ugentlig rengøring, catering til private selskaber og fast havepleje. Vi dækker også Charlottenlund og Jægersborg.',
    },
    en: {
      intro: 'In Ordrup, WiCare offers VIP home cleaning, a private chef and property and garden care for the area’s villas and stately homes.',
      body: 'Between Ordrup Krat and the Ordrupgaard art museum lie some of the best-kept villas north of the city. We keep the home immaculate — with weekly cleaning, catering for private gatherings and regular garden care. We also cover Charlottenlund and Jægersborg.',
    },
  },
  {
    slug: 'klampenborg',
    name: 'Klampenborg',
    postal: '2930',
    municipality: 'Gentofte',
    geo: [55.769, 12.59],
    nearby: ['charlottenlund', 'skovshoved', 'taarbaek', 'skodsborg'],
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
    municipality: 'Gentofte',
    geo: [55.748, 12.551],
    nearby: ['hellerup', 'jaegersborg', 'ordrup', 'charlottenlund'],
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
    slug: 'jaegersborg',
    name: 'Jægersborg',
    postal: '2820',
    municipality: 'Gentofte',
    geo: [55.761, 12.524],
    nearby: ['gentofte', 'kongens-lyngby', 'ordrup'],
    da: {
      intro: 'WiCare betjener Jægersborg med diskret hjemmerengøring, privat madlavning og havepleje til villaer og familieboliger omkring Jægersborg Allé.',
      body: 'Travle familier i Jægersborg får én fast partner til rengøring, madlavning og haven, så hverdagen og weekenden kan bruges på det, der betyder mest. Vi planlægger fleksibelt – morgen, aften eller weekend – og dækker også Gentofte og Kongens Lyngby.',
    },
    en: {
      intro: 'WiCare serves Jægersborg with discreet home cleaning, private dining and garden care for villas and family homes around Jægersborg Allé.',
      body: 'Busy families in Jægersborg get one dedicated partner for cleaning, cooking and the garden, so weekdays and weekends can be spent on what matters most. We schedule flexibly — morning, evening or weekend — and also cover Gentofte and Kongens Lyngby.',
    },
  },
  {
    slug: 'kongens-lyngby',
    name: 'Kongens Lyngby',
    postal: '2800',
    municipality: 'Lyngby-Taarbæk',
    geo: [55.77, 12.503],
    nearby: ['sorgenfri', 'virum', 'jaegersborg'],
    da: {
      intro: 'WiCare leverer VIP-hjemmerengøring, privat madlavning og ejendoms- og havepleje til hjem og virksomheder i Kongens Lyngby.',
      body: 'Fra villaerne ved Lyngby Sø til lejlighederne omkring Lyngby Hovedgade skræddersyr vi rengøring, catering og havearbejde til dit hjem. Ét fast team og én kontakt – også i Sorgenfri og Virum.',
    },
    en: {
      intro: 'WiCare provides VIP home cleaning, private dining and property and garden care for homes and businesses in Kongens Lyngby.',
      body: 'From the villas by Lyngby Lake to the apartments around Lyngby Hovedgade, we tailor cleaning, catering and gardening to your home. One dedicated team and one contact — in Sorgenfri and Virum too.',
    },
  },
  {
    slug: 'sorgenfri',
    name: 'Sorgenfri',
    postal: '2800',
    municipality: 'Lyngby-Taarbæk',
    geo: [55.781, 12.481],
    nearby: ['kongens-lyngby', 'virum', 'holte'],
    da: {
      intro: 'I Sorgenfri tilbyder WiCare diskret hjemmerengøring, privat kok og havepleje til villaer med store, grønne grunde.',
      body: 'Omkring Sorgenfri Slot, Mølleåen og Frilandsmuseet ligger haver, der skal passes med omhu. Vi samler rengøring, havearbejde og byggeopgaver i én aftale, så du kun har ét nummer at ringe til. Vi dækker også Kongens Lyngby og Virum.',
    },
    en: {
      intro: 'In Sorgenfri, WiCare offers discreet home cleaning, a private chef and garden care for villas with large, green plots.',
      body: 'Around Sorgenfri Palace, the Mølleå river and the Open Air Museum are gardens that need careful tending. We combine cleaning, gardening and construction work into one agreement, so you only have one number to call. We also cover Kongens Lyngby and Virum.',
    },
  },
  {
    slug: 'virum',
    name: 'Virum',
    postal: '2830',
    municipality: 'Lyngby-Taarbæk',
    geo: [55.796, 12.473],
    nearby: ['sorgenfri', 'holte', 'kongens-lyngby'],
    da: {
      intro: 'WiCare betjener Virum med VIP-rengøring, privat madlavning og havepleje til villaer tæt på Furesøen og Frederiksdal.',
      body: 'Virums villakvarterer og store haver passer vi med samme præcision som hjemmet indenfor: grundig rengøring, vinduespudsning, hækklipning og en kok til de særlige aftener. Holte og Sorgenfri betjenes også.',
    },
    en: {
      intro: 'WiCare serves Virum with VIP cleaning, private dining and garden care for villas close to Lake Furesø and Frederiksdal.',
      body: 'We tend Virum’s villa neighbourhoods and large gardens with the same precision as the home inside: thorough cleaning, window cleaning, hedge trimming and a chef for special evenings. Holte and Sorgenfri are served too.',
    },
  },
  {
    slug: 'taarbaek',
    name: 'Taarbæk',
    postal: '2930',
    municipality: 'Lyngby-Taarbæk',
    geo: [55.788, 12.595],
    nearby: ['klampenborg', 'skodsborg', 'kongens-lyngby'],
    da: {
      intro: 'I Taarbæk leverer WiCare VIP-rengøring, privat kok og havepleje til husene mellem Dyrehaven og Øresund.',
      body: 'Den lille havneby er omgivet af skov og vand – og husene kræver pleje året rundt. Vi tager os af rengøring, vinduer og haven og sender gerne en privat kok, når der er gæster. Klampenborg og Skodsborg dækkes lige så nemt.',
    },
    en: {
      intro: 'In Taarbæk, WiCare provides VIP cleaning, a private chef and garden care for the homes between the Deer Park and the Øresund.',
      body: 'This small harbour village is surrounded by forest and sea — and its houses need care all year round. We look after cleaning, windows and the garden, and are happy to send a private chef when you have guests. Klampenborg and Skodsborg are covered just as easily.',
    },
  },
  {
    slug: 'holte',
    name: 'Holte',
    postal: '2840',
    municipality: 'Rudersdal',
    geo: [55.811, 12.47],
    nearby: ['soelleroed', 'virum', 'birkeroed', 'hoersholm'],
    da: {
      intro: 'WiCare dækker Holte og Rudersdal med diskret hjemmerengøring, privat madlavning og komplet havepleje til villaer og store grunde.',
      body: 'Rudersdals store haver og villaer kræver en partner, der kan koordinere havearbejde, byggeopgaver og rengøring under ét. Det gør vi – med faste teams, transparente priser og fokus på detaljen. Vi betjener også Hørsholm og Vedbæk.',
    },
    en: {
      intro: 'WiCare covers Holte and Rudersdal with discreet home cleaning, private dining and complete garden care for villas and large plots.',
      body: 'Rudersdal’s large gardens and villas call for a partner who can coordinate landscaping, construction work and cleaning under one roof. That’s what we do — with dedicated teams, transparent pricing and an eye for detail. We also serve Hørsholm and Vedbæk.',
    },
  },
  {
    slug: 'soelleroed',
    name: 'Søllerød',
    postal: '2840',
    municipality: 'Rudersdal',
    geo: [55.816, 12.505],
    nearby: ['holte', 'naerum', 'birkeroed'],
    da: {
      intro: 'I Søllerød leverer WiCare diskret VIP-rengøring, privat kok og komplet ejendoms- og havepleje til landsbyens villaer og landejendomme.',
      body: 'Omkring Søllerød Kirke, Søllerød Kro og Søllerød Sø ligger både historiske huse og moderne villaer – og begge fortjener en partner med øje for detaljen. Vi står for rengøring, havearbejde og catering og dækker også Holte og Nærum.',
    },
    en: {
      intro: 'In Søllerød, WiCare provides discreet VIP cleaning, a private chef and complete property and garden care for the village’s villas and country homes.',
      body: 'Around Søllerød Church, Søllerød Kro and Lake Søllerød you’ll find historic houses and modern villas alike — and both deserve a partner with an eye for detail. We handle cleaning, gardening and catering, and also cover Holte and Nærum.',
    },
  },
  {
    slug: 'naerum',
    name: 'Nærum',
    postal: '2850',
    municipality: 'Rudersdal',
    geo: [55.817, 12.537],
    nearby: ['soelleroed', 'skodsborg', 'holte'],
    da: {
      intro: 'WiCare tilbyder VIP-hjemmerengøring, privat madlavning og havepleje i Nærum – tæt på Jægersborg Hegn og Øresundskysten.',
      body: 'Nærums villaveje og rækkehuse får en fast partner, der kender standarden: grundig rengøring, hjælp til haven og en kok, når familien fejrer noget. Vi betjener også Søllerød og Skodsborg.',
    },
    en: {
      intro: 'WiCare offers VIP home cleaning, private dining and garden care in Nærum — close to the Jægersborg Hegn forest and the Øresund coast.',
      body: 'Nærum’s villa streets and townhouses get a dedicated partner who knows the standard: thorough cleaning, help in the garden and a chef when the family is celebrating. We also serve Søllerød and Skodsborg.',
    },
  },
  {
    slug: 'skodsborg',
    name: 'Skodsborg',
    postal: '2942',
    municipality: 'Rudersdal',
    geo: [55.825, 12.572],
    nearby: ['klampenborg', 'taarbaek', 'naerum', 'vedbaek'],
    da: {
      intro: 'WiCare dækker Skodsborg med diskret hjemmerengøring, privat madlavning og havepleje til kyst- og skovnære ejendomme.',
      body: 'Mellem Skodsborg Strand og Rude Skov leverer vi en ensartet, høj standard – uanset om det er rengøring, en kok til aftenen eller pasning af haven. Vi betjener også Klampenborg og Vedbæk.',
    },
    en: {
      intro: 'WiCare covers Skodsborg with discreet home cleaning, private dining and garden care for coastal and woodland properties.',
      body: 'Between Skodsborg Beach and Rude Forest we deliver a consistent, high standard — whether it’s cleaning, a chef for the evening or tending the garden. We also serve Klampenborg and Vedbæk.',
    },
  },
  {
    slug: 'vedbaek',
    name: 'Vedbæk',
    postal: '2950',
    municipality: 'Rudersdal',
    geo: [55.853, 12.565],
    nearby: ['rungsted', 'skodsborg', 'holte'],
    da: {
      intro: 'I Vedbæk tilbyder WiCare VIP-rengøring, privat kok og komplet ejendoms- og havepleje til hjem nær kysten.',
      body: 'Vedbæks strandnære villaer fortjener en betroet partner til rengøring, havearbejde og byggeopgaver. Vi samler det hele i én aftale med faste teams og klare priser. Skodsborg og Rungsted betjenes lige så nemt.',
    },
    en: {
      intro: 'In Vedbæk, WiCare offers VIP cleaning, a private chef and complete property and garden care for homes near the coast.',
      body: 'Vedbæk’s seaside villas deserve a trusted partner for cleaning, gardening and construction work. We bring it all into one agreement with dedicated teams and clear pricing. Skodsborg and Rungsted are served just as easily.',
    },
  },
  {
    slug: 'birkeroed',
    name: 'Birkerød',
    postal: '3460',
    municipality: 'Rudersdal',
    geo: [55.847, 12.428],
    nearby: ['holte', 'alleroed', 'hoersholm'],
    da: {
      intro: 'I Birkerød leverer WiCare VIP-rengøring, privat kok og ejendoms- og havepleje til villaer og landejendomme.',
      body: 'Fra villaerne ved Birkerød Sø til ejendommene ud mod Rude Skov og Sjælsø tager vi os af hjem og have med samme omhu. Én aftale dækker rengøring, havearbejde og catering. Holte og Allerød dækkes også.',
    },
    en: {
      intro: 'In Birkerød, WiCare provides VIP cleaning, a private chef and property and garden care for villas and country properties.',
      body: 'From the villas by Lake Birkerød to the properties bordering Rude Forest and Lake Sjælsø, we look after home and garden with the same care. One agreement covers cleaning, gardening and catering. Holte and Allerød are covered too.',
    },
  },
  {
    slug: 'hoersholm',
    name: 'Hørsholm',
    postal: '2970',
    municipality: 'Hørsholm',
    geo: [55.881, 12.501],
    nearby: ['rungsted', 'alleroed', 'birkeroed', 'vedbaek'],
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
    municipality: 'Hørsholm',
    geo: [55.884, 12.54],
    nearby: ['hoersholm', 'vedbaek', 'skodsborg'],
    da: {
      intro: 'WiCare betjener Rungsted og Rungsted Kyst med diskret hjemmerengøring, privat madlavning og havepleje til strandvejsvillaer og lejligheder.',
      body: 'Langs Rungsted Havn og Strandvejen leverer vi white-glove rengøring, vores private kok til middage og fuld havepleje – med den diskretion, områdets beboere forventer. Vi dækker også Hørsholm og Vedbæk.',
    },
    en: {
      intro: 'WiCare serves Rungsted and Rungsted Kyst with discreet home cleaning, private dining and garden care for Strandvejen villas and apartments.',
      body: 'Along Rungsted Harbour and Strandvejen we provide white-glove cleaning, our private chef for dinners and full garden care — with the discretion residents expect. We also cover Hørsholm and Vedbæk.',
    },
  },
  {
    slug: 'alleroed',
    name: 'Allerød',
    postal: '3450',
    municipality: 'Allerød',
    geo: [55.871, 12.357],
    nearby: ['birkeroed', 'hoersholm'],
    da: {
      intro: 'WiCare betjener Allerød og Lillerød med diskret hjemmerengøring, privat madlavning og havepleje til villaer og større grunde.',
      body: 'Allerøds villaer og landejendomme ligger tæt på skov og sø – og kræver en partner, der kan tage sig af både hus og have. Vi samler rengøring, havearbejde og byggeopgaver i én fast aftale. Birkerød og Hørsholm betjenes også.',
    },
    en: {
      intro: 'WiCare serves Allerød and Lillerød with discreet home cleaning, private dining and garden care for villas and larger plots.',
      body: 'Allerød’s villas and country properties sit close to forest and lakes — and need a partner who can look after both house and garden. We combine cleaning, gardening and construction work into one standing agreement. Birkerød and Hørsholm are served too.',
    },
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

// Commercial / office cleaning ("erhvervsrengøring") copy per town.
// Added Sept 2026: Search Console showed "erhvervsrengøring <town>" is the single
// biggest NON-BRAND query driving impressions (Holte 169, Skodsborg 81). Kept unique
// per town to avoid duplicate content across the area pages.
export const areaBusiness: Record<string, { da: string; en: string }> = {
  hellerup: {
    da: 'Vi løser også erhvervsrengøring i Hellerup — kontorer, klinikker og showrooms, fra virksomhederne omkring Tuborg Havn til de mindre kontorfællesskaber langs Strandvejen. Fast skema, diskret personale og rengøring uden for åbningstid, hvis det passer jer bedre.',
    en: 'We also handle commercial cleaning in Hellerup — offices, clinics and showrooms, from the companies around Tuborg Harbour to smaller office suites along Strandvejen. Fixed schedules, discreet staff and out-of-hours cleaning if that suits you better.',
  },
  charlottenlund: {
    da: 'Erhvervsrengøring i Charlottenlund dækker kontorer, klinikker og butikslokaler. Vi tilpasser frekvens og tidspunkt, så rengøringen aldrig forstyrrer jeres kunder eller patienter.',
    en: 'Commercial cleaning in Charlottenlund covers offices, clinics and retail spaces. We adapt the frequency and timing so cleaning never disturbs your customers or patients.',
  },
  klampenborg: {
    da: 'I Klampenborg løser vi erhvervsrengøring for kontorer, restauranter og mindre virksomheder nær Bakken og Bellevue. Høj standard, faste teams og fleksible tider før eller efter åbningstid.',
    en: 'In Klampenborg we handle commercial cleaning for offices, restaurants and smaller businesses near Bakken and Bellevue. A high standard, dedicated teams and flexible hours before or after opening.',
  },
  gentofte: {
    da: 'Erhvervsrengøring i Gentofte omfatter kontorer, klinikker og fællesarealer. Vi leverer fast kontorrengøring med det samme team hver gang, så I altid ved, hvem der kommer.',
    en: 'Commercial cleaning in Gentofte covers offices, clinics and shared areas. We provide regular office cleaning with the same team every time, so you always know who is coming.',
  },
  holte: {
    da: 'Erhvervsrengøring i Holte er en af vores mest efterspurgte services — kontorer, klinikker og liberale erhverv i hele Rudersdal. Vi kører fast kontorrengøring om aftenen eller tidligt om morgenen, så jeres arbejdsdag ikke forstyrres.',
    en: 'Commercial cleaning in Holte is one of our most requested services — offices, clinics and professional practices across Rudersdal. We run scheduled office cleaning in the evening or early morning so your workday is never interrupted.',
  },
  hoersholm: {
    da: 'Vi står for erhvervsrengøring i Hørsholm for kontorer, klinikker og virksomheder i og omkring erhvervsområderne. Fast frekvens, tydelige aftaler og baggrundstjekket personale.',
    en: 'We handle commercial cleaning in Hørsholm for offices, clinics and companies in and around the business districts. Set frequency, clear agreements and background-checked staff.',
  },
  rungsted: {
    da: 'Erhvervsrengøring i Rungsted dækker kontorer, klinikker og virksomhederne omkring Rungsted Havn. Vi arbejder diskret og uden for åbningstid, når det er nødvendigt.',
    en: 'Commercial cleaning in Rungsted covers offices, clinics and the businesses around Rungsted Harbour. We work discreetly and outside opening hours whenever needed.',
  },
  vedbaek: {
    da: 'I Vedbæk tilbyder vi erhvervsrengøring til kontorer, klinikker og mindre virksomheder. Fast team, klare priser og mulighed for rengøring, før medarbejderne møder ind.',
    en: 'In Vedbæk we offer commercial cleaning for offices, clinics and smaller businesses. A dedicated team, clear pricing and the option to clean before staff arrive.',
  },
  skodsborg: {
    da: 'Erhvervsrengøring i Skodsborg omfatter kontorer, klinikker samt hotel- og wellnessmiljøer langs kysten. Vi leverer en ensartet, høj standard — også i weekender og uden for normal arbejdstid.',
    en: 'Commercial cleaning in Skodsborg covers offices, clinics and the hotel and wellness venues along the coast. We deliver a consistent, high standard — including weekends and outside normal hours.',
  },
  skovshoved: {
    da: 'Vi løser også erhvervsrengøring i Skovshoved – for kontorer, klinikker og restauranter omkring havnen og Strandvejen. Rengøringen planlægges uden for åbningstid, så gæster og kunder aldrig mærker den.',
    en: 'We also handle commercial cleaning in Skovshoved — offices, clinics and restaurants around the harbour and Strandvejen. Cleaning is scheduled outside opening hours so guests and customers never notice it.',
  },
  ordrup: {
    da: 'Erhvervsrengøring i Ordrup omfatter kontorer, klinikker og butikkerne langs Ordrup Jagtvej. Vi arbejder med faste teams og på tidspunkter, der passer til jeres åbningstider.',
    en: 'Commercial cleaning in Ordrup covers offices, clinics and the shops along Ordrup Jagtvej. We work with dedicated teams and at times that fit your opening hours.',
  },
  jaegersborg: {
    da: 'Erhvervsrengøring i Jægersborg dækker kontorer, klinikker og virksomhederne langs Jægersborg Allé og Lyngbyvej. Fast kontorrengøring med samme team hver gang og klare aftaler.',
    en: 'Commercial cleaning in Jægersborg covers offices, clinics and the businesses along Jægersborg Allé and Lyngbyvej. Regular office cleaning with the same team each time and clear agreements.',
  },
  taarbaek: {
    da: 'Vi tilbyder også erhvervsrengøring i Taarbæk til restauranter, klinikker og mindre kontorer ved havnen og Strandvejen – diskret og uden for åbningstid.',
    en: 'We also offer commercial cleaning in Taarbæk for restaurants, clinics and small offices by the harbour and Strandvejen — discreetly and outside opening hours.',
  },
  'kongens-lyngby': {
    da: 'Erhvervsrengøring i Kongens Lyngby er oplagt for kontorer, klinikker og virksomheder i bymidten og erhvervsområderne. Vi gør rent før eller efter arbejdstid, med faste teams og tydelige aftaler.',
    en: 'Commercial cleaning in Kongens Lyngby suits offices, clinics and companies in the town centre and business districts. We clean before or after working hours, with dedicated teams and clear agreements.',
  },
  sorgenfri: {
    da: 'Erhvervsrengøring i Sorgenfri dækker kontorer, klinikker og mindre virksomheder. Vi leverer fast rengøring med det samme team, så kvaliteten er ens fra gang til gang.',
    en: 'Commercial cleaning in Sorgenfri covers offices, clinics and smaller businesses. We deliver regular cleaning with the same team, so the quality is the same on every visit.',
  },
  virum: {
    da: 'Vi løser erhvervsrengøring i Virum for kontorer, klinikker og liberale erhverv. Rengøringen lægges tidligt om morgenen eller om aftenen, så jeres dag kører uforstyrret.',
    en: 'We handle commercial cleaning in Virum for offices, clinics and professional practices. Cleaning is scheduled early in the morning or in the evening so your day runs undisturbed.',
  },
  soelleroed: {
    da: 'Erhvervsrengøring i Søllerød omfatter kontorer, klinikker og restauranter. Vi tilpasser frekvensen til jeres behov og arbejder diskret uden for åbningstid.',
    en: 'Commercial cleaning in Søllerød covers offices, clinics and restaurants. We adapt the frequency to your needs and work discreetly outside opening hours.',
  },
  naerum: {
    da: 'I Nærum løser vi erhvervsrengøring for kontorer og virksomheder i erhvervsområdet samt klinikker og butikker i centret. Fast skema og baggrundstjekket personale.',
    en: 'In Nærum we handle commercial cleaning for offices and companies in the business park as well as clinics and shops in the centre. Fixed schedules and background-checked staff.',
  },
  birkeroed: {
    da: 'Erhvervsrengøring i Birkerød dækker kontorer, klinikker og virksomheder i bymidten og erhvervsområderne. Vi gør rent, når det passer jer – før, efter eller mellem arbejdstiderne.',
    en: 'Commercial cleaning in Birkerød covers offices, clinics and companies in the town centre and business districts. We clean when it suits you — before, after or between working hours.',
  },
  alleroed: {
    da: 'Vi løser erhvervsrengøring i Allerød for kontorer, klinikker og virksomheder i erhvervsområderne og bymidten. Faste teams, faste tider og ingen overraskelser.',
    en: 'We handle commercial cleaning in Allerød for offices, clinics and companies in the business districts and the town centre. Dedicated teams, fixed times and no surprises.',
  },
};
