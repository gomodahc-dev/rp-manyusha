// Backend-адаптер: Supabase (опционально) + local fallback.
// Без VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY всё работает локально:
// Forbes = только это устройство, глобальные лимиты промо = per-device.
// С ключами: общий Forbes, общие лимиты промо, облачные профили (задел под auth).

let supabaseClient = null;
let supabaseTried = false;

export function isBackendEnabled() {
  return Boolean(
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
}

async function getSupabase() {
  if (supabaseClient) return supabaseClient;
  if (supabaseTried) return null;
  supabaseTried = true;
  if (!isBackendEnabled()) return null;
  try {
    const mod = await import("@supabase/supabase-js");
    supabaseClient = mod.createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );
    return supabaseClient;
  } catch (e) {
    console.warn("[backend] supabase-js не установлен или нет сети, работаем локально:", e?.message);
    return null;
  }
}

// --- Forbes ---
// entry: { playerId, nickname, balance, parts, totalTimeMs, bpLevel, vipUntil }
export async function syncForbesCloud(entry) {
  try {
    const sb = await getSupabase();
    if (!sb || !entry?.playerId) return false;
    const { error } = await sb.from("profiles").upsert(
      {
        player_id: entry.playerId,
        nickname: entry.nickname || "Без ника",
        balance: entry.balance || 0,
        parts: entry.parts || 0,
        total_time_ms: entry.totalTimeMs || 0,
        bp_level: entry.bpLevel || 0,
        vip_until: entry.vipUntil || 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "player_id" }
    );
    if (error) throw error;
    return true;
  } catch (e) {
    return false; // тихо: Forbes не критичен для игры
  }
}

export async function loadForbesCloud(limit = 15) {
  try {
    const sb = await getSupabase();
    if (!sb) return null; // null = backend выключен, использовать локальный список
    const { data, error } = await sb
      .from("profiles")
      .select("player_id,nickname,balance,parts,total_time_ms,bp_level,vip_until")
      .order("balance", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data || []).map((r) => ({
      id: `forbes:${r.player_id}`,
      nickname: r.nickname || "Без ника",
      balance: r.balance || 0,
      parts: r.parts || 0,
      totalTimeMs: r.total_time_ms || 0,
      bpLevel: r.bp_level || 0,
      vip: (r.vip_until || 0) > Date.now(),
    }));
  } catch (e) {
    return []; // [] = backend включён, но упал: показать пусто/ошибку, а не локальные данные
  }
}

// --- Промо с глобальным лимитом ---
// Возвращает { ok:true } | { ok:false, reason:"already"|"limit"|"error" } | null (backend выключен -> local fallback)
export async function claimPromoCloud(code, playerId, globalLimit) {
  try {
    const sb = await getSupabase();
    if (!sb) return null;
    if (!code || !playerId) return { ok: false, reason: "error" };
    // уже забирал?
    const { data: mine } = await sb
      .from("promo_claims")
      .select("id")
      .eq("code", code)
      .eq("player_id", playerId)
      .limit(1);
    if (mine && mine.length > 0) return { ok: false, reason: "already" };
    // сколько всего забрали?
    const { count } = await sb
      .from("promo_claims")
      .select("id", { count: "exact", head: true })
      .eq("code", code);
    if (typeof globalLimit === "number" && (count ?? 0) >= globalLimit)
      return { ok: false, reason: "limit" };
    const { error } = await sb.from("promo_claims").insert({ code, player_id: playerId });
    if (error) {
      // гонка: кто-то вставил одновременно или дубль
      if (String(error.message || "").toLowerCase().includes("duplicate")) {
        const { count: c2 } = await sb.from("promo_claims").select("id", { count: "exact", head: true }).eq("code", code);
        if (typeof globalLimit === "number" && (c2 ?? 0) >= globalLimit) return { ok: false, reason: "limit" };
        return { ok: false, reason: "already" };
      }
      throw error;
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: "error" };
  }
}

// --- Профиль (задел под auth; сейчас anonymous playerId) ---
export async function saveProfileCloud(playerId, snapshot) {
  try {
    const sb = await getSupabase();
    if (!sb || !playerId) return false;
    const { error } = await sb.from("profiles").upsert({
      player_id: playerId,
      nickname: snapshot?.nickname || "Без ника",
      balance: snapshot?.balance || 0,
      data: snapshot ?? {},
      updated_at: new Date().toISOString(),
    }, { onConflict: "player_id" });
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
}

// АНТИЧИТ ПО ЦЕНАМ (серверный): пока клиент считает EV локально,
// финальную проверку покупок делай через RPC/Edge Function.
// См. supabase/schema.sql -> функция promo_claim_tx (атомарный клейм).
// Следующий шаг RP: перенести списание баланса и выдачу кейсов на сервер.
