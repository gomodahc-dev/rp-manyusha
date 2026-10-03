import { RARITY, ITEM_W } from "../data/economy.js";
import { fmtMoney } from "../game/logic.js";
import { CASE_BY_ID } from "../data/cases.js";

export function Hazard({ className = "" }) {
  return (
    <div className={`w-full ${className}`} style={{ padding: "10px 0 2px" }}>
      <div
        style={{
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #7c5cffcc 20%, #ffd76acc 50%, #ff5ec4cc 80%, transparent)",
          boxShadow: "0 0 12px #7c5cff66",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export function rarityOf(item) {
  return RARITY[item.rarity ?? item.w];
}

export const CAR_SVG = {
  hatch: {
    viewBox: "0 0 64 32",
    body: "M6 22 L6 18 Q6 14 10 13 L16 13 L20 8 Q22 6 25 6 L38 6 Q41 6 43 8 L47 13 L54 13 Q58 13 58 17 L58 22 Z",
    wheels: [
      [16, 24],
      [48, 24],
    ],
    r: 5,
  },
  sport: {
    viewBox: "0 0 64 28",
    body: "M4 20 L4 17 Q4 15 7 14 L14 13 L20 7 Q23 5 28 5 L36 5 Q40 6 42 9 L46 13 L57 14 Q60 15 60 18 L60 20 Z",
    wheels: [
      [15, 22],
      [47, 22],
    ],
    r: 4.5,
  },
  hyper: {
    viewBox: "0 0 64 26",
    body: "M3 19 L3 17 Q3 15 6 14 L12 12 L18 6 Q21 4 27 4 L34 4 Q38 5 40 8 L44 12 L54 12 L54 8 L58 8 L58 13 Q61 15 61 17 L61 19 Z",
    wheels: [
      [13, 21],
      [49, 21],
    ],
    r: 4,
  },
};

export function CarIcon({ variant, color, size = 28 }) {
  const s = CAR_SVG[variant] || CAR_SVG.hatch;
  return (
    <svg width={size} height={size} viewBox={s.viewBox} preserveAspectRatio="xMidYMid meet">
      <path d={s.body} fill={color} />
      {s.wheels.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={s.r} fill="#17151a" stroke={color} strokeWidth="2" />
      ))}
    </svg>
  );
}

export function ItemIcon({ item, size = 26 }) {
  if (item.iconImg) {
    return (
      <img
        src={item.iconImg}
        alt={item.name}
        style={{ width: size * 1.5, height: size * 1.5, objectFit: "contain", display: "block" }}
      />
    );
  }
  if (item.iconSvg) {
    return <CarIcon variant={item.iconSvg} color={rarityOf(item).color} size={size} />;
  }
  return (
    <span style={{ fontSize: size, lineHeight: 1 }}>{item.icon || "🗑️"}</span>
  );
}

export function CapsuleIcon({ size = 40, shaking = false, variant = "avangard" }) {
  const h = size;
  const w = size * 2.1;
  const isOpium = variant === "opium";
  const gradient = isOpium
    ? `linear-gradient(90deg, #ff2e4d 0%, #ff2e4d 48%, #17151a 48%, #17151a 52%, #7c1a2e 52%, #7c1a2e 100%)`
    : `linear-gradient(90deg, #ff5e2e 0%, #ff5e2e 48%, #17151a 48%, #17151a 52%, #7cf5ff 52%, #7cf5ff 100%)`;
  const glowShadow = isOpium
    ? "0 0 18px #ff2e4d55, 0 0 18px #7c1a2e55"
    : "0 0 18px #ff5e2e55, 0 0 18px #7cf5ff55";
  return (
    <div
      className={shaking ? "capsule-shake" : ""}
      style={{
        width: w,
        height: h,
        borderRadius: h / 2,
        background: gradient,
        border: "2px solid #2c2930",
        boxShadow: glowShadow,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: h * 0.15,
          left: w * 0.1,
          width: w * 0.25,
          height: h * 0.22,
          borderRadius: 999,
          background: "#ffffff55",
        }}
      />
    </div>
  );
}

export function Chip({ item }) {
  const r = rarityOf(item);
  return (
    <span
      className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm"
      style={{ color: "#121014", backgroundColor: r.color }}
    >
      {r.label}
    </span>
  );
}

export function ReelCard({ item, revealed }) {
  const r = rarityOf(item);
  const rk = item.rarity ?? item.w;
  const glow = rk <= 40; // ambient glow starts at "Редкое" and rarer
  const shimmer = rk <= 25; // pulsing shimmer starts at "Легенда" and rarer
  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center justify-between rounded-md p-2 ${
        shimmer ? "item-shimmer" : ""
      }`}
      style={{
        width: ITEM_W - 8,
        margin: "0 4px",
        height: 128,
        background: "linear-gradient(180deg, #201d24 0%, #17151a 100%)",
        border: `1px solid ${glow ? r.color : "#2c2930"}`,
        boxShadow: glow
          ? `0 0 12px ${r.color}66${revealed ? `, inset 0 0 12px ${r.color}55` : ""}`
          : "none",
        "--glow-color": r.color,
      }}
    >
      <div
        className="w-full flex-1 rounded flex items-center justify-center text-3xl"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${r.color}33, #121014 75%)`,
        }}
      >
        <ItemIcon item={item} size={52} />
      </div>
      <div
        className="text-[10px] leading-tight text-center mt-1 line-clamp-2"
        style={{ color: "#e8e5df", minHeight: 26 }}
      >
        {item.name}
      </div>
      <Chip item={item} />
    </div>
  );
}

export function Avatar({ size = 40, vip = false }) {
  const inner = (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: "#2c2930",
        border: "1px solid #3a3740",
        overflow: "hidden",
      }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8.2" r="4" fill="#5c5860" />
        <path d="M3.5 20.5c0-4.7 3.8-8 8.5-8s8.5 3.3 8.5 8" fill="#5c5860" />
      </svg>
    </div>
  );
  if (!vip) return inner;
  const ringPad = Math.max(2, Math.round(size * 0.06));
  return (
    <div
      className="vip-ring rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size + ringPad * 2,
        height: size + ringPad * 2,
        padding: ringPad,
      }}
    >
      {inner}
    </div>
  );
}

export function BpNode({ level, reward, unlocked, claimed, milestone, dimmed, onClaim }) {
  const boxSize = milestone ? 104 : 80;
  const iconSize = milestone ? 46 : 34;
  const nodeWidth = milestone ? 122 : 100;
  return (
    <div className="flex flex-col items-center flex-shrink-0" style={{ width: nodeWidth }}>
      <div className="relative" style={{ width: boxSize, height: boxSize }}>
        <div
          className="rounded-2xl flex items-center justify-center w-full h-full"
          style={{
            fontSize: iconSize,
            background: claimed
              ? "linear-gradient(160deg, #223a24, #17211a)"
              : milestone
              ? "linear-gradient(160deg, #3a2f14, #201a0c)"
              : "linear-gradient(160deg, #1f1c22, #17151a)",
            border: `2px solid ${claimed ? "#4ade80" : milestone ? "#ffcc4d" : "#2c2930"}`,
            boxShadow: milestone && !dimmed && unlocked ? "0 0 18px #ffcc4d77" : "none",
            filter: dimmed ? "grayscale(1)" : "none",
            opacity: dimmed ? 0.45 : 1,
          }}
        >
          {bpRewardIcon(reward)}
        </div>
        <div
          className="absolute -top-2 -left-2 rounded-full flex items-center justify-center text-[11px] font-extrabold"
          style={{
            width: 24,
            height: 24,
            background: unlocked ? "#c6ff3d" : "#2c2930",
            color: unlocked ? "#121014" : "#8f8b93",
            border: "2px solid #121014",
          }}
        >
          {level}
        </div>
        {!unlocked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl"
            style={{ background: "#00000066" }}
          >
            <span style={{ fontSize: milestone ? 26 : 18 }}>🔒</span>
          </div>
        )}
        {claimed && !dimmed && (
          <div
            className="absolute -bottom-2 -right-2 rounded-full flex items-center justify-center"
            style={{ width: 24, height: 24, background: "#4ade80", border: "2px solid #121014" }}
          >
            <span style={{ fontSize: 13 }}>✓</span>
          </div>
        )}
      </div>
      <div
        className="text-[10px] text-center leading-tight px-0.5 mt-2 font-semibold"
        style={{ color: dimmed ? "#5c5860" : "#c7c4cc", maxWidth: nodeWidth, minHeight: 26 }}
      >
        {bpRewardLabel(reward)}
      </div>
      <div style={{ minHeight: 24 }}>
        {unlocked &&
          !dimmed &&
          (claimed ? (
            <div className="text-[10px] font-bold" style={{ color: "#4ade80" }}>
              Забрано
            </div>
          ) : (
            <button
              onClick={onClaim}
              className="text-[10px] font-bold px-2.5 py-1 rounded-md"
              style={{ background: "#c6ff3d", color: "#121014" }}
            >
              Забрать
            </button>
          ))}
      </div>
    </div>
  );
}

// Манюша Коин — внутриигровая валюта, золотая монета с буквой «М»,
// чтобы визуально не путаться с реальными деньгами (₴/₽) в донат-меню.

export function Coin({ size = 14, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "inline-block", verticalAlign: "-2px", flexShrink: 0, ...style }}
      aria-label="МК"
    >
      <circle cx="12" cy="12" r="10.2" fill="#ffcc4d" stroke="#a3720a" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="7.6" fill="none" stroke="#a3720a" strokeWidth="0.8" opacity="0.5" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="900"
        fill="#8a5c10"
        fontFamily="Arial, sans-serif"
      >
        M
      </text>
    </svg>
  );
}

/* ---------- persistence ---------- */
