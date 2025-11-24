import { useCallback, useEffect, useRef, useState } from "react";
import { analytics } from "@/utils/analytics";

const STORAGE_KEY = "consultation_slots";
const WEEKLY_SLOTS = 3;

type SlotsState = {
  weekId: string;
  slots: number;
};

const getCurrentWeekId = () => {
  const now = new Date();
  const target = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const dayNumber = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const weekNumber = 1 + Math.round(((target.getTime() - firstThursday.getTime()) / 86400000 - 3) / 7);
  return `${target.getUTCFullYear()}-${weekNumber}`;
};

const readStoredState = (): SlotsState => {
  if (typeof window === "undefined") {
    return { weekId: getCurrentWeekId(), slots: WEEKLY_SLOTS };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { weekId: getCurrentWeekId(), slots: WEEKLY_SLOTS };
    }

    const parsed = JSON.parse(stored) as SlotsState;
    const currentWeekId = getCurrentWeekId();

    if (parsed.weekId !== currentWeekId) {
      const refreshed = { weekId: currentWeekId, slots: WEEKLY_SLOTS };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshed));
      return refreshed;
    }

    return {
      weekId: parsed.weekId,
      slots: typeof parsed.slots === "number" ? Math.max(0, parsed.slots) : WEEKLY_SLOTS,
    };
  } catch (error) {
    console.error("Failed to read consultation slots", error);
    return { weekId: getCurrentWeekId(), slots: WEEKLY_SLOTS };
  }
};

const persistState = (state: SlotsState) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save consultation slots", error);
  }
};

export const useConsultationSlots = () => {
  const [state, setState] = useState<SlotsState>(() => readStoredState());
  const hasTrackedViewRef = useRef(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedState = readStoredState();
    setState(storedState);
    initializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!initializedRef.current || hasTrackedViewRef.current) {
      return;
    }

    analytics.trackEvent("fomo_timer_view", "engagement", "timer_shown");
    hasTrackedViewRef.current = true;
  }, [state.slots]);

  const decreaseSlot = useCallback(() => {
    let decreased = false;

    setState((prev) => {
      if (prev.slots <= 0) {
        return prev;
      }

      decreased = true;
      const updated = { ...prev, slots: prev.slots - 1 };
      persistState(updated);
      return updated;
    });

    if (decreased) {
      analytics.trackEvent("fomo_timer_decrease", "conversion", "slot_used");
    }
  }, []);

  return {
    slots: state.slots,
    decreaseSlot,
  };
};
