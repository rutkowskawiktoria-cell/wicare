export interface BlogSection { h?: string; p: string }
export interface BlogContent {
  title: string;
  description: string;
  intro: string;
  sections: BlogSection[];
  cta: string;
}
export interface BlogPost {
  slug: string;
  date: string; // ISO
  category: string;
  readingMins: number;
  en: BlogContent;
  da: BlogContent;
}

export const posts: BlogPost[] = [
  {
    slug: "choosing-luxury-home-cleaning-north-copenhagen",
    date: "2026-02-04",
    category: "Maison",
    readingMins: 5,
    en: {
      title: "How to Choose a Trusted Luxury Home Cleaning Service in North Copenhagen",
      description: "A practical guide for homeowners in Hellerup, Gentofte and the Strandvej area on choosing a discreet, reliable, high-end cleaning service.",
      intro: "Inviting a cleaning team into your home is an act of trust. In the northern suburbs of Copenhagen, where privacy and standards matter, choosing the right partner is about far more than price. Here is what to look for.",
      sections: [
        { h: "Discretion comes first", p: "The best household services are invisible. Ask how a company protects your privacy, whether staff sign confidentiality agreements, and how they handle keys and access. A serious provider will have clear answers." },
        { h: "Vetted, consistent staff", p: "A rotating cast of unfamiliar faces is the opposite of trust. Look for a service that assigns a dedicated, background-checked team to your home so they learn your preferences and your space over time." },
        { h: "Clear scope, no pre-bundling", p: "Premium service means the work is defined around your home and your agreement, not forced into a fixed package. You should be able to choose exactly what you need and adjust it as life changes." },
        { h: "Respect for your belongings", p: "A professional team treats your home with care and will ask you to secure cash, jewellery and valuables before each visit. That honesty is a sign of a well-run business, not a red flag." },
        { h: "Reliability you can feel", p: "Punctuality, a quick response time, and the same standard on every visit are what separate a luxury service from an ordinary one. Ask about response times and how scheduling is handled." },
      ],
      cta: "Maison provides discreet, white-glove home cleaning across the northern suburbs of Copenhagen. Call us to arrange a consultation.",
    },
    da: {
      title: "Sådan Vælger Du en Betroet Luksus Rengøringsservice i Nord for København",
      description: "En praktisk guide for boligejere i Hellerup, Gentofte og Strandvejsområdet til at vælge en diskret, pålidelig rengøringsservice i topklasse.",
      intro: "At invitere et rengøringsteam ind i dit hjem er et udtryk for tillid. I Københavns nordlige forstæder, hvor privatliv og standarder betyder noget, handler det rette valg om langt mere end pris. Her er, hvad du skal kigge efter.",
      sections: [
        { h: "Diskretion frem for alt", p: "De bedste husholdningsservices er usynlige. Spørg, hvordan virksomheden beskytter dit privatliv, om personalet underskriver fortrolighedsaftaler, og hvordan de håndterer nøgler og adgang. En seriøs udbyder har klare svar." },
        { h: "Godkendt og fast personale", p: "Skiftende ukendte ansigter er det modsatte af tillid. Vælg en service, der tildeler dit hjem et fast, baggrundstjekket team, så de lærer dine præferencer og dit hjem at kende over tid." },
        { h: "Klart omfang, intet forudbestemt", p: "Premium service betyder, at arbejdet defineres ud fra dit hjem og din aftale, ikke presses ned i en fast pakke. Du skal kunne vælge præcis det, du har brug for, og justere det, når livet ændrer sig." },
        { h: "Respekt for dine ejendele", p: "Et professionelt team behandler dit hjem med omhu og beder dig om at sikre kontanter, smykker og værdigenstande inden hvert besøg. Den ærlighed er tegn på en velsmurt forretning, ikke en advarsel." },
        { h: "Pålidelighed du kan mærke", p: "Punktlighed, hurtig svartid og den samme standard ved hvert besøg adskiller en luksusservice fra en almindelig. Spørg om svartider, og hvordan planlægning håndteres." },
      ],
      cta: "Maison leverer diskret white-glove rengøring i hele Københavns nordlige forstæder. Ring til os for at aftale en konsultation.",
    },
  },
  {
    slug: "hiring-private-chef-dinner-party-hellerup",
    date: "2026-02-18",
    category: "La Table",
    readingMins: 6,
    en: {
      title: "Hiring a Private Chef for a Dinner Party in Hellerup & Gentofte",
      description: "Everything you need to know about booking a private chef for an intimate dinner or celebration in the northern suburbs of Copenhagen.",
      intro: "A private chef turns an evening at home into something memorable, without the work or the cleanup. Whether it is an intimate dinner for two or a milestone celebration, here is how to get it right.",
      sections: [
        { h: "Start with the occasion", p: "A relaxed family dinner, a business evening, and a 30th birthday each call for a different menu and rhythm. Tell your chef the purpose, the number of guests, and the mood you want, and let the menu follow from there." },
        { h: "Talk about tastes and dietary needs", p: "The best private dining is personal. Share favourite ingredients, dishes to avoid, allergies and dietary preferences early so the chef can design a menu around your table rather than a fixed list." },
        { h: "Consider wine and flow", p: "Great food deserves thoughtful pairing and pacing. Discuss whether you would like wine suggestions, how many courses suit the evening, and when you would like to be at the table versus mingling." },
        { h: "Let them handle the rest", p: "A professional chef brings the ingredients, cooks in your kitchen, serves each course, and leaves the kitchen spotless. Your only job is to enjoy the evening with your guests." },
      ],
      cta: "La Table brings professional private dining and catering to homes across North Copenhagen. Call us to plan your evening.",
    },
    da: {
      title: "Lej en Privat Kok til Middagsselskab i Hellerup og Gentofte",
      description: "Alt, du behøver at vide om at booke en privat kok til en intim middag eller fejring i Københavns nordlige forstæder.",
      intro: "En privat kok forvandler en aften derhjemme til noget mindeværdigt, uden arbejdet eller oprydningen. Uanset om det er en intim middag for to eller en stor fejring, er her, hvordan du gør det rigtigt.",
      sections: [
        { h: "Start med anledningen", p: "En afslappet familiemiddag, en forretningsaften og en 30-års fødselsdag kræver hver sin menu og rytme. Fortæl din kok formålet, antallet af gæster og den stemning, du ønsker, og lad menuen følge derfra." },
        { h: "Tal om smag og kostbehov", p: "Den bedste private spisning er personlig. Del yndlingsråvarer, retter der skal undgås, allergier og kostpræferencer tidligt, så kokken kan designe en menu omkring dit bord frem for en fast liste." },
        { h: "Overvej vin og forløb", p: "God mad fortjener gennemtænkt parring og tempo. Tal om, hvorvidt du ønsker vinforslag, hvor mange retter der passer til aftenen, og hvornår du vil sidde til bords kontra mingle." },
        { h: "Lad dem klare resten", p: "En professionel kok medbringer råvarerne, laver mad i dit køkken, serverer hver ret og efterlader køkkenet skinnende rent. Din eneste opgave er at nyde aftenen med dine gæster." },
      ],
      cta: "La Table bringer professionel privat spisning og catering til hjem i hele Nord for København. Ring til os for at planlægge din aften.",
    },
  },
  {
    slug: "strandvej-villa-maintenance-checklist",
    date: "2026-03-03",
    category: "Le Domaine",
    readingMins: 5,
    en: {
      title: "The Strandvej Villa Maintenance Checklist",
      description: "A seasonal checklist for keeping a luxury villa in the northern suburbs of Copenhagen in immaculate condition all year round.",
      intro: "A beautiful home stays beautiful through steady, well-planned care. Use this seasonal checklist to keep a villa along the Strandvej coast in its best condition, with one trusted partner handling the details.",
      sections: [
        { h: "Spring: reset the garden", p: "As the season turns, prune, plant and tidy the garden, clear winter debris, and prepare terraces and outdoor furniture for the lighter months. Early attention sets up the whole year." },
        { h: "Summer: protect and maintain", p: "Keep planting watered, lawns trimmed, and exterior surfaces clean. It is also the right time for small construction and handyman projects while the weather cooperates." },
        { h: "Autumn: prepare for weather", p: "Clear gutters, check drainage, and service anything that will face the colder months. A little maintenance now prevents costly surprises later." },
        { h: "Winter: keep things running", p: "Indoor plant care, regular home checks, and quick handyman fixes keep the home comfortable and cared for, even when you are travelling." },
      ],
      cta: "Le Domaine handles gardening, construction, handyman work, dog walking and watering plants across North Copenhagen. Call us to plan your property care.",
    },
    da: {
      title: "Vedligeholdelsestjeklisten til Strandvejsvillaen",
      description: "En sæsonbestemt tjekliste til at holde en luksusvilla i Københavns nordlige forstæder i upåklagelig stand året rundt.",
      intro: "Et smukt hjem forbliver smukt gennem stabil, velplanlagt pleje. Brug denne sæsonbestemte tjekliste til at holde en villa langs Strandvejen i bedste stand, med én betroet partner til detaljerne.",
      sections: [
        { h: "Forår: nulstil haven", p: "Når sæsonen skifter, beskær, plant og ryd op i haven, fjern vinterens efterladenskaber, og gør terrasser og havemøbler klar til de lysere måneder. Tidlig opmærksomhed sætter hele året op." },
        { h: "Sommer: beskyt og vedligehold", p: "Hold beplantning vandet, græsplæner klippet og udvendige overflader rene. Det er også det rette tidspunkt til mindre bygge- og handyman-projekter, mens vejret er med dig." },
        { h: "Efterår: forbered til vejret", p: "Rens tagrender, tjek afvanding, og servicér alt, der skal stå over for de koldere måneder. Lidt vedligeholdelse nu forhindrer dyre overraskelser senere." },
        { h: "Vinter: hold tingene kørende", p: "Pasning af indendørs planter, regelmæssige hjemtjek og hurtige handyman-reparationer holder hjemmet komfortabelt og passet, også når du er på rejse." },
      ],
      cta: "Le Domaine klarer havearbejde, byggeri, handyman-arbejde, hundeluftning og vanding af planter i hele Nord for København. Ring til os for at planlægge din ejendomspleje.",
    },
  },
  {
    slug: "what-to-expect-white-glove-cleaning",
    date: "2026-03-17",
    category: "Maison",
    readingMins: 4,
    en: {
      title: "What to Expect from a White-Glove Cleaning Service",
      description: "How a premium, white-glove cleaning service differs from standard cleaning, and what that means for your home.",
      intro: "Not all cleaning is the same. A white-glove service is defined by attention, consistency and care. Here is what that standard actually looks like in practice.",
      sections: [
        { h: "The details others miss", p: "White-glove cleaning means the corners, edges and surfaces that ordinary cleaning overlooks. It is a difference you notice the moment you walk in." },
        { h: "Products chosen with care", p: "A premium service selects products balanced for safety and effectiveness, suited to fine surfaces and materials, rather than a one-size-fits-all approach." },
        { h: "A team that knows your home", p: "Because the same vetted team returns each time, they learn your preferences, your materials, and the small things that make your home yours." },
        { h: "Quietly thorough", p: "The best service is discreet and unobtrusive. You should feel the result without ever feeling the disruption." },
      ],
      cta: "Experience the Maison standard in your home across North Copenhagen. Call us to arrange a visit.",
    },
    da: {
      title: "Hvad Du Kan Forvente af en White-Glove Rengøringsservice",
      description: "Hvordan en premium white-glove rengøringsservice adskiller sig fra almindelig rengøring, og hvad det betyder for dit hjem.",
      intro: "Al rengøring er ikke ens. En white-glove service defineres af opmærksomhed, konsistens og omhu. Her er, hvordan den standard faktisk ser ud i praksis.",
      sections: [
        { h: "Detaljerne andre overser", p: "White-glove rengøring betyder de hjørner, kanter og overflader, som almindelig rengøring overser. Det er en forskel, du bemærker i samme øjeblik, du træder ind." },
        { h: "Produkter valgt med omhu", p: "En premium service vælger produkter balanceret for sikkerhed og effektivitet, tilpasset fine overflader og materialer, frem for en universel tilgang." },
        { h: "Et team der kender dit hjem", p: "Fordi det samme godkendte team vender tilbage hver gang, lærer de dine præferencer, dine materialer og de små ting, der gør dit hjem til dit." },
        { h: "Stille grundighed", p: "Den bedste service er diskret og diskret. Du skal mærke resultatet uden nogensinde at mærke forstyrrelsen." },
      ],
      cta: "Oplev Maison-standarden i dit hjem i hele Nord for København. Ring til os for at aftale et besøg.",
    },
  },
  {
    slug: "hosting-intimate-private-dinner-at-home",
    date: "2026-03-31",
    category: "La Table",
    readingMins: 5,
    en: {
      title: "Hosting an Intimate Private Dinner at Home: A Host's Guide",
      description: "Simple ways to host a beautiful, relaxed private dinner at home, and where a private chef makes the difference.",
      intro: "The best dinners feel effortless for the host. With a little planning, and the right help in the kitchen, you can be fully present with your guests from the first glass to the last course.",
      sections: [
        { h: "Set the table early", p: "Lay the table, arrange flowers and set the lighting hours before guests arrive. Calm preparation sets the tone for the whole evening." },
        { h: "Keep the guest list intimate", p: "Smaller gatherings allow real conversation. For a private dinner at home, a tighter guest list almost always makes for a warmer evening." },
        { h: "Let the kitchen be handled", p: "When a private chef takes care of the menu, cooking and service, you are free to host rather than disappear into the kitchen between courses." },
        { h: "End unhurried", p: "Leave room after the meal for coffee, conversation and a relaxed close. The goal is an evening your guests remember, not a schedule to keep." },
      ],
      cta: "La Table handles the menu, cooking and cleanup so you can simply host. Call us to plan your dinner in North Copenhagen.",
    },
    da: {
      title: "Vært for en Intim Privat Middag Derhjemme: En Værtsguide",
      description: "Enkle måder at være vært for en smuk, afslappet privat middag derhjemme, og hvor en privat kok gør forskellen.",
      intro: "De bedste middage føles ubesværede for værten. Med lidt planlægning og den rette hjælp i køkkenet kan du være fuldt til stede med dine gæster fra første glas til sidste ret.",
      sections: [
        { h: "Dæk bordet tidligt", p: "Dæk bordet, arrangér blomster og indstil belysningen timer før gæsterne ankommer. Rolig forberedelse sætter tonen for hele aftenen." },
        { h: "Hold gæstelisten intim", p: "Mindre selskaber giver plads til rigtig samtale. Til en privat middag derhjemme giver en kortere gæsteliste næsten altid en varmere aften." },
        { h: "Lad køkkenet blive klaret", p: "Når en privat kok tager sig af menu, madlavning og servering, er du fri til at være vært frem for at forsvinde ud i køkkenet mellem retterne." },
        { h: "Slut i ro", p: "Giv plads efter måltidet til kaffe, samtale og en afslappet afslutning. Målet er en aften, dine gæster husker, ikke en tidsplan, der skal holdes." },
      ],
      cta: "La Table klarer menu, madlavning og oprydning, så du blot kan være vært. Ring til os for at planlægge din middag i Nord for København.",
    },
  },
  {
    slug: "preparing-your-home-for-a-cleaning-visit",
    date: "2026-04-14",
    category: "Maison",
    readingMins: 4,
    en: {
      title: "Preparing Your Home for a Cleaning Visit",
      description: "A few simple steps before your cleaning team arrives that protect your valuables and get the best result.",
      intro: "A great cleaning visit starts before the team arrives. A few minutes of preparation protects what matters to you and helps your team deliver the best possible result.",
      sections: [
        { h: "Secure valuables first", p: "Store cash, jewellery and other valuables in a safe, secured place before each visit. A trustworthy service will always ask you to do this, and it gives everyone peace of mind." },
        { h: "Clear the surfaces you care about", p: "Putting away fragile or personal items lets the team clean thoroughly without hesitation, and keeps the things you treasure exactly where you want them." },
        { h: "Share your priorities", p: "If certain rooms or details matter most this week, say so. A dedicated team adapts each visit to what your home needs right now." },
        { h: "Leave access clear", p: "Agree in advance how the team will enter and which areas are in scope, so the visit runs smoothly from the first minute." },
      ],
      cta: "Maison makes every visit discreet, careful and tailored to your home. Call us to arrange your cleaning in North Copenhagen.",
    },
    da: {
      title: "Forbered Dit Hjem til et Rengøringsbesøg",
      description: "Få enkle trin, før dit rengøringsteam ankommer, som beskytter dine værdigenstande og giver det bedste resultat.",
      intro: "Et godt rengøringsbesøg starter, før teamet ankommer. Få minutters forberedelse beskytter det, der betyder noget for dig, og hjælper dit team med at levere det bedst mulige resultat.",
      sections: [
        { h: "Sikr værdigenstande først", p: "Opbevar kontanter, smykker og andre værdigenstande på et sikkert, aflåst sted inden hvert besøg. En troværdig service beder dig altid om dette, og det giver alle ro i sindet." },
        { h: "Ryd de overflader, du holder af", p: "At lægge skrøbelige eller personlige genstande væk lader teamet rengøre grundigt uden tøven og holder de ting, du værdsætter, præcis hvor du vil have dem." },
        { h: "Del dine prioriteter", p: "Hvis bestemte rum eller detaljer betyder mest denne uge, så sig det. Et fast team tilpasser hvert besøg til, hvad dit hjem har brug for lige nu." },
        { h: "Sørg for fri adgang", p: "Aftal på forhånd, hvordan teamet kommer ind, og hvilke områder der er omfattet, så besøget forløber gnidningsfrit fra første minut." },
      ],
      cta: "Maison gør hvert besøg diskret, omhyggeligt og tilpasset dit hjem. Ring til os for at aftale din rengøring i Nord for København.",
    },
  },
  {
    slug: "property-care-while-you-travel",
    date: "2026-04-28",
    category: "Le Domaine",
    readingMins: 4,
    en: {
      title: "Property Care While You Travel: Plants, Pets and Home Checks",
      description: "How to keep your home cared for while you are away, from watering plants to dog walking and regular checks.",
      intro: "Travel is easier when you know your home is in good hands. The right support keeps everything cared for while you are away, so you return to a home exactly as you left it.",
      sections: [
        { h: "Watering and tending plants", p: "Indoor and outdoor planting needs steady attention. Regular watering and care keep your greenery healthy through long absences." },
        { h: "Dog walking and routine", p: "Pets do best with routine. Reliable dog walking, with photo updates while you are away, keeps your companion happy and your mind at ease." },
        { h: "Regular home checks", p: "Periodic checks catch small issues, such as a leak or a fault, before they become real problems, and keep the home aired and ready." },
        { h: "One point of contact", p: "Having a single trusted partner manage it all means fewer keys, fewer strangers, and one number to call if anything is needed." },
      ],
      cta: "Le Domaine keeps your home cared for while you travel across North Copenhagen. Call us to arrange support.",
    },
    da: {
      title: "Ejendomspleje Mens Du Rejser: Planter, Kæledyr og Hjemtjek",
      description: "Sådan holder du dit hjem passet, mens du er væk, fra vanding af planter til hundeluftning og regelmæssige tjek.",
      intro: "Rejser er lettere, når du ved, at dit hjem er i gode hænder. Den rette støtte holder alt passet, mens du er væk, så du vender hjem til et hjem præcis, som du forlod det.",
      sections: [
        { h: "Vanding og pasning af planter", p: "Inde- og udeplanter kræver stabil opmærksomhed. Regelmæssig vanding og pleje holder dit grønne sundt gennem lange fravær." },
        { h: "Hundeluftning og rutine", p: "Kæledyr trives bedst med rutine. Pålidelig hundeluftning, med fotoopdateringer mens du er væk, holder din ven glad og dit sind roligt." },
        { h: "Regelmæssige hjemtjek", p: "Periodiske tjek fanger små problemer, som en lækage eller en fejl, før de bliver til rigtige problemer, og holder hjemmet udluftet og klar." },
        { h: "Ét kontaktpunkt", p: "At have én betroet partner til at styre det hele betyder færre nøgler, færre fremmede og ét nummer at ringe til, hvis der er behov for noget." },
      ],
      cta: "Le Domaine holder dit hjem passet, mens du rejser, i hele Nord for København. Ring til os for at aftale støtte.",
    },
  },
  {
    slug: "why-discretion-matters-household-services",
    date: "2026-05-12",
    category: "Guide",
    readingMins: 5,
    en: {
      title: "Why Discretion Matters When Choosing Household Services",
      description: "For high-profile households in North Copenhagen, discretion is not a luxury but a requirement. Here is what it really means.",
      intro: "For many households in the northern suburbs of Copenhagen, privacy is not optional. Whoever you invite into your home should understand that, and prove it in how they work.",
      sections: [
        { h: "Privacy is part of the service", p: "True discretion means your home, your schedule and your life stay private. It should be built into how a company hires, trains and works, not added as an afterthought." },
        { h: "Trust is earned in the details", p: "How a team handles keys, access and your belongings tells you everything. Small, consistent acts of care are what build long-term trust." },
        { h: "Consistency over churn", p: "A dedicated team that returns to your home protects your privacy far better than a constant stream of new faces. Continuity is itself a form of discretion." },
        { h: "Quiet professionalism", p: "The best providers are present when you need them and invisible when you do not. That balance is the mark of a service built for discerning homes." },
      ],
      cta: "WiCare is built on discretion, precision and trust, serving the northern suburbs of Copenhagen. Call us to start a conversation.",
    },
    da: {
      title: "Hvorfor Diskretion Betyder Noget, Når Du Vælger Husholdningsservices",
      description: "For profilerede husstande i Nord for København er diskretion ikke en luksus, men et krav. Her er, hvad det virkelig betyder.",
      intro: "For mange husstande i Københavns nordlige forstæder er privatliv ikke valgfrit. Den, du inviterer ind i dit hjem, bør forstå det og bevise det i måden, de arbejder på.",
      sections: [
        { h: "Privatliv er en del af servicen", p: "Ægte diskretion betyder, at dit hjem, din tidsplan og dit liv forbliver private. Det bør være indbygget i, hvordan en virksomhed ansætter, træner og arbejder, ikke tilføjet som en eftertanke." },
        { h: "Tillid opbygges i detaljerne", p: "Hvordan et team håndterer nøgler, adgang og dine ejendele fortæller dig alt. Små, konsekvente handlinger af omhu er det, der opbygger langvarig tillid." },
        { h: "Kontinuitet frem for udskiftning", p: "Et fast team, der vender tilbage til dit hjem, beskytter dit privatliv langt bedre end en konstant strøm af nye ansigter. Kontinuitet er i sig selv en form for diskretion." },
        { h: "Stille professionalisme", p: "De bedste udbydere er til stede, når du har brug for dem, og usynlige, når du ikke har. Den balance er kendetegnet for en service bygget til kræsne hjem." },
      ],
      cta: "WiCare er bygget på diskretion, præcision og tillid og betjener Københavns nordlige forstæder. Ring til os for at starte en samtale.",
    },
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
