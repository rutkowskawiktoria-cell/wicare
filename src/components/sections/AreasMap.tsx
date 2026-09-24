'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { areas } from '@/lib/areas';

// "Where we work": a compact, illustrative coast map (not survey-accurate) next to the
// town list, grouped by municipality. Every town links to its /omraader page; hovering or
// focusing a town in the list lights up its pin (and vice versa).

// Øresund coastline, south -> north (approximate lat, lon).
const COAST: [number, number][] = [
  [55.712, 12.583], [55.724, 12.585], [55.736, 12.588], [55.746, 12.595], [55.76, 12.599],
  [55.771, 12.605], [55.788, 12.604], [55.8, 12.598], [55.815, 12.59], [55.828, 12.585],
  [55.845, 12.578], [55.858, 12.574], [55.872, 12.566], [55.884, 12.555], [55.9, 12.54],
  [55.915, 12.528],
];

const LAT_N = 55.9;
const LAT_S = 55.712;
const LON_W = 12.335;
const LON_E = 12.665;
const K = 1900;
const KX = Math.cos((55.8 * Math.PI) / 180) * K;
const W = Math.round((LON_E - LON_W) * KX);
const H = Math.round((LAT_N - LAT_S) * K);
const proj = ([lat, lon]: [number, number]) => [+((lon - LON_W) * KX).toFixed(1), +((LAT_N - lat) * K).toFixed(1)] as const;

const coastD = COAST.map((p, i) => `${i ? 'L' : 'M'} ${proj(p).join(' ')}`).join(' ');

// Labels shown at all times (the rest appear on hover/focus so the dense south stays readable).
const ALWAYS = new Set([
  'hellerup', 'charlottenlund', 'gentofte', 'klampenborg', 'taarbaek', 'kongens-lyngby', 'virum', 'holte',
  'naerum', 'skodsborg', 'birkeroed', 'vedbaek', 'alleroed', 'hoersholm', 'rungsted',
]);
// Label side: inland towns to the left, coastal towns to the right (over the sea).
const LEFT = new Set(['kongens-lyngby', 'holte', 'birkeroed', 'hoersholm', 'gentofte', 'jaegersborg', 'ordrup', 'sorgenfri', 'virum']);
const TOP = new Set(['soelleroed']);

// Display groups (municipalities; Hørsholm + Allerød combined) laid out in
// explicit columns so the list stays short: 2 columns on phones, 3 from `sm` up.
const byMun = (...m: string[]) => ({ name: m.join(' & '), towns: areas.filter((a) => m.includes(a.municipality)) });
const G = {
  gentofte: byMun('Gentofte'),
  lyngby: byMun('Lyngby-Taarbæk'),
  rudersdal: byMun('Rudersdal'),
  hoersholm: byMun('Hørsholm', 'Allerød'),
};
const COLS_SM = [[G.gentofte, G.lyngby], [G.rudersdal, G.hoersholm]];
const COLS_LG = [[G.gentofte], [G.lyngby, G.hoersholm], [G.rudersdal]];

export default function AreasMap() {
  const { t } = useLanguage();
  const c = t.areasMap;
  const [active, setActive] = useState<string | null>(null);
  const on = (slug: string) => () => setActive(slug);
  const off = () => setActive(null);

  return (
    <section id="areas" className="scroll-mt-20 py-14 md:py-20 bg-primary text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-x-14 gap-y-8 lg:gap-y-8 items-center">
        <div className="lg:col-span-7 min-w-0 lg:self-end">
          <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-3">{c.badge}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">{c.heading}</h2>
          <p className="text-white/70 mt-3 max-w-xl leading-relaxed">{c.lede}</p>
        </div>
        <figure className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={c.mapLabel} className="block w-full h-auto max-w-[300px] sm:max-w-[320px] lg:max-w-[360px] mx-auto select-none">
            <defs>
              <pattern id="am-water" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(107,168,206,0.28)" strokeWidth="1" />
              </pattern>
              <radialGradient id="am-fade" cx="0.55" cy="0.5" r="0.62">
                <stop offset="60%" stopColor="#fff" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
              <mask id="am-mask">
                <rect width={W} height={H} fill="url(#am-fade)" />
              </mask>
              <radialGradient id="am-glow">
                <stop offset="0%" stopColor="#9CC6E2" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#9CC6E2" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g mask="url(#am-mask)">
              <path d={`${coastD} L 0 0 L 0 ${H} Z`} fill="rgba(234,241,248,0.05)" />
              <path d={`${coastD} L ${W} 0 L ${W} ${H} Z`} fill="url(#am-water)" />
            </g>
            <path d={coastD} fill="none" stroke="#6BA8CE" strokeWidth="1.4" strokeLinejoin="round" />

            <text x={W - 40} y={H * 0.35} textAnchor="middle" className="fill-accent/70 font-serif italic" fontSize="15">
              Øresund
            </text>
            <text x={W - 116} y={H - 6} textAnchor="end" className="fill-white/40" fontSize="10" letterSpacing="1">
              ↓ {c.south}
            </text>

            {areas.map((a) => {
              const [x, y] = proj(a.geo);
              const isActive = active === a.slug;
              const showLabel = isActive || ALWAYS.has(a.slug);
              const left = LEFT.has(a.slug);
              const top = TOP.has(a.slug);
              return (
                <a
                  key={a.slug}
                  href={`/omraader/${a.slug}/`}
                  tabIndex={-1}
                  onMouseEnter={on(a.slug)}
                  onMouseLeave={off}
                  className="cursor-pointer"
                >
                  <title>{`${a.name} ${a.postal}`}</title>
                  <circle cx={x} cy={y} r={isActive ? 16 : 10} fill="url(#am-glow)" opacity={isActive ? 1 : 0.55} className="transition-all duration-300" />
                  <circle cx={x} cy={y} r={isActive ? 4.2 : 3} fill={isActive ? '#6BA8CE' : '#EAF1F8'} stroke={isActive ? '#fff' : 'none'} strokeWidth="1.2" className="transition-all duration-300" />
                  {showLabel && (
                    <text
                      x={top ? x : left ? x - 8 : x + 8}
                      y={top ? y - 9 : y + 3.6}
                      textAnchor={top ? 'middle' : left ? 'end' : 'start'}
                      fontSize="11"
                      fontWeight={isActive ? 600 : 400}
                      stroke="#1B2B4A"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      className={isActive ? 'fill-white' : 'fill-white/75'}
                    >
                      {a.name}
                    </text>
                  )}
                </a>
              );
            })}
          </svg>
          <figcaption className="text-center text-[11px] tracking-widest uppercase text-white/35 mt-2">{c.note}</figcaption>
        </figure>

        <div className="lg:col-span-7 min-w-0 lg:self-start">
          {[COLS_SM, COLS_LG].map((cols, v) => (
            <div key={v} className={v === 0 ? 'grid grid-cols-2 gap-x-6 sm:hidden' : 'hidden sm:grid grid-cols-3 gap-x-8'}>
              {cols.map((col, i) => (
                <div key={i} className="min-w-0">
                  {col.map((g) => (
                    <div key={g.name} className="mb-4 last:mb-0">
                      <p className="text-[11px] tracking-widest uppercase text-accent/80 font-semibold mb-1">{g.name}</p>
                      <ul>
                        {g.towns.map((a) => (
                          <li key={a.slug}>
                            <Link
                              href={`/omraader/${a.slug}/`}
                              onMouseEnter={on(a.slug)}
                              onMouseLeave={off}
                              onFocus={on(a.slug)}
                              onBlur={off}
                              className={`flex items-baseline gap-1.5 py-[3px] text-[13px] sm:text-sm transition-colors ${active === a.slug ? 'text-accent' : 'text-white/85 hover:text-accent'}`}
                            >
                              <span className="whitespace-nowrap">{a.name}</span>
                              <span aria-hidden="true" className="flex-1 min-w-[8px] border-b border-dotted border-white/20 translate-y-[-3px]" />
                              <span className="text-white/45 text-[11px] sm:text-xs tabular-nums">{a.postal}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
