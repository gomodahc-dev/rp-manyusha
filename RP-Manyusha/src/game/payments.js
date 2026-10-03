// Оплата доната: провайдер-агностик (Lava.top / CrystalPay / Telegram-бот).
// Настройка через .env:
//   VITE_PAY_BASE_URL  — базовая ссылка оплаты, напр. https://lava.top/shop/XXXX
//                        к ней дописываем ?pack=ID&sum=СУММА&player=PLAYERID
//   VITE_ADMIN_CONTACT — куда писать если что, напр. @manyusha_admin
// Без VITE_PAY_BASE_URL кнопка всё равно работает: создаётся заявка,
// игрок оплачивает по инструкции от админа. Позже включается вебхук
// провайдера -> монеты начисляются автоматически (см. supabase/schema.sql).

export function adminContact() {
  try {
    return import.meta.env.VITE_ADMIN_CONTACT || "";
  } catch (e) {
    return "";
  }
}

export function donatePayUrl(pack, currency, playerId) {
  let base = "";
  try {
    base = import.meta.env.VITE_PAY_BASE_URL || "";
  } catch (e) {
    base = "";
  }
  if (!base) return null;
  const sum =
    currency === "uah"
      ? pack.priceUah
      : pack.vipFallbackRub || Math.round(pack.priceUah * 1.8);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}pack=${encodeURIComponent(pack.id)}&sum=${encodeURIComponent(sum)}&player=${encodeURIComponent(playerId || "")}`;
}

const LOCAL_KEY = "manyusha:pending-payments";

export function getPendingPayments() {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function savePendingLocal(entry) {
  try {
    const list = getPendingPayments();
    list.unshift(entry);
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list.slice(0, 50)));
  } catch (e) {}
}

async function savePendingCloud(entry) {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) return false;
    const mod = await import("@supabase/supabase-js");
    const sb = mod.createClient(url, key);
    const { error } = await sb.from("pending_payments").insert({
      player_id: entry.playerId || "unknown",
      pack_id: entry.packId,
      coins: entry.coins || 0,
      price_label: entry.priceLabel || "",
      status: "pending",
    });
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
}

// Создаёт заявку на пополнение (локально + в облако если есть).
// Возвращает true всегда — игрок видит "заявка создана".
export async function createPendingPayment({ playerId, packId, coins, priceLabel, vipLabel }) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    playerId: playerId || null,
    packId,
    coins: coins || 0,
    vipLabel: vipLabel || null,
    priceLabel: priceLabel || "",
    createdAt: Date.now(),
  };
  savePendingLocal(entry);
  savePendingCloud(entry).catch(() => {});
  return true;
}
