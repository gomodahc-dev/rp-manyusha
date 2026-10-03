import {
  ITEMS_MANYUSHA,
  ITEMS_KSYUSHA,
  ITEMS_CARS,
  ITEMS_CLOTHES,
  ITEMS_MOTO,
  ITEMS_PHONES,
  ITEMS_PHONES_2026,
  ITEMS_AXI,
  ITEMS_CARS_2026,
  ITEMS_BOMZH_CARS,
  ITEMS_TESLA_EXCLUSIVE,
  ITEMS_RETRO_CARS,
  ITEMS_MOTO_2026,
  ITEMS_CAPSULE_AVANGARD,
  ITEMS_CAPSULE_OPIUM,
  ITEMS_SECRET,
  ITEMS_MIX_2026,
} from "./items.js";

export const CAPSULES = [
  { id: "avangard2026", name: "Капсула Авангард 2026", price: 430, category: "clothes", items: ITEMS_CAPSULE_AVANGARD },
  { id: "opium2026", name: "Капсула OPIUM", price: 475, category: "clothes", items: ITEMS_CAPSULE_OPIUM },
];

export const CAPSULE_BY_ID = Object.fromEntries(CAPSULES.map((c) => [c.id, c]));

export const CASES = [
  { id: "manyusha", name: "Манюша 2026", price: 220, free: false, boxIcon: "📦", category: "items", items: ITEMS_MANYUSHA },
  { id: "ksyusha", name: "Ксюша 2026", price: 750, free: false, boxIcon: "🎀", category: "items", items: ITEMS_KSYUSHA },
  { id: "cars2025", name: "Кейс с машинами 2025", price: 4500, free: false, boxIcon: "🏁", category: "cars", items: ITEMS_CARS },
  { id: "bomzhCars", name: "Бомж кейс машинный", price: 3700, free: false, boxIcon: "🚙", category: "cars", items: ITEMS_BOMZH_CARS },
  { id: "clothes2026", name: "Кейс с одеждой 2026", price: 750, free: false, boxIcon: "👗", category: "clothes", items: ITEMS_CLOTHES },
  { id: "moto2025", name: "МОТО Кейс 2025", price: 2310, free: false, boxIcon: "🏍️", category: "moto", items: ITEMS_MOTO },
  { id: "phones2025", name: "Телефонный кейс 2025", price: 1230, free: false, boxIcon: "📱", category: "phones", items: ITEMS_PHONES },
  { id: "phones2026", name: "Телефонный кейс 2026", price: 1850, free: false, boxIcon: "📱", category: "phones", items: ITEMS_PHONES_2026 },
  { id: "axi2026", name: "Акси кейс 2026", price: 710, free: false, boxIcon: "🕶️", category: "items", items: ITEMS_AXI },
  { id: "cars2026", name: "Кейс с машинами 2026", price: 9000, free: false, boxIcon: "🏆", category: "cars", items: ITEMS_CARS_2026 },
  { id: "retrocars2000s", name: "Ретро машины 2000-х", price: 6500, free: false, boxIcon: "🚘", category: "cars", items: ITEMS_RETRO_CARS },
  { id: "teslaExclusive2026", name: "Эксклюзив: Tesla", price: 10700, free: false, boxIcon: "⚡", category: "items", items: ITEMS_TESLA_EXCLUSIVE },
  { id: "moto2026", name: "Мото кейс 2026", price: 4750, free: false, boxIcon: "🏍️", category: "moto", items: ITEMS_MOTO_2026 },
  { id: "secret2026", name: "Секретный кейс 2026", price: 0, free: false, usesKeys: true, boxIcon: "🗝️", category: "items", items: ITEMS_SECRET },
  { id: "mix2026", name: "Микс 2026", price: 1330, free: false, boxIcon: "🎁", category: "items", items: ITEMS_MIX_2026 },
];

export const CASE_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c]));

export const PREVIEW_SOURCE = { ...CASE_BY_ID, ...CAPSULE_BY_ID };

export const ITEM_BY_NAME = Object.fromEntries(
  [...CASES, ...CAPSULES].flatMap((c) => c.items).map((it) => [it.name, it])
);

export const CRAFT_TABS = [
  { id: "items", label: "📦 Предметы" },
  { id: "clothes", label: "👕 Одежда" },
  { id: "phones", label: "📱 Телефоны" },
  { id: "moto", label: "🏍️ Мотоциклы" },
  { id: "cars", label: "🚗 Автомобили" },
];

// each category only has some of the 11 rarities in real use (e.g. cars skip
// straight from "Мусор" to "Редкое"), so the craft ladder is derived from the
// actual items rather than hardcoded, per-category

export function categoryLadder(categoryId) {
  const set = new Set();
  [...CASES, ...CAPSULES].forEach((c) => {
    if (c.category !== categoryId) return;
    c.items.forEach((it) => set.add(it.rarity ?? it.w));
  });
  return [...set].sort((a, b) => b - a); // worst (highest %) first, rarest last
}

// picks a craft reward fairly: first an equal-chance roll between the CASES
// that actually contribute to this category (so a case with 30 items doesn't
// drown out a case with 5), then a random item within that chosen case

export function pickCraftReward(categoryId, rarityKey) {
  const bySource = [...CASES, ...CAPSULES]
    .filter((c) => c.category === categoryId)
    .map((c) => c.items.filter((it) => (it.rarity ?? it.w) === rarityKey))
    .filter((items) => items.length > 0);
  if (bySource.length === 0) return null;
  const chosenSource = bySource[Math.floor(Math.random() * bySource.length)];
  return chosenSource[Math.floor(Math.random() * chosenSource.length)];
}

export const NAME_TO_CATEGORY = (() => {
  const map = {};
  [...CASES, ...CAPSULES].forEach((c) => c.items.forEach((it) => (map[it.name] = it.category || c.category)));
  return map;
})();

export function categoryOf(item) {
  return item.category || NAME_TO_CATEGORY[item.name] || "items";
}

// how many "детали" (parts) an item breaks down into, by category + rarity.
// only Легенда(25)/Эксклюзив(20)/Мифик(15)/Ультра(10) tiers can be broken down;
// anything not listed here (incl. all lower rarities) simply can't be disassembled

export const PARTS_TABLE = {
  items: { 25: 50, 20: 75, 15: 90 },
  clothes: { 25: 60, 20: 85, 15: 100, 10: 120 },
  moto: { 25: 60, 20: 85, 15: 100, 10: 120 },
  phones: { 25: 65, 20: 95 },
  cars: { 25: 90, 20: 95, 15: 125, 10: 150 },
};

export function partsValue(item) {
  const rk = item.rarity ?? item.w;
  return PARTS_TABLE[categoryOf(item)]?.[rk] ?? null;
}

// Тегируем предметы категорией кейса/капсулы (было в монолите между реликвиями и редкостями).
// Нужно крафту чтобы фильтровать инвентарь и считать "какая редкость следующая".
[...CASES, ...CAPSULES].forEach((c) => c.items.forEach((it) => { it.category = it.category || c.category; }));
