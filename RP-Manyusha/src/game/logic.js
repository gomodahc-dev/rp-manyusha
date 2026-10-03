export function weightedPick(items) {
  const total = items.reduce((s, i) => s + i.w, 0);
  let r = Math.random() * total;
  for (const it of items) {
    if (r < it.w) return it;
    r -= it.w;
  }
  return items[items.length - 1];
}

export function fmt(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

export function fmtMoney(n) {
  return (n ?? 0).toLocaleString("ru-RU");
}

// glow color for a case card, purely by price tier — no rarity label shown, just vibe

export function caseGlowColor(price) {
  if (price <= 800) return "#4ade80"; // green — дешёвые кейсы (100–800 мк)
  if (price <= 2500) return "#38bdf8"; // голубое — средние (800–2500 мк)
  return "#ffcc4d"; // жёлтое — дорогие (2500–10000 мк)
}

/* ---------- sound engine (synthesized, no audio files needed) ---------- */

export function isVipActive(state, now = Date.now()) {
  return (state?.vipUntil || 0) > now;
}

export function effectiveCasePrice(price, state, now = Date.now()) {
  if ((state?.discountUntil || 0) > now && state?.discountPct) {
    return Math.max(1, Math.round(price * (1 - state.discountPct)));
  }
  return price;
}

export function dayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function pruneEconLog(econLog) {
  const cutoff = Date.now() - 35 * 24 * 60 * 60 * 1000;
  const out = {};
  for (const [k, v] of Object.entries(econLog || {})) {
    const t = new Date(`${k}T00:00:00`).getTime();
    if (!isNaN(t) && t >= cutoff) out[k] = v;
  }
  return out;
}

// pure helper: returns a new state object with earn/spend added to today's bucket.
// call it INSIDE a setState(prev => ...) updater, e.g. bumpEcon(prev, { earn: 500 })

export function bumpEcon(prev, { earn = 0, spend = 0 } = {}) {
  const key = dayKey();
  const log = pruneEconLog(prev.econLog);
  const cur = log[key] || { earn: 0, spend: 0 };
  return {
    ...prev,
    econLog: { ...log, [key]: { earn: cur.earn + earn, spend: cur.spend + spend } },
  };
}

export function sumEcon(econLog, days) {
  let earn = 0;
  let spend = 0;
  const now = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const e = econLog?.[dayKey(d)];
    if (e) {
      earn += e.earn || 0;
      spend += e.spend || 0;
    }
  }
  return { earn, spend };
}

export const NAME_SYNTAX_REGEX = /^[A-Za-z]+$/;

export function validateIdentityInputs(firstRaw, lastRaw, ageRaw) {
  const firstName = (firstRaw || "").trim().slice(0, 18);
  const lastName = (lastRaw || "").trim().slice(0, 18);
  const age = parseInt(ageRaw, 10);
  if ((firstName && !NAME_SYNTAX_REGEX.test(firstName)) || (lastName && !NAME_SYNTAX_REGEX.test(lastName))) {
    return { error: "Неверный синтаксис имени" };
  }
  if (firstName.length < 2) return { error: "Имя должно быть от 2 до 18 символов" };
  if (lastName.length < 2) return { error: "Фамилия должна быть от 2 до 18 символов" };
  if (!Number.isFinite(age) || age < 18 || age > 70) return { error: "Возраст должен быть от 18 до 70 лет" };
  return { firstName, lastName, age };
}

export function validateNameInputs(firstRaw, lastRaw) {
  const firstName = (firstRaw || "").trim().slice(0, 18);
  const lastName = (lastRaw || "").trim().slice(0, 18);
  if ((firstName && !NAME_SYNTAX_REGEX.test(firstName)) || (lastName && !NAME_SYNTAX_REGEX.test(lastName))) {
    return { error: "Неверный синтаксис имени" };
  }
  if (firstName.length < 2) return { error: "Имя должно быть от 2 до 18 символов" };
  if (lastName.length < 2) return { error: "Фамилия должна быть от 2 до 18 символов" };
  return { firstName, lastName };
}

export function formatDuration(ms) {
  const totalMin = Math.floor((ms || 0) / 60000);
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;
  if (days > 0) return `${days} д ${hours} ч`;
  if (hours > 0) return `${hours} ч ${mins} мин`;
  return `${mins} мин`;
}

export function formatCountdown(ms) {
  const total = Math.max(0, Math.round((ms || 0) / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatVipRemaining(ms) {
  const totalMin = Math.max(0, Math.floor((ms || 0) / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `осталось ${h}ч ${m}м`;
  return `осталось ${m}м`;
}
