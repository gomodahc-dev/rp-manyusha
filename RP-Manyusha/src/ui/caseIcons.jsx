// Детальные иконки кейсов: у каждого свой узнаваемый предмет с тенями и бликами.
// Использование: <CaseIcon id="manyusha" size={40} />

const EDGE = {
  manyusha: "#c6ff3d",
  ksyusha: "#ff7ad9",
  cars2025: "#ff9d2e",
  bomzhCars: "#c9a06a",
  clothes2026: "#a78bfa",
  moto2025: "#ff6b4a",
  phones2025: "#5ee7ff",
  phones2026: "#8fb8ff",
  axi2026: "#ffd76a",
  cars2026: "#ffe9a8",
  retrocars2000s: "#5eead4",
  teslaExclusive2026: "#5df2c0",
  moto2026: "#ff6b7a",
  secret2026: "#c9c5d1",
  mix2026: "#c084fc",
};

function Glyph({ id }) {
  switch (id) {
    case "ksyusha":
      return (
        <g>
          <ellipse cx="24" cy="38.5" rx="11" ry="2.4" fill="#000" opacity="0.45" />
          <rect x="12" y="20" width="24" height="17" rx="2.5" fill="#3b1f4d" stroke="#ff7ad9" strokeWidth="1.6" />
          <rect x="10" y="15.5" width="28" height="6.5" rx="2" fill="#ff7ad9" />
          <rect x="10" y="15.5" width="28" height="6.5" rx="2" fill="#fff" opacity="0.18" />
          <rect x="21.6" y="15.5" width="4.8" height="21.5" fill="#ffd1ec" />
          <path d="M24 15.5c-1-4.5-4-7-7.5-7C13.5 8.5 13 11 15 12.5c2 1.6 6 2 9 3zm0 0c1-4.5 4-7 7.5-7 3 0 3.5 2.5 1.5 4-2 1.6-6 2-9 3z" fill="#ff9fd6" stroke="#a855f7" strokeWidth="1.2" />
          <circle cx="24" cy="15.5" r="2.2" fill="#a855f7" />
        </g>
      );
    case "cars2025":
      return (
        <g>
          <ellipse cx="24" cy="37.5" rx="14" ry="2.6" fill="#000" opacity="0.5" />
          <path d="M6 30l3.5-6.5c.5-1 1.5-1.7 2.7-1.9L17 21l3-4.2c.5-.7 1.3-1.1 2.1-1.1h6.4c.8 0 1.6.3 2.1 1L35 21l5 3.4c.7.5 1 1.2 1 2V30z" fill="#7a3c10" />
          <path d="M6 29.5l3.5-6.5c.5-1 1.5-1.7 2.7-1.9L17 20.5l3-4.2c.5-.7 1.3-1.1 2.1-1.1h6.4c.8 0 1.6.3 2.1 1L35 20.5l5 3.4c.7.5 1 1.2 1 2v3.6z" fill="#ff9d2e" />
          <path d="M20.5 20.3l2.4-3.3c.3-.4.8-.6 1.3-.6h4.6c.5 0 1 .2 1.3.6l3 3.3z" fill="#ffe9c4" opacity="0.9" />
          <rect x="6" y="29" width="35" height="2.6" rx="1.3" fill="#5e2c0c" />
          <circle cx="14.5" cy="31.5" r="4.6" fill="#141218" stroke="#3a3a44" strokeWidth="1.4" />
          <circle cx="14.5" cy="31.5" r="1.9" fill="#ffcf8a" />
          <circle cx="33.5" cy="31.5" r="4.6" fill="#141218" stroke="#3a3a44" strokeWidth="1.4" />
          <circle cx="33.5" cy="31.5" r="1.9" fill="#ffcf8a" />
          <circle cx="39.5" cy="24.5" r="1.6" fill="#fff6c9" />
        </g>
      );
    case "bomzhCars":
      return (
        <g>
          <ellipse cx="24" cy="37.5" rx="13" ry="2.4" fill="#000" opacity="0.45" />
          <circle cx="33" cy="10" r="2" fill="#8f8b93" opacity="0.5" />
          <circle cx="37" cy="7" r="1.4" fill="#8f8b93" opacity="0.35" />
          <path d="M10 22h26l3 5v4H10z" fill="#6b5b4c" />
          <path d="M10 21.5h26l3 5v4h-29z" fill="#c9a06a" />
          <path d="M15 21.5l3-5h10l4 5z" fill="#a37f52" stroke="#5e4a36" strokeWidth="1.2" />
          <rect x="10" y="25.5" width="29" height="2" fill="#5e4a36" opacity="0.8" />
          <rect x="18" y="22" width="6" height="5" fill="#4a3d30" opacity="0.7" />
          <circle cx="16" cy="31.5" r="4.2" fill="#141218" stroke="#3a3a44" strokeWidth="1.3" />
          <circle cx="16" cy="31.5" r="1.4" fill="#8f8b93" />
          <circle cx="33" cy="31.5" r="4.2" fill="#141218" stroke="#3a3a44" strokeWidth="1.3" />
          <circle cx="33" cy="31.5" r="1.4" fill="#8f8b93" />
          <rect x="7.5" y="28.5" width="4" height="2.4" rx="1" fill="#d7d7de" />
        </g>
      );
    case "clothes2026":
      return (
        <g>
          <ellipse cx="24" cy="38.5" rx="10" ry="2.2" fill="#000" opacity="0.45" />
          <path d="M17 11l-7 4.5 2.6 4.4 2.6-1.7V37h13.6V18.2l2.6 1.7L36 15.5 29 11a5 5 0 01-12 0z" fill="#4c3a8c" />
          <path d="M17.5 12.5L11.5 16l2 3.4 2.4-1.6V36h12.2V17.8l2.4 1.6 2-3.4-5.5-3.5a4 4 0 01-9.5 0z" fill="#a78bfa" />
          <path d="M20 11a4 4 0 018 0" fill="none" stroke="#2c2350" strokeWidth="1.8" />
          <path d="M21.5 20v6M26.5 20v6" stroke="#2c2350" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="21.5" cy="27.5" r="1.1" fill="#2c2350" />
          <circle cx="26.5" cy="27.5" r="1.1" fill="#2c2350" />
          <rect x="19" y="29" width="10" height="5" rx="2" fill="#2c2350" opacity="0.55" />
        </g>
      );
    case "moto2025":
      return (
        <g>
          <ellipse cx="24" cy="38" rx="14" ry="2.4" fill="#000" opacity="0.5" />
          <circle cx="12" cy="32" r="5.5" fill="#141218" stroke="#ff6b4a" strokeWidth="1.6" />
          <circle cx="12" cy="32" r="1.8" fill="#ffb59d" />
          <circle cx="36" cy="32" r="5.5" fill="#141218" stroke="#ff6b4a" strokeWidth="1.6" />
          <circle cx="36" cy="32" r="1.8" fill="#ffb59d" />
          <path d="M12 32l8-12h5l5 7 6 5" fill="none" stroke="#ff6b4a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 20l-1.5-5H28" fill="none" stroke="#ffd1c2" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20 20h7l2.5 5H24z" fill="#c22e2e" />
          <circle cx="38" cy="24" r="1.8" fill="#fff2c9" />
        </g>
      );
    case "moto2026":
      return (
        <g>
          <ellipse cx="24" cy="38" rx="14" ry="2.4" fill="#000" opacity="0.5" />
          <circle cx="12" cy="32" r="5.5" fill="#141218" stroke="#ff6b7a" strokeWidth="1.6" />
          <circle cx="12" cy="32" r="1.8" fill="#ffc9d1" />
          <circle cx="36" cy="32" r="5.5" fill="#141218" stroke="#ff6b7a" strokeWidth="1.6" />
          <circle cx="36" cy="32" r="1.8" fill="#ffc9d1" />
          <path d="M12 32l6-14 8-4 8 10 2 8" fill="none" stroke="#ff6b7a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 18l8-4 6 7-3 3h-7z" fill="#c81e5b" opacity="0.9" />
          <path d="M26 14l-1-5h4" fill="none" stroke="#ffd7de" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    case "phones2025":
    case "phones2026": {
      const scr1 = id === "phones2026" ? "#8fb8ff" : "#5ee7ff";
      const scr2 = id === "phones2026" ? "#5b4dff" : "#2e9dd8";
      return (
        <g>
          <ellipse cx="24" cy="39" rx="8" ry="2" fill="#000" opacity="0.45" />
          <rect x="15" y="7" width="18" height="31" rx="5" fill="#1b1e26" stroke={scr1} strokeWidth="1.8" />
          <rect x="17.5" y="11" width="13" height="22" rx="2.5" fill={scr2} />
          <rect x="17.5" y="11" width="13" height="22" rx="2.5" fill="#fff" opacity="0.15" />
          <circle cx="24" cy="15" r="2.4" fill="#fff" opacity="0.85" />
          <circle cx="20.5" cy="24" r="1.6" fill="#fff" opacity="0.7" />
          <circle cx="24.5" cy="24" r="1.6" fill="#fff" opacity="0.7" />
          <circle cx="28.5" cy="24" r="1.6" fill="#fff" opacity="0.7" />
          <circle cx="20.5" cy="28.5" r="1.6" fill="#fff" opacity="0.45" />
          <circle cx="24.5" cy="28.5" r="1.6" fill="#fff" opacity="0.45" />
          <rect x="21" y="35" width="6" height="1.8" rx="0.9" fill={scr1} />
        </g>
      );
    }
    case "axi2026":
      return (
        <g>
          <ellipse cx="24" cy="36" rx="13" ry="2.2" fill="#000" opacity="0.4" />
          <path d="M9 30l-3-8M39 30l3-8" stroke="#ffd76a" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="6" y="18" width="15" height="13" rx="6" fill="#3a2c10" stroke="#ffd76a" strokeWidth="1.8" />
          <rect x="27" y="18" width="15" height="13" rx="6" fill="#3a2c10" stroke="#ffd76a" strokeWidth="1.8" />
          <path d="M10 21l8 7M31 21l8 7" stroke="#fff" strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
          <path d="M21 23h6" stroke="#ffd76a" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="36" cy="14" r="1.4" fill="#fff" opacity="0.8" />
        </g>
      );
    case "cars2026":
      return (
        <g>
          <ellipse cx="24" cy="37.5" rx="14" ry="2.6" fill="#000" opacity="0.5" />
          <path d="M31 5l1.6 3.4L36 9.2l-2.4 2.2.6 3.6-3.2-1.8-3.2 1.8.6-3.6-2.4-2.2 3.4-.8z" fill="#ffe9a8" stroke="#ff8c1a" strokeWidth="1" />
          <path d="M6 30l3.5-6c.5-1 1.5-1.7 2.7-1.9l4.5-.6 3.2-4.4c.5-.7 1.3-1.1 2.1-1.1h6.6c.8 0 1.6.4 2.1 1.1l3.9 4.4 5 3.2c.7.4 1 1.2 1 2V30z" fill="#8a5a12" />
          <path d="M6 29.5l3.5-6c.5-1 1.5-1.7 2.7-1.9l4.5-.6 3.2-4.4c.5-.7 1.3-1.1 2.1-1.1h6.6c.8 0 1.6.4 2.1 1.1l3.9 4.4 5 3.2c.7.4 1 1.2 1 2v3.3z" fill="#ffd76a" />
          <path d="M20.7 20.8l2.5-3.4c.3-.4.8-.7 1.3-.7h4.8c.5 0 1 .2 1.3.7l3.1 3.4z" fill="#fff7dd" />
          <rect x="6" y="29" width="35.6" height="2.6" rx="1.3" fill="#6e460e" />
          <circle cx="14.5" cy="31.5" r="4.6" fill="#141218" stroke="#ffe9a8" strokeWidth="1.5" />
          <circle cx="14.5" cy="31.5" r="1.9" fill="#ff5ec4" />
          <circle cx="33.5" cy="31.5" r="4.6" fill="#141218" stroke="#ffe9a8" strokeWidth="1.5" />
          <circle cx="33.5" cy="31.5" r="1.9" fill="#ff5ec4" />
        </g>
      );
    case "retrocars2000s":
      return (
        <g>
          <ellipse cx="24" cy="37.5" rx="13.5" ry="2.5" fill="#000" opacity="0.5" />
          <path d="M8 24h30l3 4.5V32H8z" fill="#134e4a" />
          <path d="M8 23.5h30l3 4.5v4H8z" fill="#5eead4" />
          <path d="M14 23.5l3-6h13l3.5 6z" fill="#134e4a" />
          <path d="M15.5 23.5l2.6-4.8h11.3l2.8 4.8z" fill="#d9fbF3" opacity="0.85" />
          <rect x="5.5" y="29" width="37" height="2.6" rx="1.3" fill="#d7d7de" />
          <rect x="5.5" y="24.5" width="4" height="3" rx="0.8" fill="#fff9c9" />
          <rect x="38.5" y="24.5" width="4" height="3" rx="0.8" fill="#ff9d9d" />
          <circle cx="15" cy="32" r="4" fill="#141218" stroke="#e6e6ee" strokeWidth="1.4" />
          <circle cx="15" cy="32" r="2.2" fill="none" stroke="#e6e6ee" strokeWidth="1" />
          <circle cx="33" cy="32" r="4" fill="#141218" stroke="#e6e6ee" strokeWidth="1.4" />
          <circle cx="33" cy="32" r="2.2" fill="none" stroke="#e6e6ee" strokeWidth="1" />
        </g>
      );
    case "teslaExclusive2026":
      return (
        <g>
          <ellipse cx="24" cy="38" rx="11" ry="2.2" fill="#000" opacity="0.45" />
          <circle cx="24" cy="23" r="13" fill="#0e2b24" stroke="#5df2c0" strokeWidth="1.8" />
          <circle cx="24" cy="23" r="13" fill="#5df2c0" opacity="0.12" />
          <path d="M26.5 12L15.5 26h7l-1.5 10L32 21.5h-7l1.5-9.5z" fill="#5df2c0" />
          <path d="M20 10v-3M28 10V7" stroke="#5df2c0" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "secret2026":
      return (
        <g>
          <ellipse cx="24" cy="38" rx="11" ry="2.2" fill="#000" opacity="0.45" />
          <circle cx="16" cy="16" r="7" fill="none" stroke="#c9c5d1" strokeWidth="2.6" />
          <circle cx="16" cy="16" r="3" fill="none" stroke="#5b5666" strokeWidth="1.6" />
          <path d="M21 21l14 14" stroke="#c9c5d1" strokeWidth="3" strokeLinecap="round" />
          <path d="M31 31l3.5-.5-.5 3.5M35 35l2.5 2.5" stroke="#c9c5d1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#ffd76a" />
          <path d="M11 33l.8 1.6 1.6.8-1.6.8L11 38l-.8-1.8-1.6-.8 1.6-.8z" fill="#8f8b93" />
        </g>
      );
    case "mix2026":
      return (
        <g>
          <ellipse cx="24" cy="38.5" rx="11" ry="2.4" fill="#000" opacity="0.45" />
          <rect x="13" y="17" width="22" height="20" rx="3" fill="#241b3d" stroke="#c084fc" strokeWidth="1.8" />
          <rect x="13" y="17" width="22" height="7" rx="3" fill="#c084fc" />
          <rect x="13" y="21" width="22" height="3" fill="#c084fc" />
          <text x="24" y="35.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff" fontFamily="Arial, sans-serif">?</text>
          <circle cx="37" cy="12" r="1.5" fill="#ff5e7a" />
          <circle cx="10" cy="13" r="1.5" fill="#5ee7ff" />
          <circle cx="39" cy="30" r="1.5" fill="#ffd76a" />
          <path d="M8 24l1.5 1.5L8 27l-1.5-1.5z" fill="#c6ff3d" />
        </g>
      );
    case "manyusha":
    default:
      return (
        <g>
          <ellipse cx="24" cy="38.5" rx="12" ry="2.4" fill="#000" opacity="0.45" />
          <rect x="10" y="15" width="28" height="22" rx="2.5" fill="#5e4426" stroke="#c6ff3d" strokeWidth="1.6" />
          <rect x="10" y="15" width="28" height="22" rx="2.5" fill="#c6ff3d" opacity="0.08" />
          <path d="M10 20h28M10 26.5h28M10 32h28" stroke="#3d2c15" strokeWidth="1.4" />
          <path d="M22.5 15v22M25.5 15v22" stroke="#3d2c15" strokeWidth="1.4" />
          <rect x="10" y="15" width="28" height="4.5" fill="#8a6a3f" />
          <rect x="17" y="13" width="14" height="4" rx="1.5" fill="#2c2113" stroke="#c6ff3d" strokeWidth="1.2" />
          <path d="M13 33l4-3M35 33l-4-3" stroke="#c6ff3d" strokeWidth="1.4" opacity="0.7" strokeLinecap="round" />
        </g>
      );
  }
}

export function CaseIcon({ id, size = 40 }) {
  const edge = EDGE[id] || EDGE.manyusha;
  const s = size;
  const gid = `dci-${id}`;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="48" y2="48">
          <stop offset="0" stopColor="#2a2536" />
          <stop offset="1" stopColor="#131118" />
        </linearGradient>
        <radialGradient id={`${gid}-gl`} cx="24" cy="16" r="24">
          <stop offset="0" stopColor={edge} stopOpacity="0.4" />
          <stop offset="1" stopColor={edge} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill={`url(#${gid}-bg)`} stroke={edge} strokeOpacity="0.65" strokeWidth="1.6" />
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill={`url(#${gid}-gl)`} />
      <rect x="1.5" y="1.5" width="45" height="14" rx="12" fill="#fff" opacity="0.05" />
      <Glyph id={id} />
    </svg>
  );
}

export const CASE_TILE_COLORS = EDGE;
