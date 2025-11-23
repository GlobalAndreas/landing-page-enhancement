const WARMUP_STATE_KEY = 'warmup_state';

export interface WarmupState {
  [dayId: string]: boolean;
}

export const getWarmupState = (): WarmupState => {
  try {
    const stored = localStorage.getItem(WARMUP_STATE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading warmup state:', error);
    return {};
  }
};

export const setWarmupDayActive = (dayId: string, isActive: boolean): void => {
  try {
    const state = getWarmupState();
    state[dayId] = isActive;
    localStorage.setItem(WARMUP_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving warmup state:', error);
  }
};

export const isDayActive = (dayId: string, defaultActive: boolean = true): boolean => {
  const state = getWarmupState();
  return state[dayId] !== undefined ? state[dayId] : defaultActive;
};

export const resetWarmupState = (): void => {
  localStorage.removeItem(WARMUP_STATE_KEY);
};

export const getActiveWarmupDays = (): string[] => {
  const state = getWarmupState();
  return Object.entries(state)
    .filter(([_, isActive]) => isActive)
    .map(([dayId]) => dayId);
};
