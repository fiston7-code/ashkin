import { create } from "zustand";
import type { Currency, Hotel, Lang, Stay } from "./types";
import { distanceKm, type Point } from "./geo";
import { hotels, KINSHASA_CENTER } from "./hotels";
import { priceOf } from "./price";

export type Tab = "list" | "map" | "ai" | "info";
export type HotelWithDistance = Hotel & { distanceKm: number };

interface State {
  ageOk: boolean;
  tab: Tab;
  stay: Stay;
  currency: Currency;
  lang: Lang;
  maxBudget: number;
  commune: string;
  position: Point | null;
  selected: HotelWithDistance | null;
  shareOpen: boolean;
  setAgeOk: (v: boolean) => void;
  setTab: (t: Tab) => void;
  setStay: (s: Stay) => void;
  setCurrency: (c: Currency) => void;
  setLang: (l: Lang) => void;
  setMaxBudget: (n: number) => void;
  setCommune: (c: string) => void;
  setPosition: (p: Point | null) => void;
  setSelected: (h: HotelWithDistance | null) => void;
  setShareOpen: (v: boolean) => void;
  reset: () => void;
}

export const useApp = create<State>((set) => ({
  ageOk: false,
  tab: "list",
  stay: "passage",
  currency: "USD",
  lang: "FR",
  maxBudget: 35,
  commune: "ALL",
  position: null,
  selected: null,
  shareOpen: false,
  setAgeOk: (ageOk) => set({ ageOk }),
  setTab: (tab) => set({ tab }),
  setStay: (stay) => set({ stay }),
  setCurrency: (currency) => set({ currency }),
  setLang: (lang) => set({ lang }),
  setMaxBudget: (maxBudget) => set({ maxBudget }),
  setCommune: (commune) => set({ commune }),
  setPosition: (position) => set({ position }),
  setSelected: (selected) => set({ selected }),
  setShareOpen: (shareOpen) => set({ shareOpen }),
  reset: () => set({ commune: "ALL", maxBudget: 70 }),
}));

export function selectHotels(
  s: Pick<State, "stay" | "maxBudget" | "commune" | "position">
): HotelWithDistance[] {
  const origin = s.position ?? KINSHASA_CENTER;
  return hotels
    .filter((h) => priceOf(h, s.stay) <= s.maxBudget)
    .filter((h) => s.commune === "ALL" || h.commune === s.commune)
    .map((h) => ({ ...h, distanceKm: distanceKm(origin, h) }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}