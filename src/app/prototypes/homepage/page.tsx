// Redesign prototypes — three bold homepage directions behind a variant picker.
// Lives only on the `redesign` branch preview. Not linked, not in the sitemap, noindex.
import type { Metadata } from 'next';
import { Albert_Sans, Archivo, Fraunces, Instrument_Serif, Syne } from 'next/font/google';
import Harness from './Harness';
import './picker.css';
import './shared.css';
import './fx.css';
import './film.css';
import './liquid.css';
import './aurora.css';
import './signature.css';

const albert = Albert_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-albert' });
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], display: 'swap', variable: '--font-archivo' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], display: 'swap', variable: '--font-instrument' });
const syne = Syne({ subsets: ['latin'], display: 'swap', variable: '--font-syne' });
const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz', 'SOFT'], display: 'swap', variable: '--font-fraunces' });

export const metadata: Metadata = {
  title: 'WiCare — homepage prototypes',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function PrototypesPage() {
  return (
    <div className={`${albert.variable} ${archivo.variable} ${instrument.variable} ${syne.variable} ${fraunces.variable}`}>
      <Harness />
    </div>
  );
}
