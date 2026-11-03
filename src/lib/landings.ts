// Copy for the catering landing pages: /julefrokost/, /firmacatering/ (Sept 2026) and /selskaber/ (Nov 2026).
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

export type LandingKey = 'julefrokost' | 'firmacatering' | 'selskaber';

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
      moreHeading: 'Mere fra vores køkken',
      more: [
        { href: '/firmacatering/', title: 'Firmacatering', desc: 'Møder, frokoster og arrangementer hele året.' },
        { href: '/selskaber/', title: 'Fester & selskaber', desc: 'Fødselsdage, konfirmationer, bryllupper og havefester.' },
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
      moreHeading: 'More from our kitchen',
      more: [
        { href: '/firmacatering/', title: 'Corporate catering', desc: 'Meetings, lunches and events all year round.' },
        { href: '/selskaber/', title: 'Parties & celebrations', desc: 'Birthdays, confirmations, weddings and garden parties.' },
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
  // Owner-confirmed occasions (Nov 2026): birthdays & anniversaries, confirmations, weddings,
  // summer & garden parties (+ julefrokost, which keeps its own seasonal page).
  selskaber: {
    da: {
      badge: 'Fester & selskaber',
      h1: 'Privat kok til fester og selskaber',
      intro:
        'Fødselsdag, konfirmation, bryllup eller havefest nord for København. Vores kok, Wiktoria R., laver maden hjemme hos jer eller et sted efter jeres valg, så I kan være sammen med jeres gæster. Menu, omfang og pris aftaler vi med jer.',
      ctaSecondary: 'Ring og fortæl om jeres fest',
      cardsHeading: 'Til enhver anledning',
      cards: [
        { title: 'Fødselsdage og jubilæer', desc: 'Den runde fødselsdag, sølvbrylluppet eller jubilæet – en middag eller buffet, der passer til dagen.' },
        { title: 'Konfirmationer', desc: 'Konfirmationsfrokost eller -middag derhjemme, så familien kan fejre dagen uden at stå i køkkenet.' },
        { title: 'Bryllupper', desc: 'Maden til den store dag – planlagt sammen med jer, fra menuen til serveringen.' },
        { title: 'Sommer- og havefester', desc: 'Havefest, sommerfest eller grillaften med sæsonens bedste råvarer.' },
      ],
      howHeading: 'Sådan foregår det',
      how: [
        { title: 'Ring til os', desc: 'Fortæl om anledningen, datoen og antallet af gæster.' },
        { title: 'Vi sammensætter menuen', desc: 'Fra den elegante middag til buffet eller tapas – tilpasset allergier og kostbehov.' },
        { title: 'Vi laver maden hos jer', desc: 'Anretning, servering, vin og oprydning efter aftale, så I kan nyde festen.' },
      ],
      moreHeading: 'Mere fra vores køkken',
      more: [
        { href: '/services/the-table/', title: 'Privat middag', desc: 'En privat kok til middagen derhjemme.' },
        { href: '/firmacatering/', title: 'Firmacatering', desc: 'Møder, receptioner og kundearrangementer.' },
        { href: '/julefrokost/', title: 'Julefrokost 2026', desc: 'Julefrokost derhjemme eller i firmaet – book i god tid.' },
      ],
      areasHeading: 'Vi kommer til jer i',
      faqHeading: 'Spørgsmål om fester og selskaber',
      faq: [
        { q: 'Hvor mange gæster kan I lave mad til?', a: 'Vi tilpasser os jeres selskab – fra en middag for få gæster til den store fest. Fortæl os antallet af gæster, så finder vi en løsning.' },
        { q: 'Kommer I hjem til os, eller kan I lave mad i et festlokale?', a: 'Begge dele. Vi laver maden hjemme hos jer eller et sted efter jeres valg.' },
        { q: 'Kan I tage hensyn til allergier og vegetarer?', a: 'Ja. Menuen tilpasses allergier, kostbehov og vegetarer.' },
        { q: 'Kan vi få vin til maden?', a: 'Ja. Vi kan sammensætte vin til menuen efter aftale.' },
        { q: 'Hvad koster det?', a: 'Prisen afhænger af menu, antal gæster, og om I ønsker servering og vin. Vi aftaler altid prisen med jer, før vi går i gang.' },
        { q: 'Hvornår skal vi booke?', a: 'Jo før, jo bedre – især til konfirmationer og bryllupper i foråret og sommeren. Ring, så ser vi på jeres dato.' },
      ],
      ctaTitle: 'Planlægger I en fest?',
      ctaDesc: 'Ring til os, så finder vi en dato og sammensætter en menu til jeres anledning.',
    },
    en: {
      badge: 'Parties & celebrations',
      h1: 'A private chef for parties and celebrations',
      intro:
        'A birthday, confirmation, wedding or garden party north of Copenhagen. Our chef, Wiktoria R., cooks at your home or a venue of your choice, so you can spend the day with your guests. Menu, scope and price are agreed with you.',
      ctaSecondary: 'Call and tell us about your party',
      cardsHeading: 'For every occasion',
      cards: [
        { title: 'Birthdays and anniversaries', desc: 'The milestone birthday, the silver wedding or the anniversary – a dinner or buffet made for the day.' },
        { title: 'Confirmations', desc: 'A confirmation lunch or dinner at home, so the family can celebrate without being stuck in the kitchen.' },
        { title: 'Weddings', desc: 'The food for the big day – planned with you, from the menu to the service.' },
        { title: 'Summer and garden parties', desc: 'A garden party, summer party or barbecue evening with the best seasonal produce.' },
      ],
      howHeading: 'How it works',
      how: [
        { title: 'Call us', desc: 'Tell us about the occasion, the date and the number of guests.' },
        { title: 'We design the menu', desc: 'From an elegant dinner to a buffet or tapas – adapted to allergies and dietary needs.' },
        { title: 'We cook at your place', desc: 'Plating, service, wine and cleanup by arrangement, so you can enjoy the party.' },
      ],
      moreHeading: 'More from our kitchen',
      more: [
        { href: '/services/the-table/', title: 'Private dinner', desc: 'A private chef for dinner at home.' },
        { href: '/firmacatering/', title: 'Corporate catering', desc: 'Meetings, receptions and client events.' },
        { href: '/julefrokost/', title: 'Christmas lunch 2026', desc: 'A Christmas lunch at home or at the company – book early.' },
      ],
      areasHeading: 'We come to you in',
      faqHeading: 'Questions about parties and celebrations',
      faq: [
        { q: 'How many guests can you cook for?', a: 'We adapt to your party – from a dinner for a few guests to the big celebration. Tell us the number of guests and we will find a solution.' },
        { q: 'Do you come to our home, or can you cook at a venue?', a: 'Both. We cook at your home or at a venue of your choice.' },
        { q: 'Can you cater for allergies and vegetarians?', a: 'Yes. The menu is adapted to allergies, dietary needs and vegetarians.' },
        { q: 'Can we have wine with the food?', a: 'Yes. We can pair wine with the menu by arrangement.' },
        { q: 'What does it cost?', a: 'It depends on the menu, the number of guests and whether you would like service and wine. We always agree the price with you before we start.' },
        { q: 'When should we book?', a: 'The sooner the better – especially for confirmations and weddings in spring and summer. Call us and we will look at your date.' },
      ],
      ctaTitle: 'Planning a party?',
      ctaDesc: 'Call us and we will find a date and put together a menu for your occasion.',
    },
  },
};
