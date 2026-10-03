export const DONATE_PACKS = [
  { id: "bomj", name: "Бомж Пак", icon: "🥫", coins: 27000, priceUah: 180 },
  { id: "student", name: "Пак Студента", icon: "🎒", coins: 50000, priceUah: 250 },
  { id: "reseller", name: "Пак Перекупа", icon: "🚗", coins: 140000, priceUah: 550 },
  { id: "mazhor", name: "Пак Мажора", icon: "👑", coins: 500000, priceUah: 1650 },
];

export const RUB_MULTIPLIER = 1.8;

export const VIP_PACKS = [
  { id: "vip2", label: "2 дня", hours: 48, priceUah: 115 },
  { id: "vip10", label: "10 дней", hours: 240, priceUah: 345 },
];

export const PROMO_CODES = {
  firstopen: { reward: 1500, label: "1500 МК" },
  opium: { reward: 5000, label: "5000 МК", globalLimit: 20 },
  vipkd4: { vipHours: 48, label: "Manyusha VIP на 48ч", globalLimit: 10 },
};

export function normalizePromo(code) {
  return (code || "").trim().toLowerCase().replace(/\s+/g, "");
}

export const RELICS = [
  {
    id: "bugattiVgt",
    name: "Bugatti Vision Gran Turismo",
    partsNeeded: 3200,
    p: 22000,
    icon: "🏎️",
    iconSvg: "hyper",
    category: "cars",
    rarity: 1,
    topSpeed: 365,
  },
  {
    id: "quantumPhone",
    name: "Quantum Hologram Phone",
    partsNeeded: 2600,
    p: 17000,
    icon: "📱",
    category: "phones",
    rarity: 1,
  },
  {
    id: "rgbCyberSuit",
    name: "RGB Cyber-Tech Костюм",
    partsNeeded: 2600,
    p: 17000,
    icon: "🥼",
    category: "clothes",
    rarity: 1,
  },
  {
    id: "cyberJetMantis",
    name: "Cyber-JET VTOL Mantis",
    partsNeeded: 20000,
    p: 95000,
    icon: "🛩️",
    category: "items",
    rarity: 1,
    rainbow: true,
    buffType: "jetPayday",
    buffEffect: "+35% к каждому из 7 Payday за день (округление вниз)",
    buffLabel: "+35% к каждому из 7 Payday за день (округление вниз). Не пропадает после активации, КД 24ч.",
  },
  {
    id: "chronosWatch",
    name: "Chronos Watshpiece",
    partsNeeded: 5000,
    p: 20000,
    icon: "⏱️",
    category: "items",
    rarity: 1,
    buffType: "fastPayday",
    buffEffect: "Payday каждые 50 минут вместо 60 (все 7 за день)",
    buffLabel: "Payday каждые 50 минут вместо 60 (все 7 за день). Не пропадает после активации, КД 24ч.",
  },
  {
    id: "compensationCrystal",
    name: "Кристалл Компенсации",
    partsNeeded: 16000,
    p: 70000,
    icon: "🔮",
    category: "items",
    rarity: 1,
    rainbow: true,
    buffType: "compensate",
    buffEffect: "+10% к цене дропа, если он дешевле кейса — на первые 50 открытых кейсов",
    buffLabel: "+10% к цене дропа, если он дешевле кейса — на первые 50 открытых кейсов. Не пропадает после активации, КД 24ч.",
  },
];

export const RELIC_BY_ID = Object.fromEntries(RELICS.map((r) => [r.id, r]));

export const RELIC_POOL_SIZE = 3;

export const RELIC_POOL_MS = 20 * 3600000;

export const RELIC_COOLDOWN_MS = 24 * 3600000;

export function rollRelicPool() {
  const shuffled = [...RELICS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RELIC_POOL_SIZE).map((r) => r.id);
}


export const RARITY = {
  65: { color: "#9098a1", label: "ХЛАМ" },
  60: { color: "#7fa066", label: "МУСОР" },
  55: { color: "#4a90d9", label: "ТАК СЕБЕ" },
  50: { color: "#3f6fce", label: "НОРМ" },
  45: { color: "#a855e8", label: "НЕПЛОХО" },
  40: { color: "#7c3aed", label: "РЕДКОЕ" },
  30: { color: "#ff8c1a", label: "ЖИРНОЕ" },
  25: { color: "#ffcc4d", label: "ЛЕГЕНДА" },
  20: { color: "#ff2ec4", label: "ЭКСКЛЮЗИВ" },
  15: { color: "#7cf5ff", label: "МИФИК" },
  10: { color: "#ff2e4d", label: "УЛЬТРА" },
  1: { color: "#ffd700", label: "РЕЛИКВИЯ" },
};

export const ITEM_W = 128;

export const REEL_LEN = 56;

export const WIN_IDX = 46;

export const SPIN_MS = 6000;

export const CYCLE_S = 60;

export const NICKNAME_CHANGE_COST = 10000;

export const PAYDAY_AMOUNT = 300;

export const PAYDAY_INTERVAL_MS = 60 * 60 * 1000; // раз в час активного времени на сайте

export const PAYDAY_MAX_PER_DAY = 7;

export const VIP_PAYDAY_MULTIPLIER = 2;
