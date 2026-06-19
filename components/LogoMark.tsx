export function LogoMark({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Conecta Axé">
      <defs>
        <linearGradient id="axeTerracotta" x1="0" x2="1">
          <stop offset="0%" stopColor="#C34224" />
          <stop offset="100%" stopColor="#D8B56A" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="48" fill="none" stroke="#D8B56A" strokeWidth="2" strokeDasharray="3 8" />
      <path d="M60 16 L63 25 L72 25 L65 31 L68 40 L60 34 L52 40 L55 31 L48 25 L57 25 Z" fill="#D8B56A" />

      <circle cx="60" cy="31" r="6" fill="#2B1710" />
      <path d="M60 39 C51 47 46 59 45 72 C52 68 58 66 60 58 C62 66 68 68 75 72 C74 59 69 47 60 39Z" fill="#2B1710" />

      <circle cx="32" cy="47" r="7" fill="#C34224" />
      <path d="M31 57 C21 65 18 77 19 89 C30 83 39 77 44 66 C40 62 36 59 31 57Z" fill="#C34224" />

      <circle cx="88" cy="47" r="7" fill="#2F6F3E" />
      <path d="M89 57 C99 65 102 77 101 89 C90 83 81 77 76 66 C80 62 84 59 89 57Z" fill="#2F6F3E" />

      <path d="M36 76 C45 72 53 74 60 82 C67 74 75 72 84 76 C79 85 70 91 60 96 C50 91 41 85 36 76Z" fill="#D8B56A" />

      <path d="M60 82 C54 91 47 98 38 104" fill="none" stroke="#2B1710" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 82 C66 91 73 98 82 104" fill="none" stroke="#2B1710" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 96 C42 96 37 98 32 102" fill="none" stroke="#2B1710" strokeWidth="3" strokeLinecap="round" />
      <path d="M72 96 C78 96 83 98 88 102" fill="none" stroke="#2B1710" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 96 L60 109" fill="none" stroke="#2B1710" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
