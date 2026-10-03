import { useState, useEffect, useRef, useCallback } from "react";
import { CASES, CASE_BY_ID, CAPSULES, CAPSULE_BY_ID, PREVIEW_SOURCE, ITEM_BY_NAME, CRAFT_TABS, categoryLadder, pickCraftReward, categoryOf, partsValue } from "./data/cases.js";
import { QUEST_GIVERS, QUEST_CYCLE_MS, questText, activeQuestNeedNames, ACHIEVEMENTS, refreshQuestsIfNeeded } from "./data/quests.js";
import { CASINO_MIN_BET, CASINO_MAX_BET, CASINO_COLORS, CASINO_COLOR_HEX, CASINO_COLOR_LABEL, CASINO_WHEEL_SEGMENTS, CASINO_SEGMENT_ANGLE, CASINO_WHEEL_GRADIENT, CASINO_SPIN_MS, DAILY_WHEEL_REWARDS, DAILY_WHEEL_SPIN_MS, DAILY_WHEEL_COOLDOWN_MS, DAILY_WHEEL_SEGMENT_ANGLE, DAILY_WHEEL_GRADIENT, moneyDots } from "./data/casino.js";
import { bpRewardIcon, bpRewardLabel, BP_EXP_PER_PAYDAY, BP_EXP_PER_PAYDAY_VIP, BP_MAX_LEVEL, BP_MILESTONE_LEVELS, BP_EXP_TABLE, bpMoney, bpParts, bpCase, bpVip, bpKey, bpItem, BP_FREE_REWARDS, BP_PAID_REWARDS, applyBpExp, applyBpReward } from "./data/battlepass.js";
import { DONATE_PACKS, RUB_MULTIPLIER, VIP_PACKS, PROMO_CODES, RELICS, RELIC_BY_ID, RELIC_POOL_SIZE, RELIC_POOL_MS, RELIC_COOLDOWN_MS, rollRelicPool, RARITY, ITEM_W, REEL_LEN, WIN_IDX, SPIN_MS, CYCLE_S, NICKNAME_CHANGE_COST, PAYDAY_AMOUNT, PAYDAY_INTERVAL_MS, PAYDAY_MAX_PER_DAY, VIP_PAYDAY_MULTIPLIER } from "./data/economy.js";
import { weightedPick, fmt, fmtMoney, caseGlowColor, isVipActive, effectiveCasePrice, dayKey, pruneEconLog, bumpEcon, sumEcon, validateIdentityInputs, validateNameInputs, formatDuration, formatCountdown, formatVipRemaining } from "./game/logic.js";
import { playTone, scheduleSpinTicks, playRevealSound, playKeepSound, playSellSound, playDisassembleSound, playPaydaySound, playWheelWinSound, playClaimSound, playProfileOpenSound, playSoftClickSound, playPurchaseSound, scheduleCapsuleRattle } from "./game/sound.js";
import { STORAGE_KEY, DEFAULT_STATE, migrateState, getReadyStorage, getGlobalCounter, setGlobalCounter } from "./game/storage.js";
import { syncForbesCloud, loadForbesCloud, claimPromoCloud, isBackendEnabled } from "./game/backend.js";
import { donatePayUrl, createPendingPayment, adminContact } from "./game/payments.js";
import { Hazard, rarityOf, CarIcon, ItemIcon, CapsuleIcon, Chip, ReelCard, Avatar, BpNode, Coin } from "./ui/components.jsx";
import { CaseIcon } from "./ui/caseIcons.jsx";

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
      // Облако (Supabase, если настроен): общий Forbes. Локалка остаётся источником правды.
      try {
        const sc = stateRef.current;
        syncForbesCloud({ playerId: sc.playerId, nickname: sc.nickname, balance: sc.balance, parts: sc.parts, totalTimeMs: sc.totalTimeMs, bpLevel: sc.bpLevel, vipUntil: sc.vipUntil }).catch(() => {});
      } catch (e) {}
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
      // Сначала облако (общий Forbes). null = backend выключен -> идём в локальный список ниже.
      try {
        const cloud = await loadForbesCloud(15);
        if (cloud) {
          setForbesEntries(cloud);
          setForbesLoading(false);
          return;
        }
      } catch (e) {}
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
    donateToastRef.current = setTimeout(() => setDonateToast(false), 4000);
  }, []);

  // Донат: двухшаговая оплата. Шаг 1 — открыть ссылку оплаты (если настроена),
  // шаг 2 — «Я оплатил» создаёт заявку, монеты приходят после проверки.
  const [donatePendingId, setDonatePendingId] = useState(null);
  const startDonate = useCallback(
    (pack, priceLabel, kind) => {
      const pid = kind === "vip" ? `vip:${pack.id}` : pack.id;
      const url = donatePayUrl({ ...pack, vipFallbackRub: undefined }, donateCurrency, stateRef.current?.playerId);
      if (url) {
        try {
          window.open(url, "_blank", "noopener");
        } catch (e) {}
      }
      setDonatePendingId(pid);
      if (soundOnRef.current) playSoftClickSound();
    },
    [donateCurrency]
  );
  const confirmDonatePaid = useCallback(
    (pack, priceLabel, kind) => {
      const pid = kind === "vip" ? `vip:${pack.id}` : pack.id;
      createPendingPayment({
        playerId: stateRef.current?.playerId,
        packId: pid,
        coins: kind === "vip" ? 0 : pack.coins,
        priceLabel,
        vipLabel: kind === "vip" ? pack.label : null,
      });
      setDonatePendingId(null);
      showDonateToast();
    },
    [showDonateToast]
  );

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
      // Сначала облако: общий лимит на всех игроков (атомарно через promo_claims).
      try {
        const cloudRes = await claimPromoCloud(code, stateRef.current?.playerId, def.globalLimit);
        if (cloudRes) {
          if (!cloudRes.ok) {
            setPromoMessage({ type: "error", text: cloudRes.reason === "limit" ? "Промокод не действителен" : cloudRes.reason === "already" ? "Промокод уже активирован" : "Промокод не найден" });
            setPromoChecking(false);
            return;
          }
          grant();
          setPromoChecking(false);
          return;
        }
      } catch (e) {}
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
            className="mj-title text-4xl sm:text-5xl mt-2 relative"
            style={{
              fontSize: "clamp(30px, 6vw, 52px)",
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
                <span style={{ display: "inline-flex" }}>{activeCase?.usesKeys ? <CaseIcon id="secret2026" size={22} /> : <CaseIcon id={active.id} size={22} />}</span>
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
                {isCapsuleActive ? <CapsuleIcon size={26} variant={activeCapsuleVariant} /> : activeCase?.usesKeys ? <CaseIcon id="secret2026" size={30} /> : <CaseIcon id={active.id} size={30} />}
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
                          <CaseIcon id={c.id} size={46} />
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
                    <CaseIcon id={c.id} size={40} />
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
              <div className="text-[10px] text-center mb-3" style={{ color: "#8f8b93" }}>
                Оплата картой · нажми «Купить», оплати и жми «Я оплатил» — монеты придут после проверки
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
                      className={`rounded-xl overflow-hidden flex flex-col${pack.tag ? " donate-hit" : ""}`}
                      style={{ background: "linear-gradient(160deg, #1c1a1f, #17151a)", border: "1px solid #2c2930", marginTop: pack.tag ? 10 : 0 }}
                    >
                      {pack.tag && <div className="donate-badge">{pack.tag}</div>}
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
                        {pack.bonus && (
                          <div className="text-[10px] font-bold mt-0.5" style={{ color: "#ffd76a" }}>
                            {pack.bonus}
                          </div>
                        )}
                        {donatePendingId === pack.id ? (
                          <button
                            onClick={() => confirmDonatePaid(pack, priceLabel, "coins")}
                            className="w-full mt-2 text-[11px] font-bold py-2 rounded-md"
                            style={{ background: "#c6ff3d", color: "#121014" }}
                          >
                            Я оплатил — забрать монеты
                          </button>
                        ) : (
                          <button
                            onClick={() => startDonate(pack, priceLabel, "coins")}
                            className="w-full mt-2 text-[11px] font-bold py-2 rounded-md"
                            style={{ background: "#ff5e2e", color: "#121014" }}
                          >
                            Купить за {priceLabel}
                          </button>
                        )}
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
                      return donatePendingId === `vip:${pack.id}` ? (
                        <button
                          key={pack.id}
                          onClick={() => confirmDonatePaid(pack, priceLabel, "vip")}
                          className="flex flex-col items-center rounded-lg py-2.5"
                          style={{ background: "#c6ff3d", border: "1px solid #c6ff3d" }}
                        >
                          <span className="text-xs font-bold" style={{ color: "#121014" }}>
                            Я оплатил
                          </span>
                          <span className="text-[11px] font-bold mt-0.5" style={{ color: "#121014" }}>
                            {pack.label} — забрать
                          </span>
                        </button>
                      ) : (
                        <button
                          key={pack.id}
                          onClick={() => startDonate(pack, priceLabel, "vip")}
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
                  Заявка создана! Монеты и VIP придут после проверки оплаты. Вопросы — {adminContact() || "напиши админу проекта"}.
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
