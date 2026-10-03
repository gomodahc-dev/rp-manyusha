export let audioCtx = null;

export function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  audioCtx = new Ctx();
  return audioCtx;
}

export function playTone({ freq = 440, duration = 0.08, type = "sine", volume = 0.18, delay = 0, glideTo = null }) {
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

export function scheduleSpinTicks(totalMs) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const n = 26;
  for (let i = 1; i <= n; i++) {
    const progress = i / n;
    const t = totalMs * Math.pow(progress, 2.3);
    playTone({ freq: 1200, duration: 0.035, type: "square", volume: 0.08, delay: t / 1000 });
  }
}

export function playRevealSound(w) {
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

export function playKeepSound() {
  // тёплый двухнотный "сохранил в инвентарь"
  playTone({ freq: 440, duration: 0.09, type: "sine", volume: 0.16 });
  playTone({ freq: 587.33, duration: 0.13, type: "sine", volume: 0.16, delay: 0.07 });
}

export function playSellSound() {
  // звонкая касса — монеты + удар по кнопке кассы
  playTone({ freq: 1200, duration: 0.05, type: "square", volume: 0.12 });
  playTone({ freq: 1600, duration: 0.05, type: "square", volume: 0.12, delay: 0.045 });
  playTone({ freq: 2000, duration: 0.09, type: "square", volume: 0.14, delay: 0.09 });
  playTone({ freq: 300, duration: 0.18, type: "triangle", volume: 0.17, delay: 0.05 });
}

export function playDisassembleSound() {
  // механический "разбор на шестерёнки"
  [700, 550, 420, 300].forEach((f, i) =>
    playTone({ freq: f, duration: 0.06, type: "sawtooth", volume: 0.14, delay: i * 0.045 })
  );
  playTone({ freq: 150, duration: 0.16, type: "square", volume: 0.15, delay: 0.2, glideTo: 90 });
}

export function playPaydaySound() {
  // приятный восходящий "зарплата пришла"
  playTone({ freq: 261.63, duration: 0.12, type: "triangle", volume: 0.15 });
  playTone({ freq: 329.63, duration: 0.12, type: "triangle", volume: 0.16, delay: 0.09 });
  playTone({ freq: 392, duration: 0.16, type: "triangle", volume: 0.17, delay: 0.18 });
  playTone({ freq: 523.25, duration: 0.24, type: "sine", volume: 0.16, delay: 0.29 });
}

export function playWheelWinSound() {
  // праздничный залп для казино / ежедневного колеса
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
    playTone({ freq: f, duration: 0.16, type: "sine", volume: 0.22, delay: i * 0.06 })
  );
  playTone({ freq: 1567.98, duration: 0.3, type: "sine", volume: 0.1, delay: 0.3, glideTo: 2093 });
}

export function playClaimSound() {
  // мягкое "забрал награду" — используется для БП, достижений, подарочных кейсов/деталей
  playTone({ freq: 493.88, duration: 0.09, type: "sine", volume: 0.15 });
  playTone({ freq: 659.25, duration: 0.1, type: "sine", volume: 0.16, delay: 0.06 });
  playTone({ freq: 987.77, duration: 0.16, type: "sine", volume: 0.13, delay: 0.13 });
}

export function playProfileOpenSound() {
  // мягкий приятный звук открытия профиля
  playTone({ freq: 587.33, duration: 0.08, type: "sine", volume: 0.12 });
  playTone({ freq: 880, duration: 0.13, type: "sine", volume: 0.1, delay: 0.06 });
}

export function playSoftClickSound() {
  // короткий мягкий щелчок для переходов между вкладками профиля
  playTone({ freq: 740, duration: 0.05, type: "sine", volume: 0.09 });
  playTone({ freq: 1000, duration: 0.04, type: "sine", volume: 0.06, delay: 0.03 });
}

export function playPurchaseSound() {
  // более насыщенная "cha-ching" — двойной монетный звон + приятный колокольчик + бас-удар кассы
  playTone({ freq: 1800, duration: 0.05, type: "square", volume: 0.13 });
  playTone({ freq: 2200, duration: 0.05, type: "square", volume: 0.11, delay: 0.04 });
  playTone({ freq: 1400, duration: 0.07, type: "square", volume: 0.12, delay: 0.08 });
  playTone({ freq: 987.77, duration: 0.18, type: "sine", volume: 0.14, delay: 0.13, glideTo: 1318.5 });
  playTone({ freq: 220, duration: 0.18, type: "triangle", volume: 0.18, delay: 0.03 });
}

export function scheduleCapsuleRattle(totalMs) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const n = Math.floor(totalMs / 140);
  for (let i = 0; i < n; i++) {
    const freq = i % 2 === 0 ? 500 : 620;
    playTone({ freq, duration: 0.06, type: "square", volume: 0.09, delay: (i * 140) / 1000 });
  }
}

/* ---------- small UI pieces ---------- */
