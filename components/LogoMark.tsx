export function LogoMark({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-label="Conecta Axé">
      <circle cx="60" cy="60" r="54" fill="url(#bg)" />
      <path d="M60 96 C55 82 47 75 35 71 C45 68 54 60 60 46 C66 60 75 68 85 71 C73 75 65 82 60 96Z" fill="#D4A23A" />
      <path d="M60 100 C49 84 36 79 20 79 C24 91 38 99 60 100Z" fill="#2F4E2D" />
      <path d="M60 100 C71 84 84 79 100 79 C96 91 82 99 60 100Z" fill="#2F4E2D" />
      <path d="M60 104 C58 89 58 74 60 52 C62 74 62 89 60 104Z" fill="#351F15" />
      <circle cx="60" cy="30" r="9" fill="#351F15" />
      <path d="M60 42 C50 47 43 58 42 70 C52 65 58 56 60 42Z" fill="#351F15" />
      <path d="M60 42 C70 47 77 58 78 70 C68 65 62 56 60 42Z" fill="#351F15" />
      <circle cx="29" cy="49" r="8" fill="#C23D2A" />
      <path d="M37 58 C23 61 18 69 17 82 C30 80 38 72 43 62Z" fill="#C23D2A" />
      <circle cx="91" cy="49" r="8" fill="#2F4E2D" />
      <path d="M83 58 C97 61 102 69 103 82 C90 80 82 72 77 62Z" fill="#2F4E2D" />
      <path d="M23 91 C36 89 44 97 58 104" stroke="#351F15" strokeWidth="4" strokeLinecap="round" />
      <path d="M97 91 C84 89 76 97 62 104" stroke="#351F15" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 23 C42 11 78 11 90 23" stroke="#D4A23A" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
      <path d="M60 6 L63 14 L71 14 L65 19 L68 27 L60 22 L52 27 L55 19 L49 14 L57 14 L60 6Z" fill="#D4A23A" />
      <defs>
        <linearGradient id="bg" x1="16" y1="14" x2="106" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF8EA" />
          <stop offset="1" stopColor="#F1D9B5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
