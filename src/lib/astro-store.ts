import { useSyncExternalStore } from "react";

export type Feedback = "yes" | "partially" | "no";

export type PredictionEntry = {
  id: string;
  text: string;
  date: string;
  astrologerId: string;
  topic: string;
  feedback?: Feedback;
  note?: string;
  reminder?: boolean;
};

export type TimelineEntry = { date: string; title: string; detail: string };

export type AstroState = {
  loggedIn: boolean;
  userName: string;
  email: string;
  categories: string[];
  streak: number;
  checkedInToday: boolean;
  consultations: number;
  predictions: PredictionEntry[];
  timeline: TimelineEntry[];
  trustDelta: Record<string, number>;
  referrals: number;
  freeSessions: number;
  settings: { notifications: boolean; language: string; birthPlace: string; birthDate: string; birthTime: string };
  concern: string;
  priorities: string[];
};

const KEY = "astrolive2:state";

export const defaultState: AstroState = {
  loggedIn: false,
  userName: "Idra",
  email: "idra@example.com",
  categories: ["Career"],
  streak: 7,
  checkedInToday: false,
  consultations: 6,
  predictions: [
    {
      id: "p1",
      text: "You will receive a job opportunity within the next 2–3 months.",
      date: "Aug 10, 2025",
      astrologerId: "a",
      topic: "Career → Job Decision",
    },
  ],
  timeline: [
    { date: "Aug 10", title: "Career consultation", detail: "Prediction saved" },
    { date: "Aug 17", title: "Prediction follow-up", detail: "Feedback submitted" },
    { date: "Aug 18", title: "Trust Score updated", detail: "Astrologer A · 82 → 83" },
  ],
  trustDelta: {},
  referrals: 3,
  freeSessions: 3,
  settings: {
    notifications: true,
    language: "English",
    birthPlace: "Jaipur, India",
    birthDate: "1998-04-12",
    birthTime: "06:45",
  },
  concern: "Will accepting this opportunity be good for my career?",
  priorities: ["Growth", "Stability"],
};

let state: AstroState = defaultState;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...defaultState, ...(JSON.parse(raw) as Partial<AstroState>) };
  } catch {
    /* ignore */
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function setAstroState(patch: Partial<AstroState> | ((s: AstroState) => Partial<AstroState>)) {
  hydrate();
  const next = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...next };
  persist();
  emit();
}

export function resetAstroState() {
  state = { ...defaultState };
  persist();
  emit();
}

export function getAstroState() {
  hydrate();
  return state;
}

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useAstro() {
  return useSyncExternalStore(subscribe, getAstroState, () => defaultState);
}