import { CASE_BY_ID } from "./cases.js";
import { fmtMoney } from "../game/logic.js";
import { bumpEcon } from "../game/logic.js";

export function bpRewardIcon(reward) {
  if (!reward) return "❔";
  if (reward.type === "money") return "🪙";
  if (reward.type === "parts") return "🔩";
  if (reward.type === "case") return CASE_BY_ID[reward.caseId]?.boxIcon || "📦";
  if (reward.type === "vip") return "🌈";
  if (reward.type === "key") return "🗝️";
  if (reward.type === "item") return reward.icon || "🎁";
  return "❔";
}

export function bpRewardLabel(reward) {
  if (!reward) return "";
  if (reward.type === "money") return `${fmtMoney(reward.amount)} МК`;
  if (reward.type === "parts") return `${reward.amount} деталей`;
  if (reward.type === "case") {
    const c = CASE_BY_ID[reward.caseId];
    return `${reward.qty} × ${c ? c.name : reward.caseId}`;
  }
  if (reward.type === "vip") return `VIP на ${reward.hours}ч`;
  if (reward.type === "key") return `${reward.qty} × ключ секретного кейса`;
  if (reward.type === "item") return reward.qty > 1 ? `${reward.qty} × ${reward.name}` : reward.name;
  return "";
}

export const BP_EXP_PER_PAYDAY = 130;

export const BP_EXP_PER_PAYDAY_VIP = 260;

export const BP_MAX_LEVEL = 30;

export const BP_MILESTONE_LEVELS = new Set([5, 10, 15, 20, 25, 30]);
// требование опыта для перехода с уровня i на i+1 (индекс 0 = до уровня 1)

export const BP_EXP_TABLE = [
  800, 800, 800, 950, 950, 1000, 1000, 1000, 1000, 1200,
  1200, 1200, 1200, 1200, 1200, 1400, 1400, 1400, 1400, 1400,
  1400, 1600, 1600, 1600, 1600, 1600, 1600, 1600, 1600, 1600,
];

export function bpMoney(amount) {
  return { type: "money", amount };
}

export function bpParts(amount) {
  return { type: "parts", amount };
}

export function bpCase(caseId, qty) {
  return { type: "case", caseId, qty };
}

export function bpVip(hours) {
  return { type: "vip", hours };
}

export function bpKey(qty) {
  return { type: "key", qty };
}

export function bpItem(def) {
  return { type: "item", qty: 1, ...def };
}

export const BP_FREE_REWARDS = [
  bpMoney(200),
  bpMoney(200),
  bpMoney(250),
  bpItem({ name: "Банка пива", p: 275, icon: "🍺", rarity: 55, qty: 2 }),
  bpItem({ name: "Чехол на телефон", p: 250, icon: "📱", rarity: 45 }),
  bpMoney(350),
  bpMoney(350),
  bpMoney(350),
  bpCase("ksyusha", 2),
  bpItem({ name: "Тренч", p: 1100, icon: "🥼", rarity: 25 }),
  bpMoney(500),
  bpMoney(500),
  bpCase("phones2025", 1),
  bpMoney(600),
  bpCase("cars2025", 2),
  bpParts(200),
  bpParts(200),
  bpMoney(700),
  bpMoney(700),
  bpItem({ name: "Porsche 911", p: 7425, icon: "🏁", iconSvg: "sport", rarity: 40, topSpeed: 230, category: "cars" }),
  bpKey(1),
  bpParts(300),
  bpMoney(900),
  bpMoney(900),
  bpCase("retrocars2000s", 2),
  bpItem({ name: "Lifan KP200", p: 4700, icon: "🏍️", rarity: 25, topSpeed: 180 }),
  bpMoney(1000),
  bpMoney(1200),
  bpItem({
    name: "Банка Red Bull",
    p: 2200,
    icon: "🥫",
    rarity: 25,
    buff: { type: "discount", pct: 0.1, durationMs: 4 * 60000 },
    buffLabel: "-10% к цене кейсов на 4 минуты",
  }),
  bpItem({ name: "BMW M5 E60", p: 10850, icon: "🚙", rarity: 25, topSpeed: 280, category: "cars" }),
];

export const BP_PAID_REWARDS = [
  bpMoney(150),
  bpMoney(150),
  bpCase("phones2025", 1),
  bpParts(100),
  bpItem({ name: "Часы ROLEX", p: 1450, icon: "⌚", rarity: 15 }),
  bpMoney(300),
  bpMoney(300),
  bpParts(150),
  bpCase("ksyusha", 2),
  bpItem({ name: "Ветрозащитный анорак", p: 1350, icon: "🧥", rarity: 25 }),
  bpMoney(450),
  bpMoney(450),
  bpParts(200),
  bpCase("cars2025", 1),
  bpMoney(1000),
  bpParts(150),
  bpItem({ name: "Маска Дарт Вейдера", p: 3850, icon: "🎭", rarity: 25 }),
  bpMoney(600),
  bpParts(300),
  bpItem({ name: "BMW M7 Expert", p: 14250, icon: "🚙", rarity: 20, topSpeed: 290, category: "cars" }),
  bpCase("retrocars2000s", 1),
  bpParts(250),
  bpMoney(750),
  bpMoney(750),
  bpParts(300),
  bpCase("clothes2026", 4),
  bpMoney(1000),
  bpParts(500),
  bpItem({
    name: "Банка Red Bull",
    p: 2200,
    icon: "🥫",
    rarity: 25,
    qty: 2,
    buff: { type: "discount", pct: 0.1, durationMs: 4 * 60000 },
    buffLabel: "-10% к цене кейсов на 4 минуты",
  }),
  bpItem({ name: "Porsche Carrera GT", p: 14350, icon: "🏎️", iconSvg: "hyper", rarity: 15, topSpeed: 245, category: "cars" }),
];

export function applyBpExp(state, amount) {
  if (!amount) return state;
  let bpLevel = state.bpLevel || 0;
  let bpProgressExp = (state.bpProgressExp || 0) + amount;
  while (bpLevel < BP_MAX_LEVEL && bpProgressExp >= (BP_EXP_TABLE[bpLevel] || Infinity)) {
    bpProgressExp -= BP_EXP_TABLE[bpLevel];
    bpLevel += 1;
  }
  if (bpLevel >= BP_MAX_LEVEL) bpProgressExp = 0;
  return { ...state, bpLevel, bpProgressExp };
}

export function applyBpReward(state, reward) {
  if (!reward) return state;
  if (reward.type === "money") {
    return bumpEcon({ ...state, balance: state.balance + reward.amount }, { earn: reward.amount });
  }
  if (reward.type === "parts") {
    return { ...state, parts: (state.parts || 0) + reward.amount };
  }
  if (reward.type === "case") {
    return {
      ...state,
      cases: { ...state.cases, [reward.caseId]: (state.cases[reward.caseId] || 0) + reward.qty },
    };
  }
  if (reward.type === "vip") {
    const base = Math.max(state.vipUntil || 0, Date.now());
    return { ...state, vipUntil: base + reward.hours * 3600000 };
  }
  if (reward.type === "key") {
    return { ...state, keys: (state.keys || 0) + reward.qty };
  }
  if (reward.type === "item") {
    const qty = reward.qty || 1;
    const entries = Array.from({ length: qty }).map((_, i) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-bp${i}`,
      name: reward.name,
      w: reward.rarity,
      p: reward.p,
      icon: reward.icon,
      iconImg: reward.iconImg,
      iconSvg: reward.iconSvg,
      rarity: reward.rarity,
      topSpeed: reward.topSpeed,
      category: reward.category,
      buff: reward.buff,
      buffLabel: reward.buffLabel,
    }));
    return { ...state, inventory: [...entries, ...state.inventory] };
  }
  return state;
}
