export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="WiCare emblem"
    >
      <defs>
        <linearGradient id="wc-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#26406B" />
          <stop offset="1" stopColor="#1B2B4A" />
        </linearGradient>
        <linearGradient id="wc-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9CC6E2" />
          <stop offset="0.5" stopColor="#6BA8CE" />
          <stop offset="1" stopColor="#4E8FBE" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="94" height="94" rx="26" fill="url(#wc-bg)" />
      <rect x="9" y="9" width="82" height="82" rx="21" fill="none" stroke="url(#wc-gold)" strokeWidth="2" opacity="0.65" />
      <text
        x="50"
        y="65"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="54"
        fontWeight="700"
        fill="url(#wc-gold)"
        textAnchor="middle"
      >
        W
      </text>
      <circle cx="50" cy="80" r="2.6" fill="url(#wc-gold)" />
    </svg>
  );
}
