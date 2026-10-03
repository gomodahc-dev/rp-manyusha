// Иконки кейсов в стиле Majestic RP: тёмная плашка + неоновый градиент + свой глиф.
// Заменяют boxIcon-эмодзи. Использование: <CaseIcon id="manyusha" size={40} />
// Для usesKeys-кейса (secret2026) рисуем ключ, для капсул остаётся CapsuleIcon.

const TILES = {
  manyusha: ["#c6ff3d", "#4ade80"],
  ksyusha: ["#ff7ad9", "#a855f7"],
  cars2025: ["#ffd76a", "#ff8c1a"],
  bomzhCars: ["#b08968", "#6b5b4c"],
  clothes2026: ["#b892ff", "#6d5cff"],
  moto2025: ["#ff9a3d", "#ff2e4d"],
  phones2025: ["#7cf5ff", "#3f8cff"],
  phones2026: ["#8fb8ff", "#5b4dff"],
  axi2026: ["#ffe45e", "#ff9d2e"],
  cars2026: ["#ffe9a8", "#ff5ec4"],
  retrocars2000s: ["#5eead4", "#2e7dff"],
  teslaExclusive2026: ["#9df3ff", "#2ee6a8"],
  moto2026: ["#ff6b6b", "#c81e5b"],
  secret2026: ["#8f8b93", "#3a3742"],
  mix2026: ["#ff2e4d", "#7c3aed"],
};

function Glyph({ id }) {
  switch (id) {
    case "ksyusha":
      return (
        <g stroke="url(#g-ksyusha-fg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="11" y="17" width="26" height="19" rx="2.5" fill="url(#g-ksyusha-fg)" fillOpacity="0.22" />
          <path d="M24 17v19M11 24h26" />
          <path d="M24 17c-4 0-9-2-9-6 0-2.5 2-4 4-4 3 0 4.5 4 5 10zm0 0c4 0 9-2 9-6 0-2.5-2-4-4-4-3 0-4.5 4-5 10z" fill="url(#g-ksyusha-fg)" fillOpacity="0.35" />
        </g>
      );
    case "cars2025":
    case "cars2026":
      return (
        <g fill="none" stroke="url(#g-cars-fg)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 28l4-8c.6-1.2 1.6-2 3-2h11l8 6v8" />
          <path d="M8 28h32" strokeWidth="2.8" />
          <circle cx="15" cy="32.5" r="3.4" fill="#141218" />
          <circle cx="33" cy="32.5" r="3.4" fill="#141218" />
          <path d="M19 20l3-4h7l4 4" strokeWidth="2" />
        </g>
      );
    case "bomzhCars":
    case "retrocars2000s":
      return (
        <g fill="none" stroke="url(#g-retro-fg)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="19" width="30" height="11" rx="4" />
          <path d="M13 19l4-5h11l5 5" />
          <circle cx="16" cy="32" r="3.2" fill="#141218" />
          <circle cx="32" cy="32" r="3.2" fill="#141218" />
          <path d="M9 25h30" strokeWidth="1.6" opacity="0.7" />
        </g>
      );
    case "clothes2026":
      return (
        <g fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" stroke="url(#g-clo-fg)">
          <path d="M18 10L10 15l3 5 3-2v16h16V18l3 2 3-5-8-5a6 6 0 01-12 0z" fill="url(#g-clo-fg)" fillOpacity="0.2" />
        </g>
      );
    case "moto2025":
    case "moto2026":
      return (
        <g fill="none" stroke="url(#g-moto-fg)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13" cy="32" r="5" />
          <circle cx="35" cy="32" r="5" />
          <path d="M13 32l7-11h6l4 6M26 21l-2-5h5" />
          <path d="M20 32h8" strokeWidth="2.8" />
        </g>
      );
    case "phones2025":
    case "phones2026":
      return (
        <g fill="none" strokeWidth="2.4" strokeLinecap="round">
          <rect x="16" y="8" width="16" height="32" rx="4" stroke="url(#g-ph-fg)" fill="url(#g-ph-fg)" fillOpacity="0.15" />
          <path d="M22 34h4" stroke="url(#g-ph-fg)" strokeWidth="2.8" />
          <circle cx="24" cy="13" r="1.4" fill="url(#g-ph-fg)" stroke="none" />
        </g>
      );
    case "axi2026":
      return (
        <g fill="none" stroke="url(#g-axi-fg)" strokeWidth="2.4" strokeLinecap="round">
          <circle cx="16" cy="24" r="6" />
          <circle cx="32" cy="24" r="6" />
          <path d="M22 24h4M10 22L6 18M38 22l4-4" />
        </g>
      );
    case "teslaExclusive2026":
      return (
        <path d="M26 7L13 27h9l-2 14 14-21h-9l1-13z" fill="url(#g-tes-fg)" opacity="0.95" />
      );
    case "secret2026":
      return (
        <g fill="none" stroke="url(#g-sec-fg)" strokeWidth="2.6" strokeLinecap="round">
          <circle cx="17" cy="17" r="7" />
          <path d="M22 22l13 13M32 32l3-3M35 35l2.5-2.5" />
        </g>
      );
    case "mix2026":
      return (
        <g fill="none" stroke="url(#g-mix-fg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="13" height="13" rx="3" transform="rotate(-8 10 10)" />
          <rect x="25" y="25" width="13" height="13" rx="3" transform="rotate(-8 25 25)" />
          <path d="M30 12l6-2-2 6" />
        </g>
      );
    case "manyusha":
    default:
      return (
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="10" y="14" width="28" height="22" rx="3" fill="url(#g-man-fg)" fillOpacity="0.25" stroke="url(#g-man-fg)" strokeWidth="2.6" />
          <path d="M10 21h28M24 14v22" stroke="url(#g-man-fg)" strokeWidth="2.6" />
          <path d="M24 14v-4h-6l6-3 6 3h-6" fill="url(#g-man-fg)" stroke="none" opacity="0.9" />
        </g>
      );
  }
}

// Единые id градиентов: глифы ссылаются на g-<key>-fg, поэтому рендерим defs здесь.
const GRAD_KEYS = ["man", "ksyusha", "cars", "retro", "clo", "moto", "ph", "axi", "tes", "sec", "mix"];
const GRAD_COLORS = {
  man: ["#c6ff3d", "#4ade80"],
  ksyusha: ["#ff7ad9", "#a855f7"],
  cars: ["#ffd76a", "#ff8c1a"],
  retro: ["#5eead4", "#2e7dff"],
  clo: ["#b892ff", "#6d5cff"],
  moto: ["#ff9a3d", "#ff2e4d"],
  ph: ["#7cf5ff", "#3f8cff"],
  axi: ["#ffe45e", "#ff9d2e"],
  tes: ["#9df3ff", "#2ee6a8"],
  sec: ["#c9c5d1", "#5b5666"],
  mix: ["#ff5e7a", "#7c3aed"],
};

function gradKeyFor(id) {
  if (id === "manyusha") return "man";
  if (id === "ksyusha") return "ksyusha";
  if (id === "cars2025" || id === "cars2026") return "cars";
  if (id === "bomzhCars" || id === "retrocars2000s") return "retro";
  if (id === "clothes2026") return "clo";
  if (id === "moto2025" || id === "moto2026") return "moto";
  if (id === "phones2025" || id === "phones2026") return "ph";
  if (id === "axi2026") return "axi";
  if (id === "teslaExclusive2026") return "tes";
  if (id === "secret2026") return "sec";
  if (id === "mix2026") return "mix";
  return "man";
}

export function CaseIcon({ id, size = 40 }) {
  const [c1, c2] = TILES[id] || TILES.manyusha;
  const s = size;
  const gid = `ci-${id}`;
  const gk = gradKeyFor(id);
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        {GRAD_KEYS.map((k) => (
          <linearGradient key={k} id={`g-${k}-fg`} x1="8" y1="8" x2="40" y2="40">
            <stop offset="0" stopColor={GRAD_COLORS[k][0]} />
            <stop offset="1" stopColor={GRAD_COLORS[k][1]} />
          </linearGradient>
        ))}
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="48" y2="48">
          <stop offset="0" stopColor="#26232e" />
          <stop offset="1" stopColor="#141218" />
        </linearGradient>
        <radialGradient id={`${gid}-gl`} cx="24" cy="18" r="24">
          <stop offset="0" stopColor={c2} stopOpacity="0.45" />
          <stop offset="1" stopColor={c2} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="11" fill={`url(#${gid}-bg)`} stroke={c2} strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="2" y="2" width="44" height="44" rx="11" fill={`url(#${gid}-gl)`} />
      <Glyph id={id} gk={gk} />
    </svg>
  );
}

export const CASE_TILE_COLORS = TILES;
