import { useState, useEffect, useRef, useCallback } from "react";

/* ---------- item data ---------- */

const ITEMS_MANYUSHA = [
  // ХЛАМ 55%
  { name: "Швабра уборщика", w: 55, rarity: 65, p: 35, icon: "🧹" },
  { name: "Утиное крыло", w: 55, rarity: 65, p: 35, icon: "🦆" },
  { name: "Клей убийца", w: 55, rarity: 65, p: 30, icon: "🧴" },
  { name: "Говно", w: 55, rarity: 65, p: 30, icon: "💩" },
  { name: "Перо страуса", w: 55, rarity: 65, p: 30, icon: "🪶" },
  { name: "Обгрызенное яблоко", w: 55, rarity: 65, p: 25, icon: "🍎" },

  // МУСОР 60%
  { name: "Треники с пятном", w: 60, rarity: 60, p: 50, icon: "🩳" },
  { name: "Гантеля", w: 60, rarity: 60, p: 50, icon: "🏋️" },
  { name: "Рваный носок", w: 60, rarity: 60, p: 50, icon: "🧦" },
  { name: "Картонка бомжа", w: 60, rarity: 60, p: 45, icon: "📦" },
  { name: "Мешок с говном", w: 60, rarity: 60, p: 50, icon: "🛍️" },
  { name: "Картошка", w: 60, rarity: 60, p: 45, icon: "🥔" },
  { name: "Скотч", w: 60, rarity: 60, p: 50, icon: "🪢" },
  { name: "Обычный дилдо", w: 60, rarity: 60, p: 50, icon: "🌭" },
  { name: "Ведро с песком", w: 60, rarity: 60, p: 40, icon: "🪣" },
  { name: "Табличка с надписью лох", w: 60, rarity: 60, p: 40, icon: "🪧" },

  // ТАК СЕБЕ 45%
  { name: "Фейерверки", w: 45, rarity: 55, p: 70, icon: "🎆" },
  { name: "Пачка семечек", w: 45, rarity: 55, p: 70, icon: "🌻" },
  { name: "Газировка", w: 45, rarity: 55, p: 60, icon: "🥤" },
  { name: "Китайская рогатка BLUEBLAN", w: 45, rarity: 55, p: 90, icon: "🎯" },
  { name: "Налутинус", w: 45, rarity: 55, p: 70, icon: "🧪" },
  { name: "Книга по англ", w: 45, rarity: 55, p: 60, icon: "📖" },
  { name: "Шина от машины", w: 45, rarity: 55, p: 70, icon: "🛞" },
  { name: "Туалетная бумага", w: 45, rarity: 55, p: 60, icon: "🧻" },
  { name: "Щебень", w: 45, rarity: 55, p: 50, icon: "🪨" },
  { name: "Крышка от бутылки", w: 45, rarity: 55, p: 50, icon: "🍾" },

  // НОРМ 40%
  { name: "Бритва для яиц", w: 40, rarity: 50, p: 140, icon: "🪒" },
  { name: "Лопата", w: 40, rarity: 50, p: 120, icon: "⛏️" },
  { name: "Перчатки габингабин", w: 40, rarity: 50, p: 140, icon: "🧤" },
  { name: "Банка с шпротами", w: 40, rarity: 50, p: 100, icon: "🥫" },
  { name: "Буханка хлеба", w: 40, rarity: 50, p: 90, icon: "🍞" },
  { name: "Кошачий корм", w: 40, rarity: 50, p: 90, icon: "🐱" },
  { name: "Чек на 1л воды", w: 40, rarity: 50, p: 90, icon: "💧" },
  { name: "Гнилой банан", w: 40, rarity: 50, p: 85, icon: "🍌" },

  // НЕПЛОХО 36%
  { name: "Порванный презерватив", w: 36, rarity: 45, p: 260, icon: "🎈" },
  { name: "Десяток яиц", w: 36, rarity: 45, p: 190, icon: "🥚" },
  { name: "Чехол на телефон", w: 36, rarity: 45, p: 250, icon: "📱" },
  { name: "Пачка сухариков", w: 36, rarity: 45, p: 180, icon: "🥨" },
  { name: "Копилка с 10 грн", w: 36, rarity: 45, p: 90, icon: "🐷" },

  // РЕДКОЕ 27%
  { name: "Гитара MAMABABA", w: 27, rarity: 40, p: 400, icon: "🎸" },
  { name: "Огромный дилдо", w: 27, rarity: 40, p: 350, icon: "🌭" },
  { name: "Золотые яйца", w: 27, rarity: 40, p: 400, icon: "🥚" },
  { name: "Колесо от белаза", w: 27, rarity: 40, p: 350, icon: "🛞" },
  { name: "Утюг", w: 27, rarity: 40, p: 330, icon: "♨️" },
  { name: "Бутылка водки", w: 27, rarity: 40, p: 300, icon: "🍾" },
  { name: "Кленовый сироп", w: 27, rarity: 40, p: 300, icon: "🍁" },
  { name: "Лезун", w: 27, rarity: 40, p: 280, icon: "🧴" },
  { name: "Улыбка тигра", w: 27, rarity: 40, p: 280, icon: "🐯" },
  { name: "Пачка сигарет", w: 27, rarity: 40, p: 300, icon: "🚬" },
  { name: "Лук со стрелами", w: 27, rarity: 40, p: 270, icon: "🏹" },
  { name: "Корзина с яблоками", w: 27, rarity: 40, p: 220, icon: "🧺" },

  // ЖИРНОЕ 18%
  { name: "Чек на 1200 манюш коинов", w: 18, rarity: 30, p: 1200, icon: "🧾" },
  { name: "Лозина для жопы", w: 18, rarity: 30, p: 900, icon: "🪵" },
  { name: "Лёгкий бабиджон", w: 18, rarity: 30, p: 900, icon: "🪁" },
  { name: "2 тонны угля", w: 18, rarity: 30, p: 1000, icon: "⬛" },
  { name: "Пачка презервативов", w: 18, rarity: 30, p: 800, icon: "🎈" },
  { name: "Бензопила", w: 18, rarity: 30, p: 800, icon: "🪚" },
  { name: "Надувной бассейн", w: 18, rarity: 30, p: 750, icon: "🏊" },

  // ЛЕГЕНДА 10%
  {
    name: "Костюм Асхаба Тамаева",
    w: 10,
    rarity: 25,
    p: 3000,
    icon: "🥋",
    buff: { type: "wearable", paydayBonus: 100 },
    buffLabel: "+100 МК к каждому Payday, пока костюм надет. Можно снять и надеть в любой момент, без КД.",
  },
  { name: "Скутер", w: 10, rarity: 25, p: 1600, icon: "🛵" },
  { name: "Двигатель от жигуля", w: 10, rarity: 25, p: 1200, icon: "⚙️" },
  { name: "Кожаная куртка", w: 10, rarity: 25, p: 1200, icon: "🧥" },
  { name: "Повербанк на 10000 mAh", w: 10, rarity: 25, p: 1100, icon: "🔋" },
  { name: "Банка мёда", w: 10, rarity: 25, p: 950, icon: "🍯" },
  { name: "Коса", w: 10, rarity: 25, p: 950, icon: "🌾" },
  { name: "Пачка сигар как у Томаса Шелби", w: 10, rarity: 25, p: 900, icon: "🎩" },
];

const ITEMS_KSYUSHA = [
  { name: "Обгрызаное яблоко", w: 65, rarity: 65, p: 25, icon: "🍎" },
  { name: "Пачка комби корма", w: 65, rarity: 65, p: 120, icon: "🥫" },
  { name: "Сушеные грибы", w: 65, rarity: 65, p: 105, icon: "🍄" },
  { name: "Доширак", w: 65, rarity: 65, p: 120, icon: "🍜" },
  { name: "Кубик льда", w: 65, rarity: 65, p: 100, icon: "🧊" },
  { name: "1 кг помидоров", w: 65, rarity: 65, p: 95, icon: "🍅" },

  { name: "Книга по англ", w: 45, rarity: 55, p: 60, icon: "📖" },
  { name: "Пенис осла", w: 45, rarity: 55, p: 190, icon: "🍆" },
  { name: "Билет на концерт Лил Жмипа", w: 45, rarity: 55, p: 320, icon: "🎫" },
  { name: "Банка пива", w: 45, rarity: 55, p: 275, icon: "🍺" },
  { name: "Футболка Жучи", w: 45, rarity: 55, p: 270, icon: "👕" },
  { name: "Мяч", w: 45, rarity: 55, p: 320, icon: "⚽" },
  { name: "Унитаз", w: 45, rarity: 55, p: 240, icon: "🚽" },

  { name: "Порваный презерватив", w: 30, rarity: 45, p: 260, icon: "🎈" },
  { name: "Ублюдище", w: 30, rarity: 45, p: 450, icon: "👹" },
  { name: "Хоккейная клюшка", w: 30, rarity: 45, p: 900, icon: "🏒" },
  { name: "Часы", w: 30, rarity: 45, p: 750, icon: "⌚" },
  { name: "Плитка", w: 30, rarity: 45, p: 600, icon: "🍫" },
  { name: "Мыло Карасан", w: 30, rarity: 45, p: 550, icon: "🧼" },

  { name: "Лёгкий бабиджон", w: 18, rarity: 30, p: 1000, icon: "🪁" },
  { name: "iPhone 15 Pro Max", w: 18, rarity: 30, p: 3300, icon: "📱" },
  { name: "Золотые рукавицы", w: 18, rarity: 30, p: 2850, icon: "🧤" },
  { name: "Lada Granta", w: 18, rarity: 30, p: 2300, icon: "🚗", topSpeed: 165 },
  { name: "Пылесос", w: 18, rarity: 30, p: 1100, icon: "🧹" },
  { name: "1л краски", w: 18, rarity: 30, p: 1100, icon: "🎨" },

  { name: "Пульт от ядерки", w: 8, rarity: 20, p: 5100, icon: "☢️" },
  { name: "Коробка Roshen", w: 8, rarity: 20, p: 2200, icon: "🎁" },
  { name: "Перчатки Тайсона", w: 8, rarity: 20, p: 3200, icon: "🥊" },
  { name: "Углерод", w: 8, rarity: 20, p: 4300, icon: "⚫" },
  { name: "Холодильник", w: 8, rarity: 20, p: 3100, icon: "🗄️" },
];

const CAR_IMG = {
  golfGti: "data:image/webp;base64,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",
  focusSt: "data:image/webp;base64,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",
  civicTypeR: "data:image/webp;base64,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",
  gr86: "data:image/webp;base64,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",
  subaru: "data:image/webp;base64,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",
  supra: "data:image/webp;base64,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",
  bmwM4: "data:image/webp;base64,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",
  mustangGt: "data:image/webp;base64,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",
  porsche911: "data:image/webp;base64,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",
  nissan350z: "data:image/webp;base64,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",
  ferrariSf90: "data:image/webp;base64,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",
  mclarenArtura: "data:image/webp;base64,UklGRuAXAABXRUJQVlA4WAoAAAAQAAAAbQAASQAAQUxQSBMKAAABsIb/v2k31u+/1j5Rbdu2bSWnk7rDtGlGNca2dTHW87gd27adubVt3DY5e631e7H3YSbvI2ICbuLxPz9fJSi+Yf4DV0M1uPOP0gsg9UuKSyYD9c5b8OK99dDz5gUXrZ4JmVxSXFKSXWNYyfLSq6vL5JKlf147SJqVLPnzukGCwhXPXj1Yukxb/MeNQ6Rr4WNvXjk/p33hor9uKc5pV7jwz1uLq6JVSSvOFEHCIkhekLwgVBAqSFyQuCBUENqHXaAFEKUVAFGAAKK11oBoLUoApbUIoIOA0hoKUFpDKYjWUArQWrSCaA2lIFqgNURrKA3RGkoDogvZBxqVZ3P2q1Q6sFul0opFlcoZHFapFLJzpTKLsyqVZzmzUhnBqZVKS3aqVFqwuFK5hAMqlcfZqcJopUQEIhn1X47IPOWJiCiEeoCnRESUp0QyYTm8jKpaRSO8V/PG1ds3QLZCohJRStI0BjqDtDejM1oUVc+a/Ovr+7784Om7bi++/+7i1b9+Xi+nU3GnnDwEtUrDE+yYQRpA99sKvqDvM+kD+8pYtmff6zf3b5QFKE8kRfm2OFNEA5jzHvnDV5+89+6PJ8OMb8pjxlqSMYYe++WM5gDgRZSo5AbsHpIZooHItS+uebxPDoDxBSV3DBs6ZMU9a4wjnSOdswy1JA+/f2YDjaBoBUCreC3YNwNEe0Dd2fXvaAfk9RhdpTFJrvv7f98vvuKoPfayoSMdj2x79NrrvqKzluShjddf3bVWewBKC6DjjGaXDACQd/r1swFM+eW934/XLvj6N+cY7nY/dMFuOms/LqoHACvLjXOHdpCk2/fFe0u7AOjXAlAhYzkrbUrL1AtfvDmr8dTucu7qnCHzAOT+6Xxrbcynz9/wMH3HrSe/q41swXYarv/S+bEYg/aLL77lr0/Wggpcy3FpA4rM76NxJ20PQdDTwCc0DDUs0b/SMPjDJes3bzOM75wxhiQtuXUlNICn2DktolGl3hVH5+D0zT//cSMQyVEAUGfCHudCrNsaKaQh6WgZ37lAqDPG0Pk80kAJsJTz0qEBtNv+gZ76GU+1mb24dS0AkclLPtzG+D6Lqm82lqE2Zq0NpNDFeAM84Db2SIlorbRWyBux9a3ReVeTu15suvCWGU3HL/tsE0laF2bdOvUwDdNuGfOPNhHBDNc7OfEE4UN38osOSw/RmM82bBpw17OHSNIYYxm3nKd3O25c2izLSF6JCIayR1IKQN7EwQvfev0D3res13OkjVmGmzLfd47xDdfhNd8w1PHp92lTYrm88+TVXIUIxu8fk4R4qHPe95vJMpJbJ+HuPSdsOUm6QLgfNMaUc1+L1ifowkjnmFLjVgNovGeNaLQ6NSQJoPfHJI2jKTMLAaB+/9aXffXSTR3WPb7q0r82btx45BDjuyI8TsN0+xyH7FysICBt2DUhidR7jrTWko6O+1+9avSI5gjqdgCQ7UW81i1nzZw96+yPv3lsynlVLrSG6Tb8MRIBpGNpNqQH/wsvnvZq/EJrmOTJn3+9dt6Cc/rm5rU+qykSnn/24rk0Ll3O+e2A08cj969qkGlcnAhwsSl3TND5xhiGb9q959srr7/xxhtvuumW0Jt+Iw/QMW3cVytvwoAhqHtXRNCQbaHDlGpyJVPpjPV93zHFjmn3+bzqvLUQWgBgEqfH07iXZamI65yzsSSto2P6LR/NRV7XKaIEwGiugBci0vKI79KQYucbY1x6HNtBQ9eAAMB/2Q86xMM8Gma4YahNU08oJQgfE+sdJqra785mgLO+jWe595kB8x+N0aXFdYECJKzjwclhHu6nYWZbvtwZs1qh00+0afD5kKiavSEhq3fUVgJAo3e5celzPPHrhV/TBaz5Hchp3T8Lnfw0WPvbKOCcFxAJ4bvQAATqPeeYfutf8nb0vbByXqwQjOAxZ1Lm7N56Lb03roQX8s2GmkoAUepjmgwg1zGu44PzvdM/bawwKzuffqpsOb9HQ91aED6NxfAARORaxjKCNC5g+UfjvviN3ZSqKm33WZcS55N/typEop1cf2hAoHbSZoRluDO/vFRz3qFjEQTX0yZjraN1XF3Q5mn2hhfvZg4JeJgQK3MZEddx3YjB3rbyzQ3aecqTG+knZh1Jy5OPNEL20K5NIYmcHtC4kZlt+CxQLatu9ZtOtUY2FjIWxxnjHLl58z6unwB4SHIhO4e9euqCo9ZmjuUf9Wtc0BjTj/BS5GBFmLOWwb9HKak7AvAEUEoSuZS9oaHQJfYMikljk7O+71JSdnqd6nXy9LQtfA65WBxwhuSh2y/fFpsIDQAKyc9kD2hojOYEPXrHHtI4F8/5vnUkaZJz3I+g6J+O3yY5cgVjtKQrvXbcWajZGBoQjVQuZBE0ROofnIysrJpP7yLp4oS+XXjmfpoUHKgm0jRLdNOWWoC/jDPc+twgufKJ0dmAIKhScQl7QANAlxoINn16026agLVH1qwZvfqnV9YMeoSxFORBNcuCBqAxnPT5Vx2EiyCY1QOSXCeODREAEblt981Tumf1Glyvbt36rVp0BnA9yb+aTKBJgSBYzYNI9aduax4dgywlohXSeg1nh0ABGoMWXfzLm5c9vaFr+w6NgebVI+02MVbOLVUfpZ9ULno11MvfOS1LIa4gA9uyaxiAnghtNvNWkvyPAtoOzl9IkjvxJU0Se1vUfmRR5PRCBQCitNIaAHQbSFpas18CEK/ZTxe0qQevc6+dd47ysrQCivxDR/Ydu7rjdt8m4psNA3cc3D0GyasGSG+UvRKBQq8VZ3y4fs/OB77sLgieXlgP2TVqNMM0xkhaZwxpyZUP8dWxRdpLKu1XcV5CEAA1f+Gnl0247LYFY8aPuZQHXjytCYBRD+6hOXyCJO0p3jah2ty33+4OjVDJSkDS9AA7JQblecjuAAAdHIPHyBmTbt3w+oUo5Ps33bLlhW/ILyIIikZ4TjdInHSv4fgkAAigAQ/dli5esnzBoBiH9791GUb8B7OvGIn7F8qclZ0h0FqjAr7D6clBIhj5TkQQWu/l99oBkOd/8ACoFx9SAKRhdQgSlYy5jx1TAEGDUQo64kU8DwCU5wGA5ykA8ADUq4qK+SB7piJx0VoAQGkElQa6NkSFfYC9UyMqXkqjXaAqyv08JzX/2PezcwXQquI89P8hFaAiP3FyWKVyw8+IeBpQWmsNKK01AKW11hJHaS0AdIIQHRSltRZA6SBEBwGltdaADkK0VloLdPjUvS3wj6yR4jqu+6jCASL9ovnRgSJ9o9FRoqRPtCAazYVAoNAhGq0KyPho3EFSJRrMaR/Nj7YCOkYLotEhklsQLYgOFekZzY8OA/KjBdHhkp2f3zI/WltNiYbesu4+0pWWWpIsLTUkS/8uNST5eq7Cd8WC28hN5yDnOOOXbmJw/TGSK5G7hcHSDQyWlpaT5KqHGSxdRz5ObitlOABWUDggpg0AANA1AJ0BKm4ASgA+USCKRCOiDB5y0hwCglsAMfiAVt+XWbnfr8e+NeWlKb3BZ2/8B6lP0B7AHjM/rB7j/2t9QH7O+sN6JPQY/rXUE+gB5cHsaf2z/n+kF//+sA4Sv+NfgB7e+6T6r+M3nT+LfPv5L8veTP0z4qfvr+l/tHoP3u/EzUC/Hv5J/tN8r07/PegR7GfP/+J/ffG41HfBPmgf7PykvCu799gD+Uf2P/Zf4z9yP7l9KH87/0/9J/kf3G9q35p/iP+1/m/8l8gf8n/pX+8/vv+S/+H+H+bf2Xfsx7Gn65JgeHRJjpfgQqCCFvroSBVtTkwTYjzhMDLvcrjzfx5lejePjE3I4WLj2ixopDVuJDuee6EXV/L+udMly/8G4R17QhDbl3+Uef+nZHRjp0IgsOoDCxwcTFz+6lY9PVQWZG1+AStgUXrWbEhKyL9omzBse4mz0/vRT/2kApZFYXK0c4J/Zz8QpVZz0s5Dy7/1K4+QHQPipREWruPdR4x10RAI1NFDh92f8Qi/3sgoNiqCCZqR/SytG1znzUDuC+uijTMBEdm0gxHsUuVq/xE5l4ZqJR4tdgAA89v8S9DQTc3nSTqGA4xVHfjK9H8hBPbdZgHv579TU/Gjm/iSaBjOvJNGSnZEo/f5H64uOmoPanKks0Z8izKDp0b3d1xgVQJ1p1zVAqYyHHi2+iopzKMTj0GjCPHgPuHu+Q2y3aNQhV/TGRR92zxQcOspopn7U8gqwp6ke43zny4jvggWuKyWRW3njiwffAo7iDeidpKD1AoNMucd25N8vbPt7GtJtyMyABi5ZMZabeFxFHye6SJcnhgbz0te1lN8P3xYJwEg+5NcLxhoA8OwuUIlwQksGdEUAZ15B37s7tbTPGAX/Iua4dGQTv8LsGjI5htb1qgd0jERs9U61nwnPJuaOfJje3tlYnnBUk45baROEsMuJcpAjPhrda80RooB554FFzssvHRDagEUK+NEp3BeapnFBg3kasOqPqKdvgWXW8wzx/hmn6nq7E6tu8+O34KqBJTcBG/5HmX777ZMm/0xCV7DvLa/a86HRXK4D/LEDMfW1lkOzg/OLtAdRwPkrOV5fk9gnIIL04ZgFVps+ie8OHNUpoDEUmTd0XnR0a8/7tRs2+HvHLsKgWariWpoTWNc82HBsUxXLs1ZXrz8rNzpKi+hPjoJ+jqh2+mUnh/Wv3cXaCPhJr+HBSjmQI9opkt3d8nUQWa2yurfF5rmHa1oMjbP6ML/gom9FXYcoMp3NAbMPAaCm5hS3oBsofQcBa6Mi9eWVQEVP8ptFpP70SBcQthXlDD6EkGew/RVyWpPM0BWtrjjeHrx/gOyaqdNCY/73GMlX8091eFuU1xBnAVI5d9d4Kfxpfszzn3/v/MlEvs2cszd/3PFupJP5lzSWYTcIw3Ns6AcTz96DWzYIi05PG6EK0O/xq/K1cz3FgLBdVFRqo9cZNeNW+ZpCVKPfZuf9jlMHCwhBmQW8MwffSW7xb2twgYlCECgElEegl78RPT8s02XizsuiZoeU+y+qi7rASw+bTvBgtTZwx2zMdV2ppMKCElnUKu4IaFBreylbJC9i0qADzp5jQBydsQ/EvPiDCqLshLgllj/v4QwXZQb7xOtiLYbSf+OnTqi2KCu2977pvpwpB6QXvijIuB5+mbBv84oi2yEl5CYF36ZeKbQygZfRRBk7Z8mE/ItJ7684mS8j8uS+P+rWuQHKz1rQqcfdfrdXN42iXqeyY6njZOolM3CT3Jj5s3wDb5G1d9Vddcic+iB5jq185CKNTd5cNzVGzVKmTKjaO+FrFc4ezDgTOQmMc6pCC7xWPWfFOAX22xH0dm5DGOE2TSr0JuTIz+Z6LxbTfO0DeSVuuU10lQdvOhPH+AtxbdPXL0jrf3u3mLv5RdkUrc/6iXUjEhidmpUfaP6HzrmADpR8Piqf14R7YfOIJRsja3WLAlGMrEmaWo/2+CHpUZbyyGU6uSC6wIlowTvwKSXh46U+c79UphbB3xe/x1vZxHAh3RIOR3kUde0zcPju+puc4L6wrqWuiHnl4r49r1PJRwf2C/G/m6tkdVttq21x2oVIDXjEvy6E/hkWRwN7WlCDnSHK4BD/sg1rp6Ky3zyWZkBNKlvd7qrQ1VfZuK3Ch6OaR21cg8RbEOIR1WHzyCjpwW7kXGry/+q0WpX5I6YbHydPrUrs6DuK5Vj6O+Jp6bql9d2xoojZpxhmfvl4Dxxn4c7ML4KfWne9o3MlGO3WCyF97vyubTohtB34iZ04nDWT80Lc55RugGYC5SP0N3zpbTd88aqQrl3ngh87pNqpAE2ZL4L4Esm1Y1p9/cGYZRP8m/QQeuP7gAg0mfK3qkpEbSVWgryY/Gi4/9SKYNBKMy54CtjEb0ZriU1zx4okMBsZWTb9IbD6xoCSFtyjbogUwiwXe9Z5AB9KSxf7MlKdgbuJe+Ox2u2RJYXILWzSYAVTLREkyVTQWEa1wR8LYRSDZjAzYSYPMsM1gYhH7x8Gf5+JRab/qmNzpeJzMwvzotpv6/19GavkzYRwnqQHEttvidavICBwtuxbEMx8cF9uTngwcOFMQtG9qcovH06whXeuKX0GADCBVpI+88FiTxzpPV/Rsvt4ljCkHSAVVzYySv3qm7aLr+ae6rcpfX5We9J7U1e/07xDyrL21zAdQCxEdEXExcorliPkmk/u0F8hWc9JYAVN9/DYk25BLqCJNE1km4ZJwOGYtBdh4gefOCZURUNBjLq5pQX/mYg0G9iwYnxHeBVZatHg3qZYWrC7H5yhpZeJmyg6G3HQaCC6IGf5e9rnuL4S23zsGaF9VNh/DtsrauHVmox96yrFrQto2Y4VuzZbi+SediJv4FxPkhRcf6cR0RcPa+rIYJsbMBWh13JJEIeyaOvYnCHCbpbWfCRpqedzc5wxcgIOuODXJsjj4prdOJwxFXxMqsgipO45vDTuYjY8LMkwCbi5uAGt6x+pLk5w+bta4E8HjflZ8btyUK+eR20e2RMHVl7tgCDBDMVLDCTSTejMvFNMBv/Fvi9qZxIZUnl/fIvTef+TKhZflVIcKADa+QgUBBRlMwnLCXj3XThTSGTlgu0/99deWGZqQzi6q+HiPEAVOmv5NvPxf8Z5H9873WmBIxPmLzjUKKgTW558p+Kk3f/IfTnEPem24Hv45o/bzUa4Wf0j5uw4T2KHuEvdf03fN1FKu1Wq5dqFObL1rx2TQ3hkKie7j1uAwL5Y0J33WeQXrk2gdLm9cYpFn04tjal1tGngSPQDVarLMc3tLHmyOu0NEZ8QU863pqf6avSjXXh9zhHSg0jyirWgYUjP538uvJrjP2RORAjJmqCTvR+I/8pLEdak6c7L3YwvyE2j0J3t2PAZCgf396MhKAJRP9gdhcIpLz8iuegGeL85ygLb5RtO+orZBVOgwflEpmD0eQHTxswF9ii7IDT+t1Za6pM78vbAcflLQuHkadXaRTg5qONElZpRRHWQYH/CrB6CgKP8fXgDzH0ND4O6MfzxtmT0LGRK8h3MaiBrxc8L+lBexBFcEbetsfA0ozrS2S9yk7e/VZdpIrgINVHvCzSRqpD2dGB8ut/2/nSECcEHUopQviW6xVa03awCW3V2eHbKTNgMk2m1NnHJin5tDkKyA2jqGi1R2cvTNsLG0EMkmUSgIRdIrPlmFGFkZhbKIa1tI28tqD6wFj60DYB8jXv8rjVCyMJYIFHqJNz+PNPvfzfNF6eDA/gkQuj8/0I3pdHsYfblBql7NkwJTArEuYlC/Jr8F6cRf9ZG3b2PxJAjJ2LOz65U8KLrjYMqzTx/joqG3TDQPU1NXL7NbEU7bNo9m0izUPi37jpMCnzY6lWreEo0Of+LTDZ6WlCzHXWLCrg/9u7z3oDLAnSiY5WjufdzAsrdPGMUZSs+/Fp2LQHQ7y9g3RNo1VyYElx5hD1Tohs68C5cK2WGOrlR+/lDuIhTLCskX/B1P36/yNslj8ajRzj15x6A11UbXWkO41Nx6IZ8JvE+36lvSAh6pPbCzO0grOSIWowoHjqZlOZX+CpAan0y12iXZywRVDESSWbDPYTm84wWE3o/3SsdnZL1XVJw8Iobb6zH7xNMG2we520KGDKPezmtfzrO3LD5U13Gk6txAr/LklUiW1z6byTu2Jt6wNpxnjnhUuxlpBYHPQyRbIfa7aN2CQyguBDbtXOy+d76B4N6ZLpxpyfBzRXSP0Bkyc3hH+hpw4wzgVtL+F3znG66LYSISDH/FKTKv1c3nirKJ8RYdz5xJAEijSxooD3vZ+a19iSA1mITcY6VWMtBS/3Ta9ntdOT02qshbTL0f3P5xwuUgXZ3tnEuexOGPSIolt9a6MXuJFrKx1B4oNKRIAGmtwKjKpWGNCpjeCrMtq/q/A89+nm+EJEHI/bZ8Ai2lkV0VrIXVYPXfL1o0a1BTeA0Zio8iy2HS5TwB4q0X7ZKYdUdcHbN2eyS+m3ThMae+gc11WIcNb5kWdn6rTwcFRbTZVai3GK6HJFc7UbeiwU3g9zAUQxo3ostBkOlQME0XRY+Fl0H5H76n2rmSNvkovOMD26UZeuFgaOmVTkW1JeHrioAEiDj4cVCkFv1u3mddmhCw/XE7623DyCubcsc89d4d14vgMS9SeGjgAA",
  astonValkyrie: "data:image/webp;base64,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",
  bugatti: "data:image/webp;base64,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",
  huracan: "data:image/webp;base64,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",
};

const ITEMS_CARS = [
  { name: "Volkswagen Golf GTI", w: 60, rarity: 60, p: 2160, iconImg: CAR_IMG.golfGti, icon: "🚗", iconSvg: "hatch", topSpeed: 180 },
  { name: "Ford Focus ST", w: 60, rarity: 60, p: 1680, iconImg: CAR_IMG.focusSt, icon: "🚙", iconSvg: "hatch", topSpeed: 150 },
  { name: "Honda Civic Type R", w: 60, rarity: 60, p: 2160, iconImg: CAR_IMG.civicTypeR, icon: "🏎️", iconSvg: "hatch", topSpeed: 155 },
  { name: "Toyota GR86", w: 60, rarity: 60, p: 2880, iconImg: CAR_IMG.gr86, icon: "🚕", iconSvg: "hatch", topSpeed: 180 },
  { name: "Subaru", w: 60, rarity: 60, p: 2640, iconImg: CAR_IMG.subaru, icon: "🚐", iconSvg: "hatch", topSpeed: 160 },

  { name: "Toyota Supra", w: 19, rarity: 40, p: 6300, iconImg: CAR_IMG.supra, icon: "🏎️", iconSvg: "sport", topSpeed: 195 },
  { name: "BMW M4", w: 19, rarity: 40, p: 6975, iconImg: CAR_IMG.bmwM4, icon: "🚙", iconSvg: "sport", topSpeed: 250 },
  { name: "Ford Mustang GT", w: 19, rarity: 40, p: 6480, iconImg: CAR_IMG.mustangGt, icon: "🚗", iconSvg: "sport", topSpeed: 220 },
  { name: "Porsche 911", w: 19, rarity: 40, p: 7425, iconImg: CAR_IMG.porsche911, icon: "🏁", iconSvg: "sport", topSpeed: 230 },
  { name: "Nissan 350Z", w: 19, rarity: 40, p: 6975, iconImg: CAR_IMG.nissan350z, icon: "🚖", iconSvg: "sport", topSpeed: 225 },

  { name: "Ferrari SF90 Stradale", w: 8, rarity: 20, p: 8550, iconImg: CAR_IMG.ferrariSf90, icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "McLaren Artura", w: 8, rarity: 20, p: 9135, iconImg: CAR_IMG.mclarenArtura, icon: "🏎️", iconSvg: "hyper", topSpeed: 300 },
  { name: "Aston Martin Valkyrie", w: 8, rarity: 20, p: 9675, iconImg: CAR_IMG.astonValkyrie, icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "Bugatti", w: 8, rarity: 20, p: 10125, iconImg: CAR_IMG.bugatti, icon: "🏎️", iconSvg: "hyper", topSpeed: 305 },
  { name: "Lamborghini Huracán", w: 8, rarity: 20, p: 9135, iconImg: CAR_IMG.huracan, icon: "🏎️", iconSvg: "hyper", topSpeed: 290 },
];

const ITEMS_CLOTHES = [
  { name: "Хлопковая футболка", w: 60, rarity: 60, p: 380, icon: "👕" },
  { name: "Простые джинсы", w: 60, rarity: 60, p: 380, icon: "👖" },
  { name: "Однотонный худи", w: 60, rarity: 60, p: 350, icon: "🎽" },
  { name: "Ветровка", w: 60, rarity: 60, p: 430, icon: "🧥" },
  { name: "Спортивные штаны", w: 60, rarity: 60, p: 310, icon: "🩳" },
  { name: "Повседневные кеды", w: 60, rarity: 60, p: 310, icon: "👟" },

  { name: "Клетчатая рубашка", w: 40, rarity: 50, p: 490, icon: "👔" },
  { name: "Вязаный свитер", w: 40, rarity: 50, p: 490, icon: "🧶" },
  { name: "Джинсовая куртка", w: 40, rarity: 50, p: 530, icon: "🦺" },
  { name: "Джоггеры", w: 40, rarity: 50, p: 800, icon: "🏃" },
  { name: "Высокие ботинки", w: 40, rarity: 50, p: 800, icon: "🥾" },
  { name: "Кожаный ремень", w: 40, rarity: 50, p: 670, icon: "🪢" },

  { name: "Ветрозащитный анорак", w: 20, rarity: 25, p: 1350, icon: "🧥" },
  { name: "Черные классические брюки", w: 20, rarity: 25, p: 1600, icon: "👖" },
  { name: "Тренч", w: 20, rarity: 25, p: 1100, icon: "🥼" },
  { name: "Кожаная куртка-косуха", w: 20, rarity: 25, p: 1500, icon: "🧥" },

  { name: "Кашемировое пальто", w: 7, rarity: 15, p: 2850, icon: "🐑" },
  { name: "Дизайнерский бомбер", w: 7, rarity: 15, p: 2500, icon: "🎽" },
  { name: "Костюм-тройка", w: 7, rarity: 15, p: 3150, icon: "🤵" },
  { name: "Позолоченные наручные часы", w: 7, rarity: 15, p: 4000, icon: "⌚" },
];

const ITEMS_MOTO = [
  { name: "Дельта", w: 65, rarity: 65, p: 1100, icon: "🛵", topSpeed: 95 },
  { name: "Скутер 55 кубов", w: 65, rarity: 65, p: 900, icon: "🛵", topSpeed: 85 },
  { name: "Электро самокат", w: 65, rarity: 65, p: 950, icon: "🛴", topSpeed: 90 },
  { name: "Мотоблок", w: 65, rarity: 65, p: 950, icon: "🚜", topSpeed: 40 },
  { name: "1л бензина", w: 65, rarity: 65, p: 1400, icon: "⛽" },
  { name: "Viper Spark", w: 65, rarity: 65, p: 1100, icon: "🏍️", topSpeed: 115 },

  { name: "Mustang Alfa", w: 30, rarity: 40, p: 3100, icon: "🏍️", topSpeed: 150 },
  { name: "Viper v200", w: 30, rarity: 40, p: 2700, icon: "🏍️", topSpeed: 135 },
  { name: "Spark SP150R", w: 30, rarity: 40, p: 2400, icon: "🛵", topSpeed: 135 },
  { name: "Полицеский мотык", w: 30, rarity: 40, p: 3200, icon: "🚨", topSpeed: 135 },
  { name: "ИЖ Планета-5", w: 30, rarity: 40, p: 1600, icon: "🛵", topSpeed: 125 },
  { name: "Скутер Honda Lead 90", w: 30, rarity: 40, p: 1750, icon: "🛵", topSpeed: 140 },

  { name: "Lifan KP200", w: 14, rarity: 25, p: 4700, icon: "🏍️", topSpeed: 180 },
  { name: "Geon Scrambler 250", w: 14, rarity: 25, p: 5200, icon: "🏍️", topSpeed: 200 },
  { name: "Shineray XY250GY-6B", w: 14, rarity: 25, p: 4300, icon: "🏍️", topSpeed: 160 },
  { name: "Honda CB250", w: 14, rarity: 25, p: 4700, icon: "🏍️", topSpeed: 200 },

  { name: "Honda CB500 SF", w: 8, rarity: 20, p: 7550, icon: "🏍️", topSpeed: 250 },
  { name: "Suzuki Bandit 600", w: 8, rarity: 20, p: 6820, icon: "🏍️", topSpeed: 240 },
  { name: "Yamaha Drag Star 400", w: 8, rarity: 20, p: 8250, icon: "🏍️", topSpeed: 265 },
];

const ITEMS_PHONES = [
  { name: "Redmi A3", w: 60, rarity: 60, p: 450, icon: "📱" },
  { name: "Samsung Galaxy A05", w: 60, rarity: 60, p: 510, icon: "📱" },
  { name: "Poco C65", w: 60, rarity: 60, p: 510, icon: "📱" },
  { name: "Tecno Spark 20 Go", w: 60, rarity: 60, p: 550, icon: "📱" },
  { name: "Motorola Moto G14", w: 60, rarity: 60, p: 550, icon: "📱" },
  { name: "Infinix Hot 40i", w: 60, rarity: 60, p: 600, icon: "📱" },

  { name: "Redmi Note 13", w: 40, rarity: 50, p: 680, icon: "📱" },
  { name: "Samsung Galaxy A25", w: 40, rarity: 50, p: 700, icon: "📱" },
  { name: "Poco M6 Pro", w: 40, rarity: 50, p: 950, icon: "📱" },
  { name: "Realme 12 Pro", w: 40, rarity: 50, p: 850, icon: "📱" },
  { name: "Motorola Edge 40 Neo", w: 40, rarity: 50, p: 700, icon: "📱" },
  { name: "Infinix Note 40 Pro", w: 40, rarity: 50, p: 950, icon: "📱" },

  { name: "Poco X6 Pro", w: 20, rarity: 40, p: 1700, icon: "📱" },
  { name: "Google Pixel 7", w: 20, rarity: 40, p: 2300, icon: "📱" },
  { name: "Samsung Galaxy A55", w: 20, rarity: 40, p: 1750, icon: "📱" },
  { name: "Xiaomi 13T", w: 20, rarity: 40, p: 2550, icon: "📱" },

  { name: "Google Pixel 8 Pro", w: 10, rarity: 25, p: 5700, icon: "📱" },
  { name: "Samsung S25 Ultra", w: 10, rarity: 25, p: 7000, icon: "📱" },
  { name: "iPhone 16 Pro Max", w: 10, rarity: 25, p: 8500, icon: "📱" },
];

const ITEMS_PHONES_2026 = [
  { name: "Motorola Edge 40 Neo", w: 60, rarity: 50, p: 700, icon: "📱" },
  { name: "Redmi Note 13 Pro", w: 60, rarity: 50, p: 800, icon: "📱" },
  { name: "Samsung Galaxy A35", w: 60, rarity: 50, p: 800, icon: "📱" },
  { name: "Infinix Note 60 Pro", w: 60, rarity: 50, p: 850, icon: "📱" },
  { name: "Tecno Camon 40 Pro", w: 60, rarity: 50, p: 850, icon: "📱" },
  { name: "Poco M7 Pro", w: 60, rarity: 50, p: 930, icon: "📱" },

  { name: "Samsung Galaxy A55", w: 27, rarity: 40, p: 1750, icon: "📱" },
  { name: "Google Pixel 8a", w: 27, rarity: 40, p: 1600, icon: "📱" },
  { name: "Xiaomi 14T", w: 27, rarity: 40, p: 2850, icon: "📱" },
  { name: "Nothing Phone (2a)", w: 27, rarity: 40, p: 1450, icon: "📱" },
  { name: "OnePlus Nord 4", w: 27, rarity: 40, p: 1850, icon: "📱" },
  { name: "iPhone 13", w: 27, rarity: 40, p: 2250, icon: "📱" },

  { name: "iPhone 16", w: 14, rarity: 25, p: 4800, icon: "📱" },
  { name: "Samsung Galaxy S26", w: 14, rarity: 25, p: 4500, icon: "📱" },
  { name: "Google Pixel 10", w: 14, rarity: 25, p: 4500, icon: "📱" },
  { name: "Xiaomi 16", w: 14, rarity: 25, p: 5200, icon: "📱" },

  { name: "iPhone 17 Pro Max", w: 6, rarity: 20, p: 10000, icon: "📱" },
];

const ITEMS_AXI = [
  { name: "Сандали", w: 60, rarity: 60, p: 250, icon: "🩴" },
  { name: "Очки обычные", w: 60, rarity: 60, p: 280, icon: "👓" },
  { name: "Пальто Stone Island", w: 60, rarity: 60, p: 355, icon: "🧭" },
  { name: "Монокль", w: 60, rarity: 60, p: 280, icon: "🧐" },
  { name: "Носки с принтом пива", w: 60, rarity: 60, p: 400, icon: "🍺" },
  { name: "Детская корона", w: 60, rarity: 60, p: 340, icon: "👑" },

  { name: "Тапочки ягуара", w: 40, rarity: 40, p: 900, icon: "🐆" },
  { name: "Чёрные очки", w: 40, rarity: 40, p: 590, icon: "🕶️" },
  { name: "Фуражка полицейского", w: 40, rarity: 40, p: 650, icon: "👮" },
  { name: "Шапка сапин кока", w: 40, rarity: 40, p: 650, icon: "🧢" },
  { name: "Маска ананимуса", w: 40, rarity: 40, p: 900, icon: "🥸" },
  { name: "Кепка пивозавра", w: 40, rarity: 40, p: 745, icon: "🦕" },

  { name: "Ревень 3-го батальона", w: 20, rarity: 25, p: 1100, icon: "🎖️" },
  { name: "Чулки Манюши", w: 20, rarity: 25, p: 1100, icon: "🧦" },
  { name: "Браслет конфетный", w: 20, rarity: 25, p: 920, icon: "📿" },
  { name: "Кепка с Лионом", w: 20, rarity: 25, p: 990, icon: "🦁" },

  { name: "Кобура с тайзером", w: 10, rarity: 15, p: 2000, icon: "⚡" },
  { name: "Кобура белая", w: 10, rarity: 15, p: 2000, icon: "🔫" },
  { name: "Часы ROLEX", w: 10, rarity: 15, p: 1450, icon: "⌚" },
  { name: "RGB сумка", w: 10, rarity: 15, p: 1550, icon: "👜" },
];

const CAR_IMG_2026 = {
  bmwM4V2: "data:image/webp;base64,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",
  nissan350zV2: "data:image/webp;base64,UklGRn4OAABXRUJQVlA4WAoAAAAQAAAAfwAARAAAQUxQSJAFAAABoIVteyFpepNUem3btm17f61t27Zt27Zt27aNmakk3/cedFejqvo8IiYAFTXWOYdeumZrjDGoZZOhebsTjz+xu8eduAbazbLM1I0Hxt/yjVffZA/zN99685U3t5148okmdgBMw9aJcRhr2I8kqXnIuxtyFifePWzEMADWmLpwwKHPkCoiyu6rNCsL77xkcQCZq4XRsc5nZM4SSwiB/OOzc2cAfPUMsDopiWWPgST3mB3W2Go5THfbEBOrqCKR313rgYatkMdkX7HKgfz5qNkBbythnbOY9hMOaYUokYz7TgMAzpTNA8DVXzCx4irCjx/ba7TRYLNyZZhoxaVvIoU1mJP875VlAVMqHPYaSRHWoiSSvHYz68qT4WoyRmGN6iBfwmimNM4c+F9g3Q6EC+BNWUbDJkOidUPlBXClML4B8xYj63eQR6HRK2MNAAy7QSJrOMWXZ8hMT5wHgHFuvolU1nLOkfA9yDww1tyb/fgjmRLrOcpemeuScQbAmns/RJIxsqYlCSeF6UbWANC49uFBMokq61pIpqm6YTJgsqX2/Ydknljjib889y2fs66TDMAWx7xCUqKyzoVfTo2ZfvgIHbgMfoGXSUZR1rvqV/OcOsrMOLCXacsBaz9Bai6sfeFhv750x83geSg2Hlj/GpKi7JO37nr8Ese3hWneC8yF/TIp+d16019WYI3f7HNqYD9NOZdf7NJWBriHFGV/DbrSQq1M5m7ngLLfBq66cAvrcAdz9t/ARea5vAm4k4l9WPnkZmcDxk9yK4fYl5XXjm7hsS4H2afDmDDGTPKRaJ9JUsApYQw861AlSRLRkhQq3xzfGGuPFq2cRhZqGZLe+zKFZJCVkcHhc0r1+M9Fk84375zrBNUS5Dz07BibuAUy2Pk/F62YMl0y/vBhALBWCNozTf+OfJSRlPT5YtYB5zGw4pFLLXYzed/WGBOrsnfCt7HK0ZoYeC4aAI7XquVcewEyz8lt4PAJtVcx/OAwJyOD3mmbTmLFEl/bJmkgv76fm8MtydALEZI8BW5ZzTVxM7gaEPl41G9RyPjLTnfnxq6kPQg5mcsTa8FiCVK4ESzqIF17HHOSSt3t+VORncvQJYnkZxdOMLGHQ5bt+a5uhtFQB8qFKGxW8tAT58ep3dFE8pRjJwKADM1uFDzqIPK4u0VbUPTpw3bEWd1IOTlwy1IAHAxaWsCiDjT+NPsXLCAHuSbO7EiZyMGHpwN8w6BNk6EWcp6/1kBiYdRHp8bpHSQh+dDeawJw6PbxWqXIgy9kXpTzZOC0tmJO/vj1wmMAHj08nxVSfj3105KKGLkazipQUSXfOBUAvEMP7UJfi1bo1S0Y2NaqOLVVIMkDtpwQFtagpw6vUSr0zUbSwYqjXamRGnL+/8n10wLI0HPn3qyQ8OhVmLc33yIMQpJXrgbAeYsS4ONYpZmfp7Q3/0I6SH637nqANQaldLidqTLKtdh+lPkWFb624ThA5lBai/tIporIigMdcOHpeRqALEOJjc/u+jcypEpw9f/bCnrN2O+fg9GsQbkN3OjDHiOTqGq5RD9YmG3nPBQXw6P8BgB2fZLNMUqJcm6DGzW1dQ5gUE3bwLjzbv3L90Mk85BraQ40G3OoSPT7KVyGynoAFsvcceOnJKmqKs3ao72x8jdR2jgLFhU21qJ52m223uYHthlCCKl7+wKXMBSQ3pgqtbTeA8Ck0888/S6fffTZF59FNocOtZUO/LOVtfcXaPxji9Ec6tB679HmsEsuvPySN9jdyBcwBrb7P2jTEG9EA7VpjDHWWmssmicetu6wNkcM+4JKUvTgpZwBvqPkIeT8dUFr66Nd12j4BjodZ+LmiSYGAJMt9Aabf5sTFrVtsw5RaB1abn7i8ceeOA88+qYpREvj0NKgolZQOCDICAAAUCUAnQEqgABFAD5tLJJHJCIhoSp07eiADYlpANBiIz3javDfxHhL5KPjcpQl//b+c3fD8T9QL2T5mnzvcjaP/lPG/+wf7L0z/l/NjttOPm+zf7H2BP0R6Gf/b5ffp//2e4R/LP7L/yfXJ9kn7jeyB+w7o0gX038EldiyZrwayTv3dTqiJ8Oc446dtDLShjgkcWG0JM1YMPvGXK//1AOjGD1Z1yBogvgunplVps+J3cSMGhqr386o3tREuV9wl1TBezurtZUBIpPpZ0nQBMIuW2VwuK9qPOcXmUmxT2s/7gM8Y2vuB/e97sldIaQnG8Yad1b6iGK0r5RlAwesuZJNtcRwKiecsdWsgLkC4XQcacoDXpL0Osr3uaKPH4KGNmfbVKVr29fROCZq28+nNWjidBOt6AD+/gbTjlczxoOFr/okcVbDlRDFNlUXHZuTEbjxrqNwnUjz+XJXmnRFMUmsMXHZC7WM0jh2jZfNW3hsBMT89xy/uqwVJ43nnh932/9nP5/oMQrKvMOGu/5r5q4HP737Sekozkg9EyrQzcsCjJgT/+TIgWTEOPATu0CwhSUA8eTaN/djhjXAQIHDwk3K13Q14pFqn5LXZipFl2kVANCdSatv2lqlB5/vdnyf3nVYuSy+utZ7NLFCkz9U7/TdOdE3MM+rl3whsG7PIByvyazbeNwltMjuHuq/DL+Z/n68RoeF/wRyygIBGruJYdks2z/0yAk1D4QYhlTZyZiY92PGy5L/jtRXJVenMq2IpFaskmrRML21ALevm9eejlndrNKmnPFeye9nVV8cIKYzyEfBkU8QqjfRu5O6Ip3vZIpkiefYg39ZvPyLtJhmHMdYanNlEPbF4v3YoCxtGRenxwr0O9GNmMKzD3G/21bJ6TzUb+0eQ7cBuJqzv/RQYrkO3WgglltbHDyVV80O9uqpLGvRIQvsxRkmfFKx1iiuqKX/m49+7xZz22Ho4/DWAyadD+0OPF97uaPp2x083qFGsLSN2jnybamrS/llOV0baIoG+3+GafrBd+kmWy5spsmd9IHQQfYoDuVxs9vl8TIwzsBMo7Mn+zgI/025cN7XyWZbj/ER+cpXN/ma8UfwhvPpDc1eqpz9ByFIp+xtcyRs/illhhXBbFFDtR5mrZEUGxgACjME9M96IWNyt7+U/PzGcwvyCmnG5Qb3NZ/57Kdnam77go0zRSoT4f5iNZxVF2j9M4dD4bdKNcevgXJqnffAey199rdWxURF8FLIUVjBa4UUncCnBEWHrvUIAJQwRuU3Fb8prY+DHnXaEhPMKcSkrodRp+LWT6rLI5IeMqKCViZ008gXALyMQIf43UkvJCnDo6A1Zk8SJ1cbHrtJhhjyq1lh7A7Z1RsUI4+HWusgi/BAKw+l7sBMaPgKczZdXWTbgIjpysmWJ2YnUZCv9gKKspMmDmNlI0cvN6LRIUdzcCKbmkVGTDDcbo2Ql0hAvB/k4KWrRJ6xBSyKxK+so7QKurEpK+iG0KnFxHdfPJgEIE/p4uE+nSAchPhXOhVl35Z4m818g3G9gASizmboB2lSsVIbW9JqMrWvsR5MqjbrZuEwC/g55ufYT/drNsZdau8jm0kXzvrpD5+xRhDFPvWT4M2nf/o6ZY/KKBt76TgiCuNt9IrT7QOEUNUqVF5scudXij+okjO0FlVF280lzhE5UBvHP8971H16yXIjZZLSYM6dOp/2eVgmFdgBvmDeBRJ6vMGi3FXPaoodggywO+xTdp56sIN7riSV/ADZvVspKnxfeJZ50eDDfNwGZsEJBLwbVsf/7Pa5+SDv+rqd51SKvieukjnI0QTdMGhnijfJjA1GU1m62448fXEzLXNEYB923840PQgTavGTcK8YH76izgAudZrBcSL3oZbIgUhHdyO7z2gsQZqTSqa9YRY9EFCAmJWKX4uKPZx6fwwEVDnCKiPPqa4C+Cth+PJGoO9ew+i+TTW/qky6JWd860/Qrqfj+dIYhdwMP1PRbdje/OSsjLzT/UC1WRIXrTFFf2A2Jw+HEN/i4mb4K5qISvcX2PF6OQbcn1dZJV/uVnkIrlUf8ZSS6U5Y6Ms9wj8qiGDA5IktW1C+yXFLeEK7zL2Nb5Zja7CJdISAcCmTOAgcFnY/GG9hA0ungQQlTyfl2gog7fFj7cJxBGT7cNlTqCPkuk1L4vzdQdS9BMOLMrXlxmJZxzqoR0Mm0DyQ8Ju56BZe1YaWg2vhBhb9gQpfWJ9D7KEYOd9DOG219h6myDzuhC4e3XaVkEAJZutFE+F2dwS8xBl4+biGF3z0x1RCd3X1h7xo6MYE4+VuHwzu8UF0dZ4QTjfxvesop2Rd1xJSSg3/ImwK9EwWmpFHrwSk1Pc31YHsdLsm3rMRUUTVz3jz74M2P8bgMs4RiaPHGYA5DrsHroTB6w7/EmtUvTn/d+FfQIvgeHkve/Fmb89HGKcmyFx32jrUIB84U+p50P4L7n3prSguRjY94RFNkSOWdIfIMYFrf/bw42zXK0IPn/7lHNwLLJyzvzy0lsU4EKKsrbsCrM5Z84tqDfD4Tc5zYzoTwIQHYMYGhgzIV7EDgaMnBX3kOASTVQJgNsvH82fVAnPzTI5e3asVOu34JMm976kLxMYev9Zvek9d9CAqgvCevPDAjrEd6Wv/3QIp9gix/3l1mIs6uQHs0Oc1qtur/9/EKm38B01T9wutwIveCerf3Yurqm1B2vN9BEEEBTM0A+6Pu/L+an+X/D6RRlgmOGLEoGYcRwYfO/YW6DTfKDn4IP4R3hddN9g6GOIb6tPj/Q8kG0EIcymK7p6Vx65Uf5+gaIyDYwknggF0CL5HRIveBWgPpEj/D/Z8mR4fQtY0NMagLVmsHjFOpzkJuP0ivdM0QXm+Cb3qaFMe8VR3d/68zo1n4bypTA4WeCZJfxli7w/qU++4D1YwUmD4BVG1khA0FxqqSpEdeXxxpe9DftoVaAlGv2AWbOhb6qvAx4L4C2nNbdPf0Co0AAAAAA==",
  supraA90: "data:image/webp;base64,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",
  hondaNsx: "data:image/webp;base64,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",
  audiRs5: "data:image/webp;base64,UklGRuYOAABXRUJQVlA4WAoAAAAQAAAAfwAARAAAQUxQSBAGAAABoEVtmyFJ+iIiozG2rbVt27Zt27Zt27Zt79i2ZyozIv7vorKY2fcRMQHIsNIVokxdEtBKa60V8lhZi0qvvyP11js2RMmb90a6tVbnjLYA1IABA9YeWSZLLx45amQqwz6DBg8YMKAbANhI54cG0OGkY15khS4pydIJ06cfd+xxfVBs8qEB5pB3fiMpIhLKZGkJJSnpJDn6jfc2sECDzp7WGDhJyDjxrFuJk5jksgV3rweojBkNe+NkBudZ78E5krxxRagoSwa4cjgpzKZI8Jy5agOizCiNzW8k48AMJ+QHBwLaqCxoqJ1j+sBsi5CXAUBUfxY9/0+YMPvecfYe62lYVU9aQaPfCAZhLgrJV48ETN0YC1j97CR65qV4R/68AaI60UDfzniZDMxTF7hkLei6MDjs6eG/vEknzFkXFqynTB0YcyiLPfM35jVNUR2gDemCd8zjwI5QtbPNF4pjTofwMkxttFYKmMXcDpxQG2sBYOvHXZ79WwNlI6D/Co+NX0LJs/+rZQwAnHj6bJJMmN9eqmQbAAz8+BOSQYIwr5MkJv+tTGmtgXW2ezUmXSzMbxGS88aPVRUYCwDX3bWYpPfM+TOPPXmDJ+ahPAs0rT18BMkkMN/FTT25XdtmDPyxsypDAzsc9wlJlwjz3vPtT8mlgHsEpRvR752YFAlsIYMrXKTiG0sog97jyDiwpfSBjh+qv1ZVKQrqhjEsCFtUx+fBh1CsjH6NFLawkizYdtbTRarBvM5lgS1uzMNHH5WCt+nYAsdy1FoAoDDEO2lJYp72IwMZ83A0A7D6w+DYshz+ddoRxgJowDNsYeSIb0vAAlp1/NH7XJBAUqQOCjz5qxQ5HBZKt/+NnnkoTK2DEP4Y/G8Kj4GFwfd0zMPA5a+3GdTvVMZSq4TfYSIDJVmwu4pg9Ggf8sBz7kqH7AbgRPoaSVh+kh7NQMfnYAGDv5kHMaef+BHlmxcMzqWrTUgCMDLlI2UBvfIkkex5jj9iAh3JN3qtPM5JLQL5TSuMKCpchAjA/UyYec9zDhnDhOIL3BG3M66eE844rg0w3ofAhUh9IAdi3ogrGLM4jEXXERKqJAk5YmVA40su57JtrAag9pyfSMaCG7/WKfRMFR6IaayOJ/nSIYBVMK2+5uKtEQGAwW9cnrGEH2OJhDTP39S+lMpC7Bl+2Q4wCoBG6+1Wh0Gxsn3HMmTLhwuuiROW+hDdKpNA8uPNI+gIqQqAQbpBn9MLmRIuxV0s51MMrcQHctTpRwAwCiWVMSitgN29z9SSHed5KWtQeS4hx+7dFbAKVY/s2sxS4IM7MmGVQiD5zSUAbISqG9vQ0PWp4LLj2HcTqVISk8lJu7WGUQrVNxj9IHAVCxmSXSeyzKIhFIoET466rwMAi5qqXeLRqxyw3kQfssNd51bSg+JI8voLugA6Uqjxw+TsMe1/oc+KuEVbV/AZPg7LGU99dXUABnV4oxQoZGBWY14Nlvc5JpIv7wHAWIV6vJeFQhyTcRKHjFxbyadNs77bF1DQqE915kKSHD6OJL0XkYwx6XDaVo2wBnVrMGf85eedgvZXXnvtDBZ753x93VDBoghAhDpWep0+eOC7XVoD6LfpRr/OnkWSSZKEunEXK1cWm5VSqPeGdT97g++ecQpSH3391V+ZLiGEUKPAv9CRZQb52CrUu9YAcOjpZ3304zOvD2lE8SHHHP0PSyahRn+i4Sb6UlwHpu4AKGsAYJVV7/rq7anjdtppRQBNffv3O/Dv3//+l3S1+Q3YOCRpbskVrSNk1EYWqYfcde/D/OWWW7qj5A2jSPFVkEBxLnbDgb0Yp4QwHgoZVkpppQFgw932eez3t97/YtDgQYMBvekEMpYKkpiMWXwoGjp+6F2R505aZyk9amiIAKBt186Pv/7aa6+ff/Jhh2xz6c+klE2Sw+nfefetd65FI45mEkQcRzRplb1iY4xCyQMuueiyXdDq+Mks2x9/3E7dj9sO6QYnkkL+1cNo5GpkbWRRbIBuA8rui1RrrY0ANODksRzxSzto5HBkrTVQFhVaG2kbobQGjgGgkedKl61QsQa0VsgiVlA4ILAIAAAQJACdASqAAEUAPm0skkYkIqGhLnVdEIANiWUAyJCERWDpaAzngNNQ3k3yM8wA7cv8z4S+WD4xKQZu8lnjhqBPQ/DN23z3ppqox4z6BvRjz2/Wv/o9wr9bf+t2Iv2y9lj9hXNKN6VscjAsRqxz1JJF6fuUM95/CnDIsjWm2r7Pt9KBONyHSO+RMB0A/YhUwuyaeYuDXCdgKifHfLO/U4WahPXujRT1jN5Zre/7M/UH6FPPDvuIMFmIL7oEEdhQIst+RsLA2KyOocQTtTp6/O6sb5BreRtASW0h509Rp6rl5f4/bOl7FNt42LaFOwK10k4mi1zlUn9VnVu+X7Pn7yVf6hj6eWhvkj0sel5Yijmbav9YhGg7ZDui86r+3Gxmi8lP0YNFsq53dAAA/v58lCAo12TZvK94j/ZBYdX8eqH4MSjNkMumw00r8z1N7kulwuQPa2VD8/ZCIX1zjJNsqQfVoi8/zasyOsEezM+9pqWmc+x4IyxlrBABzPYkNlr4t7P+/OMBc5OYMmbW2ekMU8OjkqQPgiCjVg5fJ+imY6CmtvmW4/H/HGHpjiaaUri3J+XjukF0aqp5oCfhrFeQKw7AnaSwUVUKd9Pbylxc24AuAEYD6lT4hDpwT4yN92t/iXcO+hA+7ffvQyE9MXFlSms4dd2iAxRSmPJqLSzXO0IWG8AR0O0DCCM+J0WEdyJ06vVGgvE0vifKr8fBLKByQ6dR5aWBBZpweCaYUr7jAxEExdwmMMvYbq4Rni4elz1I3PwNpHO7CPTj9qxdpKyVLXhc7EKRJJvZogTx9dWHRbJgTZPszFVG0R1yTlhbmTtdb8su8/Jmjz4mgBnTwdKrGDSmn/WnHrpQIeO7nWKKDohRwtMHNGPdEh1WsGTtGlSPkje6Gz/bfpftnt355mi5LgGh92BHY2JnPB1NBWYxqExYABVDaw7EwEBf3Cd0r5b5qN28MhS64zzmOPOYu0RnhucgLhPBbuF9UKL0IZX7JJx526xvQmeQRaDgzyatY26WzCHfln6vksgODw3DNuTs46ceR2QbiKFbQZXcqbft8KJT/NUEdPcxfNl9CgDzhftWip6Y3lpTP29CULq+n3APt5VEF3QColPTbxKds6Vyt5EhdqJJnpZnnYY0TXgmjD9eXuDeTlkHKP55YDBIECIWPK2HnuAf+ofmJJPPCxW+YjeWS20L0QpWWGMPMrt45zhElQQIAhDvuaCT4DrP8iQ/pAw+8DFmfvTcTFvLAncDKTprHuGYiPykct1dFkBdHh8Vc+zFDDF3tHEl5LA1QIq1rvcHiDhu5xgpfaK/WLOKTiaSgrKkTDL9DTGReSHUCRYubXY6iMTJfLGMZBv61HkmL0NBUMRO3WgJdalVBXMPyrrY1o3QmxmIT9ibgPLh4mitmRUQM0Na+xZVC1s4M2qvPaS3fx6yRKJ13xmo3VFxUIyPZZ1VBNX/sEgT4H9fzb4hRN/VIdsJIke32l5OhaXIVP6EPf1MUQOQ9eOJhcWfhI8tNs99qqydS8Y28EsdtLo/LlDWH/22+LYCR/n4kYaQurkFWGGxn37VvvgYgB5LCwg/8chlVhcTkRcHx7/O4fgjb/L0pRB3UooWDrKrECxdWpMocPbA57c9PqDgJbj3SV4K0Slo2Iiu+KV6dNYwW5QiW2PXJvHVdKbBfVOald4lRhEAHoxaXVSE11HcJ86aJMcHI8iTC2S6Tf3GlypnOEEZu4j4yseZ58twKO1nx21C/JrS0rz/gKWH1mIOBaXoAbGpVygw7FEYR5/xvfWKTkvXue4n9E2GYATUa8i+DQ9tAEYB6GmcEVzjx6WQYqtzFcYuPs+2rjO1O0Swn9s3bMAiDR1KvhxQYoCJEBdaSnCa/3zUTd3ITxXaoYRbaEkdtHzWic8SoLkfRRNGY88u3PEAp0OqJKCcxV9no0cOw7SvdCpauM2/JLx4LEWtBg4NX/pH3wdNMztQ7E3/elV3YbhbVqIAxAkq7aPkEPMcHKurPpz1e4Z556RKJauEdxorDpoeeo86k2c7pNnFE4ehiG3rcQWw9sDzkzvdj2j9bWakEH2dILbEVRjWYm1GAqhq7PhvFEmC1S3l7yD7S7c7aetnsSGlqxBvQ7UmJ436BoUvqbSiHZUI1uJ4sgsj3imqrlZZU+5f5ePtN+d0pnWRDPdPJMDTuX2Qu4+nVxefgsyyO0k7WmCFxvtj/C3UO3dLaL7LvF+8I8AJSpl6KVerUMabQXszSckTGs+CfqTrzyzJsXfKtG94SRbO1jFerp2VBQo/8P8VnsHic6s+2E9omZysubDCO1UxwpA57ploL0hmTbZoMhuQkoXCKEv37XZnQTK98U0OiGwt4hF3UrU9N62bTJIuPW0jSAs21UKlS66F9NHuS0JfS4bgEOf8Xj+ccvwEjHcDZCL49DWBbjSlXXfObLGvG9eNwRSENtPPiwKQ12qDvs636xpe/XZx6aq6Fez0kwXnYZp9sGaoYkC2SEWLOcgw80DdsGbesU24QtloA+kYhCgaDepPjWvrQdvwg0pouhPZkMzqw3v99jSlEo70eCgSMWmFnpt2/1OWmoTLKE8rIUYPD2BUmWlvO57moHeCoOFtzvS0UXfQPaR3yizh6TWpR+gQK3U6e1a8RuUmiM2iUAKeTu/860xx84xtCI4GfhvCJnaYG9hXyc4V3ZCSvqDcIMfrMdIBtjqJNajyPy8vXFUuBP/k4mwvlee3DzXUWxX9cWHRr4MCdtfX28x9dzKnD6GHZwftBQGO3/69Vr489hA/GNgJJLuzRquq0k9saJ+VAMSgOMwAB9+DH3yr16AMexdmZfZNH0aGY8sgi4DDsao7Bj23lSRCAG0N9HJ2pVnsYgzC6yYTWT+bBG8MAMzNGq4KRJJkvstMk60e+gbaxZqaKhqbTcVu1RGfZuZOJTD/Chr4FjJ8PZV0fCaPS+xIV0EMe0SMpf6BUaAAAAAA",
  mustangDarkHorse: "data:image/webp;base64,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",
  audiR8: "data:image/webp;base64,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",
  nissanGtrNismo: "data:image/webp;base64,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",
  bmwM5Cs: "data:image/webp;base64,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",
  amgGtBlack: "data:image/webp;base64,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",
  porsche911Gt3Rs: "data:image/webp;base64,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",
  ferrariSf90V2: "data:image/webp;base64,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",
  revuelto: "data:image/webp;base64,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",
  mclaren750s: "data:image/webp;base64,UklGRvQPAABXRUJQVlA4WAoAAAAQAAAAfwAAQQAAQUxQSLcGAAAB8IZtnyFJ/v/dEZGZjbU55tq27d2xbdu27Zke7tvvtW0bY9vuzMiI+0FVZSn7eURMAPJUyORIU0ZFvDsuUqopESdP6Yao0nVFbDkucEbVSm+s/mvN6o2MvnrN6tWrV39fpVKlSgCk68SSAPBC61+YMohsGHVC67ZIqlS8KAcFL79B0lqTlNFNcmutJfnhG/8s8iTgeiI+FDD0CGl9w6xr3yd5+Mhv99wJQEkpkuaZCzwwlwy1ZW6GOmTixAkeUrupZR4ohTO/OkFtmcvWWh2S6375Y1G5iuUuLYeorswNoVQKCTT7mQyYh0HA1Muatmya2LjppchNRyC5LEajd0hjmZ/GGGOtpWXEP//X2nWy5wC3X5cggEakb5j3oR/4iYFP8hqhsuWgzlIeg4CLy0aTmrFqfC6FyI5A4U+G/BVCoepehoxdy0tltrqSK5dfLBxU38FSxq8OX4OXpTZmFBJrbqVmDFu981442TmNGx+oWFj46hEaxtJJTinOhnKd8rQciHdIwzi2JHmRlBlSrgtgMs2vl/2fIWO5lAuuq/7+x8iElEi8qdaL3ckwYMhYthy/aPz1rXi/SEt4AFB35ZJjTG4Yy5qzJ5Hfod5DSFcAl137yo6QZBAECTFtuZXhiWOtkK6SOLfvMZLU2jLuLUvZQhZGc4Dzf6YNrbWMf0tas/4SIaNI3DsrpG9ZdhpWQ5QC1CJpWZYaUyWKgzrUmmWrYRQXz9NYll0FqGUCwzIzNGlJvEBjWeYam0LJOgwNy8yQr3xDk8CqyQowgz7LzoBdFzIkAw5yHQCQ7hkfhGGZMmR5gs9WcBMEvqNlPGrf98McsL1fSWLaJRG4jZpxarJluNadZAxZyp5JXPmViQnD0S27dX2bpVkKgw3AUdKYdVcrmYD/MSY07z0FKHqbJnNhoAPyM5xFUuv5cAFIdcUfxsRD4qqX4LxNkyFjSPLgnDNl4SvWt/QkALjoQ59xaQ1ZHw/6fkasT0554snHrwYc3Eyyl5Oivo0P8qT5z9lFbzLIgCX/GI9ED3AKu3/UGQ4ACHnO+zaMEQa8BY8dNjYNExge6nEmpHIchZQSiRLVaZj/NkxlzQ8SW5mGJbnlVkAhonIUUlQO4yCq5XGpdkSzAdct7AK4AhmVqMK80yftbzOoU+2T2J4GN1cChECG48CSnDmSQar90Wxowy8ro0Ah4zFgOKPDF8/Q6EBnIiT5HCCRRYnKQWlg8ik8eM8rPz1pNJOnEXDvtCvhIKsSNZjfpezzCp8uR65Y/gZtNGMtfzoDcJBdgdOervvSB2FpvhizsfpHfOZSNgUqhyeSOTtoqckjdc+Gksi2wBlAO9LmCc1pbfTex9Xc7kBV0tJyn8RWGs1fe54DCGRdYt5KnIF2b4WkzgdLtGcJ0PetCRUnfTuItNwvnj1gyDcBOBI5UHR496dw8QL3l9K3OafZ+5Ljc2eImoeWjt3HJjgaGBL/pFl/qyscgZxcpMmHRbEa/XOrf5K0xtgcsnrzZRe+NsPBHZuuwcBdN7hPU/Mt/POD2gAEclPceOik/QrFgP7Rq/U3E/0gyBXNEuEAwJOjcAo4DXMa7jCX4R4AUiBHJd6h/4kD75Sasw8Alw765XuS1CnDkLTW2lBrbW1GgJturIzHpkusOLcrgca8BxAKuSvcoo/J73oDT34891A/AGg0avgsRtSaEUOTjuGvfeeRb+Cl6bhz+sAB4/tetfeHcsoVyGWJ4jtufbjBa49fdj8e2bC4WkUk3nV74j017+tKHj6w90D3229/8sABMkgjaWm4CmdPvaxO7R5zsf6GQ33hIccFEs8e8NniWsBt/y5p3RYRHxq69JX/num6DgCogmXbGZo0jK81VwGzat2uqrUqvvK3HY6DnBdKKQmc2q3viqsB9O5Tsmx5m8JTC4HuvBnJpVISAjW7kWE0kpr/hnf9iicAoOqmVpC5l1wBuP504Qng6puub/XW62+922kRUPnKK2vceH9NCABwgXJzGaZh7e5z4GB50enAxYOOQoh8gXAVAAjXQfLGt20ZMtiQ/Gt+U6gEKA+YwDCK1SFPAkJesuaH2T3376vpKeSzQFKRVELc36N74+fvvwyA63qe57ke4P2fJoUNfJJHmggJ5YzQ5K7KkIhPpR5eOWvB4i9Yv9FjSH3box8wMInWWpJH35juIbkjhIJE/FbsOHDQkSUzp80vKSlZVsLoO1q2vQuATCIAQCJepes4LgBccEsT8sChgwcPrvnj79WJf61+qFLV8wG4CnEvXdcF6oy/BZl0XYWyUUgAMoMCcQgAVlA4IBYJAADQIwCdASqAAEIAPm0ukkYkIqGhLNUNUIANiWQAz5hWBy/T+bbaf9DvtZs4UO3n55j/Gf5n/AayJ6AH7M+tb6t1pANWdNn3HBk+e785anr/+p78noFzVoq3wb/OvPn/wPV4zvfVvsG/rV6Z3si/cL2Qv2ocz6qA1Fcq68ZxYvruRt/iTzNaNwagNXIwhjfOYKYKbUIhkGxg5y3HRn6+5+aDbornQG7o2tMaCjIRnt88FqxL7qGep8+9J3vmd4U3qpBN0bbW/uJ9iq8BQtPEiehAqMNI9Vn/zm6d7YuhR3iLp6c17Ex0qehPTfbeZMrSnyLsBKchlzRSPTLsI56tXGCiPipyDU3BU05nB3L6CiKOdQL55nSILb1j3r1udYQNSoKzaz5/lQ8IAP7+fJYb+TZwwMB82c/6dvR6/91+RwjWUr1tA3m/+/3v8/u92YWwCNHInhxzFQQb5yVIlW+q4RQZvOPmIjb4OZa1DrB6FnGF8bV8WO1hVeWY/H2HeCnxasL6POxCes2wWUnYXyoG4Yi9fQr3oc1rgx/15GGroNIA+45DvNwg5M1UsB19J6IbleBZdmdN9hW1VKCty81XfyNPTrNYFejqUF/fKJ+Ut01jr2wVp24BYO+mHP9X/6J1QVlhpHK5/ZcpKEpCcuxtjLDDD93qvY2MZ+Eavwh+NhT+TKXf7J65jyHi26RjzNucrru40Fr3t3yyD2iDNPrMgNcELjB/k0FKZQA/tfV6ONhr1uEIZnmdVv+GBNR9001WZB/a82wmHBoQTsx3lPD/rLdDQeAcsMd7HN5yRZ+aax7Tsl3u84AjyQ2xKf0nOqHJukCZ7t3D0pfCU2+uuO9hFHRT2WdyqmtioWD8hhK3Kn1K+BnyjIBAgrN/8LjaAo5HQ0ktUdJXn/ooerubCVdyJ3YOjE1u7ddFlrMLrH9S+JF1FNEjQrM5LfLVqcBg67u49Lld+t3kPIEcJrRAmypfnDr/M49/Tj6hsCDKIK8jeR1P4OUusk3gmqzxYuon2w2iwZRLcQBoiz11BdVh2z9bFm7vuaOCzXHCVO0ZtXSZ0RLv2pT5sP8k2b4gzDpLzA+bWNFz1EelgrlPdZ40FNQ7mDYWZzaxwVX4KYvZZfYRF5puKpodlpvH3gsFwlhLINpxqgLU0CpSkpm/2aPpEFJxpYOa+hks70pvclxV8E18jCirVTixSto03Dnyz9PscAMN7P9KiI/FCby/SpRsJQzc0PAjQPVisOMsDuS465IPsLi21gPwrv+hM5DEqPOiCVnp8XJfUkycqgHLWo9GqshKmU2sNK/RvPFFSvpvqW7P7rvAck7D6l7rV79H1UE8FMDM2W+VJWk/qnC8B9sTuaCn752KCXwOMpEmJ987jKcobnHFhR/9PfH2v5ba2qgkKiE9lPamPx/ViZ8OFmvqCPVKOyqRge1VJffBdzTa96/vTm1ivfM2m3VFbhgAhA8FyHW8ssYJG0kyUODeKuyyz+B1CJmauAxsw5rlQsW/95Io7iXAAMYClgk2xanV3uGs+/aHS2Us4QMAkgSIVFDGMBoLrNnd+T9xaNPc9OsW5b+8uAxZ4Wvh+koGuNRpMQybjBMoYIcITUXT7VA+UCJnBtDl/gQXv6Cb9z/e9tKDv242EZFKg3rgSSI8ByWrhrs6alBfumDdF5jNRlLhuHuL/pAYaoOVt3zVVmGnrXb5FFvUdDMIPPZmHjzSAR0VTjp9wL14BWOQsYLunoMj+s+M9jIlcrAbkgo6IAM4sODjHVkrizB6hOSCMd+A2fHcqhLIpFVVstcUur85SeHqXID/Xw6E7+0TxqPoDjDf8b/yKp4CSa2BRmlkxobjvS1D+0df6JXfObU8M8+NUOmwZ2zrB9ClQ7jlxa+eWEHC4DsZh3ozqCaN3F1wFqwW1D+hF92GwoiN0ms1aizfEWfGwuweTLRtgvu/rwGLwYXpDbamnXoPwGtf10EdNp+gLmdP8ZhDZTMFckqwZR8b40j7+mQY5KKLbhpRu9BcDfuWk9q7pcu+J57dTPw2mP2WhorDMSgIywXGc9xAVnIKb4IbPBdK4QCpuGrnUXVSGdQIe5sXyYvUySCRRSs1ya9c22UAwMRpPBs/glgjwXkH9VEB6xz7btf9jIyba8iCllIXlu+B3++wHyE1B5xv10md22JNN+oz8BfJBeEBSv/p0LNac9dOG5zWzv4jHmmoJEz9jNq/MpEaO5vsKovvTL7sjR+fxpag6t14/vQgJ5b18s6Ylp2/5kV7t6YSrzXIFA8inBghPjyVCBsukWNx+aBcj1p9W7LtKR2ZlcSuqD+Wit44wxKBFY3J7va68uRzofI2w3MH8BPrnOrd0ecCD+k2nQvlQOFoHJdcgilaq68NkUp2Ju/GyJ3aC7yZioWWe3G4EVwFY04Fy/CmGaT4d5bx+ULOf5e09knvPi69E6ApXvGb26YvfNEg50kuzq/cbsnoytfS0cUPj5GqkvOOwqKVJ9ks7eaBXyqlUzD0ePJ8BAO2BiDj3+b5LbsvATxwWTtDVYm+m7Ukk8EF2T3TTngp2AnzmlE29JOTgs5aKHGyF45O4x5KWpWTYGWky1fqfj8o/9bIplecxTFvuEI++61yqbC0A+P59qoeZKaRdvdwNjWyYFLqjVGa2Hde0n7KbDvaAWXgAG5uzp2jR5bN0WLeGg5AtmaYPf+LY7XcBTaWFQd3XtO5pD1yc4qgZxWQZOvJNZ2qnnDIqfzgIKoGajxEZiAQCaRCQgsFv31j3r3JgTxKHHYZb5nSw7D7gaBj8WsN3LRuQfq/O1Ee3Uwf7LdAq1B1gFLA3dsaMDgfw0mh/kkEH4cH6NKikAmoPHu+BAAQJw9G01bdrpVJdADuz5w7LCCX2lt82vxGXhVR081QZaj7v9oj+tA2zkOHyeOWwU0bcLj21O96M/l5PNGOcmvCSb7Nl/jecruvPvqZJ45cAEj/69bHmocZFYtUuRWM01yMV9FRoH4k2X+mY8Bx7okPMsiwxMrgnhHiIBL3xygcAARU4yJGPrB9vsZsjKascTy/UYhl8MgvWGl3MsqX6vFoujyg+NOIh5KHIf/qdQuWMp5N/u4xWVShtmW5UAAAAAAA",
  astonValour: "data:image/webp;base64,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",
  bugattiTourbillon: "data:image/webp;base64,UklGRioRAABXRUJQVlA4WAoAAAAQAAAAfwAAQQAAQUxQSBEHAAAB8IZtnyFJ/v/dEZFV41mPbdu2bWNtjG2sbXt7bC97rZ7t3n6/1/bY05kZEfeDyqqp7sx+HhETgJAKIaRKlABUOqUQAtEtHQcprrl3EdKtYo4TTQ4AUbXC8tzs3Nzcb0jmXnh27vKKVSsCQCzYiQ4hIXHptAkZTO55PtM9f9KU/khVSCnCFwOAew6StLQmkKRJp7W0JJmxPiMj442MexAcV+GScRRr+9u/pOtpFkTP8yyT/vvXvyubtpKAEyKpgJsOkNSaBdf6wZqB6+d1AuA4TigkMPg9UtMylNZaozV54sAVAODE43FVwBxUnmDpa4Zbu6T7ZL9B/ZAoC4SMqQQhUPV7Gs3wW8PEFx958JHOgMw/gUABVfs3eoxI7XkeSZ7+uDRkfjmoclVfSCnFRtIwSj3P88gvLhcyfwQq/8gsVQRiC7Vl5FqfX18hRX4IVP+JHRUw5yg1o9daGhZHvsTEHpq7azW/mjSMXk3S17Mg0ydixbHG9/nvEasto1fzxK8/kX9BpUVIKQSAksOOUDNqbYDh3iLdZ37CrLSoGBJrPPvEhyRpjI2WQM2dM0r0u3qQ/VSlIQaIWj1//uEISY+Rq3nVfyS9s7eXvWlyybEvvYULkRBoecMLTPQ8zej12fsv0pg/MW7+W+x2zaaBMiUZh1Nq8yHSWGMsI9nnoL9Jyx7DV+6g2YXiHZGqAkacOEa6mtHtc+DftPy+SON36Xv2SqQqJGqvsqRvGOUBeRyLmTxvTE4D5SSLCWfT3zTWMtp9PfgfenlDyvzhW49POsWQVMLZTrqMfJ89/6R9Ha2omcfnHm4BEeBg5tv0LSNf6/VrzliuRxOrybwOrzQNEir+DT0Wgi5ve4XHj5RBDnnky554rUmAUM4uk8dC0Oo/b//st9YTFQ5Tf1MDd2TVSrKXhoWh0VunntkAAH+65zjvXrJsEI5pWyhYFl/9UgnHAQ6R5hxdVkpQGH1SszDU5nW0XgoATvaMb0ifr5eQgBIDrLGFge9nX+IgsOgufHlcu6Y/HMDBFLosHF/piFgsofTGWR924FleGzTWetHgeZ6XH0bfjqQiNvz/TRrTf6+aEhCocJyRaA1J6nzQXBdTEAkSbTLw2CpmIA4IlGQkGvKRJUueYLqt8fj55UgqMWTN0K0zOE4qQOJVayPA42vrX1tz79xnTp1PD8lPUaRUidhFRQAI59IF9tV7XCQq8TNN+Cy3P/jZlVdeOXdsado0WOsfylY9vj13in81kRJwMNLwlzoxkYCsCNBm423zb/6PPNMTj9OkgSOrlX6RJJe0gQIAhf531IFC4krXY+it+e9gm5N0XWuG4XnjX4jld12zcknv19uuh0KgBCCQKIb5ngkd+e2VPi1pSTxE90I0H/qPZM4PQBGFpE5MImjUMtKGzD/zzdhD2pCkPV+0ye/GXgAN6R+/skyzuERaK5T53FgTKp9PLb6fLhO13Yb6DLY6yJJ7nm46G/k5nDQhMvbjnMH0GcRMWTEJaTVpyG+XTOjaDI5Kk7j08fLodYY6PC6fKjXE6GRvoSpJbdzThxaSmjzx283tuwMS6RbTfP/+5riPvg2LPvJqmW9ok72NKpaW5KIpmL2B575ZcUfJ0lASaVfIIjkUjzKslr/Ve/qQZiqVqbkrc1b9FTfhxf37m7aFgEQ+CjWInq9HoM47tKHQHIr19FKqfvjUjDuqXbZ0yoq3+he9REIhfxVyaCw5GFcwnJoN5es2tfavjaqKXPZQ1wgAUMi3gzQ0nh5yUVhsS7zBVPbhkjaA6N4eAhBCIN8V/rSGtDRHw+FykcJrKWVBQAGAhIMCKTGbhqRlSF3OREo270ooBUApFFQh4i5dTdKGxLtJpESi4Kt4l5OksQyn5lsonorlW8VFgYNEx6vWkyZML9skvmkOVfAgASfjH3oktSlonrcfxbGDyTgwFFAxgarfk1aThqQJ0IYmFavTyMQvUBRTT+kA439VR8kwAHBQecJ58pldPHLOJfNc1yWP0k3uMZ3uOTejXwcI4Ki2Cee4BHGEVQKllmbO/ubVDj6/ta+UKnfxs/N75TDFY5nvZ2Zmvp/5ftLMzK2lSpZColBvU5PU3FDMQXilAtBhKfoumFcuuy+Aa4f1qTBn4aJFM2fMmDdr7dtIs6MSiuxlnu9yEwRCLaQDOAAWfwh8+wcnLmuBFGsFVETZisFliseEEAiMYdIhkm9IR4YLgIpDxeNFlRq1d+eDm8jsmfNmGHqPvyUwZvSY0Xdw9TEm+tyLlIV0Xs54AhCISoHhwMwD/PO6OfMXzCXJtz/khR56owpEsmAhEKUq1qhhxcuAp19cl/tV9qJGv53lwWzm5uTqf3L50/8GVm1eFKnHYjFEqkJgzEHygXcDVwEYWgUTSqNQFEIIQAiplJJCAUpCSQUoQEkhogIAVlA4IPIJAADQJQCdASqAAEIAPm0skkYkIqGhLBd8yIANiWQA0A/fSLSfLO/ot9FOFYd9W23b8xnnU+jH+477NvNFegfgPBnye/Cc8rJPQLRoMlnhdlG3rfVvMI9tvuPoDfMebHBP+Ez5B7AH6A/6HqkZ8vp//1e4P+tP/S9cb2C+ht+vLiIQHldlL6RlLIjHtkhk+BqjaRZ7LPGImmBRSVs0ajOxtoRffKqOeJAisGHFp6/GnixxhK6yjno5jIGaOlCkeOYgc/vczGdOHDq+CjxCDNP4ti8OLx7P+c6dSTQ5Wn0NPmO6iZGnOIawfWZIe7ygL6eAIiHkCwuDtWia+DwrHwAVH8UGKAQJhPmndvEtLSutJZQgY4cgj+twb7C9WsdHlqETm60qqX0WHaeqDV2hEmob/8bOAD/LA+OzAAD+/nyWO/WpYO/dn4pbcvlySuEJiXUfJt9vAz0q9uMveR/7ZYl7669DCMLPLahGjoOAr9AlgZ8nhNdqohwSZ3U3sMP7fv7VCTBmLCKjU3st63zGoWQr5VYl6AIFL6Hp9w+1Y+AXyXiXPjfiPsWz7SmfwCgKpn0xz6Rm/5i6fHHivyod/kWP7Kj/He0YDANwJPW4ZrXxjxHqJZcEfO4f1qeRAiSFIjYIeWjivuiJzPOIXsam3iiBSRGE9FmQ7Wv8d0RnhOq6ONnIVW+D/W7YoZbmvIphakdzD7/FBIElmKavAEn3xb53EB0D0rg9YCbOZwgT+Epx3EGS3y57tPiSfLlgjyLULIw1L9IizlDL4lcL90IO12TKSGU5WCj4xndsAjRBvQHSidi3NxV6ug+aGgiGg60Xxyk/IuLkgrlPaJGDPr1IbAG3WEfc9YFMD4g5TxRIjdxbfKE9fT4DavaJIZATfSbnXdj4A79nWUO24BwmRxBC7PvSpFKXQxY7uGAFKDMi8pllv3sBDtstTSDSVsAxzV4aRRckw7gFT+1bTOaNwy4tCEhILKImVHowBWK8cOl3QFIfxZ33DfmCjxhK+gFtOz/tvsSS7V/bDauhlAbY27tpXe4FKzyoHdUfDXp7cgRORlir35vHnkcJ3/nAHs5VQuYWy7QT0x72ut8Qt+0kPwVsSW5kTqs/z9Yn+RuX+R12udDzErcCpFZI1jdEvXcraJywx2FKu+1mx2j+ufA158FPcYLNz+zR3GWNiP/nmwNd2h0jyZJJvnfw9Bj3FlL+nUVwvxOcUr/hG9h+44/zMv2ZlZvbQw7Z/yT9YUR5JZDZ/8DkDQZpCpKZdbwLhOAsisHckjPgAUvJW4X1QDqw3o20lK1xXAa1RBgfYjcrp3xkNoWVjH7WfhtkoKg6xyiUH6pYb2oG1dvb7uSpRfIX07JGeRWOzuKICf9lw2QUDdchn88rcTLMjV+KKCoFD7SNz+Q/PVGX3TAF0+ijR9Nh2brdQSTL6lycGdMsB5B7M+lXFr1t8Ib4FFtTWRzkEZq3RN1oPxiZsEBHTW7BM+oPnfjSZ+be3r0TivXazDTKiow5y/V5wiK9iq8xVsCRu8bYxpXbed52kkP4x2r8C5+zP2FK1tt0Qf9QhnKjo+k6njPfbA/CUqM1SeQX2Xj6ZswHGqPkTfgPiPkMgL+68jsmaJO22kmEafwD24dK7mLxe/5q4pyBp+JX4vW5Xv23htQsiVbfHE4xs7Xshv48tCFHJ91uwfzwYhse7ZVs0wGslZXTC1fvI/e3Tf9VdHnVAwcBhWrDapiYAvkVbr+v//l3stG9b1Myzl+0oWFIYM0kiEe5t+2SDiKK+llwrW9F5kGmJUQxEU6OLxHYTtg82f9pNp15G7HVDaFYVZ+6dXt+CUosKw/NRPR5du+P6yinDcqGoTWh1MMFKZXpsQtpE9WRVGyUrzep0GiwPbAqJZBz8tfKxj4PM7QLeKyekSp2VK8HYEL/3T+0Ok19OWMZNPqYZYPzgWqdKq07WZy9SATGUeGS8TU3K7VFS9D2W7rFsy+withruOZ0MIRSPdOd0EtCFxlFjjVYZqsBeCfZjnjMfTOR4O+OEIwiHIeoESgFCl6EfKtdqSBylG1AbPp56gYWD6yNvl+ATM5uWz9j0Cgwn21p+bJ0bxshhmJUt4V1VUGIHJrX4RZvJ7z66YMiieqvn8CjWNl/Nk39WAMrn2zcMJFuZD2Mb8HhTOg8+iJYzsVAh6r9NiywfMGvNxlFle8W0ZH8tSwQbdCFMXvPhDuOSd5IyFYgO4fK/9ksINNJX0BDsu7TYf+2pOvw2QHHYEb/MN0i22/e25mxC8TV99IYQXVY8tDmqEn+7rRmKuSYF94SvGnf1ayALF5pd0Kj5OLR2jzvtPsGkHgKDNc/LJvd9NPlZNC1mtJEt8E3zb482d8n+TEAILmWrqfJko71yBG0fxFB9kf+sbNhB7ZoNsevelwwaAsTx8Us8+uYxelVldzmhe7FuGvZnpe8d1qVx+EmJGB1w4dsRgALvI3HqJAS5Hk93QTPLNiu4HQIV+iFS1riOiEV0vXdNGLk1SvPyQIP/+QQlHFQQRI7ee9CGcdV04sxbTPZH71YToOCZT5SPmhHwWmNwaGcYmzI7aPOLr4r390DNugnbSWsDnzBw9lH3l/0uK4uePmn7MDHOwpJJIJJc0D9U/Y28FsY+5voDIxS2f3FdxLfg+Z80RQjN1rUWMH9+eP2MQNJsnrLwNyWm3B3Egdl+zCU7SZSbntRD5EqFDJCI0tRNMIV/AIyPSx8j+lcwpwrqhmhYxYiCVM7DDgvXmLg0abOgfoBVPlJieIzClYlgDe8L6FgQdq+VmSe3Deo2Fjki5o+OKmrTLktzaT3B8GnAIJ5JTdUNf54X2VcmjSJiTGue4f574L70sKOnGO3TfZYTd5DWsAOr5klJ0MS+0A4t8OaRvvP2RocfesqkY+EzafH+pVVOTJa0TRBNEusOaq1QPtzJZBax2aeVLk5w0R1/M5tt0wp8VilxkLR1gO0zwb9yAfWsuattzpa2tPsJ3sHEBVKv+fceSo5pdvcVwLDILVKSRyoRpi29spKWdEN/zPuSBczS0BTnCcP8Q32VCGJXTRGZPd68SBuFuT0HZUWRCBvUr/WXsdvEiBr9UYqQ67/6Hx8wf0Fjc1X1kCq7WCQXZy8pzq7J08nira4dGIbQFpO4MELESZ0aZwM2KXHXjZ+RxI9RLo3rMG11/OtobvnfQoHFyLq8Z7PIoT3hQJcR+X8/HhmZxUDIDllwJlbPqi8vzUfh1E/+6zAnAlbZz3iBbOliXYnj43eLiqNZV1spP7AvGAcJble+5wQGZhADp/0AYB2zP41xtpkKJB8AEU4N9MGlJjuiyfyzCATTGhd0jl8RzEobl/P/4FNS9j8//gZ5/7ihpwDxgP4HVT4togNMAn2u2BPeYLmtVBqIB6AqdAAAAAAAA==",
  koenigseggJesko: "data:image/webp;base64,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",
};

const ITEMS_CARS_2026 = [
  { name: "BMW M4", w: 50, rarity: 40, p: 6975, iconImg: CAR_IMG_2026.bmwM4V2, icon: "🚙", iconSvg: "sport", topSpeed: 250 },
  { name: "Nissan 350Z", w: 50, rarity: 40, p: 6975, iconImg: CAR_IMG_2026.nissan350zV2, icon: "🚖", iconSvg: "sport", topSpeed: 225 },
  { name: "Toyota Supra (A90)", w: 50, rarity: 40, p: 6100, iconImg: CAR_IMG_2026.supraA90, icon: "🏎️", iconSvg: "sport", topSpeed: 235 },
  { name: "Honda NSX (2020)", w: 50, rarity: 40, p: 5900, iconImg: CAR_IMG_2026.hondaNsx, icon: "🏎️", iconSvg: "sport", topSpeed: 220 },
  { name: "Audi RS5 Coupe", w: 50, rarity: 40, p: 6350, iconImg: CAR_IMG_2026.audiRs5, icon: "🚗", iconSvg: "sport", topSpeed: 240 },
  { name: "Ford Mustang Dark Horse", w: 50, rarity: 40, p: 6100, iconImg: CAR_IMG_2026.mustangDarkHorse, icon: "🚗", iconSvg: "sport", topSpeed: 250 },

  { name: "Audi R8 V10 Performance", w: 19, rarity: 25, p: 8100, iconImg: CAR_IMG_2026.audiR8, icon: "🏎️", iconSvg: "sport", topSpeed: 265 },
  { name: "Nissan GT-R Nismo", w: 19, rarity: 25, p: 10800, iconImg: CAR_IMG_2026.nissanGtrNismo, icon: "🏎️", iconSvg: "sport", topSpeed: 275 },
  { name: "BMW M5 CS", w: 19, rarity: 25, p: 10800, iconImg: CAR_IMG_2026.bmwM5Cs, icon: "🚙", iconSvg: "sport", topSpeed: 280 },
  { name: "Mercedes-AMG GT Black Series", w: 19, rarity: 25, p: 12600, iconImg: CAR_IMG_2026.amgGtBlack, icon: "🏎️", iconSvg: "sport", topSpeed: 280 },
  { name: "Porsche 911 GT3 RS", w: 19, rarity: 25, p: 13950, iconImg: CAR_IMG_2026.porsche911Gt3Rs, icon: "🏁", iconSvg: "sport", topSpeed: 300 },

  { name: "Ferrari SF90 Stradale", w: 9, rarity: 20, p: 8550, iconImg: CAR_IMG_2026.ferrariSf90V2, icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "Lamborghini Revuelto", w: 9, rarity: 20, p: 14400, iconImg: CAR_IMG_2026.revuelto, icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "McLaren 750S", w: 9, rarity: 20, p: 15300, iconImg: CAR_IMG_2026.mclaren750s, icon: "🏎️", iconSvg: "hyper", topSpeed: 310 },
  { name: "Aston Martin Valour", w: 9, rarity: 20, p: 15300, iconImg: CAR_IMG_2026.astonValour, icon: "🏎️", iconSvg: "hyper", topSpeed: 315 },

  { name: "Bugatti Tourbillon", w: 4, rarity: 10, p: 18900, iconImg: CAR_IMG_2026.bugattiTourbillon, icon: "🏎️", iconSvg: "hyper", topSpeed: 320 },
  { name: "Koenigsegg Jesko Absolut", w: 4, rarity: 10, p: 20250, iconImg: CAR_IMG_2026.koenigseggJesko, icon: "🏎️", iconSvg: "hyper", topSpeed: 320 },
];

const ITEMS_BOMZH_CARS = [
  { name: "Пахучка ёлочка", w: 50, rarity: 60, p: 1000, icon: "🌲" },
  { name: "55 деталей", w: 50, rarity: 60, icon: "🔩", grantsParts: 55 },
  { name: "Ржавое колесо", w: 50, rarity: 60, p: 850, icon: "🛞" },
  { name: "Кожаное сидение", w: 50, rarity: 60, p: 1400, icon: "💺" },

  { name: "Honda Civic Type R", w: 38, rarity: 45, p: 2160, iconImg: CAR_IMG.civicTypeR, icon: "🏎️", iconSvg: "hatch", category: "cars", topSpeed: 155 },
  { name: "Subaru", w: 38, rarity: 45, p: 2640, iconImg: CAR_IMG.subaru, icon: "🚐", iconSvg: "hatch", category: "cars", topSpeed: 160 },
  { name: "ВАЗ 2107 drift street", w: 38, rarity: 45, p: 2300, icon: "🚗", iconSvg: "hatch", category: "cars", topSpeed: 160 },
  { name: "Volkswagen Golf 4", w: 38, rarity: 45, p: 2550, icon: "🚗", iconSvg: "hatch", category: "cars", topSpeed: 165 },

  { name: "Ford Mustang GT", w: 18, rarity: 40, p: 6480, iconImg: CAR_IMG.mustangGt, icon: "🚗", iconSvg: "sport", category: "cars", topSpeed: 220 },
  { name: "BMW E34 Street", w: 18, rarity: 40, p: 5060, icon: "🚗", iconSvg: "sport", category: "cars", topSpeed: 200 },
  { name: "Nissan Silvia S15", w: 18, rarity: 40, p: 5930, icon: "🏎️", iconSvg: "sport", category: "cars", topSpeed: 210 },
  { name: "Toyota Chaser JZX100", w: 18, rarity: 40, p: 6410, icon: "🏎️", iconSvg: "sport", category: "cars", topSpeed: 220 },

  { name: "Porsche 911 GT3 RS", w: 8, rarity: 25, p: 13950, iconImg: CAR_IMG_2026.porsche911Gt3Rs, icon: "🏁", iconSvg: "sport", category: "cars", topSpeed: 300 },
];

const ITEMS_TESLA_EXCLUSIVE = [
  { name: "Рюкзак «Cyber»", w: 84, rarity: 25, p: 3600, icon: "🎒" },
  { name: "Очки Cyber Visor", w: 84, rarity: 25, p: 4000, icon: "🥽" },
  { name: "Коллекционный винил «Cyberpunk»", w: 84, rarity: 25, p: 4500, icon: "💿" },
  { name: "Номерной знак «AKOBAN»", w: 84, rarity: 25, p: 4000, icon: "🪧" },
  { name: "Худи «Cyberstar»", w: 84, rarity: 25, p: 4150, icon: "🧥" },
  { name: "Кейс с машинами 2026", w: 84, rarity: 25, icon: "🏆", grantsCaseId: "cars2026" },

  { name: "Tesla Model S Plaid", w: 16, rarity: 10, p: 35600, icon: "🏎️", iconSvg: "hyper", category: "cars", topSpeed: 310 },
];

const ITEMS_RETRO_CARS = [
  { name: "Daewoo Lanos", w: 65, rarity: 60, p: 2100, icon: "🚗", iconSvg: "hatch", topSpeed: 140 },
  { name: "ВАЗ-2110 «Десятка»", w: 65, rarity: 60, p: 1800, icon: "🚙", iconSvg: "hatch", topSpeed: 140 },
  { name: "Fiat Multipla", w: 65, rarity: 60, p: 2100, icon: "🚐", iconSvg: "hatch", topSpeed: 150 },
  { name: "Chevrolet Lanos", w: 65, rarity: 60, p: 2800, icon: "🚗", iconSvg: "hatch", topSpeed: 155 },
  { name: "Chery Amulet", w: 65, rarity: 60, p: 2800, icon: "🚕", iconSvg: "hatch", topSpeed: 145 },
  { name: "Hyundai Accent", w: 65, rarity: 60, p: 2850, icon: "🚙", iconSvg: "hatch", topSpeed: 160 },

  { name: "Honda Civic Type R EP3 (2001)", w: 29, rarity: 40, p: 9100, icon: "🏎️", iconSvg: "sport", topSpeed: 170 },
  { name: "Volkswagen Golf MK4 GTI", w: 29, rarity: 40, p: 6900, icon: "🏎️", iconSvg: "sport", topSpeed: 160 },
  { name: "Peugeot 206 RC", w: 29, rarity: 40, p: 5950, icon: "🚗", iconSvg: "sport", topSpeed: 165 },
  { name: "Mazda RX-8 (2003)", w: 29, rarity: 40, p: 9100, icon: "🏎️", iconSvg: "sport", topSpeed: 175 },
  { name: "Subaru Impreza WRX STI", w: 29, rarity: 40, p: 8400, icon: "🏎️", iconSvg: "sport", topSpeed: 175 },
  { name: "Mitsubishi Eclipse GT (2003)", w: 29, rarity: 40, p: 8400, icon: "🏎️", iconSvg: "sport", topSpeed: 170 },

  { name: "Nissan Skyline GT-R R34 (2002)", w: 15, rarity: 25, p: 12200, icon: "🏎️", iconSvg: "sport", topSpeed: 210 },
  { name: "Mitsubishi Lancer Evolution VIII (2003)", w: 15, rarity: 25, p: 10850, icon: "🏎️", iconSvg: "sport", topSpeed: 185 },
  { name: "BMW M3 E46 (2003)", w: 15, rarity: 25, p: 11900, icon: "🏎️", iconSvg: "sport", topSpeed: 195 },
  { name: "Mazda RX-7 Spirit R", w: 15, rarity: 25, p: 10850, icon: "🏎️", iconSvg: "sport", topSpeed: 185 },

  { name: "Bugatti Veyron 16.4", w: 7, rarity: 15, p: 16100, icon: "🏎️", iconSvg: "hyper", topSpeed: 280 },
  { name: "Lamborghini Murciélago", w: 7, rarity: 15, p: 14350, icon: "🏎️", iconSvg: "hyper", topSpeed: 245 },
  { name: "Ferrari Enzo (2002)", w: 7, rarity: 15, p: 13650, icon: "🏎️", iconSvg: "hyper", topSpeed: 225 },
  { name: "Porsche Carrera GT", w: 7, rarity: 15, p: 14350, icon: "🏎️", iconSvg: "hyper", topSpeed: 245 },
];

const ITEMS_MOTO_2026 = [
  { name: "Полицеский мотык", w: 65, rarity: 40, p: 3200, icon: "🚨", topSpeed: 135 },
  { name: "Скутер Honda Lead 90", w: 65, rarity: 40, p: 1750, icon: "🛵", topSpeed: 140 },
  { name: "Yamaha YZF-R3", w: 65, rarity: 40, p: 2850, icon: "🏍️", topSpeed: 155 },
  { name: "Honda CB350F", w: 65, rarity: 40, p: 2640, icon: "🏍️", topSpeed: 155 },
  { name: "KTM 390 Duke", w: 65, rarity: 40, p: 2910, icon: "🏍️", topSpeed: 160 },
  { name: "Kawasaki Ninja 300", w: 65, rarity: 40, p: 2850, icon: "🏍️", topSpeed: 155 },

  { name: "Yamaha YZF-R1M", w: 27, rarity: 25, p: 8050, icon: "🏍️", topSpeed: 170 },
  { name: "Kawasaki Ninja H2R", w: 27, rarity: 25, p: 8050, icon: "🏍️", topSpeed: 200 },
  { name: "Ducati Panigale V4 S", w: 27, rarity: 25, p: 7340, icon: "🏍️", topSpeed: 170 },
  { name: "BMW S1000RR", w: 27, rarity: 25, p: 8550, icon: "🏍️", topSpeed: 195 },

  { name: "Ducati Superleggera V4", w: 7, rarity: 15, p: 8350, icon: "🏍️", topSpeed: 215 },
  { name: "Lotus C-01", w: 7, rarity: 15, p: 9450, icon: "🏍️", topSpeed: 225 },
  { name: "Arch Motorcycle 1s", w: 7, rarity: 15, p: 8945, icon: "🏍️", topSpeed: 235 },
  { name: "Aston Martin AMB 001 Pro", w: 7, rarity: 15, p: 10100, icon: "🏍️", topSpeed: 240 },
];

const ITEMS_CAPSULE_AVANGARD = [
  { name: "Футуристичные очки-визор", w: 50, rarity: 45, p: 265, icon: "🥽" },
  { name: "Асимметричная черная панама", w: 50, rarity: 45, p: 250, icon: "👒" },
  { name: "Ремень с магнитной пряжкой Cobra", w: 50, rarity: 45, p: 210, icon: "🪢" },
  { name: "Светящийся неоновый шнурок", w: 50, rarity: 45, p: 210, icon: "🎗️" },

  { name: "Колонка с RGB-подсветкой", w: 25, rarity: 40, p: 320, icon: "🔊" },
  { name: "Умное кольцо-кликер", w: 25, rarity: 40, p: 280, icon: "💍" },
  { name: "Сумка-слинг со встроенным LED-экраном", w: 25, rarity: 40, p: 280, icon: "👜" },
  { name: "Авангардный лонгслив", w: 25, rarity: 40, p: 600, icon: "👕" },

  { name: "Кибер-маска с LED", w: 10, rarity: 20, p: 800, icon: "🎭" },
  { name: "Ретро тетрис", w: 10, rarity: 20, p: 1300, icon: "🎮" },
  { name: "Прозрачные наушники", w: 10, rarity: 20, p: 900, icon: "🎧" },
  { name: "Смарт часы Авангард", w: 10, rarity: 20, p: 1350, icon: "⌚" },
];

const ITEMS_CAPSULE_OPIUM = [
  { name: "Балаклава Opium", w: 60, rarity: 55, p: 270, icon: "🥷" },
  { name: "Очки Matrix", w: 60, rarity: 55, p: 270, icon: "🕶️" },
  { name: "Браслет с шипами", w: 60, rarity: 55, p: 395, icon: "⛓️" },
  { name: "Рваные чёрные носки", w: 60, rarity: 55, p: 150, icon: "🧦" },
  { name: "Чокер-цепь", w: 60, rarity: 55, p: 180, icon: "📿" },

  { name: "Джинсы с заклепками", w: 40, rarity: 45, p: 310, icon: "👖" },
  { name: "Готический лонгслив", w: 40, rarity: 45, p: 400, icon: "👕" },
  { name: "Ремень со шпильками", w: 40, rarity: 45, p: 350, icon: "🪢" },
  { name: "Шапка с рожками", w: 40, rarity: 45, p: 430, icon: "🧢" },
  { name: "Футболка-варенка", w: 40, rarity: 45, p: 310, icon: "👚" },

  { name: "Ботинки New Rock", w: 17, rarity: 30, p: 950, icon: "🥾" },
  { name: "Куртка-рейсер", w: 17, rarity: 30, p: 700, icon: "🧥" },
  { name: "Рваный свитер", w: 17, rarity: 30, p: 500, icon: "🧶" },
  { name: "Зип-худи с маской", w: 17, rarity: 30, p: 950, icon: "🥷" },
  { name: "Кожаный мессенджер", w: 17, rarity: 30, p: 700, icon: "🎒" },

  { name: "RGB Пуховик", w: 9, rarity: 20, p: 1600, icon: "🧥" },
  { name: "Кибер-жилет", w: 9, rarity: 20, p: 1750, icon: "🦺" },
  { name: "Хром-маска", w: 9, rarity: 20, p: 1250, icon: "🎭" },
];

const ITEMS_SECRET = [
  { name: "Viper Spark", w: 50, rarity: 60, p: 670, icon: "🏍️", category: "moto", topSpeed: 115 },
  { name: "Poco C65", w: 50, rarity: 60, p: 510, icon: "📱", category: "phones" },
  { name: "Электронка со вкусом Пива", w: 50, rarity: 60, p: 850, icon: "💨" },
  { name: "Жигуль (ВАЗ 2106)", w: 50, rarity: 60, p: 1700, icon: "🚗", iconSvg: "hatch", category: "cars", topSpeed: 130 },

  { name: "Ford Mustang GT", w: 55, rarity: 40, p: 6480, icon: "🚗", iconSvg: "sport", category: "cars", topSpeed: 240 },
  {
    name: "Ywios 10",
    w: 55,
    rarity: 40,
    p: 5650,
    icon: "📱",
    category: "phones",
    buff: { type: "partsBonus", amount: 25, uses: 50 },
    buffLabel: "+25 деталей за каждый разбор предмета — на первые 50 раз. Пропадает после активации.",
  },
  { name: "Мотоцикл ИЖ Планета-5", w: 55, rarity: 40, p: 1650, icon: "🛵", category: "moto", topSpeed: 125 },
  { name: "Золотая Цепочка «Адидас»", w: 55, rarity: 40, p: 6000, icon: "⛓️" },
  { name: "Кожонка Саши белого", w: 55, rarity: 40, p: 3500, icon: "🧥", category: "clothes" },
  { name: "Kawasaki Z400", w: 55, rarity: 40, p: 5000, icon: "🏍️", category: "moto", topSpeed: 180 },

  { name: "BMW M5 CS", w: 20, rarity: 25, p: 10800, icon: "🚙", iconSvg: "sport", category: "cars", topSpeed: 280 },
  { name: "iPhone 16 Pro", w: 20, rarity: 25, p: 7000, icon: "🍎", category: "phones" },
  { name: "Квадроцикл Yamaha Raptor 700R", w: 20, rarity: 25, p: 12000, icon: "🏍️", category: "moto", topSpeed: 170 },
  { name: "Маска Дарт Вейдера", w: 20, rarity: 25, p: 8500, icon: "🎭" },
  { name: "Gibson Les Paul", w: 20, rarity: 25, p: 7000, icon: "🎸" },

  { name: "Телефон Vertu Signature", w: 7, rarity: 15, p: 10000, icon: "👑", category: "phones" },
  { name: "Mercedes-AMG G63 Brabus", w: 7, rarity: 15, p: 28700, icon: "🚙", iconSvg: "hyper", category: "cars", topSpeed: 310 },
  { name: "Видеокарта RTX 5080", w: 7, rarity: 15, p: 16000, icon: "💾" },
  { name: "Байк Harley-Davidson", w: 7, rarity: 15, p: 13000, icon: "🏍️", category: "moto", topSpeed: 240 },
];

const ITEMS_MIX_2026 = [
  { name: "Утиное крыло", w: 60, rarity: 65, p: 35, icon: "🦆" },
  { name: "Говно", w: 60, rarity: 65, p: 30, icon: "💩" },
  { name: "Обгрызаное яблоко", w: 60, rarity: 65, p: 25, icon: "🍎" },
  { name: "Кубик льда", w: 60, rarity: 65, p: 100, icon: "🧊" },
  { name: "Пачка комби корма", w: 60, rarity: 65, p: 120, icon: "🥫" },

  { name: "Ведро с песком", w: 55, rarity: 60, p: 40, icon: "🪣" },
  { name: "Гантеля", w: 55, rarity: 60, p: 50, icon: "🏋️" },
  { name: "Обычный дилдо", w: 55, rarity: 60, p: 50, icon: "🌭" },
  { name: "Старый носок с дыркой", w: 55, rarity: 60, p: 120, icon: "🧦" },
  { name: "Пчелиный сот", w: 55, rarity: 60, p: 130, icon: "🍯" },

  { name: "Гитара MAMABABA", w: 28, rarity: 40, p: 400, icon: "🎸" },
  { name: "Toyota Supra", w: 28, rarity: 40, p: 6300, icon: "🚗", category: "cars", topSpeed: 195 },
  { name: "Игровая мышка с RGB", w: 28, rarity: 40, p: 950, icon: "🖱️" },
  { name: "Золотая цепочка 585 пробы", w: 28, rarity: 40, p: 1300, icon: "⛓️" },
  { name: "BMW E36", w: 28, rarity: 40, p: 6150, icon: "🚗", category: "cars", topSpeed: 190 },

  { name: "Google Pixel 8 Pro", w: 16, rarity: 25, p: 5700, icon: "📱", category: "phones" },
  {
    name: "Энергетик «Манюша Power»",
    w: 16,
    rarity: 25,
    p: 2500,
    icon: "🥤",
    buff: { type: "discount", pct: 0.1, durationMs: 3 * 60000 },
    buffLabel: "-10% к цене кейсов на 3 минуты",
  },
  { name: "Mercedes-Benz E63 AMG", w: 16, rarity: 25, p: 9140, icon: "🚗", category: "cars", topSpeed: 235 },

  {
    name: "Золотая гантеля со стразами",
    w: 6,
    rarity: 20,
    p: 5000,
    icon: "🏋️‍♀️",
    buff: { type: "paydayBoost", pct: 0.5, uses: 14, requiresNoVip: true },
    buffLabel: "+50% к Payday на 14 начислений (не работает вместе с VIP)",
  },
  { name: "Apple Vision Pro", w: 6, rarity: 20, p: 8100, icon: "🥽" },
  { name: "Lamborghini Revuelto", w: 6, rarity: 20, p: 14400, icon: "🚗", category: "cars", topSpeed: 295 },
];

const CAPSULES = [
  { id: "avangard2026", name: "Капсула Авангард 2026", price: 430, category: "clothes", items: ITEMS_CAPSULE_AVANGARD },
  { id: "opium2026", name: "Капсула OPIUM", price: 475, category: "clothes", items: ITEMS_CAPSULE_OPIUM },
];
const CAPSULE_BY_ID = Object.fromEntries(CAPSULES.map((c) => [c.id, c]));

const CASES = [
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
const CASE_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c]));

function bpRewardIcon(reward) {
  if (!reward) return "❔";
  if (reward.type === "money") return "🪙";
  if (reward.type === "parts") return "🔩";
  if (reward.type === "case") return CASE_BY_ID[reward.caseId]?.boxIcon || "📦";
  if (reward.type === "vip") return "🌈";
  if (reward.type === "key") return "🗝️";
  if (reward.type === "item") return reward.icon || "🎁";
  return "❔";
}

function bpRewardLabel(reward) {
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
const PREVIEW_SOURCE = { ...CASE_BY_ID, ...CAPSULE_BY_ID };

const ITEM_BY_NAME = Object.fromEntries(
  [...CASES, ...CAPSULES].flatMap((c) => c.items).map((it) => [it.name, it])
);

const QUEST_CYCLE_MS = 5 * 60 * 60 * 1000; // 5 hours, real wall-clock time

const QUEST_GIVERS = [
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

function questText(variant) {
  return variant.req.map((r) => `${r.qty}× ${r.name}`).join(" · ");
}

function activeQuestNeedNames(quests) {
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

const ACHIEVEMENTS = [
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

const DONATE_PACKS = [
  { id: "bomj", name: "Бомж Пак", icon: "🥫", coins: 27000, priceUah: 180 },
  { id: "student", name: "Пак Студента", icon: "🎒", coins: 50000, priceUah: 250 },
  { id: "reseller", name: "Пак Перекупа", icon: "🚗", coins: 140000, priceUah: 550 },
  { id: "mazhor", name: "Пак Мажора", icon: "👑", coins: 500000, priceUah: 1650 },
];
const RUB_MULTIPLIER = 1.8;
const VIP_PACKS = [
  { id: "vip2", label: "2 дня", hours: 48, priceUah: 115 },
  { id: "vip10", label: "10 дней", hours: 240, priceUah: 345 },
];

function moneyDots(n, seed) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    const s = (seed + 1) * 977 + i * 313;
    arr.push({
      top: s % 100,
      left: (s * 37) % 100,
      rot: (s * 13) % 360,
      size: 14 + (s % 16),
    });
  }
  return arr;
}

function normalizePromo(code) {
  return (code || "").trim().toLowerCase().replace(/\s+/g, "");
}

const PROMO_CODES = {
  firstopen: { reward: 1500, label: "1500 МК" },
  opium: { reward: 5000, label: "5000 МК", globalLimit: 20 },
  vipkd4: { vipHours: 48, label: "Manyusha VIP на 48ч", globalLimit: 10 },
};

function refreshQuestsIfNeeded(quests) {
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

const CRAFT_TABS = [
  { id: "items", label: "📦 Предметы" },
  { id: "clothes", label: "👕 Одежда" },
  { id: "phones", label: "📱 Телефоны" },
  { id: "moto", label: "🏍️ Мотоциклы" },
  { id: "cars", label: "🚗 Автомобили" },
];

// each category only has some of the 11 rarities in real use (e.g. cars skip
// straight from "Мусор" to "Редкое"), so the craft ladder is derived from the
// actual items rather than hardcoded, per-category
function categoryLadder(categoryId) {
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
function pickCraftReward(categoryId, rarityKey) {
  const bySource = [...CASES, ...CAPSULES]
    .filter((c) => c.category === categoryId)
    .map((c) => c.items.filter((it) => (it.rarity ?? it.w) === rarityKey))
    .filter((items) => items.length > 0);
  if (bySource.length === 0) return null;
  const chosenSource = bySource[Math.floor(Math.random() * bySource.length)];
  return chosenSource[Math.floor(Math.random() * chosenSource.length)];
}

const NAME_TO_CATEGORY = (() => {
  const map = {};
  [...CASES, ...CAPSULES].forEach((c) => c.items.forEach((it) => (map[it.name] = it.category || c.category)));
  return map;
})();

function categoryOf(item) {
  return item.category || NAME_TO_CATEGORY[item.name] || "items";
}

// how many "детали" (parts) an item breaks down into, by category + rarity.
// only Легенда(25)/Эксклюзив(20)/Мифик(15)/Ультра(10) tiers can be broken down;
// anything not listed here (incl. all lower rarities) simply can't be disassembled
const PARTS_TABLE = {
  items: { 25: 50, 20: 75, 15: 90 },
  clothes: { 25: 60, 20: 85, 15: 100, 10: 120 },
  moto: { 25: 60, 20: 85, 15: 100, 10: 120 },
  phones: { 25: 65, 20: 95 },
  cars: { 25: 90, 20: 95, 15: 125, 10: 150 },
};

function partsValue(item) {
  const rk = item.rarity ?? item.w;
  return PARTS_TABLE[categoryOf(item)]?.[rk] ?? null;
}

const RELICS = [
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
const RELIC_BY_ID = Object.fromEntries(RELICS.map((r) => [r.id, r]));
const RELIC_POOL_SIZE = 3;
const RELIC_POOL_MS = 20 * 3600000;
const RELIC_COOLDOWN_MS = 24 * 3600000;

function rollRelicPool() {
  const shuffled = [...RELICS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RELIC_POOL_SIZE).map((r) => r.id);
}

// tag every item with the category of the case/capsule it belongs to, so
// crafting can filter the inventory and figure out "what rarity comes next"
[...CASES, ...CAPSULES].forEach((c) => c.items.forEach((it) => { it.category = it.category || c.category; }));

const RARITY = {
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

const ITEM_W = 128;
const REEL_LEN = 56;
const WIN_IDX = 46;
const SPIN_MS = 6000;
const CYCLE_S = 60;
const STORAGE_KEY = "manyusha-state-v1";

function weightedPick(items) {
  const total = items.reduce((s, i) => s + i.w, 0);
  let r = Math.random() * total;
  for (const it of items) {
    if (r < it.w) return it;
    r -= it.w;
  }
  return items[items.length - 1];
}

function fmt(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

function fmtMoney(n) {
  return (n ?? 0).toLocaleString("ru-RU");
}

// glow color for a case card, purely by price tier — no rarity label shown, just vibe
function caseGlowColor(price) {
  if (price <= 800) return "#4ade80"; // green — дешёвые кейсы (100–800 мк)
  if (price <= 2500) return "#38bdf8"; // голубое — средние (800–2500 мк)
  return "#ffcc4d"; // жёлтое — дорогие (2500–10000 мк)
}

/* ---------- sound engine (synthesized, no audio files needed) ---------- */

let audioCtx = null;
function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  audioCtx = new Ctx();
  return audioCtx;
}

function playTone({ freq = 440, duration = 0.08, type = "sine", volume = 0.18, delay = 0, glideTo = null }) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function scheduleSpinTicks(totalMs) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const n = 26;
  for (let i = 1; i <= n; i++) {
    const progress = i / n;
    const t = totalMs * Math.pow(progress, 2.3);
    playTone({ freq: 1200, duration: 0.035, type: "square", volume: 0.08, delay: t / 1000 });
  }
}

function playRevealSound(w) {
  if (w >= 60) {
    // Хлам / Мусор — тусклый, неинтересный стук
    playTone({ freq: 140, duration: 0.13, type: "square", volume: 0.13, glideTo: 85 });
    playTone({ freq: 90, duration: 0.12, type: "sine", volume: 0.09, delay: 0.04 });
  } else if (w >= 50) {
    // Так себе / Норм — нейтральный мягкий щелчок
    playTone({ freq: 260, duration: 0.08, type: "triangle", volume: 0.15 });
    playTone({ freq: 200, duration: 0.1, type: "sine", volume: 0.12, delay: 0.06 });
  } else if (w >= 40) {
    // Неплохо / Редкое — восходящий перезвон
    playTone({ freq: 392, duration: 0.1, type: "triangle", volume: 0.18 });
    playTone({ freq: 523.25, duration: 0.15, type: "triangle", volume: 0.19, delay: 0.09 });
  } else if (w >= 25) {
    // Жирное / Легенда — трёхнотный аккорд с искоркой
    [392, 493.88, 587.33].forEach((f, i) =>
      playTone({ freq: f, duration: 0.15, type: "sine", volume: 0.2, delay: i * 0.075 })
    );
    playTone({ freq: 1568, duration: 0.28, type: "sine", volume: 0.09, delay: 0.3, glideTo: 2100 });
  } else if (w >= 15) {
    // Эксклюзив / Мифик — насыщенное арпеджио с басом и переливом
    playTone({ freq: 80, duration: 0.22, type: "sine", volume: 0.15 });
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      playTone({ freq: f, duration: 0.17, type: "sine", volume: 0.22, delay: 0.05 + i * 0.08 })
    );
    playTone({ freq: 2093, duration: 0.35, type: "sine", volume: 0.1, delay: 0.42, glideTo: 2800 });
  } else {
    // Ультра / Реликвия — большая фанфара
    playTone({ freq: 55, duration: 0.32, type: "sine", volume: 0.2 });
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
      playTone({ freq: f, duration: 0.2, type: "sine", volume: 0.24, delay: 0.05 + i * 0.09 })
    );
    playTone({ freq: 1046.5, duration: 0.55, type: "triangle", volume: 0.09, delay: 0.55 });
    playTone({ freq: 2093, duration: 0.5, type: "sine", volume: 0.12, delay: 0.58, glideTo: 3000 });
  }
}

function playKeepSound() {
  // тёплый двухнотный "сохранил в инвентарь"
  playTone({ freq: 440, duration: 0.09, type: "sine", volume: 0.16 });
  playTone({ freq: 587.33, duration: 0.13, type: "sine", volume: 0.16, delay: 0.07 });
}

function playSellSound() {
  // звонкая касса — монеты + удар по кнопке кассы
  playTone({ freq: 1200, duration: 0.05, type: "square", volume: 0.12 });
  playTone({ freq: 1600, duration: 0.05, type: "square", volume: 0.12, delay: 0.045 });
  playTone({ freq: 2000, duration: 0.09, type: "square", volume: 0.14, delay: 0.09 });
  playTone({ freq: 300, duration: 0.18, type: "triangle", volume: 0.17, delay: 0.05 });
}

function playDisassembleSound() {
  // механический "разбор на шестерёнки"
  [700, 550, 420, 300].forEach((f, i) =>
    playTone({ freq: f, duration: 0.06, type: "sawtooth", volume: 0.14, delay: i * 0.045 })
  );
  playTone({ freq: 150, duration: 0.16, type: "square", volume: 0.15, delay: 0.2, glideTo: 90 });
}

function playPaydaySound() {
  // приятный восходящий "зарплата пришла"
  playTone({ freq: 261.63, duration: 0.12, type: "triangle", volume: 0.15 });
  playTone({ freq: 329.63, duration: 0.12, type: "triangle", volume: 0.16, delay: 0.09 });
  playTone({ freq: 392, duration: 0.16, type: "triangle", volume: 0.17, delay: 0.18 });
  playTone({ freq: 523.25, duration: 0.24, type: "sine", volume: 0.16, delay: 0.29 });
}

function playWheelWinSound() {
  // праздничный залп для казино / ежедневного колеса
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
    playTone({ freq: f, duration: 0.16, type: "sine", volume: 0.22, delay: i * 0.06 })
  );
  playTone({ freq: 1567.98, duration: 0.3, type: "sine", volume: 0.1, delay: 0.3, glideTo: 2093 });
}

function playClaimSound() {
  // мягкое "забрал награду" — используется для БП, достижений, подарочных кейсов/деталей
  playTone({ freq: 493.88, duration: 0.09, type: "sine", volume: 0.15 });
  playTone({ freq: 659.25, duration: 0.1, type: "sine", volume: 0.16, delay: 0.06 });
  playTone({ freq: 987.77, duration: 0.16, type: "sine", volume: 0.13, delay: 0.13 });
}

function playProfileOpenSound() {
  // мягкий приятный звук открытия профиля
  playTone({ freq: 587.33, duration: 0.08, type: "sine", volume: 0.12 });
  playTone({ freq: 880, duration: 0.13, type: "sine", volume: 0.1, delay: 0.06 });
}

function playSoftClickSound() {
  // короткий мягкий щелчок для переходов между вкладками профиля
  playTone({ freq: 740, duration: 0.05, type: "sine", volume: 0.09 });
  playTone({ freq: 1000, duration: 0.04, type: "sine", volume: 0.06, delay: 0.03 });
}

function playPurchaseSound() {
  // более насыщенная "cha-ching" — двойной монетный звон + приятный колокольчик + бас-удар кассы
  playTone({ freq: 1800, duration: 0.05, type: "square", volume: 0.13 });
  playTone({ freq: 2200, duration: 0.05, type: "square", volume: 0.11, delay: 0.04 });
  playTone({ freq: 1400, duration: 0.07, type: "square", volume: 0.12, delay: 0.08 });
  playTone({ freq: 987.77, duration: 0.18, type: "sine", volume: 0.14, delay: 0.13, glideTo: 1318.5 });
  playTone({ freq: 220, duration: 0.18, type: "triangle", volume: 0.18, delay: 0.03 });
}

function scheduleCapsuleRattle(totalMs) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const n = Math.floor(totalMs / 140);
  for (let i = 0; i < n; i++) {
    const freq = i % 2 === 0 ? 500 : 620;
    playTone({ freq, duration: 0.06, type: "square", volume: 0.09, delay: (i * 140) / 1000 });
  }
}

/* ---------- small UI pieces ---------- */

function Hazard({ className = "" }) {
  return (
    <div
      className={`h-2 w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, #ffcc00 0px, #ffcc00 14px, #17151a 14px, #17151a 28px)",
      }}
    />
  );
}

function rarityOf(item) {
  return RARITY[item.rarity ?? item.w];
}

const CAR_SVG = {
  hatch: {
    viewBox: "0 0 64 32",
    body: "M6 22 L6 18 Q6 14 10 13 L16 13 L20 8 Q22 6 25 6 L38 6 Q41 6 43 8 L47 13 L54 13 Q58 13 58 17 L58 22 Z",
    wheels: [
      [16, 24],
      [48, 24],
    ],
    r: 5,
  },
  sport: {
    viewBox: "0 0 64 28",
    body: "M4 20 L4 17 Q4 15 7 14 L14 13 L20 7 Q23 5 28 5 L36 5 Q40 6 42 9 L46 13 L57 14 Q60 15 60 18 L60 20 Z",
    wheels: [
      [15, 22],
      [47, 22],
    ],
    r: 4.5,
  },
  hyper: {
    viewBox: "0 0 64 26",
    body: "M3 19 L3 17 Q3 15 6 14 L12 12 L18 6 Q21 4 27 4 L34 4 Q38 5 40 8 L44 12 L54 12 L54 8 L58 8 L58 13 Q61 15 61 17 L61 19 Z",
    wheels: [
      [13, 21],
      [49, 21],
    ],
    r: 4,
  },
};

function CarIcon({ variant, color, size = 28 }) {
  const s = CAR_SVG[variant] || CAR_SVG.hatch;
  return (
    <svg width={size} height={size} viewBox={s.viewBox} preserveAspectRatio="xMidYMid meet">
      <path d={s.body} fill={color} />
      {s.wheels.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={s.r} fill="#17151a" stroke={color} strokeWidth="2" />
      ))}
    </svg>
  );
}

function ItemIcon({ item, size = 26 }) {
  if (item.iconImg) {
    return (
      <img
        src={item.iconImg}
        alt={item.name}
        style={{ width: size * 1.5, height: size * 1.5, objectFit: "contain", display: "block" }}
      />
    );
  }
  if (item.iconSvg) {
    return <CarIcon variant={item.iconSvg} color={rarityOf(item).color} size={size} />;
  }
  return (
    <span style={{ fontSize: size, lineHeight: 1 }}>{item.icon || "🗑️"}</span>
  );
}

function CapsuleIcon({ size = 40, shaking = false, variant = "avangard" }) {
  const h = size;
  const w = size * 2.1;
  const isOpium = variant === "opium";
  const gradient = isOpium
    ? `linear-gradient(90deg, #ff2e4d 0%, #ff2e4d 48%, #17151a 48%, #17151a 52%, #7c1a2e 52%, #7c1a2e 100%)`
    : `linear-gradient(90deg, #ff5e2e 0%, #ff5e2e 48%, #17151a 48%, #17151a 52%, #7cf5ff 52%, #7cf5ff 100%)`;
  const glowShadow = isOpium
    ? "0 0 18px #ff2e4d55, 0 0 18px #7c1a2e55"
    : "0 0 18px #ff5e2e55, 0 0 18px #7cf5ff55";
  return (
    <div
      className={shaking ? "capsule-shake" : ""}
      style={{
        width: w,
        height: h,
        borderRadius: h / 2,
        background: gradient,
        border: "2px solid #2c2930",
        boxShadow: glowShadow,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: h * 0.15,
          left: w * 0.1,
          width: w * 0.25,
          height: h * 0.22,
          borderRadius: 999,
          background: "#ffffff55",
        }}
      />
    </div>
  );
}

function Chip({ item }) {
  const r = rarityOf(item);
  return (
    <span
      className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm"
      style={{ color: "#121014", backgroundColor: r.color }}
    >
      {r.label}
    </span>
  );
}

function ReelCard({ item, revealed }) {
  const r = rarityOf(item);
  const rk = item.rarity ?? item.w;
  const glow = rk <= 40; // ambient glow starts at "Редкое" and rarer
  const shimmer = rk <= 25; // pulsing shimmer starts at "Легенда" and rarer
  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center justify-between rounded-md p-2 ${
        shimmer ? "item-shimmer" : ""
      }`}
      style={{
        width: ITEM_W - 8,
        margin: "0 4px",
        height: 128,
        background: "linear-gradient(180deg, #201d24 0%, #17151a 100%)",
        border: `1px solid ${glow ? r.color : "#2c2930"}`,
        boxShadow: glow
          ? `0 0 12px ${r.color}66${revealed ? `, inset 0 0 12px ${r.color}55` : ""}`
          : "none",
        "--glow-color": r.color,
      }}
    >
      <div
        className="w-full flex-1 rounded flex items-center justify-center text-3xl"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${r.color}33, #121014 75%)`,
        }}
      >
        <ItemIcon item={item} size={52} />
      </div>
      <div
        className="text-[10px] leading-tight text-center mt-1 line-clamp-2"
        style={{ color: "#e8e5df", minHeight: 26 }}
      >
        {item.name}
      </div>
      <Chip item={item} />
    </div>
  );
}

function Avatar({ size = 40, vip = false }) {
  const inner = (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: "#2c2930",
        border: "1px solid #3a3740",
        overflow: "hidden",
      }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8.2" r="4" fill="#5c5860" />
        <path d="M3.5 20.5c0-4.7 3.8-8 8.5-8s8.5 3.3 8.5 8" fill="#5c5860" />
      </svg>
    </div>
  );
  if (!vip) return inner;
  const ringPad = Math.max(2, Math.round(size * 0.06));
  return (
    <div
      className="vip-ring rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size + ringPad * 2,
        height: size + ringPad * 2,
        padding: ringPad,
      }}
    >
      {inner}
    </div>
  );
}

function BpNode({ level, reward, unlocked, claimed, milestone, dimmed, onClaim }) {
  const boxSize = milestone ? 104 : 80;
  const iconSize = milestone ? 46 : 34;
  const nodeWidth = milestone ? 122 : 100;
  return (
    <div className="flex flex-col items-center flex-shrink-0" style={{ width: nodeWidth }}>
      <div className="relative" style={{ width: boxSize, height: boxSize }}>
        <div
          className="rounded-2xl flex items-center justify-center w-full h-full"
          style={{
            fontSize: iconSize,
            background: claimed
              ? "linear-gradient(160deg, #223a24, #17211a)"
              : milestone
              ? "linear-gradient(160deg, #3a2f14, #201a0c)"
              : "linear-gradient(160deg, #1f1c22, #17151a)",
            border: `2px solid ${claimed ? "#4ade80" : milestone ? "#ffcc4d" : "#2c2930"}`,
            boxShadow: milestone && !dimmed && unlocked ? "0 0 18px #ffcc4d77" : "none",
            filter: dimmed ? "grayscale(1)" : "none",
            opacity: dimmed ? 0.45 : 1,
          }}
        >
          {bpRewardIcon(reward)}
        </div>
        <div
          className="absolute -top-2 -left-2 rounded-full flex items-center justify-center text-[11px] font-extrabold"
          style={{
            width: 24,
            height: 24,
            background: unlocked ? "#c6ff3d" : "#2c2930",
            color: unlocked ? "#121014" : "#8f8b93",
            border: "2px solid #121014",
          }}
        >
          {level}
        </div>
        {!unlocked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl"
            style={{ background: "#00000066" }}
          >
            <span style={{ fontSize: milestone ? 26 : 18 }}>🔒</span>
          </div>
        )}
        {claimed && !dimmed && (
          <div
            className="absolute -bottom-2 -right-2 rounded-full flex items-center justify-center"
            style={{ width: 24, height: 24, background: "#4ade80", border: "2px solid #121014" }}
          >
            <span style={{ fontSize: 13 }}>✓</span>
          </div>
        )}
      </div>
      <div
        className="text-[10px] text-center leading-tight px-0.5 mt-2 font-semibold"
        style={{ color: dimmed ? "#5c5860" : "#c7c4cc", maxWidth: nodeWidth, minHeight: 26 }}
      >
        {bpRewardLabel(reward)}
      </div>
      <div style={{ minHeight: 24 }}>
        {unlocked &&
          !dimmed &&
          (claimed ? (
            <div className="text-[10px] font-bold" style={{ color: "#4ade80" }}>
              Забрано
            </div>
          ) : (
            <button
              onClick={onClaim}
              className="text-[10px] font-bold px-2.5 py-1 rounded-md"
              style={{ background: "#c6ff3d", color: "#121014" }}
            >
              Забрать
            </button>
          ))}
      </div>
    </div>
  );
}

// Манюша Коин — внутриигровая валюта, золотая монета с буквой «М»,
// чтобы визуально не путаться с реальными деньгами (₴/₽) в донат-меню.
function Coin({ size = 14, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "inline-block", verticalAlign: "-2px", flexShrink: 0, ...style }}
      aria-label="МК"
    >
      <circle cx="12" cy="12" r="10.2" fill="#ffcc4d" stroke="#a3720a" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="7.6" fill="none" stroke="#a3720a" strokeWidth="0.8" opacity="0.5" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="900"
        fill="#8a5c10"
        fontFamily="Arial, sans-serif"
      >
        M
      </text>
    </svg>
  );
}

/* ---------- persistence ---------- */

const DEFAULT_STATE = {
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

const NICKNAME_CHANGE_COST = 10000;
const PAYDAY_AMOUNT = 300;
const PAYDAY_INTERVAL_MS = 60 * 60 * 1000; // раз в час активного времени на сайте
const PAYDAY_MAX_PER_DAY = 7;
const VIP_PAYDAY_MULTIPLIER = 2;
const CASINO_MIN_BET = 800;
const CASINO_MAX_BET = 20000;
const CASINO_COLORS = ["red", "blue", "yellow"];
const CASINO_COLOR_HEX = { red: "#ff2e4d", blue: "#38bdf8", yellow: "#ffcc4d" };
const CASINO_COLOR_LABEL = { red: "Красная", blue: "Синяя", yellow: "Жёлтая" };
// 9 секторов рулетки по 40°, каждый цвет встречается 3 раза для честного 1/3 шанса
const CASINO_WHEEL_SEGMENTS = ["red", "blue", "yellow", "red", "blue", "yellow", "red", "blue", "yellow"];
const CASINO_SEGMENT_ANGLE = 360 / CASINO_WHEEL_SEGMENTS.length;
const CASINO_WHEEL_GRADIENT = `conic-gradient(from 0deg, ${CASINO_WHEEL_SEGMENTS.map(
  (c, i) => `${CASINO_COLOR_HEX[c]} ${i * CASINO_SEGMENT_ANGLE}deg ${(i + 1) * CASINO_SEGMENT_ANGLE}deg`
).join(", ")})`;
const CASINO_SPIN_MS = 4200;

const DAILY_WHEEL_REWARDS = [
  { type: "money", amount: 100, color: "#ff2e4d", label: "100 МК", icon: "🪙" },
  { type: "money", amount: 200, color: "#ff8c1a", label: "200 МК", icon: "🪙" },
  { type: "money", amount: 300, color: "#ffcc4d", label: "300 МК", icon: "🪙" },
  { type: "money", amount: 500, color: "#4ade80", label: "500 МК", icon: "🪙" },
  { type: "bpExp", amount: 80, color: "#38bdf8", label: "80 EXP к БП", icon: "💧" },
  { type: "bpExp", amount: 160, color: "#7c3aed", label: "160 EXP к БП", icon: "💧" },
  { type: "parts", amount: 150, color: "#a78bfa", label: "150 деталей", icon: "🔩" },
  { type: "case", caseId: "retrocars2000s", qty: 1, color: "#ff2ec4", label: "Ретро машины 2000-х", icon: "📦" },
];
const DAILY_WHEEL_SPIN_MS = 5000;
const DAILY_WHEEL_COOLDOWN_MS = 24 * 3600000;
const DAILY_WHEEL_SEGMENT_ANGLE = 360 / DAILY_WHEEL_REWARDS.length;
const DAILY_WHEEL_GRADIENT = `conic-gradient(from 0deg, ${DAILY_WHEEL_REWARDS.map(
  (r, i) => `${r.color} ${i * DAILY_WHEEL_SEGMENT_ANGLE}deg ${(i + 1) * DAILY_WHEEL_SEGMENT_ANGLE}deg`
).join(", ")})`;
const BP_EXP_PER_PAYDAY = 130;
const BP_EXP_PER_PAYDAY_VIP = 260;
const BP_MAX_LEVEL = 30;
const BP_MILESTONE_LEVELS = new Set([5, 10, 15, 20, 25, 30]);
// требование опыта для перехода с уровня i на i+1 (индекс 0 = до уровня 1)
const BP_EXP_TABLE = [
  800, 800, 800, 950, 950, 1000, 1000, 1000, 1000, 1200,
  1200, 1200, 1200, 1200, 1200, 1400, 1400, 1400, 1400, 1400,
  1400, 1600, 1600, 1600, 1600, 1600, 1600, 1600, 1600, 1600,
];

function bpMoney(amount) {
  return { type: "money", amount };
}
function bpParts(amount) {
  return { type: "parts", amount };
}
function bpCase(caseId, qty) {
  return { type: "case", caseId, qty };
}
function bpVip(hours) {
  return { type: "vip", hours };
}
function bpKey(qty) {
  return { type: "key", qty };
}
function bpItem(def) {
  return { type: "item", qty: 1, ...def };
}

const BP_FREE_REWARDS = [
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

const BP_PAID_REWARDS = [
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

function applyBpExp(state, amount) {
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

function applyBpReward(state, reward) {
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

function isVipActive(state, now = Date.now()) {
  return (state?.vipUntil || 0) > now;
}

function effectiveCasePrice(price, state, now = Date.now()) {
  if ((state?.discountUntil || 0) > now && state?.discountPct) {
    return Math.max(1, Math.round(price * (1 - state.discountPct)));
  }
  return price;
}

function dayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function pruneEconLog(econLog) {
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
function bumpEcon(prev, { earn = 0, spend = 0 } = {}) {
  const key = dayKey();
  const log = pruneEconLog(prev.econLog);
  const cur = log[key] || { earn: 0, spend: 0 };
  return {
    ...prev,
    econLog: { ...log, [key]: { earn: cur.earn + earn, spend: cur.spend + spend } },
  };
}

function sumEcon(econLog, days) {
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

const NAME_SYNTAX_REGEX = /^[A-Za-z]+$/;

function validateIdentityInputs(firstRaw, lastRaw, ageRaw) {
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

function validateNameInputs(firstRaw, lastRaw) {
  const firstName = (firstRaw || "").trim().slice(0, 18);
  const lastName = (lastRaw || "").trim().slice(0, 18);
  if ((firstName && !NAME_SYNTAX_REGEX.test(firstName)) || (lastName && !NAME_SYNTAX_REGEX.test(lastName))) {
    return { error: "Неверный синтаксис имени" };
  }
  if (firstName.length < 2) return { error: "Имя должно быть от 2 до 18 символов" };
  if (lastName.length < 2) return { error: "Фамилия должна быть от 2 до 18 символов" };
  return { firstName, lastName };
}

function formatDuration(ms) {
  const totalMin = Math.floor((ms || 0) / 60000);
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;
  if (days > 0) return `${days} д ${hours} ч`;
  if (hours > 0) return `${hours} ч ${mins} мин`;
  return `${mins} мин`;
}

function formatCountdown(ms) {
  const total = Math.max(0, Math.round((ms || 0) / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatVipRemaining(ms) {
  const totalMin = Math.max(0, Math.floor((ms || 0) / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `осталось ${h}ч ${m}м`;
  return `осталось ${m}м`;
}

function migrateState(parsed) {
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
async function getGlobalCounter(key) {
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

async function setGlobalCounter(key, value) {
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
function makeLocalStorageAdapter() {
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
function getReadyStorage() {
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

export default function CaseOpeningSite() {
  const [loaded, setLoaded] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const [state, setState] = useState(DEFAULT_STATE);
  const stateRef = useRef(state);
  stateRef.current = state;

  const [spinning, setSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(1); // 1 | 2 | 3 одновременных кейса (только для кейсов, не капсул)
  const [reels, setReels] = useState([]); // массив лент — по одной на слот
  const [translates, setTranslates] = useState([]);
  const [animates, setAnimates] = useState([]);
  const [wins, setWins] = useState([]); // массив призов — по одному на слот
  const [wonResolvedList, setWonResolvedList] = useState([]);
  const [showReel, setShowReel] = useState(false);
  const [invOpen, setInvOpen] = useState(false);
  const [sellTarget, setSellTarget] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [previewCaseId, setPreviewCaseId] = useState(null);
  const [craftOpen, setCraftOpen] = useState(false);
  const [craftTab, setCraftTab] = useState("items");
  const [craftSlots, setCraftSlots] = useState([]);
  const [craftPhase, setCraftPhase] = useState("idle"); // idle | burning | result
  const [craftResult, setCraftResult] = useState(null); // { success, item? }
  const [buyTab, setBuyTab] = useState("cases"); // cases | capsules | secret

  const [questsOpen, setQuestsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [nicknameEditOpen, setNicknameEditOpen] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsPeriod, setStatsPeriod] = useState("day");
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [achievementToast, setAchievementToast] = useState(null); // { id, ts }
  const [donateOpen, setDonateOpen] = useState(false);
  const [bpOpen, setBpOpen] = useState(false);
  const bpWheelAreaRef = useRef(null);
  const bpFreeTrackRef = useRef(null);
  const bpPaidTrackRef = useRef(null);
  const [casinoOpen, setCasinoOpen] = useState(false);
  const [casinoChip, setCasinoChip] = useState(null);
  const [casinoBet, setCasinoBet] = useState(CASINO_MIN_BET);
  const [spinningCasino, setSpinningCasino] = useState(false);
  const [casinoResult, setCasinoResult] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [dailyWheelOpen, setDailyWheelOpen] = useState(false);
  const [spinningDailyWheel, setSpinningDailyWheel] = useState(false);
  const [dailyWheelResult, setDailyWheelResult] = useState(null);
  const [dailyWheelRotation, setDailyWheelRotation] = useState(0);
  const [forbesOpen, setForbesOpen] = useState(false);
  const [forbesLoading, setForbesLoading] = useState(false);
  const [forbesError, setForbesError] = useState(false);
  const [forbesEntries, setForbesEntries] = useState([]);
  const [forbesDetail, setForbesDetail] = useState(null);
  const [donateCurrency, setDonateCurrency] = useState("uah");
  const [donateToast, setDonateToast] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState(null); // { type: "success" | "error", text }
  const [promoChecking, setPromoChecking] = useState(false);
  const [capsuleOpenId, setCapsuleOpenId] = useState(null);
  const [capsulePhase, setCapsulePhase] = useState("idle"); // idle | shaking | result
  const [capsuleWon, setCapsuleWon] = useState(null);
  const [capsuleWonResolved, setCapsuleWonResolved] = useState(null);
  const capsulePhaseRef = useRef(capsulePhase);
  capsulePhaseRef.current = capsulePhase;
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;

  const timeoutRef = useRef(null);
  const viewportRefs = useRef([]);
  const cameFromProfileRef = useRef(false);

  // Очередь сохранения: быстрые клики (например покупка нескольких кейсов подряд)
  // раньше запускали параллельные независимые записи в storage, и они могли
  // завершаться не по порядку — старое состояние иногда перезаписывало новое,
  // и прогресс "застревал" на последнем удачно сохранённом моменте.
  // Теперь пишем всегда САМЫЙ СВЕЖИЙ снэпшот, не больше одной записи одновременно,
  // с debounce и повтором при ошибке/рейт-лимите.
  const persistPendingRef = useRef(null);
  const persistTimerRef = useRef(null);
  const persistInFlightRef = useRef(false);

  const flushPersist = useCallback(async () => {
    if (persistInFlightRef.current) return;
    if (persistPendingRef.current == null) return;
    const toWrite = persistPendingRef.current;
    persistPendingRef.current = null;
    persistInFlightRef.current = true;

    const storage = await getReadyStorage();
    if (!storage) {
      setStorageOk(false);
      persistInFlightRef.current = false;
      return;
    }
    try {
      await storage.set(STORAGE_KEY, JSON.stringify(toWrite), false);
      setStorageOk(true);
      persistInFlightRef.current = false;
      if (persistPendingRef.current != null) {
        flushPersist();
      }
    } catch (e) {
      setStorageOk(false);
      if (persistPendingRef.current == null) persistPendingRef.current = toWrite;
      persistInFlightRef.current = false;
      setTimeout(() => flushPersist(), 1000);
    }
  }, []);

  const persist = useCallback(
    (snapshot) => {
      persistPendingRef.current = snapshot ?? stateRef.current;
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      persistTimerRef.current = setTimeout(() => {
        persistTimerRef.current = null;
        flushPersist();
      }, 220);
    },
    [flushPersist]
  );

  // подстраховка: если игрок сворачивает вкладку или закрывает сайт сразу после
  // действия, не дожидаясь debounce — досрочно "проталкиваем" сохранение
  useEffect(() => {
    const forceFlush = () => {
      if (persistTimerRef.current) {
        clearTimeout(persistTimerRef.current);
        persistTimerRef.current = null;
      }
      flushPersist();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") forceFlush();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", forceFlush);
    window.addEventListener("beforeunload", forceFlush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", forceFlush);
      window.removeEventListener("beforeunload", forceFlush);
    };
  }, [flushPersist]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let next = DEFAULT_STATE;
      let foundSaved = false;

      const storage = await getReadyStorage();
      if (!storage) {
        if (!cancelled) {
          setStorageOk(false);
          setState(next);
          setLoaded(true);
        }
        return;
      }

      for (let attempt = 0; attempt < 3 && !foundSaved; attempt++) {
        try {
          const res = await storage.get(STORAGE_KEY, false);
          if (res && res.value) {
            const parsed = JSON.parse(res.value);
            next = migrateState(parsed);
            foundSaved = true;
          } else {
            break;
          }
        } catch (e) {
          if (attempt < 2) await new Promise((r) => setTimeout(r, 200));
        }
      }

      if (!cancelled) {
        const refreshedQuests = refreshQuestsIfNeeded(next.quests || {});
        const questsChanged = refreshedQuests !== (next.quests || {});
        next = { ...next, quests: refreshedQuests, questClaimed: questsChanged ? false : next.questClaimed };
        if (!next.playerId) {
          next = {
            ...next,
            playerId:
              typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : `p-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
          };
        }
        setState(next);
        setLoaded(true);
        setStorageOk(true);
        persist(next);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [persist]);

  useEffect(() => {
    if (!loaded) return;
    persist();
  }, [loaded, state.cases, state.capsules, state.selectedCaseId, state.balance, state.inventory, state.quests, state.keys, state.questClaimed, state.parts, state.nickname, state.nicknameChanges, state.casesOpened, state.craftsDone, state.econLog, persist]);

  // quests refresh on real wall-clock time (7h), independent of whether the
  // site is open — this check just needs to run periodically while open so
  // it catches the moment the cycle actually expires
  const [nowTick, setNowTick] = useState(Date.now());

  useEffect(() => {
    if (!bpOpen) return;
    const el = bpWheelAreaRef.current;
    if (!el) return;

    let target = bpFreeTrackRef.current?.scrollLeft || 0;
    let rafId = null;

    const tick = () => {
      const free = bpFreeTrackRef.current;
      const paid = bpPaidTrackRef.current;
      if (!free || !paid) {
        rafId = null;
        return;
      }
      const maxScroll = Math.max(0, free.scrollWidth - free.clientWidth);
      target = Math.max(0, Math.min(maxScroll, target));
      const current = free.scrollLeft;
      const next = current + (target - current) * 0.18;
      free.scrollLeft = next;
      paid.scrollLeft = next;
      if (Math.abs(target - next) > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        free.scrollLeft = target;
        paid.scrollLeft = target;
        rafId = null;
      }
    };

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;
      e.preventDefault();
      if (rafId == null) {
        target = (bpFreeTrackRef.current?.scrollLeft || 0) + delta;
        rafId = requestAnimationFrame(tick);
      } else {
        target += delta;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [bpOpen]);

  useEffect(() => {
    if (!loaded) return;
    setState((prev) => {
      if (prev.relicPoolIds?.length) return prev;
      const next = { ...prev, relicPoolIds: rollRelicPool(), relicPoolResetAt: Date.now() + RELIC_POOL_MS };
      persist(next);
      return next;
    });
    const tick = setInterval(() => setNowTick(Date.now()), 1000);
    const refreshCheck = setInterval(() => {
      setState((prev) => {
        const now = Date.now();
        const updated = refreshQuestsIfNeeded(prev.quests || {});
        let next = prev;
        if (updated !== prev.quests) {
          next = { ...next, quests: updated, questClaimed: false };
        }
        if (!prev.relicPoolIds?.length || (prev.relicPoolResetAt || 0) <= now) {
          next = {
            ...next,
            relicPoolIds: rollRelicPool(),
            relicPoolResetAt: now + RELIC_POOL_MS,
            relicSelectedId: null,
          };
        }
        if (next === prev) return prev;
        persist(next);
        return next;
      });
    }, 5000);
    return () => {
      clearInterval(tick);
      clearInterval(refreshCheck);
    };
  }, [loaded, persist]);

  useEffect(() => {
    if (!loaded) return;
    const syncForbes = async () => {
      const s = stateRef.current;
      if (!s.playerId) return;
      try {
        const storage = await getReadyStorage();
        if (!storage) return;
        await storage.set(
          `forbes:${s.playerId}`,
          JSON.stringify({
            nickname: s.nickname || "Без ника",
            balance: s.balance || 0,
            parts: s.parts || 0,
            totalTimeMs: s.totalTimeMs || 0,
            bpLevel: s.bpLevel || 0,
            vipUntil: s.vipUntil || 0,
            updatedAt: Date.now(),
          }),
          true
        );
      } catch (e) {
        // тихо игнорируем — список Forbes не критичен для игры
      }
    };
    syncForbes();
    const id = setInterval(syncForbes, 20000);
    return () => clearInterval(id);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => persist(), 3000);
    const onHide = () => persist();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    window.addEventListener("blur", onHide);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("blur", onHide);
    };
  }, [loaded, persist]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // time-on-site tracking — flushes accumulated ms into state every 30s,
  // on tab hide, and on unmount, so it survives closing the tab.
  // Also drives payday: +300 МК every hour of active time, up to 7/day.
  const lastFlushRef = useRef(Date.now());
  useEffect(() => {
    if (!loaded) return;
    const flush = () => {
      const now = Date.now();
      const delta = now - lastFlushRef.current;
      lastFlushRef.current = now;
      if (delta <= 0) return;
      let earnedOutside = 0;
      setState((prev) => {
        let next = { ...prev, totalTimeMs: (prev.totalTimeMs || 0) + delta };

        const today = dayKey();
        let paydaysToday = prev.paydayDayKey === today ? prev.paydaysToday || 0 : 0;
        let paydayProgressMs = (prev.paydayProgressMs || 0) + delta;
        let earned = 0;
        let bpExpGained = 0;
        let paydayBoostUses = prev.paydayBoostUses || 0;
        let relicFastLeft = prev.relicFastPaydayUsesLeft || 0;
        let relicJetLeft = prev.relicJetPaydayUsesLeft || 0;
        const wornItem = prev.wornSuitId ? prev.inventory.find((i) => i.id === prev.wornSuitId) : null;
        const wearableBonus = wornItem?.buff?.type === "wearable" ? wornItem.buff.paydayBonus || 0 : 0;
        const vipNow = isVipActive(prev, now);
        while (paydaysToday < PAYDAY_MAX_PER_DAY) {
          const intervalNow = relicFastLeft > 0 ? PAYDAY_INTERVAL_MS - 10 * 60000 : PAYDAY_INTERVAL_MS;
          if (paydayProgressMs < intervalNow) break;
          paydayProgressMs -= intervalNow;
          paydaysToday += 1;
          let amount = vipNow ? PAYDAY_AMOUNT * VIP_PAYDAY_MULTIPLIER : PAYDAY_AMOUNT;
          if (!vipNow && paydayBoostUses > 0) {
            amount = Math.round(amount * (1 + (prev.paydayBoostPct || 0)));
            paydayBoostUses -= 1;
          }
          if (relicJetLeft > 0) {
            amount = Math.floor(amount * 1.35);
            relicJetLeft -= 1;
          }
          amount += wearableBonus;
          earned += amount;
          bpExpGained += vipNow ? BP_EXP_PER_PAYDAY_VIP : BP_EXP_PER_PAYDAY;
          if (relicFastLeft > 0) relicFastLeft -= 1;
        }
        if (paydaysToday >= PAYDAY_MAX_PER_DAY) paydayProgressMs = 0;

        let bpLevel = prev.bpLevel || 0;
        let bpProgressExp = (prev.bpProgressExp || 0) + bpExpGained;
        while (bpLevel < BP_MAX_LEVEL && bpProgressExp >= (BP_EXP_TABLE[bpLevel] || Infinity)) {
          bpProgressExp -= BP_EXP_TABLE[bpLevel];
          bpLevel += 1;
        }
        if (bpLevel >= BP_MAX_LEVEL) bpProgressExp = 0;

        next = {
          ...next,
          paydayDayKey: today,
          paydaysToday,
          paydayProgressMs,
          paydayBoostUses,
          relicFastPaydayUsesLeft: relicFastLeft,
          relicJetPaydayUsesLeft: relicJetLeft,
          bpLevel,
          bpProgressExp,
          paydayFullDayDone: prev.paydayFullDayDone || paydaysToday >= PAYDAY_MAX_PER_DAY,
        };
        if (earned > 0) {
          next = bumpEcon({ ...next, balance: next.balance + earned }, { earn: earned });
        }
        earnedOutside = earned;
        persist(next);
        return next;
      });
      if (earnedOutside > 0 && soundOnRef.current) playPaydaySound();
    };
    const interval = setInterval(flush, 30000);
    const onHide = () => {
      if (document.hidden) flush();
    };
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      clearInterval(interval);
      flush();
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [loaded, persist]);

  const selectCase = useCallback(
    (id) => {
      setState((prev) => {
        const next = { ...prev, selectedCaseId: id };
        persist(next);
        return next;
      });
      setPickerOpen(false);
    },
    [persist]
  );

  const openCase = useCallback(() => {
    const activeCase = CASE_BY_ID[stateRef.current.selectedCaseId];
    if (!activeCase) return;
    if (spinning || wins.some((w, i) => w && !wonResolvedList[i])) return;
    const n = Math.max(1, Math.min(3, spinCount));
    const owned = activeCase.usesKeys ? stateRef.current.keys : stateRef.current.cases[activeCase.id];
    if (owned < n) return;

    const relicCompUsesAvailable = stateRef.current.relicCompensateUsesLeft || 0;
    let relicCompUsesConsumed = 0;
    const prizes = Array.from({ length: n }, () => {
      const prize = {
        ...weightedPick(activeCase.items),
        category: activeCase.category,
        caseId: activeCase.id,
      };
      if (relicCompUsesConsumed < relicCompUsesAvailable) {
        relicCompUsesConsumed += 1;
        if (prize.p < activeCase.price) {
          prize.p = Math.floor(prize.p * 1.1);
          prize.compensated = true;
        }
      }
      return prize;
    });
    const strips = prizes.map((prize) =>
      Array.from({ length: REEL_LEN }, (_, i) => (i === WIN_IDX ? prize : weightedPick(activeCase.items)))
    );

    setState((prev) => {
      const base = activeCase.usesKeys
        ? { ...prev, keys: prev.keys - n, casesOpened: (prev.casesOpened || 0) + n }
        : {
            ...prev,
            cases: { ...prev.cases, [activeCase.id]: prev.cases[activeCase.id] - n },
            casesOpened: (prev.casesOpened || 0) + n,
          };
      return relicCompUsesConsumed > 0
        ? { ...base, relicCompensateUsesLeft: Math.max(0, (prev.relicCompensateUsesLeft || 0) - relicCompUsesConsumed) }
        : base;
    });
    setWins(Array(n).fill(null));
    setWonResolvedList(Array(n).fill(null));
    setShowReel(true);
    setReels(strips);
    setAnimates(Array(n).fill(false));
    setTranslates(Array(n).fill(0));
    setSpinning(true);
    if (soundOnRef.current) scheduleSpinTicks(SPIN_MS);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const nextTranslates = [];
        const nextAnimates = [];
        for (let i = 0; i < n; i++) {
          const el = viewportRefs.current[i];
          const viewportW = el ? el.clientWidth : 640;
          const jitter = Math.random() * (ITEM_W * 0.4) - ITEM_W * 0.2;
          const centerOfWinner = WIN_IDX * ITEM_W + ITEM_W / 2;
          nextTranslates.push(viewportW / 2 - centerOfWinner - jitter);
          nextAnimates.push(true);
        }
        setAnimates(nextAnimates);
        setTranslates(nextTranslates);
      });
    });

    timeoutRef.current = setTimeout(() => {
      setSpinning(false);
      setWins(prizes);
      setWonResolvedList(Array(n).fill(null));
      if (soundOnRef.current) playRevealSound(prizes[0].w);
      const needsUpdate = prizes.some((prize) => {
        const rarityVal = prize.rarity ?? prize.w;
        return (prize.caseId === "phones2025" && !stateRef.current.wonPhone2025) || rarityVal <= 25;
      });
      if (needsUpdate) {
        setState((prev) => {
          let next = prev;
          for (const prize of prizes) {
            const rarityVal = prize.rarity ?? prize.w;
            if (prize.caseId === "phones2025" && !next.wonPhone2025) {
              next = { ...next, wonPhone2025: true };
            }
            if (rarityVal <= 25) {
              next = { ...next, legendaryWon: (next.legendaryWon || 0) + 1 };
            }
          }
          persist(next);
          return next;
        });
      }
    }, SPIN_MS);
  }, [spinning, wins, wonResolvedList, spinCount, persist]);

  const quickSell = useCallback(
    (idx) => {
      const prize = wins[idx];
      if (!prize || wonResolvedList[idx]) return;
      setState((prev) => {
        const next = bumpEcon(
          { ...prev, balance: prev.balance + prize.p, soldTotal: (prev.soldTotal || 0) + prize.p },
          { earn: prize.p }
        );
        persist(next);
        return next;
      });
      setWonResolvedList((prev) => prev.map((v, i) => (i === idx ? "sold" : v)));
      if (soundOnRef.current) playSellSound();
    },
    [wins, wonResolvedList, persist]
  );

  const disassembleWon = useCallback(
    (idx) => {
      const prize = wins[idx];
      if (!prize || wonResolvedList[idx]) return;
      const n = partsValue(prize);
      if (!n) return;
      setState((prev) => {
        const next = { ...prev, parts: (prev.parts || 0) + n, disassembled: (prev.disassembled || 0) + 1 };
        persist(next);
        return next;
      });
      setWonResolvedList((prev) => prev.map((v, i) => (i === idx ? "disassembled" : v)));
      if (soundOnRef.current) playDisassembleSound();
    },
    [wins, wonResolvedList, persist]
  );

  const keepItem = useCallback(
    (idx) => {
      const prize = wins[idx];
      if (!prize || wonResolvedList[idx]) return;
      setState((prev) => {
        const entry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${idx}`,
          name: prize.name,
          w: prize.w,
          p: prize.p,
          icon: prize.icon,
          iconImg: prize.iconImg,
          iconSvg: prize.iconSvg,
          rarity: prize.rarity,
          topSpeed: prize.topSpeed,
          category: prize.category,
          buff: prize.buff,
          buffLabel: prize.buffLabel,
        };
        const next = { ...prev, inventory: [entry, ...prev.inventory] };
        persist(next);
        return next;
      });
      setWonResolvedList((prev) => prev.map((v, i) => (i === idx ? "kept" : v)));
      if (soundOnRef.current) playKeepSound();
    },
    [wins, wonResolvedList, persist]
  );

  const claimGrantedCase = useCallback(
    (idx) => {
      const prize = wins[idx];
      if (!prize || wonResolvedList[idx] || !prize.grantsCaseId) return;
      setState((prev) => {
        const next = {
          ...prev,
          cases: { ...prev.cases, [prize.grantsCaseId]: (prev.cases[prize.grantsCaseId] || 0) + 1 },
        };
        persist(next);
        return next;
      });
      setWonResolvedList((prev) => prev.map((v, i) => (i === idx ? "claimed" : v)));
      if (soundOnRef.current) playClaimSound();
    },
    [wins, wonResolvedList, persist]
  );

  const claimGrantedParts = useCallback(
    (idx) => {
      const prize = wins[idx];
      if (!prize || wonResolvedList[idx] || !prize.grantsParts) return;
      setState((prev) => {
        const next = { ...prev, parts: (prev.parts || 0) + prize.grantsParts };
        persist(next);
        return next;
      });
      setWonResolvedList((prev) => prev.map((v, i) => (i === idx ? "claimedParts" : v)));
      if (soundOnRef.current) playClaimSound();
    },
    [wins, wonResolvedList, persist]
  );

  const confirmSell = useCallback(
    (id) => {
      setState((prev) => {
        const item = prev.inventory.find((i) => i.id === id);
        if (!item) return prev;
        const next = bumpEcon(
          {
            ...prev,
            balance: prev.balance + item.p,
            inventory: prev.inventory.filter((i) => i.id !== id),
            soldTotal: (prev.soldTotal || 0) + item.p,
            wornSuitId: prev.wornSuitId === id ? null : prev.wornSuitId,
          },
          { earn: item.p }
        );
        persist(next);
        return next;
      });
      setSellTarget(null);
      if (soundOnRef.current) playSellSound();
    },
    [persist]
  );

  const confirmDisassemble = useCallback(
    (id) => {
      setState((prev) => {
        const item = prev.inventory.find((i) => i.id === id);
        if (!item) return prev;
        const n = partsValue(item);
        if (!n) return prev;
        const bonusLeft = prev.partsBonusUsesLeft || 0;
        const bonus = bonusLeft > 0 ? prev.partsBonusAmount || 0 : 0;
        const next = {
          ...prev,
          parts: (prev.parts || 0) + n + bonus,
          inventory: prev.inventory.filter((i) => i.id !== id),
          disassembled: (prev.disassembled || 0) + 1,
          partsBonusUsesLeft: bonusLeft > 0 ? bonusLeft - 1 : 0,
          wornSuitId: prev.wornSuitId === id ? null : prev.wornSuitId,
        };
        persist(next);
        return next;
      });
      setSellTarget(null);
      if (soundOnRef.current) playDisassembleSound();
    },
    [persist]
  );

  const activateBuff = useCallback(
    (id) => {
      setState((prev) => {
        const item = prev.inventory.find((i) => i.id === id);
        if (!item || !item.buff) return prev;
        let next = { ...prev, inventory: prev.inventory.filter((i) => i.id !== id) };
        if (item.buff.type === "discount") {
          next = {
            ...next,
            discountUntil: Date.now() + item.buff.durationMs,
            discountPct: item.buff.pct,
          };
        } else if (item.buff.type === "paydayBoost") {
          next = {
            ...next,
            paydayBoostUses: item.buff.uses,
            paydayBoostPct: item.buff.pct,
          };
        } else if (item.buff.type === "partsBonus") {
          next = {
            ...next,
            partsBonusUsesLeft: item.buff.uses,
            partsBonusAmount: item.buff.amount,
          };
        }
        persist(next);
        return next;
      });
      setSellTarget(null);
      if (soundOnRef.current) playPurchaseSound();
    },
    [persist]
  );

  const toggleWearBuff = useCallback(
    (id) => {
      setState((prev) => {
        const item = prev.inventory.find((i) => i.id === id);
        if (!item || !item.buff || item.buff.type !== "wearable") return prev;
        const next = { ...prev, wornSuitId: prev.wornSuitId === id ? null : id };
        persist(next);
        return next;
      });
      if (soundOnRef.current) playPurchaseSound();
    },
    [persist]
  );

  const claimBpReward = useCallback(
    (track, level) => {
      setState((prev) => {
        if ((prev.bpLevel || 0) < level) return prev;
        const claimedKey = track === "free" ? "bpFreeClaimed" : "bpPaidClaimed";
        if (prev[claimedKey]?.[level]) return prev;
        if (track === "paid" && !isVipActive(prev)) return prev;
        const table = track === "free" ? BP_FREE_REWARDS : BP_PAID_REWARDS;
        const reward = table[level - 1];
        if (!reward) return prev;
        let next = { ...prev, [claimedKey]: { ...prev[claimedKey], [level]: true } };
        next = applyBpReward(next, reward);
        persist(next);
        return next;
      });
      if (soundOnRef.current) playClaimSound();
    },
    [persist]
  );

  const spinCasino = useCallback(() => {
    if (spinningCasino || !casinoChip) return;
    const bet = Math.max(CASINO_MIN_BET, Math.min(CASINO_MAX_BET, Math.round(casinoBet)));
    if (state.balance < bet) return;

    setState((prev) => {
      const next = bumpEcon({ ...prev, balance: prev.balance - bet }, { spend: bet });
      persist(next);
      return next;
    });

    const outcomeColor = CASINO_COLORS[Math.floor(Math.random() * CASINO_COLORS.length)];
    const matchIndices = CASINO_WHEEL_SEGMENTS.map((c, i) => (c === outcomeColor ? i : -1)).filter((i) => i >= 0);
    const targetIndex = matchIndices[Math.floor(Math.random() * matchIndices.length)];
    const targetCenter = targetIndex * CASINO_SEGMENT_ANGLE + CASINO_SEGMENT_ANGLE / 2;

    setSpinningCasino(true);
    setCasinoResult(null);
    if (soundOnRef.current) playTone({ freq: 300, duration: 0.15, type: "square", volume: 0.15, glideTo: 200 });

    setWheelRotation((prevRotation) => {
      let deltaMod = -(targetCenter + prevRotation) % 360;
      if (deltaMod < 0) deltaMod += 360;
      const extraSpins = 6 * 360;
      return prevRotation + deltaMod + extraSpins;
    });

    setTimeout(() => {
      setSpinningCasino(false);
      const win = outcomeColor === casinoChip;
      setCasinoResult({ color: outcomeColor, win, bet });
      if (win) {
        const payout = bet * 2;
        setState((prev) => {
          const next = bumpEcon({ ...prev, balance: prev.balance + payout }, { earn: payout });
          persist(next);
          return next;
        });
        if (soundOnRef.current) playWheelWinSound();
      } else {
        if (soundOnRef.current) playTone({ freq: 220, duration: 0.35, type: "sawtooth", volume: 0.16, glideTo: 110 });
      }
    }, CASINO_SPIN_MS);
  }, [spinningCasino, casinoChip, casinoBet, state.balance, persist]);

  const spinDailyWheel = useCallback(() => {
    if (spinningDailyWheel) return;
    if ((state.dailyWheelClaimedAt || 0) + DAILY_WHEEL_COOLDOWN_MS > Date.now()) return;

    const idx = Math.floor(Math.random() * DAILY_WHEEL_REWARDS.length);
    const reward = DAILY_WHEEL_REWARDS[idx];
    const targetCenter = idx * DAILY_WHEEL_SEGMENT_ANGLE + DAILY_WHEEL_SEGMENT_ANGLE / 2;

    setSpinningDailyWheel(true);
    setDailyWheelResult(null);
    if (soundOnRef.current) playTone({ freq: 300, duration: 0.15, type: "square", volume: 0.15, glideTo: 200 });

    setDailyWheelRotation((prevRotation) => {
      let deltaMod = -(targetCenter + prevRotation) % 360;
      if (deltaMod < 0) deltaMod += 360;
      const extraSpins = 6 * 360;
      return prevRotation + deltaMod + extraSpins;
    });

    setTimeout(() => {
      setSpinningDailyWheel(false);
      setDailyWheelResult(reward);
      if (soundOnRef.current) playWheelWinSound();
    }, DAILY_WHEEL_SPIN_MS);
  }, [spinningDailyWheel, state.dailyWheelClaimedAt]);

  const claimDailyWheelReward = useCallback(() => {
    setState((prev) => {
      if (!dailyWheelResult) return prev;
      const now = Date.now();
      if ((prev.dailyWheelClaimedAt || 0) + DAILY_WHEEL_COOLDOWN_MS > now) return prev;
      let next = { ...prev, dailyWheelClaimedAt: now };
      if (dailyWheelResult.type === "money") {
        next = bumpEcon({ ...next, balance: next.balance + dailyWheelResult.amount }, { earn: dailyWheelResult.amount });
      } else if (dailyWheelResult.type === "bpExp") {
        next = applyBpExp(next, dailyWheelResult.amount);
      } else if (dailyWheelResult.type === "parts") {
        next = { ...next, parts: (next.parts || 0) + dailyWheelResult.amount };
      } else if (dailyWheelResult.type === "case") {
        next = {
          ...next,
          cases: { ...next.cases, [dailyWheelResult.caseId]: (next.cases[dailyWheelResult.caseId] || 0) + dailyWheelResult.qty },
        };
      }
      persist(next);
      return next;
    });
    setDailyWheelResult(null);
    if (soundOnRef.current) playClaimSound();
  }, [dailyWheelResult, persist]);

  const loadForbesList = useCallback(async () => {
    setForbesLoading(true);
    setForbesError(false);
    try {
      const storage = await getReadyStorage();
      if (!storage) {
        setForbesError(true);
        setForbesLoading(false);
        return;
      }
      const listRes = await storage.list("forbes:", true);
      const keys = listRes?.keys || [];
      const entries = [];
      for (const key of keys) {
        try {
          const res = await storage.get(key, true);
          if (!res || !res.value) continue;
          const parsed = JSON.parse(res.value);
          entries.push({
            id: key,
            nickname: parsed.nickname || "Без ника",
            balance: parsed.balance || 0,
            parts: parsed.parts || 0,
            totalTimeMs: parsed.totalTimeMs || 0,
            bpLevel: parsed.bpLevel || 0,
            vip: (parsed.vipUntil || 0) > Date.now(),
          });
        } catch (e) {
          // пропускаем битую запись
        }
      }
      entries.sort((a, b) => b.balance - a.balance);
      setForbesEntries(entries.slice(0, 15));
    } catch (e) {
      setForbesError(true);
    }
    setForbesLoading(false);
  }, []);

  const buyCase = useCallback(
    (id) => {
      const c = CASE_BY_ID[id];
      setState((prev) => {
        const price = effectiveCasePrice(c.price, prev);
        if (prev.balance < price) return prev;
        const next = bumpEcon(
          {
            ...prev,
            balance: prev.balance - price,
            cases: { ...prev.cases, [id]: prev.cases[id] + 1 },
          },
          { spend: price }
        );
        persist(next);
        if (soundOnRef.current) playPurchaseSound();
        return next;
      });
    },
    [persist]
  );

  const buyCapsule = useCallback(
    (id) => {
      const c = CAPSULE_BY_ID[id];
      setState((prev) => {
        if (prev.balance < c.price) return prev;
        const next = bumpEcon(
          {
            ...prev,
            balance: prev.balance - c.price,
            capsules: { ...prev.capsules, [id]: prev.capsules[id] + 1 },
          },
          { spend: c.price }
        );
        persist(next);
        if (soundOnRef.current) playPurchaseSound();
        return next;
      });
    },
    [persist]
  );

  const openCapsule = useCallback(
    (id) => {
      if (capsulePhaseRef.current !== "idle") return;
      if (stateRef.current.capsules[id] < 1) return;
      setState((prev) => ({
        ...prev,
        capsules: { ...prev.capsules, [id]: prev.capsules[id] - 1 },
        casesOpened: (prev.casesOpened || 0) + 1,
      }));
      setCapsuleOpenId(id);
      setCapsuleWon(null);
      setCapsuleWonResolved(null);
      setCapsulePhase("shaking");
      setBuyOpen(false);
      cameFromProfileRef.current = false;
      if (soundOnRef.current) scheduleCapsuleRattle(3000);
      setTimeout(() => {
        const c = CAPSULE_BY_ID[id];
        const prize = { ...weightedPick(c.items), category: c.category };
        setCapsuleWon(prize);
        setCapsulePhase("result");
        if (soundOnRef.current) playRevealSound(prize.w);
        const rarityVal = prize.rarity ?? prize.w;
        if (rarityVal <= 25) {
          setState((prev) => {
            const next = { ...prev, legendaryWon: (prev.legendaryWon || 0) + 1 };
            persist(next);
            return next;
          });
        }
      }, 3000);
    },
    [persist]
  );

  const capsuleQuickSell = useCallback(() => {
    if (!capsuleWon || capsuleWonResolved) return;
    setState((prev) => {
      const next = bumpEcon(
        { ...prev, balance: prev.balance + capsuleWon.p, soldTotal: (prev.soldTotal || 0) + capsuleWon.p },
        { earn: capsuleWon.p }
      );
      persist(next);
      return next;
    });
    setCapsuleWonResolved("sold");
    if (soundOnRef.current) playTone({ freq: 900, duration: 0.12, type: "sine", volume: 0.2 });
  }, [capsuleWon, capsuleWonResolved, persist]);

  const capsuleDisassemble = useCallback(() => {
    if (!capsuleWon || capsuleWonResolved) return;
    const n = partsValue(capsuleWon);
    if (!n) return;
    setState((prev) => {
      const next = { ...prev, parts: (prev.parts || 0) + n, disassembled: (prev.disassembled || 0) + 1 };
      persist(next);
      return next;
    });
    setCapsuleWonResolved("disassembled");
    if (soundOnRef.current) playTone({ freq: 500, duration: 0.1, type: "square", volume: 0.16, glideTo: 800 });
  }, [capsuleWon, capsuleWonResolved, persist]);

  const capsuleKeepItem = useCallback(() => {
    if (!capsuleWon || capsuleWonResolved) return;
    setState((prev) => {
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: capsuleWon.name,
        w: capsuleWon.w,
        p: capsuleWon.p,
        icon: capsuleWon.icon,
        iconImg: capsuleWon.iconImg,
        iconSvg: capsuleWon.iconSvg,
        rarity: capsuleWon.rarity,
        topSpeed: capsuleWon.topSpeed,
        category: capsuleWon.category,
      };
      const next = { ...prev, inventory: [entry, ...prev.inventory] };
      persist(next);
      return next;
    });
    setCapsuleWonResolved("kept");
  }, [capsuleWon, capsuleWonResolved, persist]);

  const closeCapsule = useCallback(() => {
    setCapsuleOpenId(null);
    setCapsulePhase("idle");
    setCapsuleWon(null);
    setCapsuleWonResolved(null);
  }, []);

  const selectRelic = useCallback(
    (relicId) => {
      setState((prev) => {
        const now = Date.now();
        if (!prev.relicPoolIds?.includes(relicId)) return prev;
        if ((prev.relicPoolResetAt || 0) <= now) return prev;
        if (prev.relicSelectedId) return prev;
        const relic = RELIC_BY_ID[relicId];
        if (!relic) return prev;
        const next = { ...prev, relicSelectedId: relicId };
        persist(next);
        return next;
      });
      if (soundOnRef.current) playPurchaseSound();
    },
    [persist]
  );

  const assembleRelic = useCallback(
    (relicId) => {
      const relic = RELIC_BY_ID[relicId];
      if (!relic) return;
      setState((prev) => {
        const now = Date.now();
        if (prev.relicSelectedId !== relicId) return prev;
        if ((prev.relicPoolResetAt || 0) <= now) return prev;
        if ((prev.parts || 0) < relic.partsNeeded) return prev;
        const entry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: relic.name,
          w: relic.rarity,
          p: relic.p,
          icon: relic.icon,
          iconSvg: relic.iconSvg,
          rarity: relic.rarity,
          topSpeed: relic.topSpeed,
          category: relic.category,
          relicId: relic.id,
          rainbow: relic.rainbow,
          buff: relic.buffType ? { type: "relic", relicId: relic.id } : undefined,
          buffLabel: relic.buffLabel,
        };
        const next = {
          ...prev,
          parts: prev.parts - relic.partsNeeded,
          inventory: [entry, ...prev.inventory],
        };
        persist(next);
        return next;
      });
      if (soundOnRef.current) {
        [523, 659, 784, 1046, 1318, 1568].forEach((f, i) =>
          playTone({ freq: f, duration: 0.16, type: "sine", volume: 0.2, delay: i * 0.07 })
        );
      }
    },
    [persist]
  );

  const activateRelicBuff = useCallback(
    (id) => {
      setState((prev) => {
        const item = prev.inventory.find((i) => i.id === id);
        if (!item || !item.buff || item.buff.type !== "relic") return prev;
        const relic = RELIC_BY_ID[item.buff.relicId];
        if (!relic) return prev;
        const now = Date.now();
        if ((prev.relicCooldowns?.[relic.id] || 0) > now) return prev;
        let next = { ...prev, relicCooldowns: { ...prev.relicCooldowns, [relic.id]: now + RELIC_COOLDOWN_MS } };
        if (relic.buffType === "jetPayday") next = { ...next, relicJetPaydayUsesLeft: PAYDAY_MAX_PER_DAY };
        if (relic.buffType === "fastPayday") next = { ...next, relicFastPaydayUsesLeft: PAYDAY_MAX_PER_DAY };
        if (relic.buffType === "compensate") next = { ...next, relicCompensateUsesLeft: 50 };
        persist(next);
        return next;
      });
      setSellTarget(null);
      if (soundOnRef.current) playPurchaseSound();
    },
    [persist]
  );

  const completeQuest = useCallback(
    (deptId) => {
      setState((prev) => {
        const dept = prev.quests[deptId];
        if (!dept || dept.completed) return prev;
        const giver = QUEST_GIVERS.find((g) => g.id === deptId);
        const variant = giver.variants[dept.variantIdx];
        const counts = {};
        prev.inventory.forEach((it) => { counts[it.name] = (counts[it.name] || 0) + 1; });
        const canComplete = variant.req.every((r) => (counts[r.name] || 0) >= r.qty);
        if (!canComplete) return prev;

        let inventory = [...prev.inventory];
        variant.req.forEach((r) => {
          let remaining = r.qty;
          inventory = inventory.filter((it) => {
            if (remaining > 0 && it.name === r.name) {
              remaining -= 1;
              return false;
            }
            return true;
          });
        });

        let next = {
          ...prev,
          inventory,
          quests: { ...prev.quests, [deptId]: { ...dept, completed: true } },
          questsCompleted: (prev.questsCompleted || 0) + 1,
          majorQuestsCompleted:
            deptId === "major" ? (prev.majorQuestsCompleted || 0) + 1 : prev.majorQuestsCompleted || 0,
        };
        persist(next);
        return next;
      });
      if (soundOnRef.current) playTone({ freq: 700, duration: 0.1, type: "sine", volume: 0.2, glideTo: 1000 });
    },
    [persist]
  );

  const claimKey = useCallback(() => {
    setState((prev) => {
      const allDone = QUEST_GIVERS.every((g) => prev.quests[g.id]?.completed);
      if (!allDone || prev.questClaimed) return prev;
      const next = {
        ...prev,
        keys: (prev.keys || 0) + 1,
        questClaimed: true,
      };
      persist(next);
      return next;
    });
    if (soundOnRef.current) {
      [523, 659, 784, 1046, 1318].forEach((f, i) =>
        playTone({ freq: f, duration: 0.16, type: "sine", volume: 0.2, delay: i * 0.08 })
      );
    }
  }, [persist]);

  const submitRegister = useCallback(() => {
    const result = validateIdentityInputs(nicknameInput, surnameInput, ageInput);
    if (result.error) {
      setNicknameError(result.error);
      return;
    }
    setState((prev) => {
      const next = {
        ...prev,
        firstName: result.firstName,
        lastName: result.lastName,
        age: result.age,
        nickname: `${result.firstName} ${result.lastName}`,
      };
      persist(next);
      return next;
    });
    setNicknameInput("");
    setSurnameInput("");
    setAgeInput("");
    setNicknameError("");
  }, [nicknameInput, surnameInput, ageInput, persist]);

  const submitNicknameChange = useCallback(() => {
    const result = validateNameInputs(nicknameInput, surnameInput);
    if (result.error) {
      setNicknameError(result.error);
      return;
    }
    const cur = stateRef.current;
    const isFree = (cur.nicknameChanges || 0) === 0;
    if (!isFree && cur.balance < NICKNAME_CHANGE_COST) {
      setNicknameError("Недостаточно средств на балансе");
      return;
    }
    setState((prev) => {
      const base = {
        ...prev,
        firstName: result.firstName,
        lastName: result.lastName,
        nickname: `${result.firstName} ${result.lastName}`,
        nicknameChanges: (prev.nicknameChanges || 0) + 1,
        balance: isFree ? prev.balance : prev.balance - NICKNAME_CHANGE_COST,
      };
      const next = isFree ? base : bumpEcon(base, { spend: NICKNAME_CHANGE_COST });
      persist(next);
      return next;
    });
    setNicknameInput("");
    setSurnameInput("");
    setNicknameError("");
    setNicknameEditOpen(false);
  }, [nicknameInput, surnameInput, persist]);

  const toggleCraftSlot = useCallback((item) => {
    setCraftSlots((prev) => {
      if (prev.find((s) => s.id === item.id)) return prev.filter((s) => s.id !== item.id);
      if (prev.length >= 7) return prev;
      const rk = item.rarity ?? item.w;
      if (rk === 65) return prev; // can't craft from Хлам
      if (prev.length > 0) {
        const existingRk = prev[0].rarity ?? prev[0].w;
        if (existingRk !== rk) return prev; // must all be one rarity
      }
      return [...prev, item];
    });
  }, []);

  const returnMaybeToProfile = useCallback(() => {
    if (cameFromProfileRef.current) {
      cameFromProfileRef.current = false;
      setProfileOpen(true);
    }
  }, []);

  const closeBuy = useCallback(() => {
    setBuyOpen(false);
    returnMaybeToProfile();
  }, [returnMaybeToProfile]);

  const closeQuests = useCallback(() => {
    setQuestsOpen(false);
    returnMaybeToProfile();
  }, [returnMaybeToProfile]);

  const closeInv = useCallback(() => {
    setInvOpen(false);
    returnMaybeToProfile();
  }, [returnMaybeToProfile]);

  const closeStats = useCallback(() => {
    setStatsOpen(false);
    setProfileOpen(true);
  }, []);

  const closeAchievements = useCallback(() => {
    setAchievementsOpen(false);
    setProfileOpen(true);
  }, []);

  const achievementToastRef = useRef(null);
  useEffect(() => () => clearTimeout(achievementToastRef.current), []);
  const showAchievementProgress = useCallback((id) => {
    setAchievementToast(id);
    clearTimeout(achievementToastRef.current);
    achievementToastRef.current = setTimeout(() => setAchievementToast(null), 4000);
  }, []);

  const claimAchievement = useCallback(
    (id) => {
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      if (!ach) return;
      setState((prev) => {
        if (prev.achievementsClaimed?.[id]) return prev;
        if (ach.progress(prev) < ach.target) return prev;
        let next = {
          ...prev,
          balance: prev.balance + (ach.moneyReward || 0),
          achievementsClaimed: { ...prev.achievementsClaimed, [id]: true },
        };
        if (ach.caseRewards) {
          const cases = { ...next.cases };
          for (const [cid, qty] of Object.entries(ach.caseRewards)) {
            cases[cid] = (cases[cid] || 0) + qty;
          }
          next = { ...next, cases };
        }
        if (ach.capsuleRewards) {
          const capsules = { ...next.capsules };
          for (const [capId, qty] of Object.entries(ach.capsuleRewards)) {
            capsules[capId] = (capsules[capId] || 0) + qty;
          }
          next = { ...next, capsules };
        }
        if (ach.keyReward) {
          next = { ...next, keys: (next.keys || 0) + ach.keyReward };
        }
        if (ach.vipReward) {
          const base = Math.max(next.vipUntil || 0, Date.now());
          next = { ...next, vipUntil: base + ach.vipReward * 3600000 };
        }
        if (ach.moneyReward) next = bumpEcon(next, { earn: ach.moneyReward });
        next = applyBpExp(next, 90);
        persist(next);
        return next;
      });
      if (soundOnRef.current) playClaimSound();
    },
    [persist]
  );
  const donateToastRef = useRef(null);
  useEffect(() => () => clearTimeout(donateToastRef.current), []);
  const showDonateToast = useCallback(() => {
    setDonateToast(true);
    clearTimeout(donateToastRef.current);
    donateToastRef.current = setTimeout(() => setDonateToast(false), 3000);
  }, []);

  const closeDonate = useCallback(() => setDonateOpen(false), []);

  const closePromo = useCallback(() => {
    setPromoOpen(false);
    setProfileOpen(true);
  }, []);

  const submitPromo = useCallback(() => {
    const code = normalizePromo(promoInput);
    if (!code || promoChecking) return;
    const def = PROMO_CODES[code];
    if (!def) {
      setPromoMessage({ type: "error", text: "Промокод не найден" });
      return;
    }
    if (stateRef.current.promosUsed?.[code]) {
      setPromoMessage({ type: "error", text: "Промокод уже активирован" });
      return;
    }

    const grant = () => {
      setState((prev) => {
        let next = {
          ...prev,
          promosUsed: { ...prev.promosUsed, [code]: true },
        };
        if (def.reward) {
          next = bumpEcon({ ...next, balance: next.balance + def.reward }, { earn: def.reward });
        }
        if (def.vipHours) {
          const base = Math.max(next.vipUntil || 0, Date.now());
          next = { ...next, vipUntil: base + def.vipHours * 3600000 };
        }
        persist(next);
        return next;
      });
      setPromoMessage({
        type: "success",
        text: def.vipHours
          ? `Промокод активирован! Manyusha VIP на ${def.vipHours}ч 🌈`
          : `Промокод активирован! +${fmtMoney(def.reward)} МК`,
      });
      setPromoInput("");
      if (soundOnRef.current) playPurchaseSound();
    };

    if (!def.globalLimit) {
      grant();
      return;
    }

    setPromoChecking(true);
    (async () => {
      const key = `promo-global-uses:${code}`;
      const used = await getGlobalCounter(key);
      if (used !== null && used >= def.globalLimit) {
        setPromoMessage({ type: "error", text: "Промокод не действителен" });
        setPromoChecking(false);
        return;
      }
      if (used !== null) {
        await setGlobalCounter(key, used + 1);
      }
      grant();
      setPromoChecking(false);
    })();
  }, [promoInput, promoChecking, persist]);

  const closeCraft = useCallback(() => {
    setCraftOpen(false);
    setCraftSlots([]);
    setCraftPhase("idle");
    setCraftResult(null);
    returnMaybeToProfile();
  }, [returnMaybeToProfile]);

  const runContract = useCallback(() => {
    if (craftPhase === "burning" || craftSlots.length !== 7) return;
    const rk = craftSlots[0].rarity ?? craftSlots[0].w;
    if (rk === 65) return;
    const ladder = categoryLadder(craftTab);
    const idx = ladder.indexOf(rk);
    if (idx < 0 || idx >= ladder.length - 1) return;
    const nextRk = ladder[idx + 1];
    const burnedIds = new Set(craftSlots.map((s) => s.id));

    setCraftPhase("burning");
    setCraftResult(null);

    setTimeout(() => {
      const success = Math.random() < 0.75;
      setState((prev) => {
        let inventory = prev.inventory.filter((it) => !burnedIds.has(it.id));
        let next = { ...prev, inventory, craftsDone: (prev.craftsDone || 0) + 1 };
        if (success) {
          const picked = pickCraftReward(craftTab, nextRk);
          const entry = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: picked.name,
            w: picked.w,
            p: picked.p,
            icon: picked.icon,
            iconImg: picked.iconImg,
            iconSvg: picked.iconSvg,
            rarity: picked.rarity,
            topSpeed: picked.topSpeed,
            category: craftTab,
          };
          next = { ...next, inventory: [entry, ...next.inventory] };
          setCraftResult({ success: true, item: entry });
        } else {
          setCraftResult({ success: false });
        }
        persist(next);
        return next;
      });
      setCraftSlots([]);
      setCraftPhase("result");
    }, 900);
  }, [craftPhase, craftSlots, craftTab, persist]);

  const {
    cases,
    capsules,
    timeLeft,
    selectedCaseId,
    balance,
    inventory,
    quests,
    nickname,
    firstName,
    lastName,
    age,
    nicknameChanges,
    totalTimeMs,
    casesOpened,
    craftsDone,
    disassembled,
    questsCompleted,
    econLog,
    achievementsClaimed,
    promosUsed,
    paydayProgressMs,
    paydaysToday,
    paydayDayKey,
    vipUntil,
    discountUntil,
    discountPct,
    paydayBoostUses,
    paydayBoostPct,
    bpLevel,
    bpProgressExp,
    bpFreeClaimed,
    bpPaidClaimed,
    wornSuitId,
  } = state;
  const bpExpNeeded = bpLevel < BP_MAX_LEVEL ? BP_EXP_TABLE[bpLevel] : 0;
  const vipActive = (vipUntil || 0) > nowTick;
  const bpExpBonusLabel = vipActive ? BP_EXP_PER_PAYDAY_VIP : BP_EXP_PER_PAYDAY;
  const vipRemainingMs = Math.max(0, (vipUntil || 0) - nowTick);
  const paydayBoostActive = (paydayBoostUses || 0) > 0 && !vipActive;
  const wornSuitItem = wornSuitId ? inventory.find((i) => i.id === wornSuitId) : null;
  const wearableBonusActive = wornSuitItem?.buff?.type === "wearable" ? wornSuitItem.buff.paydayBonus || 0 : 0;
  const currentPaydayAmount =
    (vipActive
      ? PAYDAY_AMOUNT * VIP_PAYDAY_MULTIPLIER
      : paydayBoostActive
      ? Math.round(PAYDAY_AMOUNT * (1 + (paydayBoostPct || 0)))
      : PAYDAY_AMOUNT) + wearableBonusActive;
  const discountActive = (discountUntil || 0) > nowTick && discountPct > 0;
  const discountRemainingMs = Math.max(0, (discountUntil || 0) - nowTick);
  const paydayToday = paydayDayKey === dayKey() ? paydaysToday || 0 : 0;
  const paydayCapped = paydayToday >= PAYDAY_MAX_PER_DAY;
  const paydayElapsedSinceFlush = Math.max(0, nowTick - lastFlushRef.current);
  const paydayRemainingMs = paydayCapped
    ? 0
    : Math.max(0, PAYDAY_INTERVAL_MS - (paydayProgressMs || 0) - paydayElapsedSinceFlush);
  const needsRegistration = loaded && (!firstName || !lastName || !age);
  const achievementsClaimable = ACHIEVEMENTS.some(
    (a) => !achievementsClaimed?.[a.id] && a.progress(state) >= a.target
  );
  const allQuestsDone = QUEST_GIVERS.every((g) => quests[g.id]?.completed);
  const keyClaimable = allQuestsDone && !state.questClaimed;
  const activeCapsule = CAPSULE_BY_ID[selectedCaseId];
  const activeCase = activeCapsule ? null : CASE_BY_ID[selectedCaseId];
  const active = activeCase || activeCapsule;
  const isCapsuleActive = Boolean(activeCapsule);
  const activeCapsuleVariant = activeCapsule?.id === "opium2026" ? "opium" : "avangard";
  const activeOwned = isCapsuleActive
    ? capsules[selectedCaseId] ?? 0
    : activeCase?.usesKeys
    ? state.keys
    : cases[selectedCaseId] ?? 0;
  const shaking = Boolean(capsuleOpenId && capsulePhase === "shaking");
  const capsuleBlocking = Boolean(capsuleOpenId && capsulePhase === "result" && !capsuleWonResolved);
  const mustResolve = Boolean(wins.some((w, i) => w && !wonResolvedList[i]) || capsuleBlocking);
  const effectiveSpinCount = isCapsuleActive ? 1 : Math.max(1, Math.min(3, spinCount));

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background:
          "radial-gradient(1100px 550px at 12% -8%, rgba(198,255,61,0.07) 0%, transparent 60%)," +
          "radial-gradient(900px 500px at 105% 8%, rgba(255,46,196,0.08) 0%, transparent 55%)," +
          "radial-gradient(800px 480px at 50% 118%, rgba(56,189,248,0.06) 0%, transparent 60%)," +
          "#121014",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <style>{`
        @keyframes shimmerPulse {
          0%, 100% { box-shadow: 0 0 10px var(--glow-color), inset 0 0 6px var(--glow-color); }
          50% { box-shadow: 0 0 24px var(--glow-color), inset 0 0 14px var(--glow-color); }
        }
        .item-shimmer { animation: shimmerPulse 1.3s ease-in-out infinite; }
        @keyframes burnAway {
          0% { transform: scale(1); opacity: 1; filter: brightness(1) saturate(1); }
          40% { transform: scale(1.05); opacity: 0.9; filter: brightness(1.6) saturate(2); }
          100% { transform: scale(0.4) rotate(8deg); opacity: 0; filter: brightness(2.4) saturate(3); }
        }
        .craft-burn { animation: burnAway 0.85s ease-in forwards; }
        @keyframes craftReveal {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .craft-reveal { animation: craftReveal 0.45s ease-out; }
        .modal-overlay {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
          backdrop-filter: blur(3px);
        }
        .modal-panel {
          width: 100%;
          max-width: 480px;
          max-height: 85vh;
          border-radius: 16px 16px 0 0;
          display: flex;
          flex-direction: column;
        }
        .modal-panel-lg { max-width: 620px; }
        @media (min-width: 640px) {
          .modal-overlay { align-items: center; padding: 24px; }
          .modal-panel { border-radius: 16px; }
        }
        @keyframes capsuleShakeKf {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          10% { transform: translate(-5px,-2px) rotate(-8deg); }
          20% { transform: translate(6px,1px) rotate(9deg); }
          30% { transform: translate(-6px,2px) rotate(-10deg); }
          40% { transform: translate(5px,-2px) rotate(8deg); }
          50% { transform: translate(-4px,1px) rotate(-6deg); }
          60% { transform: translate(6px,-1px) rotate(9deg); }
          70% { transform: translate(-5px,2px) rotate(-8deg); }
          80% { transform: translate(4px,-1px) rotate(6deg); }
          90% { transform: translate(-3px,1px) rotate(-4deg); }
        }
        .capsule-shake { animation: capsuleShakeKf 0.5s ease-in-out infinite; }
        @keyframes rainbowShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .vip-ring {
          position: relative;
          background: linear-gradient(120deg, #ff2e4d, #ff8c1a, #ffcc4d, #c6ff3d, #4ade80, #38bdf8, #7c3aed, #ff2ec4, #ff2e4d);
          background-size: 300% 300%;
          animation: rainbowShimmer 4s ease infinite;
        }
        .vip-card-border {
          background: linear-gradient(135deg, #ff2e4d, #ffcc4d, #4ade80, #38bdf8, #7c3aed);
        }
        .case-tile {
          transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .case-tile:hover {
          transform: translateY(-3px);
          border-color: var(--glow, #4ade80) !important;
          box-shadow: 0 0 22px -2px var(--glow, #4ade80), 0 8px 20px #00000055;
        }
        @media (hover: none) {
          .case-tile:hover { transform: none; }
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #4a4650 #1c1a1f;
        }
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        *::-webkit-scrollbar-track {
          background: #1c1a1f;
          border-radius: 999px;
        }
        *::-webkit-scrollbar-thumb {
          background: #4a4650;
          border-radius: 999px;
          border: 2px solid #1c1a1f;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #c6ff3d;
        }
        *::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
      <Hazard />
      {!storageOk && loaded && (
        <div
          className="w-full text-center text-xs py-1.5 px-4"
          style={{ background: "#3a1f1f", color: "#ff9d9d" }}
        >
          ⚠️ не удалось сохранить прогресс — хранилище недоступно
        </div>
      )}
      <div className="w-full text-center pt-2" style={{ color: "#5c5860", fontSize: 10 }}>
        БЕТА V 9.45
      </div>
      <header className="w-full max-w-3xl px-6 pt-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDonateOpen(true)}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5"
              style={{
                background: "linear-gradient(160deg, #1e2416, #17151a)",
                border: "1px solid #3a4a2255",
                boxShadow: "inset 0 1px 0 #ffffff08",
              }}
              aria-label="Пополнить баланс"
            >
              <span style={{ fontSize: 14 }}>💰</span>
              <span
                className="font-bold text-xs"
                style={{ color: "#c6ff3d", fontFamily: "ui-monospace, monospace" }}
              >
                {fmtMoney(balance)} <Coin size={11} />
              </span>
              <span style={{ fontSize: 10, color: "#5c5860" }}>＋</span>
            </button>
            <button
              onClick={() => setQuestsOpen(true)}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5"
              style={{
                background: "linear-gradient(160deg, #2a2314, #17151a)",
                border: `1px solid ${keyClaimable ? "#ffcc4d" : "#4a3f2255"}`,
                boxShadow: keyClaimable ? "0 0 12px #ffcc4d88" : "inset 0 1px 0 #ffffff08",
              }}
            >
              <span style={{ fontSize: 14 }}>🗝️</span>
              <span
                className="font-bold text-xs"
                style={{ color: "#ffcc4d", fontFamily: "ui-monospace, monospace" }}
              >
                {state.keys}
              </span>
            </button>
            <button
              onClick={() => {
                setBuyTab("secret");
                setBuyOpen(true);
              }}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5"
              style={{
                background: "linear-gradient(160deg, #2a1e14, #17151a)",
                border: "1px solid #4a331e55",
                boxShadow: "inset 0 1px 0 #ffffff08",
              }}
            >
              <span style={{ fontSize: 14 }}>🔩</span>
              <span
                className="font-bold text-xs"
                style={{ color: "#ff8c1a", fontFamily: "ui-monospace, monospace" }}
              >
                {state.parts || 0}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (soundOnRef.current) playProfileOpenSound();
                setProfileOpen(true);
              }}
              className="relative flex items-center gap-2 rounded-full pl-1 pr-3 py-1"
              style={{
                background: "linear-gradient(160deg, #201c26, #17151a)",
                border: `1px solid ${keyClaimable ? "#ffcc4d" : "#3a2f4a55"}`,
                boxShadow: keyClaimable ? "0 0 12px #ffcc4d88" : "inset 0 1px 0 #ffffff08",
              }}
              aria-label="Профиль"
            >
              <Avatar size={30} vip={vipActive} />
              <span className="flex flex-col items-start leading-tight">
                <span
                  className="text-xs font-bold max-w-[84px] truncate"
                  style={{ color: "#f1efe9" }}
                >
                  {nickname || "Профиль"}
                </span>
                {vipActive && (
                  <span
                    className="text-[9px] font-extrabold tracking-wide"
                    style={{
                      background: "linear-gradient(90deg, #ff2e4d, #ffcc4d, #4ade80, #38bdf8, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    MANYUSHA VIP
                  </span>
                )}
              </span>
              {keyClaimable && (
                <span
                  className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{ background: "#ffcc4d", color: "#121014", minWidth: 16, height: 16, padding: "0 3px" }}
                >
                  !
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-4 relative">
          <div
            className="absolute left-1/2 rounded-full pointer-events-none"
            style={{
              top: -10,
              width: 260,
              height: 90,
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse, #ff5e2e22 0%, transparent 70%)",
            }}
          />
          <div className="flex items-center justify-center gap-3 relative">
            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg, transparent, #ff5e2e88)" }} />
            <div className="text-xs tracking-[0.3em] font-bold" style={{ color: "#ff5e2e" }}>
              БАРАХОЛКА КЕЙСОВ
            </div>
            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg, #ff5e2e88, transparent)" }} />
          </div>
          <h1
            className="text-4xl sm:text-5xl mt-2 relative"
            style={{
              fontFamily: '"Arial Black", Impact, sans-serif',
              color: "#f1efe9",
              letterSpacing: "-0.02em",
              textShadow: "0 0 24px #ff5e2e33",
            }}
          >
            РП МАНЮША
          </h1>
          <p className="text-sm mt-2" style={{ color: "#8f8b93" }}>
            Открывай кейсы — выпадает случайный хлам. Или не хлам.
          </p>
        </div>
      </header>

      {!loaded ? (
        <div className="py-20 text-sm" style={{ color: "#5c5860" }}>
          загрузка…
        </div>
      ) : (
        <>
          {/* stat row */}
          <div className="w-full max-w-3xl px-6 grid grid-cols-3 gap-3 items-stretch">
            <div
              className="rounded-xl p-3.5 flex flex-col items-center justify-center gap-1"
              style={{
                background: "linear-gradient(160deg, #1e2416, #17151a)",
                border: "1px solid #3a4a2244",
                boxShadow: "inset 0 1px 0 #ffffff08",
              }}
            >
              {isCapsuleActive ? (
                <CapsuleIcon size={16} variant={activeCapsuleVariant} />
              ) : (
                <span style={{ fontSize: 18 }}>{activeCase?.usesKeys ? "🗝️" : active.boxIcon}</span>
              )}
              <div className="text-xs text-center" style={{ color: "#8f8b93" }}>
                {isCapsuleActive ? "КАПСУЛ" : activeCase?.usesKeys ? "КЛЮЧЕЙ" : "КЕЙСОВ"} «{active.name.split(" ")[0]}»
              </div>
              <div className="text-2xl font-bold" style={{ color: "#c6ff3d", fontFamily: "ui-monospace, monospace" }}>
                {activeOwned}
              </div>
            </div>

            <div
              className="rounded-xl p-3.5 flex flex-col items-center justify-center gap-2"
              style={{
                background: "linear-gradient(160deg, #221d1a, #17151a)",
                border: "1px solid #ff5e2e33",
                boxShadow: "inset 0 1px 0 #ffffff08, 0 4px 16px #00000044",
              }}
            >
              <div
                className="w-16 h-16 rounded flex items-center justify-center text-3xl relative"
                style={{
                  background: "linear-gradient(160deg,#2a2730,#17151a)",
                  border: "1px solid #ff5e2e66",
                  boxShadow: "0 0 20px #ff5e2e33",
                }}
              >
                {isCapsuleActive ? <CapsuleIcon size={26} variant={activeCapsuleVariant} /> : activeCase?.usesKeys ? "🗝️" : active.boxIcon}
              </div>
              <div className="text-xs font-bold text-center" style={{ color: "#f1efe9" }}>
                {active.name}
              </div>
              {!isCapsuleActive && (
                <div className="flex gap-1">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => setSpinCount(n)}
                      disabled={spinning || mustResolve}
                      className="text-[10px] font-bold w-6 h-6 rounded-md flex items-center justify-center"
                      style={{
                        background: spinCount === n ? "#c6ff3d" : "#17151a",
                        color:
                          spinCount === n ? "#121014" : activeOwned < n ? "#4a4750" : "#8f8b93",
                        border: `1px solid ${spinCount === n ? "#c6ff3d" : "#2c2930"}`,
                        opacity: activeOwned < n && spinCount !== n ? 0.5 : 1,
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => (isCapsuleActive ? openCapsule(selectedCaseId) : openCase())}
                disabled={spinning || shaking || mustResolve || activeOwned < effectiveSpinCount}
                className="text-xs font-bold tracking-wide px-4 py-1.5 rounded-sm"
                style={{
                  background:
                    spinning || shaking || mustResolve || activeOwned < effectiveSpinCount ? "#2c2930" : "#c6ff3d",
                  color:
                    spinning || shaking || mustResolve || activeOwned < effectiveSpinCount ? "#6b6870" : "#121014",
                  cursor:
                    spinning || shaking || mustResolve || activeOwned < effectiveSpinCount
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {spinning || shaking
                  ? "ОТКРЫВАЕТСЯ…"
                  : mustResolve
                  ? "СНАЧАЛА РЕШИ С ПРИЗОМ ↓"
                  : activeOwned < effectiveSpinCount
                  ? isCapsuleActive
                    ? "НЕТ КАПСУЛ"
                    : activeCase?.usesKeys
                    ? "НЕТ КЛЮЧЕЙ"
                    : "НЕТ КЕЙСОВ"
                  : effectiveSpinCount > 1
                  ? `ОТКРЫТЬ ×${effectiveSpinCount}`
                  : "ОТКРЫТЬ"}
              </button>
              <button
                onClick={() => setPickerOpen(true)}
                className="text-[11px] underline"
                style={{ color: "#8f8b93" }}
              >
                другие кейсы
              </button>
            </div>

            <div
              className="rounded-xl p-3.5 flex flex-col items-center justify-center gap-1"
              style={{
                background: "linear-gradient(160deg, #2a2314, #17151a)",
                border: "1px solid #4a3f2244",
                boxShadow: "inset 0 1px 0 #ffffff08",
              }}
            >
              <span style={{ fontSize: 18 }}>💵</span>
              <div className="text-xs text-center" style={{ color: "#8f8b93" }}>
                ЦЕНА {isCapsuleActive ? "КАПСУЛЫ" : "КЕЙСА"}
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "#ffcc4d", fontFamily: "ui-monospace, monospace" }}
              >
                {fmtMoney(active.price)} <Coin size={16} />
              </div>
            </div>
          </div>

          {/* reel(s) */}
          <div className="w-full max-w-3xl px-6 mt-6 flex flex-col gap-3">
            {showReel ? (
              reels.map((strip, slot) => (
                <div
                  key={slot}
                  ref={(el) => (viewportRefs.current[slot] = el)}
                  className="relative rounded-lg overflow-hidden"
                  style={{
                    height: 148,
                    background: "#0d0c0f",
                    border: "1px solid #2c2930",
                    boxShadow: "0 0 0 1px #00000066, inset 0 0 24px #00000088, 0 6px 20px #00000055",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-0 bottom-0 z-10"
                    style={{ width: 2, background: "#ff5e2e", transform: "translateX(-1px)" }}
                  />
                  <div
                    className="absolute left-1/2 z-10"
                    style={{
                      top: -1,
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "7px solid transparent",
                      borderRight: "7px solid transparent",
                      borderTop: "9px solid #ff5e2e",
                    }}
                  />
                  <div
                    className="absolute left-1/2 z-10"
                    style={{
                      bottom: -1,
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "7px solid transparent",
                      borderRight: "7px solid transparent",
                      borderBottom: "9px solid #ff5e2e",
                    }}
                  />
                  <div
                    className="flex items-center h-full"
                    style={{
                      transform: `translateX(${translates[slot] || 0}px)`,
                      transition: animates[slot] ? `transform ${SPIN_MS}ms cubic-bezier(.12,.85,.3,1)` : "none",
                      width: REEL_LEN * ITEM_W,
                    }}
                  >
                    {strip.map((item, i) => (
                      <ReelCard key={i} item={item} revealed={!spinning && i === WIN_IDX} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="rounded-lg flex items-center justify-center text-xs"
                style={{ height: 60, color: "#5c5860", border: "1px dashed #2c2930" }}
              >
                тут пойдёт лента, когда откроешь кейс
              </div>
            )}
          </div>

          {/* result(s) */}
          <div className="w-full max-w-3xl px-6 mt-4 mb-10 flex flex-col gap-3">
            {wins.map((won, slot) => {
              if (!won || spinning) return null;
              const wonResolved = wonResolvedList[slot];
              return (
                <div
                  key={slot}
                  className="rounded-lg p-4"
                  style={{
                    background: "#1c1a1f",
                    border: `1px solid ${rarityOf(won).color}`,
                    boxShadow: `0 0 20px ${rarityOf(won).color}44`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `radial-gradient(circle, ${rarityOf(won).color}33, transparent)` }}
                    >
                      <ItemIcon item={won} size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs" style={{ color: "#8f8b93" }}>
                        ВЫПАЛО:
                      </div>
                      <div className="font-bold" style={{ color: "#f1efe9" }}>
                        {won.name}
                      </div>
                      {activeQuestNeedNames(quests).has(won.name) && (
                        <div
                          className="text-[11px] font-bold mt-0.5 flex items-center gap-1"
                          style={{ color: "#7cf5ff" }}
                        >
                          📋 Нужно для задания!
                        </div>
                      )}
                      {won.buffLabel && (
                        <div
                          className="text-[11px] font-bold mt-0.5 flex items-center gap-1"
                          style={{ color: "#ffcc4d" }}
                        >
                          ⚡ Даёт: {won.buffLabel}
                        </div>
                      )}
                      {won.compensated && (
                        <div
                          className="text-[11px] font-bold mt-0.5 flex items-center gap-1"
                          style={{ color: "#a78bfa" }}
                        >
                          🔮 +10% от Кристалла Компенсации
                        </div>
                      )}
                    </div>
                    <Chip item={won} />
                  </div>

                  {wonResolved ? (
                    <div
                      className="text-xs font-bold text-center mt-3 py-2 rounded-md"
                      style={{
                        background: "#17151a",
                        color:
                          wonResolved === "sold"
                            ? "#c6ff3d"
                            : wonResolved === "disassembled"
                            ? "#ff8c1a"
                            : "#ffcc4d",
                      }}
                    >
                      {wonResolved === "sold" ? (
                        <>
                          ✅ ПРОДАНО ЗА {fmtMoney(won.p)} <Coin size={12} />
                        </>
                      ) : wonResolved === "disassembled" ? (
                        `✅ РАЗОБРАНО НА ${partsValue(won)} 🔩`
                      ) : wonResolved === "claimed" ? (
                        "✅ КЕЙС НАЧИСЛЕН"
                      ) : wonResolved === "claimedParts" ? (
                        `✅ +${won.grantsParts} ДЕТАЛЕЙ НАЧИСЛЕНО`
                      ) : (
                        "✅ ДОБАВЛЕНО В ИНВЕНТАРЬ"
                      )}
                    </div>
                  ) : won.grantsCaseId ? (
                    <button
                      onClick={() => claimGrantedCase(slot)}
                      className="w-full text-xs font-bold py-2.5 rounded-md mt-3"
                      style={{ background: "#c6ff3d", color: "#121014" }}
                    >
                      🏆 ЗАБРАТЬ КЕЙС
                    </button>
                  ) : won.grantsParts ? (
                    <button
                      onClick={() => claimGrantedParts(slot)}
                      className="w-full text-xs font-bold py-2.5 rounded-md mt-3"
                      style={{ background: "#c6ff3d", color: "#121014" }}
                    >
                      🔩 ЗАБРАТЬ {won.grantsParts} ДЕТАЛЕЙ
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => quickSell(slot)}
                          className="flex-1 text-xs font-bold py-2.5 rounded-md"
                          style={{ background: "#c6ff3d", color: "#121014" }}
                        >
                          ПРОДАТЬ ЗА {fmtMoney(won.p)} <Coin size={12} />
                        </button>
                        <button
                          onClick={() => keepItem(slot)}
                          className="flex-1 text-xs font-bold py-2.5 rounded-md"
                          style={{ background: "#2c2930", color: "#e8e5df" }}
                        >
                          🎒 В ИНВЕНТАРЬ
                        </button>
                      </div>
                      {partsValue(won) != null && (
                        <button
                          onClick={() => disassembleWon(slot)}
                          className="text-xs font-bold py-2.5 rounded-md"
                          style={{ background: "#3a2f1a", color: "#ff8c1a", border: "1px solid #ff8c1a55" }}
                        >
                          🔩 РАЗОБРАТЬ НА {partsValue(won)} ДЕТАЛЕЙ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <Hazard />

      {/* case picker modal */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="modal-panel flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08", maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <span className="font-bold" style={{ color: "#f1efe9" }}>
                Выбор кейса
              </span>
              <button onClick={() => setPickerOpen(false)} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-3 flex flex-col gap-2">
              {CASES.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-md p-3"
                  style={{
                    background: "#17151a",
                    border: c.id === selectedCaseId ? "1px solid #ff5e2e" : "1px solid #2c2930",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "linear-gradient(160deg,#2a2730,#17151a)" }}
                  >
                    {c.boxIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color: "#f1efe9" }}>
                      {c.name}
                    </div>
                    <div className="text-xs" style={{ color: "#8f8b93" }}>
                      {c.free ? (
                        "бесплатно · "
                      ) : c.usesKeys ? (
                        "цена: 1 🗝️ · "
                      ) : (
                        <>
                          {fmtMoney(c.price)} <Coin size={10} /> ·{" "}
                        </>
                      )}
                      у тебя: {c.usesKeys ? state.keys : cases[c.id] ?? 0}
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewCaseId(c.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0"
                    style={{ background: "#2c2930" }}
                    aria-label="Что внутри"
                  >
                    👁
                  </button>
                  <button
                    onClick={() => selectCase(c.id)}
                    className="text-xs font-bold px-3 py-2 rounded-md flex-shrink-0"
                    style={{
                      background: c.id === selectedCaseId ? "#2c2930" : "#c6ff3d",
                      color: c.id === selectedCaseId ? "#8f8b93" : "#121014",
                    }}
                  >
                    {c.id === selectedCaseId ? "АКТИВЕН" : "ВЫБРАТЬ"}
                  </button>
                </div>
              ))}
              {CAPSULES.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-md p-3"
                  style={{
                    background: "#17151a",
                    border: c.id === selectedCaseId ? "1px solid #ff5e2e" : "1px solid #2c2930",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(160deg,#2a2730,#17151a)" }}
                  >
                    <CapsuleIcon size={22} variant={c.id === "opium2026" ? "opium" : "avangard"} />
                    </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color: "#f1efe9" }}>
                      {c.name}
                    </div>
                    <div className="text-xs" style={{ color: "#8f8b93" }}>
                      {fmtMoney(c.price)} <Coin size={11} /> · у тебя: {capsules[c.id] ?? 0}
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewCaseId(c.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0"
                    style={{ background: "#2c2930" }}
                    aria-label="Что внутри"
                  >
                    👁
                  </button>
                  <button
                    onClick={() => selectCase(c.id)}
                    className="text-xs font-bold px-3 py-2 rounded-md flex-shrink-0"
                    style={{
                      background: c.id === selectedCaseId ? "#2c2930" : "#c6ff3d",
                      color: c.id === selectedCaseId ? "#8f8b93" : "#121014",
                    }}
                  >
                    {c.id === selectedCaseId ? "АКТИВЕН" : "ВЫБРАТЬ"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* case contents preview modal */}
      {previewCaseId && (
        <div
          className="fixed inset-0 z-[55] modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => setPreviewCaseId(null)}
        >
          <div
            className="modal-panel flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08", maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <span className="font-bold" style={{ color: "#f1efe9" }}>
                Содержимое: {PREVIEW_SOURCE[previewCaseId].name}
              </span>
              <button onClick={() => setPreviewCaseId(null)} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-3">
              <div className="flex flex-col gap-2">
                {[...PREVIEW_SOURCE[previewCaseId].items]
                  .sort((a, b) => (a.rarity ?? a.w) - (b.rarity ?? b.w) || (b.p || 0) - (a.p || 0))
                  .map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md p-2"
                      style={{ background: "#17151a", border: `1px solid ${rarityOf(item).color}55` }}
                    >
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: `radial-gradient(circle, ${rarityOf(item).color}33, transparent)` }}
                      >
                        <ItemIcon item={item} size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate" style={{ color: "#f1efe9" }}>
                          {item.name}
                        </div>
                        <div className="text-xs" style={{ color: "#8f8b93" }}>
                          {item.grantsCaseId ? (
                            "🏆 дарит целый кейс"
                          ) : item.grantsParts ? (
                            `🔩 дарит ${item.grantsParts} деталей`
                          ) : (
                            <>
                              {fmtMoney(item.p)} <Coin size={10} />
                              {item.topSpeed ? ` · 🏁 ${item.topSpeed} км/ч` : ""}
                            </>
                          )}
                        </div>
                        {item.buff && (
                          <div className="text-[11px] font-bold mt-0.5" style={{ color: "#ffcc4d" }}>
                            ⚡ Даёт баф
                          </div>
                        )}
                      </div>
                      <Chip item={item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* buy modal */}
      {buyOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closeBuy}
        >
          <div
            className="modal-panel modal-panel-lg flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>🛍️</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Магазин
                </span>
              </div>
              <button onClick={closeBuy} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>

            <div className="flex gap-1.5 px-4 pt-3">
              <button
                onClick={() => setBuyTab("cases")}
                className="text-xs font-bold px-3 py-1.5 rounded-md"
                style={{
                  background: buyTab === "cases" ? "#c6ff3d" : "#17151a",
                  color: buyTab === "cases" ? "#121014" : "#8f8b93",
                  border: `1px solid ${buyTab === "cases" ? "#c6ff3d" : "#2c2930"}`,
                }}
              >
                📦 Кейсы
              </button>
              <button
                onClick={() => setBuyTab("capsules")}
                className="text-xs font-bold px-3 py-1.5 rounded-md"
                style={{
                  background: buyTab === "capsules" ? "#c6ff3d" : "#17151a",
                  color: buyTab === "capsules" ? "#121014" : "#8f8b93",
                  border: `1px solid ${buyTab === "capsules" ? "#c6ff3d" : "#2c2930"}`,
                }}
              >
                💊 Капсулы
              </button>
              <button
                onClick={() => setBuyTab("secret")}
                className="text-xs font-bold px-3 py-1.5 rounded-md"
                style={{
                  background: buyTab === "secret" ? "#c6ff3d" : "#17151a",
                  color: buyTab === "secret" ? "#121014" : "#8f8b93",
                  border: `1px solid ${buyTab === "secret" ? "#c6ff3d" : "#2c2930"}`,
                }}
              >
                🗝️ Секретное
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-3 flex flex-col gap-2">
              {buyTab === "cases" && (
                <div className="grid grid-cols-3 gap-2.5">
                  {CASES.filter((c) => !c.free && !c.usesKeys).map((c) => {
                    const price = discountActive ? effectiveCasePrice(c.price, state, nowTick) : c.price;
                    const canAfford = balance >= price;
                    const glow = caseGlowColor(c.price);
                    return (
                      <div
                        key={c.id}
                        className="case-tile rounded-xl p-2 flex flex-col items-center text-center"
                        style={{ background: "#17151a", border: `1px solid ${glow}44`, "--glow": glow }}
                      >
                        <div
                          className="relative w-full aspect-square rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `radial-gradient(circle, ${glow}26, #17151a 72%)`,
                            border: `1px solid ${glow}77`,
                            boxShadow: `0 0 16px ${glow}66, inset 0 0 14px ${glow}33`,
                            fontSize: 32,
                          }}
                        >
                          {c.boxIcon}
                          <button
                            onClick={() => setPreviewCaseId(c.id)}
                            className="absolute top-1 right-1 flex items-center justify-center rounded-full"
                            style={{ width: 20, height: 20, background: "#000000aa", fontSize: 10 }}
                            aria-label="Что внутри"
                          >
                            👁
                          </button>
                        </div>
                        <div
                          className="text-[11px] font-bold leading-tight mt-1.5"
                          style={{ color: "#f1efe9", minHeight: 26 }}
                        >
                          {c.name}
                        </div>
                        <div className="text-[9px]" style={{ color: "#8f8b93" }}>
                          у тебя: {cases[c.id] ?? 0}
                        </div>
                        <button
                          onClick={() => buyCase(c.id)}
                          disabled={!canAfford}
                          className="text-[10px] font-bold w-full mt-1.5 py-1.5 rounded-md flex items-center justify-center gap-1"
                          style={{
                            background: canAfford ? "#c6ff3d" : "#2c2930",
                            color: canAfford ? "#121014" : "#6b6870",
                            cursor: canAfford ? "pointer" : "not-allowed",
                          }}
                        >
                          {discountActive && (
                            <span className="line-through" style={{ opacity: 0.6, fontWeight: 500 }}>
                              {fmtMoney(c.price)}
                            </span>
                          )}
                          {fmtMoney(price)} <Coin size={10} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {buyTab === "capsules" &&
                CAPSULES.map((c) => {
                  const canAfford = balance >= c.price;
                  const owned = capsules[c.id] ?? 0;
                  return (
                    <div
                      key={c.id}
                      className="flex items-center gap-3 rounded-md p-3"
                      style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ width: 48, height: 48 }}
                      >
                        <CapsuleIcon size={22} variant={c.id === "opium2026" ? "opium" : "avangard"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate" style={{ color: "#f1efe9" }}>
                          {c.name}
                        </div>
                        <div className="text-xs" style={{ color: "#8f8b93" }}>
                          у тебя: {owned}
                        </div>
                      </div>
                      <button
                        onClick={() => setPreviewCaseId(c.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0"
                        style={{ background: "#2c2930" }}
                        aria-label="Что внутри"
                      >
                        👁
                      </button>
                      {owned > 0 && (
                        <button
                          onClick={() => openCapsule(c.id)}
                          className="text-xs font-bold px-3 py-2 rounded-md flex-shrink-0"
                          style={{ background: "#ff5e2e", color: "#121014" }}
                        >
                          ОТКРЫТЬ
                        </button>
                      )}
                      <button
                        onClick={() => buyCapsule(c.id)}
                        disabled={!canAfford}
                        className="text-xs font-bold px-3 py-2 rounded-md flex-shrink-0"
                        style={{
                          background: canAfford ? "#c6ff3d" : "#2c2930",
                          color: canAfford ? "#121014" : "#6b6870",
                          cursor: canAfford ? "pointer" : "not-allowed",
                        }}
                      >
                        {fmtMoney(c.price)} <Coin size={12} />
                      </button>
                    </div>
                  );
                })}

              {buyTab === "secret" && (
                <>
                  <div
                    className="rounded-md p-3 text-center text-xs"
                    style={{ background: "#17151a", border: "1px dashed #2c2930", color: "#8f8b93" }}
                  >
                    🗝️ Ключи не покупаются за деньги — их дают{" "}
                    <button
                      onClick={() => {
                        setBuyOpen(false);
                        setQuestsOpen(true);
                      }}
                      className="underline font-bold"
                      style={{ color: "#ffcc4d" }}
                    >
                      задания
                    </button>
                    .
                  </div>
                  {CASES.filter((c) => c.usesKeys).map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-3 rounded-md p-3"
                      style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                    >
                      <div
                        className="w-12 h-12 rounded flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: "linear-gradient(160deg,#2a2730,#17151a)" }}
                      >
                        🗝️
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate" style={{ color: "#f1efe9" }}>
                          {c.name}
                        </div>
                        <div className="text-xs" style={{ color: "#8f8b93" }}>
                          у тебя ключей: {state.keys}
                        </div>
                      </div>
                      <button
                        onClick={() => setPreviewCaseId(c.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-md flex-shrink-0"
                        style={{ background: "#2c2930" }}
                        aria-label="Что внутри"
                      >
                        👁
                      </button>
                      <button
                        onClick={() => selectCase(c.id)}
                        className="text-xs font-bold px-3 py-2 rounded-md flex-shrink-0"
                        style={{
                          background: c.id === selectedCaseId ? "#2c2930" : "#c6ff3d",
                          color: c.id === selectedCaseId ? "#8f8b93" : "#121014",
                        }}
                      >
                        {c.id === selectedCaseId ? "АКТИВЕН" : "ВЫБРАТЬ"}
                      </button>
                    </div>
                  ))}

                  <div
                    className="rounded-md p-3 text-center text-xs mt-2"
                    style={{ background: "#17151a", border: "1px dashed #2c2930", color: "#8f8b93" }}
                  >
                    🔩 Детали: <span style={{ color: "#ff8c1a", fontWeight: 700 }}>{state.parts || 0}</span> — получай, разбирая
                    вещи редкости Легенда и выше
                  </div>

                  <div
                    className="rounded-md p-2.5 text-center text-xs font-bold"
                    style={{ background: "#1c1a1f", border: "1px solid #2c2930", color: "#c7c4cc" }}
                  >
                    ⏳ Обновление реликвий через:{" "}
                    <span style={{ color: "#ffd700", fontFamily: "ui-monospace, monospace" }}>
                      {formatVipRemaining(Math.max(0, (state.relicPoolResetAt || 0) - nowTick))}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(state.relicPoolIds || []).map((relicId) => {
                      const r = RELIC_BY_ID[relicId];
                      if (!r) return null;
                      const owned = state.parts || 0;
                      const isSelected = state.relicSelectedId === r.id;
                      const lockedByOther = !!state.relicSelectedId && !isSelected;
                      const canAssemble = isSelected && owned >= r.partsNeeded;
                      const cardInner = (
                        <div
                          className="rounded-lg p-2.5 flex flex-col items-center text-center h-full"
                          style={{
                            background: "#17151a",
                            border: `1px solid ${isSelected ? "#ffd700" : "#2c2930"}`,
                            boxShadow: isSelected ? "0 0 14px #ffd70055" : "none",
                            opacity: lockedByOther ? 0.45 : 1,
                            filter: lockedByOther ? "grayscale(0.6)" : "none",
                          }}
                        >
                          <div
                            className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: `radial-gradient(circle, ${rarityOf(r).color}33, transparent)` }}
                          >
                            <ItemIcon item={r} size={44} />
                          </div>
                          <div className="text-[11px] font-bold mt-1.5 leading-tight" style={{ color: "#f1efe9" }}>
                            {r.name}
                          </div>
                          <div className="text-[10px] mt-1" style={{ color: "#8f8b93" }}>
                            {fmtMoney(r.p)} <Coin size={9} />
                          </div>

                          {r.buffEffect && (
                            <div
                              className="text-[9px] mt-1.5 rounded p-1 leading-tight"
                              style={{ background: "#2c260f", color: "#ffcc4d", border: "1px solid #ffcc4d33" }}
                            >
                              ⚡ {r.buffEffect}
                            </div>
                          )}

                          {isSelected ? (
                            <div className="w-full mt-2">
                              <div
                                className="text-[10px] font-bold"
                                style={{ color: canAssemble ? "#c6ff3d" : "#ff9d9d", fontFamily: "ui-monospace, monospace" }}
                              >
                                {owned}/{r.partsNeeded} деталей
                              </div>
                              <div className="w-full rounded-full h-1.5 mt-1 mb-2" style={{ background: "#2c2930" }}>
                                <div
                                  className="h-1.5 rounded-full"
                                  style={{
                                    width: `${Math.min(100, (owned / r.partsNeeded) * 100)}%`,
                                    background: "#ffd700",
                                  }}
                                />
                              </div>
                              <button
                                onClick={() => assembleRelic(r.id)}
                                disabled={!canAssemble}
                                className="w-full text-[10px] font-bold py-1.5 rounded-md"
                                style={{
                                  background: canAssemble ? "#ffd700" : "#2c2930",
                                  color: canAssemble ? "#121014" : "#6b6870",
                                }}
                              >
                                {canAssemble ? `Собрать за ${r.partsNeeded} деталей` : "НЕ ХВАТАЕТ"}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => selectRelic(r.id)}
                              disabled={lockedByOther}
                              className="w-full text-[10px] font-bold py-1.5 rounded-md mt-2"
                              style={{
                                background: lockedByOther ? "#2c2930" : "#c6ff3d",
                                color: lockedByOther ? "#6b6870" : "#121014",
                              }}
                            >
                              {lockedByOther ? "🔒 ЗАНЯТО" : `Собрать за ${r.partsNeeded} деталей`}
                            </button>
                          )}
                        </div>
                      );
                      return r.rainbow ? (
                        <div key={r.id} className="vip-card-border rounded-lg" style={{ padding: 1.5 }}>
                          {cardInner}
                        </div>
                      ) : (
                        <div key={r.id}>{cardInner}</div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* quests modal */}
      {questsOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closeQuests}
        >
          <div
            className="modal-panel modal-panel-lg flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>📋</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Задания
                </span>
              </div>
              <button onClick={closeQuests} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-3">
              <div className="text-xs text-center mb-3" style={{ color: "#8f8b93" }}>
                Выполни все 3 задания, чтобы забрать 🗝️ ключ от секретного кейса
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {QUEST_GIVERS.map((g) => {
                  const dept = quests[g.id];
                  if (!dept) return null;
                  const variant = g.variants[dept.variantIdx];
                  const counts = {};
                  inventory.forEach((it) => { counts[it.name] = (counts[it.name] || 0) + 1; });
                  const canComplete = variant.req.every((r) => (counts[r.name] || 0) >= r.qty);
                  const remainMs = Math.max(0, dept.refreshAt - nowTick);
                  const hh = Math.floor(remainMs / 3600000);
                  const mm = Math.floor((remainMs % 3600000) / 60000);
                  const ss = Math.floor((remainMs % 60000) / 1000);

                  return (
                    <div
                      key={g.id}
                      className="flex-1 rounded-lg p-3 flex flex-col"
                      style={{ background: "#17151a", border: `1px solid ${dept.completed ? g.color : "#2c2930"}` }}
                    >
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: 20 }}>{g.emoji}</span>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm"
                          style={{ color: "#121014", backgroundColor: g.color }}
                        >
                          {g.difficulty}
                        </span>
                      </div>
                      <div className="text-sm font-bold mt-1.5" style={{ color: "#f1efe9" }}>
                        {g.name}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: "#5c5860" }}>
                        новое через {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
                      </div>

                      {dept.completed ? (
                        <div
                          className="flex-1 flex flex-col items-center justify-center py-4 mt-2"
                          style={{ color: g.color }}
                        >
                          <span style={{ fontSize: 26 }}>✅</span>
                          <span className="text-xs font-bold mt-1">ВЫПОЛНЕНО</span>
                        </div>
                      ) : (
                        <>
                          <div className="text-[10px] font-bold mt-2 mb-1" style={{ color: "#8f8b93" }}>
                            СУТЬ ЗАДАНИЯ:
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            {variant.req.map((r, i) => {
                              const have = counts[r.name] || 0;
                              const ok = have >= r.qty;
                              const itemDef = ITEM_BY_NAME[r.name];
                              return (
                                <div key={i} className="flex items-center gap-1.5 text-xs">
                                  {itemDef && <ItemIcon item={itemDef} size={14} />}
                                  <span style={{ color: "#e8e5df", flex: 1 }}>{r.name}</span>
                                  <span className="font-bold" style={{ color: ok ? "#c6ff3d" : "#ff9d9d" }}>
                                    {have}/{r.qty}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          <button
                            onClick={() => completeQuest(g.id)}
                            disabled={!canComplete}
                            className="text-[11px] font-bold py-2 rounded-md mt-3"
                            style={{
                              background: canComplete ? "#c6ff3d" : "#2c2930",
                              color: canComplete ? "#121014" : "#6b6870",
                            }}
                          >
                            {canComplete ? "ВЫПОЛНИТЬ" : "НЕДОСТАТОЧНО ПРЕДМЕТОВ"}
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {allQuestsDone && (
                <div
                  className="text-center text-xs font-bold mt-3 py-2 rounded-md"
                  style={{ background: "#17151a", color: "#ffcc4d" }}
                >
                  🎉 ВСЕ ЗАДАНИЯ ВЫПОЛНЕНЫ
                </div>
              )}

              <button
                onClick={claimKey}
                disabled={!keyClaimable}
                className="w-full text-sm font-bold py-3 rounded-md mt-3"
                style={{
                  background: keyClaimable ? "#ffcc4d" : "#2c2930",
                  color: keyClaimable ? "#121014" : "#6b6870",
                  boxShadow: keyClaimable ? "0 0 20px #ffcc4d66" : "none",
                }}
              >
                {allQuestsDone && !keyClaimable ? "✅ КЛЮЧ УЖЕ ПОЛУЧЕН" : "🗝️ ЗАБРАТЬ СЕКРЕТНЫЙ КЛЮЧ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* capsule opening overlay */}
      {capsuleOpenId && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-6"
          style={{ background: "#000000e6" }}
        >
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            {capsulePhase === "shaking" && (
              <>
                <CapsuleIcon size={64} shaking variant={capsuleOpenId === "opium2026" ? "opium" : "avangard"} />
                <div className="text-sm font-bold mt-6 tracking-wide" style={{ color: "#f1efe9" }}>
                  ОТКРЫВАЕТСЯ…
                </div>
                <div className="text-xs mt-1" style={{ color: "#8f8b93" }}>
                  {CAPSULE_BY_ID[capsuleOpenId]?.name}
                </div>
              </>
            )}

            {capsulePhase === "result" && capsuleWon && (
              <div
                className="craft-reveal rounded-xl p-5 w-full"
                style={{
                  background: "#1c1a1f",
                  border: `1px solid ${rarityOf(capsuleWon).color}`,
                  boxShadow: `0 0 30px ${rarityOf(capsuleWon).color}66`,
                }}
              >
                <div className="text-xs" style={{ color: "#8f8b93" }}>
                  ИЗ КАПСУЛЫ ВЫПАЛО:
                </div>
                <div
                  className="w-16 h-16 mx-auto my-3 rounded flex items-center justify-center"
                  style={{ background: `radial-gradient(circle, ${rarityOf(capsuleWon).color}33, transparent)` }}
                >
                  <ItemIcon item={capsuleWon} size={32} />
                </div>
                <div className="font-bold" style={{ color: "#f1efe9" }}>
                  {capsuleWon.name}
                </div>
                <div className="flex items-center justify-center mt-2">
                  <Chip item={capsuleWon} />
                </div>

                {capsuleWonResolved ? (
                  <>
                    <div
                      className="text-xs font-bold text-center mt-4 py-2 rounded-md"
                      style={{
                        background: "#17151a",
                        color:
                          capsuleWonResolved === "sold"
                            ? "#c6ff3d"
                            : capsuleWonResolved === "disassembled"
                            ? "#ff8c1a"
                            : "#ffcc4d",
                      }}
                    >
                      {capsuleWonResolved === "sold" ? (
                        <>
                          ✅ ПРОДАНО ЗА {fmtMoney(capsuleWon.p)} <Coin size={12} />
                        </>
                      ) : capsuleWonResolved === "disassembled" ? (
                        `✅ РАЗОБРАНО НА ${partsValue(capsuleWon)} 🔩`
                      ) : (
                        "✅ ДОБАВЛЕНО В ИНВЕНТАРЬ"
                      )}
                    </div>
                    <button
                      onClick={closeCapsule}
                      className="text-xs font-bold px-4 py-2.5 rounded-md mt-3 w-full"
                      style={{ background: "#2c2930", color: "#e8e5df" }}
                    >
                      ЗАКРЫТЬ
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex gap-3">
                      <button
                        onClick={capsuleQuickSell}
                        className="flex-1 text-xs font-bold py-2.5 rounded-md"
                        style={{ background: "#c6ff3d", color: "#121014" }}
                      >
                        ПРОДАТЬ ЗА {fmtMoney(capsuleWon.p)} <Coin size={12} />
                      </button>
                      <button
                        onClick={capsuleKeepItem}
                        className="flex-1 text-xs font-bold py-2.5 rounded-md"
                        style={{ background: "#2c2930", color: "#e8e5df" }}
                      >
                        🎒 В ИНВЕНТАРЬ
                      </button>
                    </div>
                    {partsValue(capsuleWon) != null && (
                      <button
                        onClick={capsuleDisassemble}
                        className="text-xs font-bold py-2.5 rounded-md"
                        style={{ background: "#3a2f1a", color: "#ff8c1a", border: "1px solid #ff8c1a55" }}
                      >
                        🔩 РАЗОБРАТЬ НА {partsValue(capsuleWon)} ДЕТАЛЕЙ
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* craft modal */}
      {craftOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closeCraft}
        >
          <div
            className="modal-panel modal-panel-lg flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>⚒️</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Контракты крафта
                </span>
              </div>
              <button onClick={closeCraft} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>

            {/* tabs */}
            <div className="flex flex-wrap gap-1.5 px-4 pt-3">
              {CRAFT_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCraftTab(t.id);
                    setCraftSlots([]);
                    setCraftPhase("idle");
                    setCraftResult(null);
                  }}
                  className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-md whitespace-nowrap"
                  style={{
                    background: craftTab === t.id ? "#c6ff3d" : "#17151a",
                    color: craftTab === t.id ? "#121014" : "#8f8b93",
                    border: `1px solid ${craftTab === t.id ? "#c6ff3d" : "#2c2930"}`,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto px-4 py-3" style={{ flex: 1 }}>
              {(() => {
                const ladder = categoryLadder(craftTab);
                const selRk = craftSlots[0] ? craftSlots[0].rarity ?? craftSlots[0].w : null;
                const idx = selRk != null ? ladder.indexOf(selRk) : -1;
                const nextRk = idx > -1 && idx < ladder.length - 1 ? ladder[idx + 1] : null;
                const blockedJunk = selRk === 65;
                const blockedTop = selRk != null && idx === ladder.length - 1 && !blockedJunk;
                const canCraft = craftSlots.length === 7 && nextRk != null && !blockedJunk;

                return (
                  <>
                    {/* slots */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {Array.from({ length: 7 }).map((_, i) => {
                        const slotItem = craftSlots[i];
                        return (
                          <div
                            key={i}
                            className={`aspect-square rounded-md flex items-center justify-center ${
                              craftPhase === "burning" && slotItem ? "craft-burn" : ""
                            }`}
                            style={{
                              background: slotItem ? "#17151a" : "#121014",
                              border: `1.5px dashed ${slotItem ? rarityOf(slotItem).color : "#2c2930"}`,
                            }}
                            onClick={() => slotItem && craftPhase !== "burning" && toggleCraftSlot(slotItem)}
                          >
                            {slotItem ? <ItemIcon item={slotItem} size={22} /> : <span style={{ color: "#3a3640" }}>·</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* status line */}
                    <div className="text-center mt-3 text-xs" style={{ color: "#8f8b93" }}>
                      {craftSlots.length < 7 ? (
                        <>Выбери 7 предметов одной редкости — заполнено {craftSlots.length}/7</>
                      ) : blockedJunk ? (
                        <span style={{ color: "#ff9d9d" }}>Из редкости «Хлам» крафтить нельзя</span>
                      ) : blockedTop ? (
                        <span style={{ color: "#ff9d9d" }}>Это уже максимальная редкость в этой категории</span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Chip item={craftSlots[0]} />
                          <span>→</span>
                          <span
                            className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm"
                            style={{ color: "#121014", backgroundColor: RARITY[nextRk].color }}
                          >
                            {RARITY[nextRk].label}
                          </span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={runContract}
                      disabled={!canCraft || craftPhase === "burning"}
                      className="w-full text-sm font-bold py-3 rounded-md mt-3"
                      style={{
                        background: canCraft && craftPhase !== "burning" ? "#ff5e2e" : "#2c2930",
                        color: canCraft && craftPhase !== "burning" ? "#121014" : "#6b6870",
                      }}
                    >
                      {craftPhase === "burning" ? "СЖИГАЕМ…" : "🔥 ЗАПУСТИТЬ КОНТРАКТ (шанс 75%)"}
                    </button>

                    {/* result */}
                    {craftPhase === "result" && craftResult && (
                      <div
                        className="craft-reveal rounded-lg p-4 mt-3 text-center"
                        style={{
                          background: "#17151a",
                          border: craftResult.success
                            ? `1px solid ${rarityOf(craftResult.item).color}`
                            : "1px solid #ff2e4d",
                          boxShadow: craftResult.success ? `0 0 24px ${rarityOf(craftResult.item).color}55` : "none",
                        }}
                      >
                        {craftResult.success ? (
                          <>
                            <div className="text-xs" style={{ color: "#8f8b93" }}>
                              КОНТРАКТ УСПЕШЕН
                            </div>
                            <div
                              className="w-14 h-14 mx-auto my-2 rounded flex items-center justify-center"
                              style={{
                                background: `radial-gradient(circle, ${rarityOf(craftResult.item).color}33, transparent)`,
                              }}
                            >
                              <ItemIcon item={craftResult.item} size={30} />
                            </div>
                            <div className="font-bold" style={{ color: "#f1efe9" }}>
                              {craftResult.item.name}
                            </div>
                            <div className="mt-1 flex items-center justify-center">
                              <Chip item={craftResult.item} />
                            </div>
                          </>
                        ) : (
                          <div className="font-bold" style={{ color: "#ff9d9d" }}>
                            💀 КОНТРАКТ НЕ УДАЛСЯ — предметы потеряны
                          </div>
                        )}
                        <button
                          onClick={() => {
                            setCraftPhase("idle");
                            setCraftResult(null);
                          }}
                          className="text-xs font-bold px-4 py-2 rounded-md mt-3"
                          style={{ background: "#2c2930", color: "#e8e5df" }}
                        >
                          ПРОДОЛЖИТЬ
                        </button>
                      </div>
                    )}

                    {/* filtered inventory picker */}
                    {craftPhase !== "result" && (
                      <>
                        <div className="text-xs font-bold mt-4 mb-2" style={{ color: "#8f8b93" }}>
                          ИНВЕНТАРЬ ({CRAFT_TABS.find((t) => t.id === craftTab)?.label})
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {inventory
                            .filter((it) => categoryOf(it) === craftTab)
                            .map((it) => {
                              const inSlot = craftSlots.some((s) => s.id === it.id);
                              const rk = it.rarity ?? it.w;
                              const dimmed =
                                craftSlots.length > 0 && (craftSlots[0].rarity ?? craftSlots[0].w) !== rk && !inSlot;
                              return (
                                <button
                                  key={it.id}
                                  onClick={() => craftPhase !== "burning" && toggleCraftSlot(it)}
                                  className="aspect-square rounded-md flex flex-col items-center justify-center gap-1 p-1"
                                  style={{
                                    background: "#17151a",
                                    border: `1.5px solid ${inSlot ? "#ff5e2e" : rarityOf(it).color + "55"}`,
                                    opacity: dimmed ? 0.35 : 1,
                                  }}
                                >
                                  <ItemIcon item={it} size={20} />
                                  <span
                                    className="text-[8px] font-bold text-center leading-tight line-clamp-1"
                                    style={{ color: "#8f8b93" }}
                                  >
                                    {it.name}
                                  </span>
                                </button>
                              );
                            })}
                          {inventory.filter((it) => categoryOf(it) === craftTab).length === 0 && (
                            <div className="col-span-4 text-center text-xs py-6" style={{ color: "#5c5860" }}>
                              Пусто в этой категории. Открывай кейсы и получай вещи в инвентарь.
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* inventory modal */}
      {invOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closeInv}
        >
          <div
            className="modal-panel flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>🎒</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Инвентарь
                </span>
              </div>
              <button
                onClick={closeInv}
                className="text-sm px-2 py-1 rounded"
                style={{ color: "#8f8b93" }}
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-3" style={{ flex: 1 }}>
              {inventory.length === 0 ? (
                <div className="text-sm text-center py-10" style={{ color: "#5c5860" }}>
                  Пока пусто. Открывай кейсы — всё, что выпадет, будет тут.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {inventory.map((item) => {
                    const r = rarityOf(item);
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSellTarget(item)}
                        className="flex items-center gap-3 rounded-md p-2 text-left"
                        style={
                          item.rainbow
                            ? { background: "linear-gradient(120deg, #ff2e4d, #ff8c1a, #ffcc4d, #c6ff3d, #4ade80, #38bdf8, #7c3aed, #ff2ec4, #ff2e4d)", backgroundSize: "300% 300%", animation: "rainbowShimmer 4s ease infinite", padding: 2 }
                            : { background: "#17151a", border: `1px solid ${r.color}55` }
                        }
                      >
                        <div
                          className="flex items-center gap-3 w-full"
                          style={item.rainbow ? { background: "#17151a", borderRadius: 6, padding: "6px" } : {}}
                        >
                          <div
                            className="w-10 h-10 rounded flex items-center justify-center text-lg flex-shrink-0"
                            style={{ background: `radial-gradient(circle, ${r.color}33, transparent)` }}
                          >
                            <ItemIcon item={item} size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-sm font-bold truncate flex items-center gap-1.5"
                              style={{ color: "#f1efe9" }}
                            >
                              {item.name}
                              {state.wornSuitId === item.id && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "#ffcc4d", color: "#121014" }}>
                                  НАДЕТО
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <Chip item={item} />
                              <span className="text-xs" style={{ color: "#8f8b93" }}>
                                {fmtMoney(item.p)} <Coin size={10} />
                              </span>
                              {item.topSpeed && (
                                <span className="text-xs" style={{ color: "#8f8b93" }}>
                                  · 🏁 {item.topSpeed} км/ч
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* sell confirmation */}
      {sellTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => setSellTarget(null)}
        >
          <div
            className={sellTarget.rainbow ? "vip-card-border rounded-xl w-full max-w-sm" : "w-full max-w-sm"}
            style={sellTarget.rainbow ? { padding: 2 } : {}}
            onClick={(e) => e.stopPropagation()}
          >
          <div
            className="w-full rounded-xl p-5"
            style={{
              background: "#1c1a1f",
              border: sellTarget.rainbow ? "none" : `1px solid ${rarityOf(sellTarget).color}`,
            }}
          >
            <div className="text-xs" style={{ color: "#8f8b93" }}>
              ПРОДАТЬ ПРЕДМЕТ
            </div>
            <div className="flex items-center gap-2 mt-1">
              <ItemIcon item={sellTarget} size={28} />
              <div className="font-bold text-lg" style={{ color: "#f1efe9" }}>
                {sellTarget.name}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Chip item={sellTarget} />
              <span
                className="text-sm font-bold"
                style={{ color: "#c6ff3d", fontFamily: "ui-monospace, monospace" }}
              >
                {fmtMoney(sellTarget.p)} <Coin size={16} />
              </span>
              {sellTarget.topSpeed && (
                <span className="text-xs" style={{ color: "#8f8b93" }}>
                  🏁 {sellTarget.topSpeed} км/ч
                </span>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setSellTarget(null)}
                className="flex-1 text-sm font-bold py-2.5 rounded-md"
                style={{ background: "#2c2930", color: "#e8e5df" }}
              >
                ОТМЕНА
              </button>
              <button
                onClick={() => confirmSell(sellTarget.id)}
                className="flex-1 text-sm font-bold py-2.5 rounded-md"
                style={{ background: "#c6ff3d", color: "#121014" }}
              >
                ПРОДАТЬ ЗА {fmtMoney(sellTarget.p)} <Coin size={12} />
              </button>
            </div>
            {sellTarget.buff && (
              <>
                <div
                  className="text-[11px] mt-3 rounded-md p-2"
                  style={{ background: "#2c260f", color: "#ffcc4d", border: "1px solid #ffcc4d44" }}
                >
                  ⚡ {sellTarget.buffLabel}
                </div>
                {sellTarget.buff.type === "relic" ? (
                  (() => {
                    const cd = state.relicCooldowns?.[sellTarget.buff.relicId] || 0;
                    const onCooldown = cd > nowTick;
                    return (
                      <button
                        onClick={() => activateRelicBuff(sellTarget.id)}
                        disabled={onCooldown}
                        className="w-full text-sm font-bold py-2.5 rounded-md mt-2"
                        style={{
                          background: onCooldown ? "#2c2930" : "#ffcc4d",
                          color: onCooldown ? "#5c5860" : "#121014",
                        }}
                      >
                        {onCooldown ? `КД: ${formatVipRemaining(cd - nowTick)}` : "⚡ АКТИВИРОВАТЬ БАФ"}
                      </button>
                    );
                  })()
                ) : sellTarget.buff.type === "wearable" ? (
                  (() => {
                    const isWorn = state.wornSuitId === sellTarget.id;
                    return (
                      <button
                        onClick={() => toggleWearBuff(sellTarget.id)}
                        className="w-full text-sm font-bold py-2.5 rounded-md mt-2"
                        style={{
                          background: isWorn ? "#2c2930" : "#ffcc4d",
                          color: isWorn ? "#ff9d9d" : "#121014",
                        }}
                      >
                        {isWorn ? "👕 СНЯТЬ" : "👕 НАДЕТЬ"}
                      </button>
                    );
                  })()
                ) : (
                  <button
                    onClick={() => activateBuff(sellTarget.id)}
                    className="w-full text-sm font-bold py-2.5 rounded-md mt-2"
                    style={{ background: "#ffcc4d", color: "#121014" }}
                  >
                    ⚡ АКТИВИРОВАТЬ БАФ
                  </button>
                )}
              </>
            )}
            {partsValue(sellTarget) != null && (
              <button
                onClick={() => confirmDisassemble(sellTarget.id)}
                className="w-full text-sm font-bold py-2.5 rounded-md mt-3"
                style={{ background: "#3a2f1a", color: "#ff8c1a", border: "1px solid #ff8c1a55" }}
              >
                🔩 РАЗОБРАТЬ НА {partsValue(sellTarget)} ДЕТАЛЕЙ
              </button>
            )}
          </div>
          </div>
        </div>
      )}

      {/* profile */}
      {profileOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => setProfileOpen(false)}
        >
          <div
            className="modal-panel flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>👤</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Профиль
                </span>
              </div>
              <button
                onClick={() => setProfileOpen(false)}
                className="text-sm px-2 py-1 rounded"
                style={{ color: "#8f8b93" }}
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-5 flex flex-col items-center">
              <Avatar size={76} vip={vipActive} />
              {vipActive && (
                <div
                  className="text-xs font-extrabold tracking-wide mt-1.5"
                  style={{
                    background: "linear-gradient(90deg, #ff2e4d, #ffcc4d, #4ade80, #38bdf8, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  MANYUSHA VIP · {formatVipRemaining(vipRemainingMs)}
                </div>
              )}
              <div className="flex items-center gap-2 mt-3">
                <span className="font-bold text-lg" style={{ color: "#f1efe9" }}>
                  {firstName} {lastName}
                </span>
                <button
                  onClick={() => {
                    if (soundOnRef.current) playSoftClickSound();
                    setNicknameInput(firstName || "");
                    setSurnameInput(lastName || "");
                    setNicknameError("");
                    setNicknameEditOpen(true);
                  }}
                  className="flex items-center justify-center rounded-full w-7 h-7"
                  style={{ background: "#2c2930", border: "1px solid #3a3740" }}
                  aria-label="Изменить имя и фамилию"
                  title="Изменить имя и фамилию"
                >
                  <span style={{ fontSize: 13 }}>⚙️</span>
                </button>
              </div>
              {age != null && (
                <div
                  className="text-[10px] font-bold rounded-full px-2 py-0.5 mt-1"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#8f8b93" }}
                >
                  {age} лет
                </div>
              )}
              <div className="text-[10px] mt-1" style={{ color: "#5c5860" }}>
                {nicknameChanges > 0 ? "Смена имени/фамилии: 10 000 МК" : "Первая смена бесплатна · возраст изменить нельзя"}
              </div>

              <div
                className="w-full rounded-xl p-3 mt-4"
                style={{
                  background: paydayCapped ? "#17151a" : "linear-gradient(135deg, #1c1a1f, #17151a)",
                  border: `1px solid ${paydayCapped ? "#2c2930" : "#c6ff3d55"}`,
                  boxShadow: paydayCapped ? "none" : "0 0 16px #c6ff3d22",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontSize: 15 }}>💸</span>
                    <span className="text-xs font-bold" style={{ color: "#f1efe9" }}>
                      Payday
                    </span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: "#8f8b93" }}>
                    {paydayToday}/{PAYDAY_MAX_PER_DAY} сегодня
                  </span>
                </div>

                {paydayCapped ? (
                  <div className="text-[11px] mt-2 text-center" style={{ color: "#8f8b93" }}>
                    На сегодня всё забрано — заходи завтра
                  </div>
                ) : (
                  <>
                    <div
                      className="text-center font-bold mt-2"
                      style={{ color: "#c6ff3d", fontSize: 22, fontFamily: "ui-monospace, monospace" }}
                    >
                      {formatCountdown(paydayRemainingMs)}
                    </div>
                    <div
                      className="flex items-center justify-center gap-1 text-[10px] mt-0.5"
                      style={{ color: "#8f8b93" }}
                    >
                      до +{currentPaydayAmount} <Coin size={9} /> — начисляется, пока ты на сайте
                      {vipActive && (
                        <span style={{ color: "#ffcc4d", fontWeight: 700 }}> (VIP x2)</span>
                      )}
                      {!vipActive && paydayBoostActive && (
                        <span style={{ color: "#ffcc4d", fontWeight: 700 }}>
                          {" "}
                          (+{Math.round((paydayBoostPct || 0) * 100)}%, осталось {paydayBoostUses})
                        </span>
                      )}
                      {wearableBonusActive > 0 && (
                        <span style={{ color: "#ffcc4d", fontWeight: 700 }}> (🥋 +{wearableBonusActive})</span>
                      )}
                    </div>
                    {discountActive && (
                      <div
                        className="flex items-center justify-center gap-1 text-[10px] mt-0.5"
                        style={{ color: "#ffcc4d", fontWeight: 700 }}
                      >
                        🥤 -{Math.round(discountPct * 100)}% на кейсы · {formatVipRemaining(discountRemainingMs)}
                      </div>
                    )}
                    <div
                      className="w-full rounded-full overflow-hidden mt-2"
                      style={{ height: 5, background: "#2c2930" }}
                    >
                      <div
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(((PAYDAY_INTERVAL_MS - paydayRemainingMs) / PAYDAY_INTERVAL_MS) * 100)
                          )}%`,
                          height: "100%",
                          background: "#c6ff3d",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 w-full mt-6">
                <button
                  onClick={() => {
                    if (soundOnRef.current) playSoftClickSound();
                    cameFromProfileRef.current = true;
                    setProfileOpen(false);
                    setBuyOpen(true);
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-lg py-3"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 20 }}>🛍️</span>
                  <span className="text-[10px] font-bold" style={{ color: "#e8e5df" }}>
                    Магазин
                  </span>
                </button>
                <button
                  onClick={() => {
                    if (soundOnRef.current) playSoftClickSound();
                    cameFromProfileRef.current = true;
                    setProfileOpen(false);
                    setQuestsOpen(true);
                  }}
                  className="relative flex flex-col items-center gap-1.5 rounded-lg py-3"
                  style={{
                    background: "#17151a",
                    border: `1px solid ${keyClaimable ? "#ffcc4d" : "#2c2930"}`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>📋</span>
                  <span className="text-[10px] font-bold" style={{ color: "#e8e5df" }}>
                    Задания
                  </span>
                  {keyClaimable && (
                    <span
                      className="absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full flex items-center justify-center"
                      style={{ background: "#ffcc4d", color: "#121014", minWidth: 18, height: 18, padding: "0 4px" }}
                    >
                      !
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (soundOnRef.current) playSoftClickSound();
                    cameFromProfileRef.current = true;
                    setProfileOpen(false);
                    setCraftOpen(true);
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-lg py-3"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 20 }}>⚒️</span>
                  <span className="text-[10px] font-bold" style={{ color: "#e8e5df" }}>
                    Крафт
                  </span>
                </button>
                <button
                  onClick={() => {
                    if (soundOnRef.current) playSoftClickSound();
                    cameFromProfileRef.current = true;
                    setProfileOpen(false);
                    setInvOpen(true);
                  }}
                  className="relative flex flex-col items-center gap-1.5 rounded-lg py-3"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 20 }}>🎒</span>
                  <span className="text-[10px] font-bold" style={{ color: "#e8e5df" }}>
                    Инвентарь
                  </span>
                  {inventory.length > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full flex items-center justify-center"
                      style={{ background: "#ff5e2e", color: "#121014", minWidth: 18, height: 18, padding: "0 4px" }}
                    >
                      {inventory.length}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  if (soundOnRef.current) playSoftClickSound();
                  setProfileOpen(false);
                  setStatsOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 rounded-lg py-3"
                style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
              >
                <span style={{ fontSize: 16 }}>📊</span>
                <span className="text-xs font-bold" style={{ color: "#e8e5df" }}>
                  Статистика
                </span>
              </button>

              <button
                onClick={() => {
                  if (soundOnRef.current) playSoftClickSound();
                  setProfileOpen(false);
                  setAchievementsOpen(true);
                }}
                className="relative flex items-center justify-center gap-2 w-full mt-2 rounded-lg py-3"
                style={{
                  background: "#17151a",
                  border: `1px solid ${achievementsClaimable ? "#ffcc4d" : "#2c2930"}`,
                  boxShadow: achievementsClaimable ? "0 0 12px #ffcc4d88" : "none",
                }}
              >
                <span style={{ fontSize: 16 }}>🏆</span>
                <span className="text-xs font-bold" style={{ color: "#e8e5df" }}>
                  Достижения
                </span>
                {achievementsClaimable && (
                  <span
                    className="absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full flex items-center justify-center"
                    style={{ background: "#ffcc4d", color: "#121014", minWidth: 18, height: 18, padding: "0 4px" }}
                  >
                    !
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  if (soundOnRef.current) playSoftClickSound();
                  setProfileOpen(false);
                  setBpOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 rounded-lg py-3"
                style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
              >
                <span style={{ fontSize: 16 }}>🎫</span>
                <span className="text-xs font-bold" style={{ color: "#e8e5df" }}>
                  Боевой пропуск · Ур. {bpLevel}
                </span>
              </button>

              <button
                onClick={() => {
                  if (soundOnRef.current) playSoftClickSound();
                  setProfileOpen(false);
                  setCasinoResult(null);
                  setCasinoOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 rounded-lg py-3"
                style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
              >
                <span style={{ fontSize: 16 }}>🎰</span>
                <span className="text-xs font-bold" style={{ color: "#e8e5df" }}>
                  Казино
                </span>
              </button>

              <button
                onClick={() => {
                  if (soundOnRef.current) playSoftClickSound();
                  setProfileOpen(false);
                  setDailyWheelResult(null);
                  setDailyWheelOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 rounded-lg py-3"
                style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
              >
                <span style={{ fontSize: 16 }}>🎡</span>
                <span className="text-xs font-bold" style={{ color: "#e8e5df" }}>
                  Ежедневное колесо
                </span>
                {(state.dailyWheelClaimedAt || 0) + DAILY_WHEEL_COOLDOWN_MS <= nowTick && (
                  <span
                    className="text-[9px] font-bold rounded-full flex items-center justify-center"
                    style={{ background: "#ffcc4d", color: "#121014", minWidth: 16, height: 16, padding: "0 4px" }}
                  >
                    !
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  if (soundOnRef.current) playSoftClickSound();
                  setProfileOpen(false);
                  setForbesDetail(null);
                  setForbesOpen(true);
                  loadForbesList();
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 rounded-lg py-3"
                style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
              >
                <span style={{ fontSize: 16 }}>🏆</span>
                <span className="text-xs font-bold" style={{ color: "#e8e5df" }}>
                  Список Forbes
                </span>
              </button>

              <button
                onClick={() => {
                  if (soundOnRef.current) playSoftClickSound();
                  setProfileOpen(false);
                  setPromoMessage(null);
                  setPromoOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 rounded-lg py-3"
                style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
              >
                <span style={{ fontSize: 16 }}>🎟️</span>
                <span className="text-xs font-bold" style={{ color: "#e8e5df" }}>
                  Промокоды
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* stats */}
      {statsOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closeStats}
        >
          <div
            className="modal-panel flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08", maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>📊</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Статистика
                </span>
              </div>
              <button onClick={closeStats} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4" style={{ flex: 1 }}>
              {/* lifetime stats */}
              <div className="grid grid-cols-3 gap-2">
                <div
                  className="rounded-lg p-3 flex flex-col items-center text-center"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 18 }}>⏱️</span>
                  <div className="text-sm font-bold mt-1" style={{ color: "#f1efe9" }}>
                    {formatDuration(totalTimeMs)}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#8f8b93" }}>
                    на сайте
                  </div>
                </div>
                <div
                  className="rounded-lg p-3 flex flex-col items-center text-center"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 18 }}>📦</span>
                  <div className="text-sm font-bold mt-1" style={{ color: "#f1efe9" }}>
                    {casesOpened || 0}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#8f8b93" }}>
                    кейсов открыто
                  </div>
                </div>
                <div
                  className="rounded-lg p-3 flex flex-col items-center text-center"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 18 }}>⚒️</span>
                  <div className="text-sm font-bold mt-1" style={{ color: "#f1efe9" }}>
                    {craftsDone || 0}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#8f8b93" }}>
                    крафтов сделано
                  </div>
                </div>
              </div>

              {/* period toggle */}
              <div className="text-xs font-bold mt-5 mb-2" style={{ color: "#8f8b93" }}>
                ЭКОНОМИКА
              </div>
              <div className="flex gap-1.5">
                {[
                  { id: "day", label: "День" },
                  { id: "week", label: "Неделя" },
                  { id: "month", label: "Месяц" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setStatsPeriod(p.id)}
                    className="flex-1 text-xs font-bold px-3 py-1.5 rounded-md"
                    style={{
                      background: statsPeriod === p.id ? "#c6ff3d" : "#17151a",
                      color: statsPeriod === p.id ? "#121014" : "#8f8b93",
                      border: `1px solid ${statsPeriod === p.id ? "#c6ff3d" : "#2c2930"}`,
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {(() => {
                const days = { day: 1, week: 7, month: 30 }[statsPeriod];
                const { earn, spend } = sumEcon(econLog, days);
                return (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div
                      className="rounded-lg p-3"
                      style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                    >
                      <div className="text-[10px]" style={{ color: "#8f8b93" }}>
                        Заработано
                      </div>
                      <div className="text-lg font-bold mt-1" style={{ color: "#c6ff3d" }}>
                        +{fmtMoney(earn)} <Coin size={13} />
                      </div>
                    </div>
                    <div
                      className="rounded-lg p-3"
                      style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                    >
                      <div className="text-[10px]" style={{ color: "#8f8b93" }}>
                        Потрачено
                      </div>
                      <div className="text-lg font-bold mt-1" style={{ color: "#ff8c6b" }}>
                        -{fmtMoney(spend)} <Coin size={13} />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* donate */}
      {donateOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closeDonate}
        >
          <div
            className="modal-panel flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08", maxHeight: "88vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <Coin size={18} />
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Пополнение баланса
                </span>
              </div>
              <button onClick={closeDonate} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4" style={{ flex: 1 }}>
              <div className="flex gap-1.5 mb-2">
                {[
                  { id: "uah", label: "₴ Гривна" },
                  { id: "rub", label: "₽ Рубль" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setDonateCurrency(c.id)}
                    className="flex-1 text-xs font-bold px-3 py-1.5 rounded-md"
                    style={{
                      background: donateCurrency === c.id ? "#c6ff3d" : "#17151a",
                      color: donateCurrency === c.id ? "#121014" : "#8f8b93",
                      border: `1px solid ${donateCurrency === c.id ? "#c6ff3d" : "#2c2930"}`,
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-center mb-3" style={{ color: "#5c5860" }}>
                оплата пока в разработке — это витрина паков
              </div>

              <div className="grid grid-cols-2 gap-3">
                {DONATE_PACKS.map((pack, idx) => {
                  const priceLabel =
                    donateCurrency === "uah"
                      ? `${fmtMoney(pack.priceUah)} ₴`
                      : `${fmtMoney(Math.round(pack.priceUah * RUB_MULTIPLIER))} ₽`;
                  return (
                    <div
                      key={pack.id}
                      className="rounded-xl overflow-hidden flex flex-col"
                      style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                    >
                      <div
                        className="relative flex items-center justify-center overflow-hidden"
                        style={{
                          height: 92,
                          background: "radial-gradient(circle, #33260f 0%, #17151a 75%)",
                        }}
                      >
                        <div className="absolute inset-0 pointer-events-none">
                          {moneyDots(3 + idx * 4, idx).map((d, i) => (
                            <div
                              key={i}
                              style={{
                                position: "absolute",
                                top: `${d.top}%`,
                                left: `${d.left}%`,
                                transform: `rotate(${d.rot}deg)`,
                                opacity: 0.4,
                              }}
                            >
                              <Coin size={10 + (d.size % 8)} />
                            </div>
                          ))}
                        </div>
                        <span className="relative" style={{ fontSize: 42 }}>
                          {pack.icon}
                        </span>
                      </div>
                      <div className="p-2.5 flex flex-col items-center text-center flex-1">
                        <div className="text-xs font-bold" style={{ color: "#f1efe9" }}>
                          {pack.name}
                        </div>
                        <div
                          className="flex items-center gap-1 font-bold mt-1"
                          style={{ color: "#c6ff3d", fontSize: 15 }}
                        >
                          +{fmtMoney(pack.coins)} <Coin size={13} />
                        </div>
                        <button
                          onClick={showDonateToast}
                          className="w-full mt-2 text-[11px] font-bold py-2 rounded-md"
                          style={{ background: "#ff5e2e", color: "#121014" }}
                        >
                          Купить за {priceLabel}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="vip-card-border rounded-xl mt-4"
                style={{ padding: 2 }}
              >
                <div
                  className="rounded-[10px] p-4"
                  style={{ background: "linear-gradient(135deg, #1c1a1f, #17151a)" }}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 22 }}>🌈</span>
                    <span
                      className="font-extrabold text-base tracking-wide"
                      style={{
                        background:
                          "linear-gradient(90deg, #ff2e4d, #ffcc4d, #4ade80, #38bdf8, #7c3aed)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      MANYUSHA VIP
                    </span>
                  </div>
                  <div className="text-[11px] mt-1.5" style={{ color: "#8f8b93" }}>
                    x2 к Payday — {PAYDAY_AMOUNT * VIP_PAYDAY_MULTIPLIER} <Coin size={9} /> в час вместо{" "}
                    {PAYDAY_AMOUNT} <Coin size={9} />, радужная рамка на аватарке и подпись VIP у ника
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {VIP_PACKS.map((pack) => {
                      const priceLabel =
                        donateCurrency === "uah"
                          ? `${fmtMoney(pack.priceUah)} ₴`
                          : `${fmtMoney(Math.round(pack.priceUah * RUB_MULTIPLIER))} ₽`;
                      return (
                        <button
                          key={pack.id}
                          onClick={showDonateToast}
                          className="flex flex-col items-center rounded-lg py-2.5"
                          style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                        >
                          <span className="text-xs font-bold" style={{ color: "#f1efe9" }}>
                            {pack.label}
                          </span>
                          <span className="text-[11px] font-bold mt-0.5" style={{ color: "#ffcc4d" }}>
                            {priceLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {donateToast && (
                <div
                  className="text-xs text-center mt-3 rounded-md py-2 px-3"
                  style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#ffcc4d" }}
                >
                  Оплата подключится позже 🙂
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* battle pass */}
      {bpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          style={{ background: "#000000aa", backdropFilter: "blur(3px)" }}
          onClick={() => setBpOpen(false)}
        >
          <div
            className="w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl p-5"
            style={{
              background: "linear-gradient(180deg, #17151a, #121014 40%)",
              maxHeight: "88vh",
              overflowY: "auto",
              border: "1px solid #2c2930",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: 38, height: 38, background: "#1c1a1f", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 20 }}>🎫</span>
                </div>
                <div>
                  <div className="font-extrabold text-base leading-tight" style={{ color: "#f1efe9" }}>
                    Боевой пропуск
                  </div>
                  <div className="text-[10px]" style={{ color: "#8f8b93" }}>
                    Сезон 2026
                  </div>
                </div>
              </div>
              <button
                onClick={() => setBpOpen(false)}
                className="text-lg rounded-full flex items-center justify-center"
                style={{ width: 30, height: 30, color: "#8f8b93", background: "#1c1a1f" }}
              >
                ✕
              </button>
            </div>

            <div
              className="rounded-xl p-4 mb-5"
              style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-lg flex items-center justify-center font-extrabold text-sm"
                    style={{ width: 34, height: 34, background: "#c6ff3d", color: "#121014" }}
                  >
                    {bpLevel}
                  </div>
                  <div className="text-xs" style={{ color: "#8f8b93" }}>
                    {bpLevel >= BP_MAX_LEVEL ? "Максимальный уровень" : `из ${BP_MAX_LEVEL} уровней`}
                  </div>
                </div>
                <span
                  className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md"
                  style={{ background: "#241b26", color: "#ff6fd8" }}
                >
                  💧 +{bpExpBonusLabel} EXP / payday
                </span>
              </div>
              {bpLevel < BP_MAX_LEVEL && (
                <>
                  <div
                    className="w-full rounded-full overflow-hidden mt-3"
                    style={{ height: 8, background: "#2c2930" }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, (bpProgressExp / bpExpNeeded) * 100)}%`,
                        height: "100%",
                        background: "linear-gradient(90deg,#ff2ec4,#7c3aed)",
                      }}
                    />
                  </div>
                  <div className="text-[10px] mt-1.5 text-center" style={{ color: "#8f8b93" }}>
                    {bpProgressExp} / {bpExpNeeded} EXP до уровня {bpLevel + 1}
                  </div>
                </>
              )}
            </div>

            <div ref={bpWheelAreaRef}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[11px] font-extrabold px-2 py-1 rounded-md"
                  style={{ background: "#1f2e17", color: "#c6ff3d" }}
                >
                  🆓 БЕСПЛАТНЫЙ БП
                </span>
              </div>
              <div
                ref={bpFreeTrackRef}
                onScroll={(e) => {
                  if (bpPaidTrackRef.current) bpPaidTrackRef.current.scrollLeft = e.currentTarget.scrollLeft;
                }}
                className="overflow-x-auto pb-3 mb-5"
                style={{ maxWidth: "100%" }}
              >
                <div className="relative flex gap-3" style={{ width: "max-content" }}>
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: 40, height: 2, background: "#242229", zIndex: 0 }}
                  />
                  {BP_FREE_REWARDS.map((reward, i) => {
                    const level = i + 1;
                    return (
                      <BpNode
                        key={level}
                        level={level}
                        reward={reward}
                        unlocked={bpLevel >= level}
                        claimed={!!bpFreeClaimed?.[level]}
                        milestone={BP_MILESTONE_LEVELS.has(level)}
                        onClaim={() => claimBpReward("free", level)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="text-[11px] font-extrabold px-2 py-1 rounded-md"
                  style={{ background: "#2c1a28", color: "#ff2ec4" }}
                >
                  🌈 VIP БП
                </span>
                {!vipActive && (
                  <span className="text-[10px]" style={{ color: "#8f8b93" }}>
                    🔒 нужен VIP статус, чтобы забирать эти награды
                  </span>
                )}
              </div>
              <div
                ref={bpPaidTrackRef}
                onScroll={(e) => {
                  if (bpFreeTrackRef.current) bpFreeTrackRef.current.scrollLeft = e.currentTarget.scrollLeft;
                }}
                className="overflow-x-auto pb-3"
                style={{ maxWidth: "100%" }}
              >
                <div className="relative flex gap-3" style={{ width: "max-content" }}>
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: 40, height: 2, background: "#242229", zIndex: 0 }}
                  />
                  {BP_PAID_REWARDS.map((reward, i) => {
                    const level = i + 1;
                    return (
                      <BpNode
                        key={level}
                        level={level}
                        reward={reward}
                        unlocked={bpLevel >= level}
                        claimed={!!bpPaidClaimed?.[level]}
                        milestone={BP_MILESTONE_LEVELS.has(level)}
                        dimmed={!vipActive}
                        onClaim={() => claimBpReward("paid", level)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {!vipActive && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    setBpOpen(false);
                    setDonateOpen(true);
                  }}
                  className="text-xs font-bold py-2 px-4 rounded-full"
                  style={{ background: "#c6ff3d", color: "#121014" }}
                >
                  Купите VIP статус чтоб открыть платный БП
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* casino */}
      {casinoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => !spinningCasino && setCasinoOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl p-5"
            style={{ background: "#121014", maxHeight: "94vh", overflowY: "auto", border: "1px solid #2c2930" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: 38, height: 38, background: "#1c1a1f", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 20 }}>🎰</span>
                </div>
                <div className="font-extrabold text-base" style={{ color: "#f1efe9" }}>
                  Казино Манюша
                </div>
              </div>
              <button
                onClick={() => !spinningCasino && setCasinoOpen(false)}
                className="text-lg rounded-full flex items-center justify-center"
                style={{ width: 30, height: 30, color: "#8f8b93", background: "#1c1a1f" }}
              >
                ✕
              </button>
            </div>

            {/* casino table felt */}
            <div
              className="rounded-2xl p-5 flex flex-col items-center"
              style={{
                background: "radial-gradient(circle at 50% 25%, #1c4a34, #0c2418 75%)",
                border: "6px solid #2c2016",
                boxShadow: "inset 0 0 30px #00000088, 0 0 0 2px #d4af6a55",
              }}
            >
              {/* wheel */}
              <div className="relative" style={{ width: 400, height: "auto", maxWidth: "100%", aspectRatio: "1/1" }}>
                <div
                  className="absolute"
                  style={{
                    top: -22,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                    fontSize: 34,
                    color: "#ffcc4d",
                    filter: "drop-shadow(0 2px 2px #000000aa)",
                  }}
                >
                  ▼
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: CASINO_WHEEL_GRADIENT,
                    border: "7px solid #2c2930",
                    boxShadow: "0 0 0 4px #d4af6a88, inset 0 0 26px #00000088, 0 8px 22px #00000099",
                    transform: `rotate(${wheelRotation}deg)`,
                    transition: `transform ${CASINO_SPIN_MS}ms cubic-bezier(0.12,0.67,0.1,1)`,
                  }}
                />
                <div
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 64,
                    height: 64,
                    background: "#17151a",
                    border: "4px solid #d4af6a",
                    zIndex: 2,
                    fontSize: 28,
                  }}
                >
                  🎰
                </div>
              </div>

              {casinoResult && !spinningCasino && (
                <div
                  className="rounded-lg px-3 py-2 text-center text-xs font-bold mt-4 w-full"
                  style={{
                    background: casinoResult.win ? "#173a22" : "#3a1717",
                    color: casinoResult.win ? "#4ade80" : "#ff6b6b",
                    border: `1px solid ${casinoResult.win ? "#4ade8055" : "#ff6b6b55"}`,
                  }}
                >
                  Выпало: {CASINO_COLOR_LABEL[casinoResult.color]} —{" "}
                  {casinoResult.win
                    ? `выигрыш +${fmtMoney(casinoResult.bet * 2)} МК`
                    : `проигрыш -${fmtMoney(casinoResult.bet)} МК`}
                </div>
              )}
              {spinningCasino && (
                <div className="text-xs font-bold mt-4" style={{ color: "#ffcc4d" }}>
                  Рулетка крутится...
                </div>
              )}

              {/* chips */}
              <div className="flex justify-center gap-5 mt-5">
                {CASINO_COLORS.map((color) => {
                  const selected = casinoChip === color;
                  const coinCount = selected ? Math.min(8, Math.max(1, Math.round(casinoBet / 2500))) : 0;
                  return (
                    <button
                      key={color}
                      onClick={() => !spinningCasino && setCasinoChip(color)}
                      disabled={spinningCasino}
                      className="relative flex flex-col items-center"
                    >
                      {selected && (
                        <div className="absolute flex" style={{ top: -14, zIndex: 2 }}>
                          {Array.from({ length: coinCount }).map((_, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: 14,
                                marginLeft: i === 0 ? 0 : -7,
                                filter: "drop-shadow(0 1px 1px #00000099)",
                              }}
                            >
                              🪙
                            </span>
                          ))}
                        </div>
                      )}
                      <div
                        className="rounded-full"
                        style={{
                          width: 56,
                          height: 56,
                          background: `radial-gradient(circle at 35% 30%, ${CASINO_COLOR_HEX[color]}, ${CASINO_COLOR_HEX[color]}cc 60%, #00000055)`,
                          border: selected ? "3px solid #f1efe9" : "3px dashed #ffffff66",
                          boxShadow: selected ? `0 0 14px ${CASINO_COLOR_HEX[color]}aa` : "none",
                        }}
                      />
                      <span className="text-[10px] font-bold mt-1.5" style={{ color: "#e8e5df" }}>
                        {CASINO_COLOR_LABEL[color]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* bet controls */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setCasinoBet((b) => Math.max(CASINO_MIN_BET, b - 200))}
                disabled={spinningCasino}
                className="rounded-md font-bold"
                style={{ width: 32, height: 32, background: "#1c1a1f", color: "#f1efe9", border: "1px solid #2c2930" }}
              >
                −
              </button>
              <div
                className="rounded-md px-4 py-1.5 font-bold text-sm flex items-center gap-1"
                style={{ background: "#1c1a1f", color: "#c6ff3d", border: "1px solid #2c2930", minWidth: 110, justifyContent: "center" }}
              >
                {fmtMoney(casinoBet)} <Coin size={11} />
              </div>
              <button
                onClick={() => setCasinoBet((b) => Math.min(CASINO_MAX_BET, b + 200))}
                disabled={spinningCasino}
                className="rounded-md font-bold"
                style={{ width: 32, height: 32, background: "#1c1a1f", color: "#f1efe9", border: "1px solid #2c2930" }}
              >
                +
              </button>
            </div>
            <div className="flex gap-1.5 justify-center flex-wrap mt-2">
              {[800, 2000, 5000, 10000, 20000].map((v) => (
                <button
                  key={v}
                  onClick={() => setCasinoBet(v)}
                  disabled={spinningCasino}
                  className="text-[10px] font-bold px-2 py-1 rounded-md"
                  style={{
                    background: casinoBet === v ? "#c6ff3d" : "#1c1a1f",
                    color: casinoBet === v ? "#121014" : "#8f8b93",
                    border: "1px solid #2c2930",
                  }}
                >
                  {fmtMoney(v)}
                </button>
              ))}
            </div>

            <button
              onClick={spinCasino}
              disabled={spinningCasino || !casinoChip || balance < casinoBet}
              className="w-full text-sm font-bold py-3 rounded-lg mt-4"
              style={{
                background:
                  spinningCasino || !casinoChip || balance < casinoBet ? "#2c2930" : "#c6ff3d",
                color: spinningCasino || !casinoChip || balance < casinoBet ? "#5c5860" : "#121014",
              }}
            >
              {spinningCasino
                ? "Крутится..."
                : !casinoChip
                ? "Выбери фишку"
                : balance < casinoBet
                ? "Не хватает МК"
                : `Крутить рулетку — ${fmtMoney(casinoBet)} МК`}
            </button>
            <div className="text-[10px] text-center mt-2" style={{ color: "#5c5860" }}>
              Угадал цвет — получаешь x2 от ставки. Не угадал — теряешь ставку.
            </div>
          </div>
        </div>
      )}

      {/* daily wheel */}
      {dailyWheelOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => !spinningDailyWheel && setDailyWheelOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl p-5"
            style={{ background: "#121014", maxHeight: "94vh", overflowY: "auto", border: "1px solid #2c2930" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: 38, height: 38, background: "#1c1a1f", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 20 }}>🎡</span>
                </div>
                <div className="font-extrabold text-base" style={{ color: "#f1efe9" }}>
                  Ежедневное колесо
                </div>
              </div>
              <button
                onClick={() => !spinningDailyWheel && setDailyWheelOpen(false)}
                className="text-lg rounded-full flex items-center justify-center"
                style={{ width: 30, height: 30, color: "#8f8b93", background: "#1c1a1f" }}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative" style={{ width: 500, height: "auto", maxWidth: "100%", aspectRatio: "1/1" }}>
                <div
                  className="absolute"
                  style={{
                    top: -22,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                    fontSize: 34,
                    color: "#ffcc4d",
                    filter: "drop-shadow(0 2px 2px #000000aa)",
                  }}
                >
                  ▼
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: DAILY_WHEEL_GRADIENT,
                    border: "7px solid #2c2930",
                    boxShadow: "0 0 0 4px #d4af6a88, inset 0 0 26px #00000088, 0 8px 22px #00000099",
                    transform: `rotate(${dailyWheelRotation}deg)`,
                    transition: `transform ${DAILY_WHEEL_SPIN_MS}ms cubic-bezier(0.12,0.67,0.1,1)`,
                    position: "relative",
                  }}
                >
                  {DAILY_WHEEL_REWARDS.map((r, i) => {
                    const angle = i * DAILY_WHEEL_SEGMENT_ANGLE + DAILY_WHEEL_SEGMENT_ANGLE / 2;
                    return (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        <div
                          className="absolute"
                          style={{
                            top: 40,
                            left: "50%",
                            transform: `translateX(-50%) rotate(${-angle}deg)`,
                            fontSize: 44,
                            filter: "drop-shadow(0 1px 2px #00000099)",
                          }}
                        >
                          {r.icon}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 74,
                    height: 74,
                    background: "#17151a",
                    border: "4px solid #d4af6a",
                    zIndex: 2,
                    fontSize: 32,
                  }}
                >
                  🎡
                </div>
              </div>

              {dailyWheelResult && !spinningDailyWheel && (
                <div
                  className="rounded-lg px-3 py-2 text-center text-xs font-bold mt-4 w-full flex items-center justify-center gap-1.5"
                  style={{ background: "#173a22", color: "#4ade80", border: "1px solid #4ade8055" }}
                >
                  <span>{dailyWheelResult.icon}</span> Выпало: {dailyWheelResult.label}
                </div>
              )}
              {spinningDailyWheel && (
                <div className="text-xs font-bold mt-4" style={{ color: "#ffcc4d" }}>
                  Колесо крутится...
                </div>
              )}

              <div className="w-full mt-4">
                <div className="text-[10px] font-bold mb-1.5" style={{ color: "#5c5860" }}>
                  ЧТО МОЖЕТ ВЫПАСТЬ:
                </div>
                <div className="flex flex-col gap-1">
                  {DAILY_WHEEL_REWARDS.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-md px-2.5 py-1.5"
                      style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930" }}
                    >
                      <span style={{ fontSize: 14 }}>{r.icon}</span>
                      <span className="text-[11px]" style={{ color: "#c7c4cc" }}>
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {dailyWheelResult && !spinningDailyWheel ? (
                <button
                  onClick={claimDailyWheelReward}
                  className="w-full text-sm font-bold py-3 rounded-lg mt-4"
                  style={{ background: "#c6ff3d", color: "#121014" }}
                >
                  Забрать награду
                </button>
              ) : (state.dailyWheelClaimedAt || 0) + DAILY_WHEEL_COOLDOWN_MS > nowTick ? (
                <div
                  className="w-full text-xs font-bold py-3 rounded-lg mt-4 text-center"
                  style={{ background: "#2c2930", color: "#8f8b93" }}
                >
                  Приходи через{" "}
                  <span style={{ color: "#ffcc4d", fontFamily: "ui-monospace, monospace" }}>
                    {formatVipRemaining(Math.max(0, (state.dailyWheelClaimedAt || 0) + DAILY_WHEEL_COOLDOWN_MS - nowTick))}
                  </span>
                </div>
              ) : (
                <button
                  onClick={spinDailyWheel}
                  disabled={spinningDailyWheel}
                  className="w-full text-sm font-bold py-3 rounded-lg mt-4"
                  style={{
                    background: spinningDailyWheel ? "#2c2930" : "#c6ff3d",
                    color: spinningDailyWheel ? "#5c5860" : "#121014",
                  }}
                >
                  {spinningDailyWheel ? "Крутится..." : "Крутить колесо"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* forbes list */}
      {forbesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => setForbesOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-5"
            style={{
              background: "linear-gradient(165deg, #1e1c22, #17151a)",
              border: "1px solid #2c2930",
              boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08",
              maxHeight: "88vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: 38, height: 38, background: "#1c1a1f", border: "1px solid #2c2930" }}
                >
                  <span style={{ fontSize: 20 }}>🏆</span>
                </div>
                <div>
                  <div className="font-extrabold text-base leading-tight" style={{ color: "#f1efe9" }}>
                    Список Forbes
                  </div>
                  <div className="text-[10px]" style={{ color: "#8f8b93" }}>
                    Топ 15 богатейших игроков
                  </div>
                </div>
              </div>
              <button
                onClick={() => setForbesOpen(false)}
                className="text-lg rounded-full flex items-center justify-center"
                style={{ width: 30, height: 30, color: "#8f8b93", background: "#1c1a1f" }}
              >
                ✕
              </button>
            </div>

            {forbesLoading && (
              <div className="text-center text-xs py-8" style={{ color: "#8f8b93" }}>
                Считаем миллионы... 💸
              </div>
            )}
            {!forbesLoading && forbesError && (
              <div className="text-center text-xs py-8" style={{ color: "#ff9d9d" }}>
                Не удалось загрузить список. Он доступен только в опубликованном артефакте.
              </div>
            )}
            {!forbesLoading && !forbesError && forbesEntries.length === 0 && (
              <div className="text-center text-xs py-8" style={{ color: "#8f8b93" }}>
                Пока пусто — будь первым в топе!
              </div>
            )}
            {!forbesLoading && !forbesError && forbesEntries.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {forbesEntries.map((p, i) => {
                  const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
                  const row = (
                    <button
                      onClick={() => setForbesDetail(p)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left w-full"
                      style={{
                        background: "linear-gradient(160deg, #1c1a1f, #17151a)",
                        border: p.vip ? "none" : `1px solid ${i < 3 ? "#ffd70044" : "#2c2930"}`,
                      }}
                    >
                      <div
                        className="flex-shrink-0 flex items-center justify-center font-extrabold text-xs rounded-full"
                        style={{
                          width: 24,
                          height: 24,
                          background: i < 3 ? "#ffd70022" : "#2c2930",
                          color: i < 3 ? "#ffd700" : "#8f8b93",
                        }}
                      >
                        {medal || i + 1}
                      </div>
                      <div className="flex-1 min-w-0 flex items-center gap-1.5">
                        <span className="text-sm font-bold truncate" style={{ color: "#f1efe9" }}>
                          {p.nickname}
                        </span>
                        {p.vip && (
                          <span
                            className="text-[8px] font-extrabold flex-shrink-0"
                            style={{
                              background: "linear-gradient(90deg, #ff2e4d, #ffcc4d, #4ade80, #38bdf8, #7c3aed)",
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            VIP
                          </span>
                        )}
                      </div>
                      <div
                        className="text-xs font-bold flex items-center gap-1 flex-shrink-0"
                        style={{ color: "#c6ff3d", fontFamily: "ui-monospace, monospace" }}
                      >
                        {fmtMoney(p.balance)} <Coin size={10} />
                      </div>
                    </button>
                  );
                  return p.vip ? (
                    <div key={p.id} className="vip-card-border rounded-lg" style={{ padding: 1.5 }}>
                      {row}
                    </div>
                  ) : (
                    <div key={p.id}>{row}</div>
                  );
                })}
              </div>
            )}
          </div>

          {forbesDetail && (
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center p-6"
              style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
              onClick={(e) => {
                e.stopPropagation();
                setForbesDetail(null);
              }}
            >
              <div
                className="w-full max-w-sm rounded-2xl p-5"
                style={{
                  background: "linear-gradient(165deg, #1e1c22, #17151a)",
                  border: "1px solid #ffd70044",
                  boxShadow: "0 0 24px #ffd70022, 0 12px 36px #00000066",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-extrabold" style={{ color: "#f1efe9" }}>
                    {forbesDetail.nickname}
                  </div>
                  <button
                    onClick={() => setForbesDetail(null)}
                    className="text-lg rounded-full flex items-center justify-center"
                    style={{ width: 28, height: 28, color: "#8f8b93", background: "#1c1a1f" }}
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="rounded-lg p-3 flex flex-col items-center gap-1"
                    style={{ background: "linear-gradient(160deg, #1e2416, #17151a)", border: "1px solid #3a4a2244" }}
                  >
                    <span style={{ fontSize: 18 }}>🪙</span>
                    <span className="text-xs font-bold" style={{ color: "#c6ff3d" }}>
                      {fmtMoney(forbesDetail.balance)} МК
                    </span>
                    <span className="text-[9px]" style={{ color: "#8f8b93" }}>
                      Баланс
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-3 flex flex-col items-center gap-1"
                    style={{ background: "linear-gradient(160deg, #2a1e14, #17151a)", border: "1px solid #4a331e44" }}
                  >
                    <span style={{ fontSize: 18 }}>🔩</span>
                    <span className="text-xs font-bold" style={{ color: "#ff8c1a" }}>
                      {fmtMoney(forbesDetail.parts)}
                    </span>
                    <span className="text-[9px]" style={{ color: "#8f8b93" }}>
                      Деталей
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-3 flex flex-col items-center gap-1"
                    style={{ background: "linear-gradient(160deg, #16232a, #17151a)", border: "1px solid #38bdf844" }}
                  >
                    <span style={{ fontSize: 18 }}>⏱️</span>
                    <span className="text-xs font-bold" style={{ color: "#38bdf8" }}>
                      {formatDuration(forbesDetail.totalTimeMs)}
                    </span>
                    <span className="text-[9px]" style={{ color: "#8f8b93" }}>
                      На сайте
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-3 flex flex-col items-center gap-1"
                    style={{ background: "linear-gradient(160deg, #2c1a28, #17151a)", border: "1px solid #ff2ec444" }}
                  >
                    <span style={{ fontSize: 18 }}>🎫</span>
                    <span className="text-xs font-bold" style={{ color: "#ff2ec4" }}>
                      Ур. {forbesDetail.bpLevel}
                    </span>
                    <span className="text-[9px]" style={{ color: "#8f8b93" }}>
                      Боевой пропуск
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* promo codes */}
      {promoOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closePromo}
        >
          <div
            className="modal-panel flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>🎟️</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Промокоды
                </span>
              </div>
              <button onClick={closePromo} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>

            <div className="px-4 py-5">
              <div className="text-xs" style={{ color: "#8f8b93" }}>
                Введи промокод, чтобы получить бонус на баланс
              </div>
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                maxLength={24}
                placeholder="Промокод"
                className="w-full mt-3 px-3 py-2 rounded-md text-sm font-bold outline-none"
                style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#f1efe9" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitPromo();
                }}
              />
              {promoMessage && (
                <div
                  className="text-xs mt-2"
                  style={{ color: promoMessage.type === "success" ? "#c6ff3d" : "#ff9d9d" }}
                >
                  {promoMessage.text}
                </div>
              )}
              <button
                onClick={submitPromo}
                disabled={promoChecking}
                className="w-full text-sm font-bold py-2.5 rounded-md mt-4"
                style={{
                  background: promoChecking ? "#2c2930" : "#c6ff3d",
                  color: promoChecking ? "#6b6870" : "#121014",
                  cursor: promoChecking ? "not-allowed" : "pointer",
                }}
              >
                {promoChecking ? "ПРОВЕРКА…" : "АКТИВИРОВАТЬ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* achievements */}
      {achievementsOpen && (
        <div
          className="fixed inset-0 z-50 modal-overlay"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={closeAchievements}
        >
          <div
            className="modal-panel modal-panel-lg flex flex-col"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08", maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid #2c2930" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 16 }}>🏆</span>
                <span className="font-bold" style={{ color: "#f1efe9" }}>
                  Достижения
                </span>
              </div>
              <button onClick={closeAchievements} className="text-sm px-2 py-1 rounded" style={{ color: "#8f8b93" }}>
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4" style={{ flex: 1 }}>
              <div className="grid grid-cols-4 gap-2">
                {ACHIEVEMENTS.map((ach) => {
                  const cur = ach.progress(state);
                  const done = cur >= ach.target;
                  const claimed = Boolean(achievementsClaimed?.[ach.id]);
                  const pct = Math.min(100, Math.round((cur / ach.target) * 100));
                  const progressLabel = ach.isTime
                    ? `${formatDuration(cur)} / ${formatDuration(ach.target)}`
                    : `${Math.min(cur, ach.target)} / ${ach.target}`;
                  const ready = done && !claimed;
                  return (
                    <div
                      key={ach.id}
                      onClick={() => showAchievementProgress(ach.id)}
                      className="rounded-xl p-2 flex flex-col items-center text-center cursor-pointer"
                      style={{
                        background: "#17151a",
                        border: `1px solid ${ready ? "#ffcc4d77" : "#2c2930"}`,
                        opacity: claimed ? 0.55 : 1,
                      }}
                    >
                      <div
                        className="relative w-full aspect-square rounded-lg flex items-center justify-center"
                        style={{
                          background: ready
                            ? "radial-gradient(circle, #ffcc4d33, #17151a 72%)"
                            : "radial-gradient(circle, #ffffff0d, #17151a 72%)",
                          border: `1px solid ${ready ? "#ffcc4d99" : "#2c2930"}`,
                          boxShadow: ready ? "0 0 16px #ffcc4d66, inset 0 0 14px #ffcc4d33" : "none",
                          fontSize: 26,
                        }}
                      >
                        {ach.icon}
                      </div>
                      <div
                        className="text-[10px] font-bold leading-tight mt-1.5"
                        style={{ color: "#f1efe9", minHeight: 24 }}
                      >
                        {ach.title}
                      </div>

                      {claimed ? (
                        <span className="text-[9px] mt-1" style={{ color: "#5c5860" }}>
                          Получено
                        </span>
                      ) : ready ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            claimAchievement(ach.id);
                          }}
                          className="text-[10px] font-bold w-full mt-1.5 py-1.5 rounded-md"
                          style={{ background: "#c6ff3d", color: "#121014" }}
                        >
                          Забрать
                        </button>
                      ) : (
                        <span className="text-[9px] mt-1" style={{ color: "#5c5860" }}>
                          тап — прогресс
                        </span>
                      )}

                      {achievementToast === ach.id && !claimed && (
                        <div className="w-full mt-1.5">
                          <div
                            className="w-full rounded-full overflow-hidden"
                            style={{ height: 5, background: "#2c2930" }}
                          >
                            <div
                              style={{
                                width: `${pct}%`,
                                height: "100%",
                                background: ready ? "#ffcc4d" : "#c6ff3d",
                              }}
                            />
                          </div>
                          <div className="text-[8px] mt-0.5 leading-tight" style={{ color: "#8f8b93" }}>
                            {progressLabel}
                          </div>
                          <div className="text-[8px] leading-tight" style={{ color: "#8f8b93" }}>
                            {ach.rewardLabel}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* nickname edit */}
      {nicknameEditOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          style={{ background: "#000000cc", backdropFilter: "blur(3px)" }}
          onClick={() => setNicknameEditOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl p-5"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs" style={{ color: "#8f8b93" }}>
              СМЕНА ИМЕНИ И ФАМИЛИИ
            </div>
            <div className="font-bold text-lg mt-1" style={{ color: "#f1efe9" }}>
              {nicknameChanges > 0 ? `Стоимость: ${fmtMoney(NICKNAME_CHANGE_COST)} МК` : "Первая смена — бесплатно"}
            </div>
            <input
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              maxLength={18}
              placeholder="Имя"
              className="w-full mt-3 px-3 py-2 rounded-md text-sm font-bold outline-none"
              style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#f1efe9" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitNicknameChange();
              }}
            />
            <input
              value={surnameInput}
              onChange={(e) => setSurnameInput(e.target.value)}
              maxLength={18}
              placeholder="Фамилия"
              className="w-full mt-2 px-3 py-2 rounded-md text-sm font-bold outline-none"
              style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#f1efe9" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitNicknameChange();
              }}
            />
            <div className="text-[10px] mt-2" style={{ color: "#5c5860" }}>
              Возраст указывается один раз при регистрации и не меняется
            </div>
            {nicknameError && (
              <div className="text-xs mt-2" style={{ color: "#ff9d9d" }}>
                {nicknameError}
              </div>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setNicknameEditOpen(false)}
                className="flex-1 text-sm font-bold py-2.5 rounded-md"
                style={{ background: "#2c2930", color: "#e8e5df" }}
              >
                ОТМЕНА
              </button>
              <button
                onClick={submitNicknameChange}
                className="flex-1 text-sm font-bold py-2.5 rounded-md"
                style={{ background: "#c6ff3d", color: "#121014" }}
              >
                СОХРАНИТЬ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* registration — first launch, enter name / surname / age */}
      {needsRegistration && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "#000000ee" }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6 flex flex-col items-center"
            style={{ background: "linear-gradient(165deg, #1e1c22, #17151a)", border: "1px solid #2c2930", boxShadow: "0 12px 36px #00000066, inset 0 1px 0 #ffffff08" }}
          >
            <Avatar size={64} />
            <div className="font-bold text-lg mt-3 text-center" style={{ color: "#f1efe9" }}>
              Добро пожаловать в РП МАНЮША
            </div>
            <div className="text-xs mt-1 text-center" style={{ color: "#8f8b93" }}>
              Укажи имя, фамилию и возраст, чтобы начать открывать кейсы
            </div>
            <input
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              maxLength={18}
              placeholder="Имя"
              autoFocus
              className="w-full mt-4 px-3 py-2.5 rounded-md text-sm font-bold outline-none text-center"
              style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#f1efe9" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRegister();
              }}
            />
            <input
              value={surnameInput}
              onChange={(e) => setSurnameInput(e.target.value)}
              maxLength={18}
              placeholder="Фамилия"
              className="w-full mt-2 px-3 py-2.5 rounded-md text-sm font-bold outline-none text-center"
              style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#f1efe9" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRegister();
              }}
            />
            <input
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value.replace(/[^\d]/g, "").slice(0, 2))}
              inputMode="numeric"
              maxLength={2}
              placeholder="Возраст (18–70)"
              className="w-full mt-2 px-3 py-2.5 rounded-md text-sm font-bold outline-none text-center"
              style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", color: "#f1efe9" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRegister();
              }}
            />
            {nicknameError && (
              <div className="text-xs mt-2" style={{ color: "#ff9d9d" }}>
                {nicknameError}
              </div>
            )}
            <button
              onClick={submitRegister}
              className="w-full text-sm font-bold py-2.5 rounded-md mt-4"
              style={{ background: "#c6ff3d", color: "#121014" }}
            >
              НАЧАТЬ ИГРУ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
