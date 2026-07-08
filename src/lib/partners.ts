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
    en: 'Award-winning classic extra virgin olive oil from Crete.',
    da: 'Prisvindende klassisk ekstra jomfru olivenolie fra Kreta.',
  },
  {
    img: '/partners/critida/organic.png',
    name: 'Organic (Bio) EVOO',
    en: 'Certified organic extra virgin olive oil, cold extracted.',
    da: 'Certificeret økologisk ekstra jomfru olivenolie, koldpresset.',
  },
  {
    img: '/partners/critida/messara.png',
    name: 'PDO Messara EVOO',
    en: 'Protected-origin extra virgin olive oil from the Messara valley.',
    da: 'Ekstra jomfru olivenolie med beskyttet oprindelse fra Messara-dalen.',
  },
  {
    img: '/partners/critida/sitia.png',
    name: 'PDO Sitia EVOO',
    en: 'Protected-origin extra virgin olive oil from Sitia, East Crete.',
    da: 'Ekstra jomfru olivenolie med beskyttet oprindelse fra Sitia, Østkreta.',
  },
  {
    img: '/partners/critida/eleni.png',
    name: 'ELENI — for Babies & Kids',
    en: 'The purest organic extra virgin olive oil, made for babies and kids.',
    da: 'Den reneste økologiske ekstra jomfru olivenolie, lavet til babyer og børn.',
  },
  {
    img: '/partners/critida/olives.png',
    name: 'Greek Table Olives',
    en: 'Hand-selected Cretan table olives.',
    da: 'Håndudvalgte kretensiske bordoliven.',
  },
  {
    img: '/partners/critida/balsamic.png',
    name: 'Balsamic Vinegars',
    en: 'Cretan balsamic vinegars for the table.',
    da: 'Kretensiske balsamicoeddiker til bordet.',
  },
  {
    img: '/partners/critida/delicatessen.png',
    name: 'Delicatessen & Gift Boxes',
    en: 'Cretan delicacies and elegant gift boxes.',
    da: 'Kretensiske delikatesser og elegante gaveæsker.',
  },
];
