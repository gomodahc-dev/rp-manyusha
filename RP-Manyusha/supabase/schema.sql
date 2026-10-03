-- RP-Manyusha: Supabase схема (общий Forbes, промо, облачные профили).
-- Выполнить в Supabase SQL Editor.

create table if not exists profiles (
  player_id text primary key,
  nickname text not null default 'Без ника',
  balance integer not null default 0,
  parts integer not null default 0,
  total_time_ms bigint not null default 0,
  bp_level integer not null default 0,
  vip_until bigint not null default 0,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists promo_claims (
  id bigint generated always as identity primary key,
  code text not null,
  player_id text not null,
  claimed_at timestamptz not null default now(),
  unique (code, player_id)
);
create index if not exists promo_claims_code_idx on promo_claims (code);

-- Публичное чтение Forbes + запись своего профиля без auth (анонимные playerId).
-- Когда добавишь Supabase Auth — ужесточи: auth.uid() = player_id.
alter table profiles enable row level security;
drop policy if exists "forbes read" on profiles;
create policy "forbes read" on profiles for select using (true);
drop policy if exists "profile upsert" on profiles;
create policy "profile upsert" on profiles for insert with check (true);
drop policy if exists "profile update" on profiles;
create policy "profile update" on profiles for update using (true);

alter table promo_claims enable row level security;
drop policy if exists "promo read" on promo_claims;
create policy "promo read" on promo_claims for select using (true);
drop policy if exists "promo insert" on promo_claims;
create policy "promo insert" on promo_claims for insert with check (true);

-- Атомарный клейм промо (античит лимита): проверяет дубль и globalLimit в одной транзакции.
-- Вызов: select * from promo_claim_tx('opium', 'player-uuid', 20);
create or replace function promo_claim_tx(p_code text, p_player text, p_limit int)
returns table (ok boolean, reason text)
language plpgsql as $$
declare
  v_cnt int;
begin
  if exists (select 1 from promo_claims where code = p_code and player_id = p_player) then
    return query select false, 'already';
    return;
  end if;
  select count(*)::int into v_cnt from promo_claims where code = p_code;
  if v_cnt >= p_limit then
    return query select false, 'limit';
    return;
  end if;
  insert into promo_claims (code, player_id) values (p_code, p_player);
  return query select true, 'ok';
end;
$$;

-- Заявки на донат: игрок нажал «Я оплатил», админ проверяет и начисляет.
-- Позже сюда же пишет вебхук платёжки (Lava/CrystalPay) со status='paid',
-- а начисление делает серверная функция — игрокам ничего ждать не надо.
create table if not exists pending_payments (
  id bigint generated always as identity primary key,
  player_id text not null,
  pack_id text not null,
  coins integer not null default 0,
  price_label text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
create index if not exists pending_payments_status_idx on pending_payments (status);
create index if not exists pending_payments_player_idx on pending_payments (player_id);

alter table pending_payments enable row level security;
drop policy if exists "pending insert" on pending_payments;
create policy "pending insert" on pending_payments for insert with check (true);
drop policy if exists "pending read own" on pending_payments;
create policy "pending read own" on pending_payments for select using (true);
