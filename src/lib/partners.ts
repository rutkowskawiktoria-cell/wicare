export interface PartnerProduct {
  img: string;
  name: string;
  en: string;
  da: string;
}

// Product lines from CRITIDA (critida.com). Images are stored locally in
// /public/partners/critida and can be replaced with official photos anytime.
export const critidaProducts: PartnerProduct[] = [
  {
    img: '/partners/critida/evoo.png',
    name: 'Extra Virgin Olive Oil',
    en: 'Award-winning classic extra virgin olive oil from Crete — for everyday cooking and finishing.',
    da: 'Prisvindende klassisk ekstra jomfru olivenolie fra Kreta — til daglig madlavning og finish.',
  },
  {
    img: '/partners/critida/organic.png',
    name: 'Organic Extra Virgin Olive Oil',
    en: 'Certified organic (bio) extra virgin olive oil, cold extracted.',
    da: 'Certificeret økologisk (bio) ekstra jomfru olivenolie, koldpresset.',
  },
  {
    img: '/partners/critida/messara.png',
    name: 'Messara Extra Virgin Olive Oil',
    en: 'Protected-origin (PDO) extra virgin olive oil from the Messara valley.',
    da: 'Ekstra jomfru olivenolie med beskyttet oprindelse (PDO) fra Messara-dalen.',
  },
  {
    img: '/partners/critida/sitia.png',
    name: 'Sitia Extra Virgin Olive Oil',
    en: 'Protected-origin (PDO) extra virgin olive oil from Sitia, East Crete.',
    da: 'Ekstra jomfru olivenolie med beskyttet oprindelse (PDO) fra Sitia, Østkreta.',
  },
  {
    img: '/partners/critida/eleni.png',
    name: 'Olive Oil for Babies & Kids',
    en: 'ELENI: the purest organic olive oil, gentle enough for babies and children.',
    da: 'ELENI: den reneste økologiske olivenolie, skånsom nok til babyer og børn.',
  },
  {
    img: '/partners/critida/olives.png',
    name: 'Cretan Table Olives',
    en: 'Hand-selected Greek table olives from Crete.',
    da: 'Håndudvalgte græske bordoliven fra Kreta.',
  },
  {
    img: '/partners/critida/balsamic.png',
    name: 'Cretan Balsamic Vinegar',
    en: 'Balsamic vinegar for dressings, salads and finishing dishes.',
    da: 'Balsamicoeddike til dressinger, salater og finish.',
  },
  {
    img: '/partners/critida/delicatessen.png',
    name: 'Delicacies & Gift Boxes',
    en: 'Cretan delicacies and elegant gift boxes, perfect for gifting.',
    da: 'Kretensiske delikatesser og elegante gaveæsker, perfekte som gave.',
  },
];
