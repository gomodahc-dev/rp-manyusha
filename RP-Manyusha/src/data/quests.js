export const QUEST_CYCLE_MS = 5 * 60 * 60 * 1000; // 5 hours, real wall-clock time

export const QUEST_GIVERS = [
  {
    id: "bomzh",
    name: "Просьба бомжа",
    emoji: "🧎",
    difficulty: "ЛЁГКОЕ",
    color: "#7fa066",
    variants: [
      { req: [{ name: "Картонка бомжа", qty: 2 }, { name: "Рваный носок", qty: 2 }, { name: "Гантеля", qty: 1 }] },
      { req: [{ name: "Гантеля", qty: 2 }, { name: "Доширак", qty: 1 }, { name: "Крышка от бутылки", qty: 3 }] },
      { req: [{ name: "Сушеные грибы", qty: 2 }, { name: "Буханка хлеба", qty: 2 }] },
      { req: [{ name: "Ведро с песком", qty: 2 }, { name: "Скотч", qty: 2 }, { name: "Туалетная бумага", qty: 1 }] },
      { req: [{ name: "Швабра уборщика", qty: 2 }, { name: "Табличка с надписью лох", qty: 1 }, { name: "Банка пива", qty: 1 }] },
      { req: [{ name: "Пачка комби корма", qty: 3 }, { name: "Бутылка водки", qty: 1 }] },
      { req: [{ name: "Треники с пятном", qty: 2 }, { name: "Десяток яиц", qty: 1 }] },
      { req: [{ name: "Детская корона", qty: 1 }, { name: "Бутылка водки", qty: 1 }] },
    ],
  },
  {
    id: "student",
    name: "Заказ от студента",
    emoji: "🎓",
    difficulty: "СРЕДНЕЕ",
    color: "#4a90d9",
    variants: [
      { req: [{ name: "Банка пива", qty: 2 }, { name: "Часы", qty: 1 }, { name: "Футболка Жучи", qty: 1 }] },
      { req: [{ name: "Банка пива", qty: 2 }, { name: "Книга по англ", qty: 4 }] },
      { req: [{ name: "Лезун", qty: 2 }, { name: "Пачка сухариков", qty: 2 }, { name: "Мяч", qty: 2 }] },
      { req: [{ name: "Билет на концерт Лил Жмипа", qty: 3 }, { name: "Банка пива", qty: 1 }, { name: "Пачка сигарет", qty: 1 }] },
      { req: [{ name: "Гитара MAMABABA", qty: 1 }, { name: "Samsung Galaxy A25", qty: 1 }, { name: "Колонка с RGB-подсветкой", qty: 1 }] },
      { req: [{ name: "Пачка сигарет", qty: 2 }, { name: "Клетчатая рубашка", qty: 1 }, { name: "Порваный презерватив", qty: 2 }] },
      { req: [{ name: "Ублюдище", qty: 2 }, { name: "iPhone 15 Pro Max", qty: 1 }] },
      { req: [{ name: "Кожаная куртка", qty: 1 }, { name: "Маска ананимуса", qty: 1 }] },
    ],
  },
  {
    id: "major",
    name: "Каприз мажора",
    emoji: "🤵",
    difficulty: "СЛОЖНОЕ",
    color: "#ff8c1a",
    variants: [
      { req: [{ name: "Банка мёда", qty: 2 }, { name: "Костюм-тройка", qty: 1 }, { name: "Полицеский мотык", qty: 1 }] },
      { req: [{ name: "Бензопила", qty: 2 }, { name: "1л бензина", qty: 3 }, { name: "Samsung Galaxy A55", qty: 1 }] },
      { req: [{ name: "Надувной бассейн", qty: 3 }, { name: "Lamborghini Huracán", qty: 1 }] },
      { req: [{ name: "Повербанк на 10000 mAh", qty: 1 }, { name: "BMW M4", qty: 2 }, { name: "Позолоченные наручные часы", qty: 1 }] },
      { req: [{ name: "Чулки Манюши", qty: 1 }, { name: "Poco X6 Pro", qty: 2 }, { name: "Пылесос", qty: 1 }] },
      { req: [{ name: "Перчатки Тайсона", qty: 1 }, { name: "Mustang Alfa", qty: 2 }, { name: "Poco M7 Pro", qty: 1 }] },
    ],
  },
];

export function questText(variant) {
  return variant.req.map((r) => `${r.qty}× ${r.name}`).join(" · ");
}

export function activeQuestNeedNames(quests) {
  const set = new Set();
  QUEST_GIVERS.forEach((g) => {
    const dept = quests?.[g.id];
    if (!dept || dept.completed) return;
    const variant = g.variants[dept.variantIdx];
    if (!variant) return;
    variant.req.forEach((r) => set.add(r.name));
  });
  return set;
}

export const ACHIEVEMENTS = [
  {
    id: "open100",
    icon: "📦",
    title: "Открыть 100 кейсов",
    target: 100,
    isTime: false,
    progress: (s) => s.casesOpened || 0,
    rewardLabel: "500 МК + кейс Ксюша",
    moneyReward: 500,
    caseRewards: { ksyusha: 1 },
  },
  {
    id: "craft10",
    icon: "⚒️",
    title: "Сделать 10 крафтов",
    target: 10,
    isTime: false,
    progress: (s) => s.craftsDone || 0,
    rewardLabel: "500 МК",
    moneyReward: 500,
  },
  {
    id: "time1h",
    icon: "⏱️",
    title: "Провести на сайте 1 час",
    target: 3600000,
    isTime: true,
    progress: (s) => s.totalTimeMs || 0,
    rewardLabel: "5 кейсов Манюша",
    caseRewards: { manyusha: 5 },
  },
  {
    id: "disassemble5",
    icon: "🔩",
    title: "Разобрать 5 предметов на детали",
    target: 5,
    isTime: false,
    progress: (s) => s.disassembled || 0,
    rewardLabel: "350 МК",
    moneyReward: 350,
  },
  {
    id: "quests3",
    icon: "📋",
    title: "Выполнить 3 задания",
    target: 3,
    isTime: false,
    progress: (s) => s.questsCompleted || 0,
    rewardLabel: "2 кейса одеждой 2026",
    caseRewards: { clothes2026: 2 },
  },
  {
    id: "phone2025",
    icon: "📱",
    title: "Выбить любой телефон из телефонного кейса 2025",
    target: 1,
    isTime: false,
    progress: (s) => (s.wonPhone2025 ? 1 : 0),
    rewardLabel: "300 МК",
    moneyReward: 300,
  },
  {
    id: "sold7000",
    icon: "💰",
    title: "Продать предметов на 7000 МК",
    target: 7000,
    isTime: false,
    progress: (s) => s.soldTotal || 0,
    rewardLabel: "2 кейса Ксюша 2026",
    caseRewards: { ksyusha: 2 },
  },
  {
    id: "legendary5",
    icon: "🌟",
    title: "Выбить 5 предметов редкости Легенда или выше",
    target: 5,
    isTime: false,
    progress: (s) => s.legendaryWon || 0,
    rewardLabel: "2 капсулы Авангард 2026",
    capsuleRewards: { avangard2026: 2 },
  },
  {
    id: "parts300",
    icon: "🔩",
    title: "Копилка деталей — накопить 300 деталей одновременно",
    target: 300,
    isTime: false,
    progress: (s) => s.parts || 0,
    rewardLabel: "2 капсулы OPIUM",
    capsuleRewards: { opium2026: 2 },
  },
  {
    id: "major2",
    icon: "🤵",
    title: 'Каприз выполнен! — 2 тяжёлых контракта "Каприз мажора"',
    target: 2,
    isTime: false,
    progress: (s) => s.majorQuestsCompleted || 0,
    rewardLabel: "2 кейса с машинами 2025",
    caseRewards: { cars2025: 2 },
  },
  {
    id: "open300",
    icon: "📦",
    title: "Открыть 300 кейсов",
    target: 300,
    isTime: false,
    progress: (s) => s.casesOpened || 0,
    rewardLabel: "2 кейса с машинами 2025",
    caseRewards: { cars2025: 2 },
  },
  {
    id: "sold30000",
    icon: "💰",
    title: "Продать предметов на сумму 30000 МК",
    target: 30000,
    isTime: false,
    progress: (s) => s.soldTotal || 0,
    rewardLabel: "1 ключ от секретного кейса",
    keyReward: 1,
  },
  {
    id: "disassemble15",
    icon: "🔩",
    title: "Разобрать 15 предметов на детали",
    target: 15,
    isTime: false,
    progress: (s) => s.disassembled || 0,
    rewardLabel: "1000 МК",
    moneyReward: 1000,
  },
  {
    id: "time12h",
    icon: "⏱️",
    title: "Провести на сайте 12 часов",
    target: 12 * 3600000,
    isTime: true,
    progress: (s) => s.totalTimeMs || 0,
    rewardLabel: "1 ключ от секретного кейса",
    keyReward: 1,
  },
  {
    id: "allPaydays",
    icon: "💸",
    title: "Получить все 7 Pay day за один день",
    target: 1,
    isTime: false,
    progress: (s) => (s.paydayFullDayDone ? 1 : 0),
    rewardLabel: "VIP на 24 часа",
    vipReward: 24,
  },
  {
    id: "craft20",
    icon: "🛠️",
    title: "Сделать 20 крафтов",
    target: 20,
    isTime: false,
    progress: (s) => s.craftsDone || 0,
    rewardLabel: "1000 МК",
    moneyReward: 1000,
  },
];

export function refreshQuestsIfNeeded(quests) {
  let changed = false;
  const next = {};
  QUEST_GIVERS.forEach((g) => {
    const dept = quests[g.id];
    if (!dept || Date.now() >= dept.refreshAt) {
      changed = true;
      let idx = Math.floor(Math.random() * g.variants.length);
      if (dept && g.variants.length > 1) {
        while (idx === dept.variantIdx) idx = Math.floor(Math.random() * g.variants.length);
      }
      next[g.id] = { variantIdx: idx, refreshAt: Date.now() + QUEST_CYCLE_MS, completed: false };
    } else {
      next[g.id] = dept;
    }
  });
  return changed ? next : quests;
}
