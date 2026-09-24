// Redesign prototypes — three homepage directions behind a variant picker.
// Lives only on the `redesign` branch preview. Not linked, not in the sitemap, noindex.
import type { Metadata } from 'next';
import { Albert_Sans, Bodoni_Moda, Familjen_Grotesk, Jost } from 'next/font/google';
import Harness from './Harness';
import './picker.css';
import './shared.css';
import './porcelain.css';
import './coast.css';
import './concierge.css';

const bodoni = Bodoni_Moda({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], display: 'swap', variable: '--font-bodoni' });
const albert = Albert_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-albert' });
const familjen = Familjen_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-familjen' });
const jost = Jost({ subsets: ['latin'], display: 'swap', variable: '--font-jost' });

export const metadata: Metadata = {
  title: 'WiCare — homepage prototypes',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function PrototypesPage() {
  return (
    <div className={`${bodoni.variable} ${albert.variable} ${familjen.variable} ${jost.variable}`}>
      <Harness />
    </div>
  );
}
