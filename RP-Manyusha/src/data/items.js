// Предметы всех кейсов. iconImg теперь путь в /public/cars, а не base64.
// Цены НЕ меняем (фишка проекта) — см. cases.js
export const ITEMS_MANYUSHA = [
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

export const ITEMS_KSYUSHA = [
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

export const ITEMS_CARS = [
  { name: "Volkswagen Golf GTI", w: 60, rarity: 60, p: 2160, iconImg: "/cars/golfGti.webp", icon: "🚗", iconSvg: "hatch", topSpeed: 180 },
  { name: "Ford Focus ST", w: 60, rarity: 60, p: 1680, iconImg: "/cars/focusSt.webp", icon: "🚙", iconSvg: "hatch", topSpeed: 150 },
  { name: "Honda Civic Type R", w: 60, rarity: 60, p: 2160, iconImg: "/cars/civicTypeR.webp", icon: "🏎️", iconSvg: "hatch", topSpeed: 155 },
  { name: "Toyota GR86", w: 60, rarity: 60, p: 2880, iconImg: "/cars/gr86.webp", icon: "🚕", iconSvg: "hatch", topSpeed: 180 },
  { name: "Subaru", w: 60, rarity: 60, p: 2640, iconImg: "/cars/subaru.webp", icon: "🚐", iconSvg: "hatch", topSpeed: 160 },

  { name: "Toyota Supra", w: 19, rarity: 40, p: 6300, iconImg: "/cars/supra.webp", icon: "🏎️", iconSvg: "sport", topSpeed: 195 },
  { name: "BMW M4", w: 19, rarity: 40, p: 6975, iconImg: "/cars/bmwM4.webp", icon: "🚙", iconSvg: "sport", topSpeed: 250 },
  { name: "Ford Mustang GT", w: 19, rarity: 40, p: 6480, iconImg: "/cars/mustangGt.webp", icon: "🚗", iconSvg: "sport", topSpeed: 220 },
  { name: "Porsche 911", w: 19, rarity: 40, p: 7425, iconImg: "/cars/porsche911.webp", icon: "🏁", iconSvg: "sport", topSpeed: 230 },
  { name: "Nissan 350Z", w: 19, rarity: 40, p: 6975, iconImg: "/cars/nissan350z.webp", icon: "🚖", iconSvg: "sport", topSpeed: 225 },

  { name: "Ferrari SF90 Stradale", w: 8, rarity: 20, p: 8550, iconImg: "/cars/ferrariSf90.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "McLaren Artura", w: 8, rarity: 20, p: 9135, iconImg: "/cars/mclarenArtura.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 300 },
  { name: "Aston Martin Valkyrie", w: 8, rarity: 20, p: 9675, iconImg: "/cars/astonValkyrie.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "Bugatti", w: 8, rarity: 20, p: 10125, iconImg: "/cars/bugatti.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 305 },
  { name: "Lamborghini Huracán", w: 8, rarity: 20, p: 9135, iconImg: "/cars/huracan.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 290 },
];

export const ITEMS_CLOTHES = [
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

export const ITEMS_MOTO = [
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

export const ITEMS_PHONES = [
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

export const ITEMS_PHONES_2026 = [
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

export const ITEMS_AXI = [
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

export const ITEMS_CARS_2026 = [
  { name: "BMW M4", w: 50, rarity: 40, p: 6975, iconImg: "/cars/bmwM4V2.webp", icon: "🚙", iconSvg: "sport", topSpeed: 250 },
  { name: "Nissan 350Z", w: 50, rarity: 40, p: 6975, iconImg: "/cars/nissan350zV2.webp", icon: "🚖", iconSvg: "sport", topSpeed: 225 },
  { name: "Toyota Supra (A90)", w: 50, rarity: 40, p: 6100, iconImg: "/cars/supraA90.webp", icon: "🏎️", iconSvg: "sport", topSpeed: 235 },
  { name: "Honda NSX (2020)", w: 50, rarity: 40, p: 5900, iconImg: "/cars/hondaNsx.webp", icon: "🏎️", iconSvg: "sport", topSpeed: 220 },
  { name: "Audi RS5 Coupe", w: 50, rarity: 40, p: 6350, iconImg: "/cars/audiRs5.webp", icon: "🚗", iconSvg: "sport", topSpeed: 240 },
  { name: "Ford Mustang Dark Horse", w: 50, rarity: 40, p: 6100, iconImg: "/cars/mustangDarkHorse.webp", icon: "🚗", iconSvg: "sport", topSpeed: 250 },

  { name: "Audi R8 V10 Performance", w: 19, rarity: 25, p: 8100, iconImg: "/cars/audiR8.webp", icon: "🏎️", iconSvg: "sport", topSpeed: 265 },
  { name: "Nissan GT-R Nismo", w: 19, rarity: 25, p: 10800, iconImg: "/cars/nissanGtrNismo.webp", icon: "🏎️", iconSvg: "sport", topSpeed: 275 },
  { name: "BMW M5 CS", w: 19, rarity: 25, p: 10800, iconImg: "/cars/bmwM5Cs.webp", icon: "🚙", iconSvg: "sport", topSpeed: 280 },
  { name: "Mercedes-AMG GT Black Series", w: 19, rarity: 25, p: 12600, iconImg: "/cars/amgGtBlack.webp", icon: "🏎️", iconSvg: "sport", topSpeed: 280 },
  { name: "Porsche 911 GT3 RS", w: 19, rarity: 25, p: 13950, iconImg: "/cars/porsche911Gt3Rs.webp", icon: "🏁", iconSvg: "sport", topSpeed: 300 },

  { name: "Ferrari SF90 Stradale", w: 9, rarity: 20, p: 8550, iconImg: "/cars/ferrariSf90V2.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "Lamborghini Revuelto", w: 9, rarity: 20, p: 14400, iconImg: "/cars/revuelto.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 295 },
  { name: "McLaren 750S", w: 9, rarity: 20, p: 15300, iconImg: "/cars/mclaren750s.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 310 },
  { name: "Aston Martin Valour", w: 9, rarity: 20, p: 15300, iconImg: "/cars/astonValour.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 315 },

  { name: "Bugatti Tourbillon", w: 4, rarity: 10, p: 18900, iconImg: "/cars/bugattiTourbillon.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 320 },
  { name: "Koenigsegg Jesko Absolut", w: 4, rarity: 10, p: 20250, iconImg: "/cars/koenigseggJesko.webp", icon: "🏎️", iconSvg: "hyper", topSpeed: 320 },
];

export const ITEMS_BOMZH_CARS = [
  { name: "Пахучка ёлочка", w: 50, rarity: 60, p: 1000, icon: "🌲" },
  { name: "55 деталей", w: 50, rarity: 60, icon: "🔩", grantsParts: 55 },
  { name: "Ржавое колесо", w: 50, rarity: 60, p: 850, icon: "🛞" },
  { name: "Кожаное сидение", w: 50, rarity: 60, p: 1400, icon: "💺" },

  { name: "Honda Civic Type R", w: 38, rarity: 45, p: 2160, iconImg: "/cars/civicTypeR.webp", icon: "🏎️", iconSvg: "hatch", category: "cars", topSpeed: 155 },
  { name: "Subaru", w: 38, rarity: 45, p: 2640, iconImg: "/cars/subaru.webp", icon: "🚐", iconSvg: "hatch", category: "cars", topSpeed: 160 },
  { name: "ВАЗ 2107 drift street", w: 38, rarity: 45, p: 2300, icon: "🚗", iconSvg: "hatch", category: "cars", topSpeed: 160 },
  { name: "Volkswagen Golf 4", w: 38, rarity: 45, p: 2550, icon: "🚗", iconSvg: "hatch", category: "cars", topSpeed: 165 },

  { name: "Ford Mustang GT", w: 18, rarity: 40, p: 6480, iconImg: "/cars/mustangGt.webp", icon: "🚗", iconSvg: "sport", category: "cars", topSpeed: 220 },
  { name: "BMW E34 Street", w: 18, rarity: 40, p: 5060, icon: "🚗", iconSvg: "sport", category: "cars", topSpeed: 200 },
  { name: "Nissan Silvia S15", w: 18, rarity: 40, p: 5930, icon: "🏎️", iconSvg: "sport", category: "cars", topSpeed: 210 },
  { name: "Toyota Chaser JZX100", w: 18, rarity: 40, p: 6410, icon: "🏎️", iconSvg: "sport", category: "cars", topSpeed: 220 },

  { name: "Porsche 911 GT3 RS", w: 8, rarity: 25, p: 13950, iconImg: "/cars/porsche911Gt3Rs.webp", icon: "🏁", iconSvg: "sport", category: "cars", topSpeed: 300 },
];

export const ITEMS_TESLA_EXCLUSIVE = [
  { name: "Рюкзак «Cyber»", w: 84, rarity: 25, p: 3600, icon: "🎒" },
  { name: "Очки Cyber Visor", w: 84, rarity: 25, p: 4000, icon: "🥽" },
  { name: "Коллекционный винил «Cyberpunk»", w: 84, rarity: 25, p: 4500, icon: "💿" },
  { name: "Номерной знак «AKOBAN»", w: 84, rarity: 25, p: 4000, icon: "🪧" },
  { name: "Худи «Cyberstar»", w: 84, rarity: 25, p: 4150, icon: "🧥" },
  { name: "Кейс с машинами 2026", w: 84, rarity: 25, icon: "🏆", grantsCaseId: "cars2026" },

  { name: "Tesla Model S Plaid", w: 16, rarity: 10, p: 35600, icon: "🏎️", iconSvg: "hyper", category: "cars", topSpeed: 310 },
];

export const ITEMS_RETRO_CARS = [
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

export const ITEMS_MOTO_2026 = [
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

export const ITEMS_CAPSULE_AVANGARD = [
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

export const ITEMS_CAPSULE_OPIUM = [
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

export const ITEMS_SECRET = [
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

export const ITEMS_MIX_2026 = [
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
