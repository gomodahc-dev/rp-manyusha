export const CASINO_MIN_BET = 800;

export const CASINO_MAX_BET = 20000;

export const CASINO_COLORS = ["red", "blue", "yellow"];

export const CASINO_COLOR_HEX = { red: "#ff2e4d", blue: "#38bdf8", yellow: "#ffcc4d" };

export const CASINO_COLOR_LABEL = { red: "Красная", blue: "Синяя", yellow: "Жёлтая" };
// 9 секторов рулетки по 40°, каждый цвет встречается 3 раза для честного 1/3 шанса

export const CASINO_WHEEL_SEGMENTS = ["red", "blue", "yellow", "red", "blue", "yellow", "red", "blue", "yellow"];

export const CASINO_SEGMENT_ANGLE = 360 / CASINO_WHEEL_SEGMENTS.length;

export const CASINO_WHEEL_GRADIENT = `conic-gradient(from 0deg, ${CASINO_WHEEL_SEGMENTS.map(
  (c, i) => `${CASINO_COLOR_HEX[c]} ${i * CASINO_SEGMENT_ANGLE}deg ${(i + 1) * CASINO_SEGMENT_ANGLE}deg`
).join(", ")})`;

export const CASINO_SPIN_MS = 4200;

export const DAILY_WHEEL_REWARDS = [
  { type: "money", amount: 100, color: "#ff2e4d", label: "100 МК", icon: "🪙" },
  { type: "money", amount: 200, color: "#ff8c1a", label: "200 МК", icon: "🪙" },
  { type: "money", amount: 300, color: "#ffcc4d", label: "300 МК", icon: "🪙" },
  { type: "money", amount: 500, color: "#4ade80", label: "500 МК", icon: "🪙" },
  { type: "bpExp", amount: 80, color: "#38bdf8", label: "80 EXP к БП", icon: "💧" },
  { type: "bpExp", amount: 160, color: "#7c3aed", label: "160 EXP к БП", icon: "💧" },
  { type: "parts", amount: 150, color: "#a78bfa", label: "150 деталей", icon: "🔩" },
  { type: "case", caseId: "retrocars2000s", qty: 1, color: "#ff2ec4", label: "Ретро машины 2000-х", icon: "📦" },
];

export const DAILY_WHEEL_SPIN_MS = 5000;

export const DAILY_WHEEL_COOLDOWN_MS = 24 * 3600000;

export const DAILY_WHEEL_SEGMENT_ANGLE = 360 / DAILY_WHEEL_REWARDS.length;

export const DAILY_WHEEL_GRADIENT = `conic-gradient(from 0deg, ${DAILY_WHEEL_REWARDS.map(
  (r, i) => `${r.color} ${i * DAILY_WHEEL_SEGMENT_ANGLE}deg ${(i + 1) * DAILY_WHEEL_SEGMENT_ANGLE}deg`
).join(", ")})`;

export function moneyDots(n, seed) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    const s = (seed + 1) * 977 + i * 313;
    arr.push({
      top: s % 100,
      left: (s * 37) % 100,
      rot: (s * 13) % 360,
      size: 14 + (s % 16),
    });
  }
  return arr;
}
