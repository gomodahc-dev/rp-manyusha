# РП Манюша — кейсы, крафт, Forbes (Vite + опциональный Supabase)

Бывший монолит `rp-manyusha.jsx` (7k строк, base64 внутри) разобран на модули.
Цены НЕ менялись — оставлена твоя фишка с щедрыми кейсами.

## Структура

```
public/cars/*.webp        32 картинки авто (были base64 в коде)
src/data/carImages.js     пути /cars/*.webp
src/data/items.js         все ITEMS_* (предметы)
src/data/cases.js         кейсы, капсулы, крафт, детали
src/data/quests.js        квестодатели, достижения
src/data/casino.js        рулетка-казино, ежедневное колесо
src/data/battlepass.js    боевой пропуск 30 уровней
src/data/economy.js       донат, VIP, промо, реликвии, Payday-константы
src/game/logic.js         шансы, деньги, Payday, валидация ника
src/game/sound.js         синтезированные звуки (без файлов)
src/game/storage.js       сейвы: localStorage fallback (бывший window.storage)
src/game/backend.js       Supabase-облако (опционально): Forbes, промо, профили
src/ui/components.jsx     Hazard, ItemIcon, ReelCard, Avatar, BpNode, Coin...
src/CaseOpeningSite.jsx   главный экран (бывший export default из монолита)
supabase/schema.sql       таблицы profiles + promo_claims + promo_claim_tx
rp-manyusha.jsx           ЛЕГАСИ-оригинал, не удалять пока не проверишь
```

## Запуск (нужен Node.js 18+)

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # прод-сборка в dist/
```

У тебя Node пока не стоит — скачай LTS с https://nodejs.org и выполни команды выше
в этой папке.

## Бэкенд (необязательно)

Без ключей всё работает локально: Forbes только на этом устройстве,
глобальные лимиты промо считаются per-device.

1. Создай проект на https://supabase.com, выполни `supabase/schema.sql` в SQL Editor.
2. Скопируй `.env.example` в `.env`, вставь `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY`.
3. Перезапусти `npm run dev`. Общий Forbes и общие лимиты промо включатся сами:
   `syncForbesCloud / loadForbesCloud / claimPromoCloud` в `src/game/backend.js`.
4. Античит цен: сейчас списание баланса клиентское. Следующий шаг — перенести
   покупку кейса в RPC (см. комментарий в `backend.js` + функцию `promo_claim_tx` как образец).

## Что дальше под RP (по приоритету)

1. `profiles` уже есть — добавить auth (Supabase Auth, аноним -> постоянный ник).
2. Маркет между игроками (таблица offers: seller, item, price).
3. Гараж/гонки: у авто уже есть `topSpeed` — сделать заезды и ставки.
4. Работы в реальном времени вместо сдачи предметов: курьер/такси/завод.
5. Админка: выдача/бан, просмотр экономики (`econLog` уже пишется).
