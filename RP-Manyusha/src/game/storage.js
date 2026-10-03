// Профиль, сейвы, локальный fallback (бывший window.storage).
// Облако (Supabase) подключается отдельно через ./backend.js и НЕ ломает локалку.

import { CYCLE_S } from "../data/economy.js";

export const STORAGE_KEY = "manyusha-state-v1";

export const DEFAULT_STATE = {
  cases: { manyusha: 2, ksyusha: 0, cars2025: 0, clothes2026: 0, moto2025: 0, phones2025: 0, phones2026: 0, axi2026: 0, cars2026: 0, moto2026: 0, retrocars2000s: 0, teslaExclusive2026: 0, secret2026: 0, mix2026: 0, bomzhCars: 0 },
  capsules: { avangard2026: 0, opium2026: 0 },
  keys: 0,
  quests: {},
  questClaimed: false,
  parts: 0,
  timeLeft: CYCLE_S,
  selectedCaseId: "manyusha",
  balance: 500,
  inventory: [], // { id, name, w, p, icon }
  nickname: null,
  firstName: null,
  lastName: null,
  age: null,
  nicknameChanges: 0,
  totalTimeMs: 0,
  casesOpened: 0,
  craftsDone: 0,
  disassembled: 0,
  questsCompleted: 0,
  majorQuestsCompleted: 0,
  wonPhone2025: false,
  legendaryWon: 0,
  soldTotal: 0,
  promosUsed: {}, // { [code]: true }
  paydayProgressMs: 0, // сколько активного времени накопилось к следующему payday
  paydaysToday: 0, // сколько payday уже забрано сегодня (максимум 7)
  paydayDayKey: null, // дата (YYYY-MM-DD), для сброса paydaysToday раз в сутки
  econLog: {}, // { "YYYY-MM-DD": { earn: number, spend: number } }
  achievementsClaimed: {}, // { [achievementId]: true }
  vipUntil: 0, // timestamp (ms) до которого активен Manyusha VIP статус
  discountUntil: 0, // timestamp (ms) до которого действует скидка на кейсы
  discountPct: 0, // размер скидки (0.1 = 10%)
  paydayBoostUses: 0, // сколько начислений payday ещё получат бонус
  paydayBoostPct: 0, // размер бонуса payday (0.5 = +50%)
  bpLevel: 0, // текущий уровень боевого пропуска (0-30)
  bpProgressExp: 0, // накопленный опыт внутри текущего уровня
  bpFreeClaimed: {}, // { [level]: true }
  bpPaidClaimed: {}, // { [level]: true }
  paydayFullDayDone: false, // хотя бы раз забрал все 7 payday за один день
  relicSelectedId: null, // какую реликвию сейчас собираем (из текущего пула)
  relicPoolIds: [], // 3 случайные реликвии, доступные в этом цикле
  relicPoolResetAt: 0, // когда пул обновится (каждые 20ч)
  relicCooldowns: {}, // { [relicId]: timestamp когда снова можно активировать баф }
  relicFastPaydayUsesLeft: 0, // осталось payday с укороченным интервалом (Chronos Watshpiece)
  relicJetPaydayUsesLeft: 0, // осталось payday с +35% (Cyber-JET Mantis)
  relicCompensateUsesLeft: 0, // осталось открытий кейсов с компенсацией дропа (Кристалл Компенсации)
  partsBonusUsesLeft: 0, // осталось разборов предметов с бонусом деталей (Ywios 10)
  partsBonusAmount: 0, // размер бонуса деталей за разбор
  dailyWheelClaimedAt: 0, // timestamp последнего получения награды с ежедневного колеса (КД 24ч)
  wornSuitId: null, // id предмета в инвентаре, который сейчас "надет" (постоянный баф без КД)
  playerId: null, // случайный уникальный id устройства, для списка Forbes (топ игроков)
};

export function migrateState(parsed) {
  if (parsed && parsed.cases) {
    return {
      ...DEFAULT_STATE,
      ...parsed,
      cases: { ...DEFAULT_STATE.cases, ...parsed.cases },
      capsules: { ...DEFAULT_STATE.capsules, ...parsed.capsules },
    };
  }
  // legacy single-case shape
  return {
    ...DEFAULT_STATE,
    balance: parsed?.balance ?? 0,
    inventory: parsed?.inventory ?? [],
    timeLeft: parsed?.timeLeft ?? CYCLE_S,
    cases: { ...DEFAULT_STATE.cases, manyusha: parsed?.caseCount ?? 0 },
    selectedCaseId: "manyusha",
  };
}

// shared (cross-account) counter — used to cap global promo-code redemptions,
// e.g. "only the first 20 activations across all accounts". Returns null when
// storage isn't reachable (e.g. in-chat preview), so callers can fail open.

export async function getGlobalCounter(key) {
  const storage = await getReadyStorage();
  if (!storage) return null;
  try {
    const res = await storage.get(key, true);
    const n = res && res.value ? parseInt(res.value, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch (e) {
    return 0; // key not created yet
  }
}

export async function setGlobalCounter(key, value) {
  const storage = await getReadyStorage();
  if (!storage) return false;
  try {
    await storage.set(key, String(value), true);
    return true;
  } catch (e) {
    return false;
  }
}

let storageReadyPromise = null;
// Локальный fallback: исходно проект ждал window.storage от хостинг-платформы.
// В обычном браузере / Vite / CRA его нет — игра запускалась, но без сохранений,
// Forbes и глобальные лимиты промо ломались. Теперь откатываемся на localStorage.

export function makeLocalStorageAdapter() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return {
    async get(key) {
      try {
        const value = window.localStorage.getItem(`manyusha:${key}`);
        return value == null ? null : { value };
      } catch (e) {
        return null;
      }
    },
    async set(key, value) {
      window.localStorage.setItem(`manyusha:${key}`, String(value));
      return true;
    },
    async list(prefix) {
      try {
        const keys = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const full = window.localStorage.key(i);
          const needle = `manyusha:${prefix}`;
          if (full && full.startsWith(needle)) keys.push(full.slice("manyusha:".length));
        }
        return { keys };
      } catch (e) {
        return { keys: [] };
      }
    },
  };
}

export function getReadyStorage() {
  if (storageReadyPromise) return storageReadyPromise;
  storageReadyPromise = new Promise((resolve) => {
    let tries = 0;
    const check = () => {
      if (typeof window !== "undefined" && window.storage) {
        resolve(window.storage);
        return;
      }
      tries += 1;
      if (tries > 10) {
        // fallback: локальные сохранения вместо облачных
        resolve(makeLocalStorageAdapter());
        return;
      }
      setTimeout(check, 150);
    };
    check();
  });
  return storageReadyPromise;
}
