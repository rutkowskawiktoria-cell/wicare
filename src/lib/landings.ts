// Copy for the catering landing pages: /julefrokost/ and /firmacatering/ (Sept 2026).
// Claims policy (see CLAUDE.md): chef Wiktoria R., 13+ years incl. Michelin-starred restaurants and the
// Danish Parliament; wine pairing, setup/service/cleanup and event planning are confirmed; NO fixed prices,
// NO capacity or lead-time promises — everything is agreed with the customer.

export interface LandingCopy {
  badge: string;
  h1: string;
  intro: string;
  ctaSecondary: string;
  cardsHeading: string;
  cards: { title: string; desc: string }[];
  howHeading: string;
  how: { title: string; desc: string }[];
  menu?: { heading: string; note: string; courses: { title: string; items: string[] }[] };
  moreHeading: string;
  more: { href: string; title: string; desc: string }[];
  areasHeading: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaDesc: string;
}

export type LandingKey = 'julefrokost' | 'firmacatering';

export const landings: Record<LandingKey, { da: LandingCopy; en: LandingCopy }> = {
  julefrokost: {
    da: {
      badge: 'Julefrokost 2026',
      h1: 'Julefrokost med privat kok',
      intro:
        'Firmajulefrokost eller julefrokost derhjemme nord for København. Vores kok laver maden hos jer, så I kan bruge dagen på hinanden. Menu, omfang og pris aftaler vi med jer.',
      ctaSecondary: 'December er travl – ring gerne i god tid',
      cardsHeading: 'Til virksomheder og private',
      cards: [
        { title: 'Firmajulefrokost', desc: 'På kontoret, i kantinen eller i et lejet lokale – fra frokost for teamet til aftenfest for hele virksomheden.' },
        { title: 'Julefrokost derhjemme', desc: 'Til familien eller vennerne i jeres eget hjem. I er værter, vi klarer køkkenet.' },
        { title: 'Vin og servering', desc: 'Vinmenu, servering og oprydning efter aftale, så alt spiller fra første sild til risalamanden.' },
      ],
      howHeading: 'Sådan foregår det',
      how: [
        { title: 'Ring til os', desc: 'Fortæl om datoen, antallet af gæster og jeres ønsker.' },
        { title: 'Vi sammensætter menuen', desc: 'Klassisk dansk eller med et moderne twist – tilpasset allergier og kostbehov.' },
        { title: 'Vi laver maden hos jer', desc: 'Vi står for anretning og servering efter aftale og rydder op bagefter.' },
      ],
      menu: {
        heading: 'Eksempel på en julefrokost',
        note: 'Kun et eksempel – menuen sammensættes altid efter jeres ønsker.',
        courses: [
          { title: 'Kolde retter', items: ['Marinerede sild med karrysalat og æg', 'Varmrøget laks med rygeostcreme', 'Håndpillede rejer med citron og dild'] },
          { title: 'Lune retter', items: ['Flæskesteg med sprød svær og rødkål', 'Hjemmelavede frikadeller', 'Lun leverpostej med bacon og svampe'] },
          { title: 'Dessert', items: ['Risalamande med kirsebærsauce', 'Småkager og kaffe'] },
        ],
      },
      moreHeading: 'Mere fra vores køkken',
      more: [
        { href: '/firmacatering/', title: 'Firmacatering', desc: 'Møder, frokoster og arrangementer hele året.' },
        { href: '/services/the-table/', title: 'Privat middag', desc: 'En privat kok til middagen derhjemme.' },
      ],
      areasHeading: 'Vi kommer til jer i',
      faqHeading: 'Spørgsmål om julefrokost',
      faq: [
        { q: 'Hvornår skal vi booke julefrokosten?', a: 'Jo før, jo bedre. November og december er travle måneder, så ring gerne allerede nu, hvis I har en dato i tankerne.' },
        { q: 'Hvor mange gæster kan I lave mad til?', a: 'Vi tilpasser os jeres selskab – fra en mindre julefrokost derhjemme til firmaets fest. Fortæl os antallet af gæster, så finder vi en løsning.' },
        { q: 'Kan I tage hensyn til allergier og vegetarer?', a: 'Ja. Menuen tilpasses allergier, kostbehov og vegetarer.' },
        { q: 'Hvad koster en julefrokost?', a: 'Prisen afhænger af menu, antal gæster, og om I ønsker servering og vin. Vi aftaler altid prisen med jer, før vi går i gang.' },
        { q: 'Rydder I op bagefter?', a: 'Ja. Vi rydder op i køkkenet efter maden, så I kan nyde festen.' },
      ],
      ctaTitle: 'Book jeres julefrokost',
      ctaDesc: 'Ring til os, så finder vi en dato og en menu, der passer jer.',
    },
    en: {
      badge: 'Christmas 2026',
      h1: 'Danish Christmas lunch with a private chef',
      intro:
        'A company julefrokost or a Christmas lunch at home north of Copenhagen. Our chef cooks at your place, so you can spend the day with your guests. Menu, scope and price are agreed with you.',
      ctaSecondary: 'December gets busy – call early',
      cardsHeading: 'For companies and private hosts',
      cards: [
        { title: 'Company Christmas lunch', desc: 'At the office, in the canteen or at a rented venue – from a team lunch to an evening party for the whole company.' },
        { title: 'Christmas lunch at home', desc: 'For family or friends in your own home. You host, we run the kitchen.' },
        { title: 'Wine and service', desc: 'Wine pairing, service and cleanup by arrangement, from the first herring to the risalamande.' },
      ],
      howHeading: 'How it works',
      how: [
        { title: 'Call us', desc: 'Tell us the date, the number of guests and what you would like.' },
        { title: 'We design the menu', desc: 'Classic Danish or with a modern twist – adapted to allergies and dietary needs.' },
        { title: 'We cook at your place', desc: 'We plate and serve by arrangement, and clean up afterwards.' },
      ],
      menu: {
        heading: 'A sample Christmas lunch',
        note: 'Just an example – the menu is always designed around your wishes.',
        courses: [
          { title: 'Cold dishes', items: ['Marinated herring with curry salad and egg', 'Hot-smoked salmon with smoked-cheese cream', 'Hand-peeled shrimp with lemon and dill'] },
          { title: 'Warm dishes', items: ['Roast pork with crackling and red cabbage', 'Homemade meatballs (frikadeller)', 'Warm liver pâté with bacon and mushrooms'] },
          { title: 'Dessert', items: ['Risalamande with cherry sauce', 'Biscuits and coffee'] },
        ],
      },
      moreHeading: 'More from our kitchen',
      more: [
        { href: '/firmacatering/', title: 'Corporate catering', desc: 'Meetings, lunches and events all year round.' },
        { href: '/services/the-table/', title: 'Private dinner', desc: 'A private chef for dinner at home.' },
      ],
      areasHeading: 'We come to you in',
      faqHeading: 'Christmas lunch questions',
      faq: [
        { q: 'When should we book?', a: 'The sooner the better. November and December are busy, so call now if you have a date in mind.' },
        { q: 'How many guests can you cook for?', a: 'We adapt to your party – from a small Christmas lunch at home to the company party. Tell us the number of guests and we will find a solution.' },
        { q: 'Can you cater for allergies and vegetarians?', a: 'Yes. The menu is adapted to allergies, dietary needs and vegetarians.' },
        { q: 'What does a Christmas lunch cost?', a: 'It depends on the menu, the number of guests and whether you would like service and wine. We always agree the price with you before we start.' },
        { q: 'Do you clean up afterwards?', a: 'Yes. We clean up the kitchen after the meal so you can enjoy the party.' },
      ],
      ctaTitle: 'Book your Christmas lunch',
      ctaDesc: 'Call us and we will find a date and a menu that suit you.',
    },
  },
  firmacatering: {
    da: {
      badge: 'Erhverv',
      h1: 'Firmacatering nord for København',
      intro:
        'Frokost til mødet, catering til receptionen eller middagen for jeres vigtigste kunder – lavet af vores kok, Wiktoria R., med 13+ års erfaring, bl.a. fra Michelin-restauranter og Folketinget.',
      ctaSecondary: 'Ring og fortæl om jeres arrangement',
      cardsHeading: 'Til enhver anledning',
      cards: [
        { title: 'Møder og frokoster', desc: 'Frokost til bestyrelsesmødet, workshoppen eller hele teamet – anrettet hos jer.' },
        { title: 'Receptioner og jubilæer', desc: 'Tapas, fingermad eller buffet til receptionen, jubilæet eller åbningen.' },
        { title: 'Kundearrangementer', desc: 'En privat middag for jeres kunder eller samarbejdspartnere, på kontoret eller et sted efter jeres valg.' },
        { title: 'Julefrokost og sæsonfester', desc: 'Firmajulefrokost, sommerfest og andre fester med privat kok.' },
      ],
      howHeading: 'Sådan arbejder vi',
      how: [
        { title: 'Én kontakt', desc: 'I taler direkte med os fra første opkald til sidste tallerken.' },
        { title: 'Menu efter jeres ønsker', desc: 'Tilpasset anledningen, antallet af gæster og alle kostbehov.' },
        { title: 'Vin, servering og oprydning', desc: 'Efter aftale – så I kan koncentrere jer om jeres gæster.' },
        { title: 'Pris aftalt med jer', desc: 'Ingen faste pakker. Omfang og pris aftales, før vi går i gang.' },
      ],
      moreHeading: 'Mere til jeres virksomhed',
      more: [
        { href: '/julefrokost/', title: 'Julefrokost 2026', desc: 'Firmajulefrokost med privat kok – book i god tid.' },
        { href: '/erhvervsrengoering/', title: 'Erhvervsrengøring', desc: 'Hold kontoret skarpt med et fast team.' },
      ],
      areasHeading: 'Firmacatering i dit område',
      faqHeading: 'Spørgsmål om firmacatering',
      faq: [
        { q: 'Hvad koster firmacatering?', a: 'Det afhænger af menu, antal gæster, og om I ønsker servering og vin. Vi aftaler altid prisen med jer, før vi går i gang.' },
        { q: 'Hvor lang tid i forvejen skal vi bestille?', a: 'Jo før, jo bedre – især i december. Ring, så ser vi på jeres dato.' },
        { q: 'Kan I tage hensyn til allergier og kostbehov?', a: 'Ja. Menuen tilpasses allergier, vegetarer og andre kostbehov.' },
        { q: 'Står I også for servering og oprydning?', a: 'Ja, efter aftale. Vi kan stå for anretning, servering og oprydning.' },
        { q: 'Kan vi få en løbende aftale?', a: 'Tal med os om jeres behov, så finder vi en løsning, der passer jer.' },
      ],
      ctaTitle: 'Planlægger I et arrangement?',
      ctaDesc: 'Ring til os, så sammensætter vi en menu, der passer til jeres anledning.',
    },
    en: {
      badge: 'Business',
      h1: 'Corporate catering north of Copenhagen',
      intro:
        'Lunch for the meeting, catering for the reception or dinner for your most important clients – made by our chef, Wiktoria R., with 13+ years of experience including Michelin-starred restaurants and the Danish Parliament.',
      ctaSecondary: 'Call and tell us about your event',
      cardsHeading: 'For every occasion',
      cards: [
        { title: 'Meetings and lunches', desc: 'Lunch for the board meeting, the workshop or the whole team – served at your place.' },
        { title: 'Receptions and anniversaries', desc: 'Tapas, finger food or a buffet for the reception, anniversary or opening.' },
        { title: 'Client events', desc: 'A private dinner for your clients or partners, at the office or a venue of your choice.' },
        { title: 'Christmas and seasonal parties', desc: 'Company Christmas lunch, summer party and other celebrations with a private chef.' },
      ],
      howHeading: 'How we work',
      how: [
        { title: 'One contact', desc: 'You talk directly to us from the first call to the last plate.' },
        { title: 'Your menu', desc: 'Adapted to the occasion, the number of guests and every dietary need.' },
        { title: 'Wine, service and cleanup', desc: 'By arrangement – so you can focus on your guests.' },
        { title: 'Price agreed with you', desc: 'No fixed packages. Scope and price are agreed before we start.' },
      ],
      moreHeading: 'More for your business',
      more: [
        { href: '/julefrokost/', title: 'Christmas lunch 2026', desc: 'A company Christmas lunch with a private chef – book early.' },
        { href: '/erhvervsrengoering/', title: 'Commercial cleaning', desc: 'Keep the office immaculate with a dedicated team.' },
      ],
      areasHeading: 'Corporate catering in your area',
      faqHeading: 'Corporate catering questions',
      faq: [
        { q: 'What does corporate catering cost?', a: 'It depends on the menu, the number of guests and whether you would like service and wine. We always agree the price with you before we start.' },
        { q: 'How far in advance should we book?', a: 'The sooner the better – especially in December. Call us and we will look at your date.' },
        { q: 'Can you cater for allergies and dietary needs?', a: 'Yes. The menu is adapted to allergies, vegetarians and other dietary needs.' },
        { q: 'Do you also serve and clean up?', a: 'Yes, by arrangement. We can handle plating, service and cleanup.' },
        { q: 'Can we set up an ongoing arrangement?', a: 'Talk to us about your needs and we will find a solution that suits you.' },
      ],
      ctaTitle: 'Planning an event?',
      ctaDesc: 'Call us and we will put together a menu for your occasion.',
    },
  },
};
