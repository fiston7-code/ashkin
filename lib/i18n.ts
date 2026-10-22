import type { Lang } from "./types";

export const i18n = {
  FR: { tab_hotels: "Hôtels", tab_map: "Carte", tab_ai: "Assistant IA", tab_info: "Sécurité" },
  LN: { tab_hotels: "Ba Ndako", tab_map: "Carte", tab_ai: "Moyebisi IA", tab_info: "Bateli" },
} as const;

export type I18nKey = keyof (typeof i18n)["FR"];
export const t = (lang: Lang, key: I18nKey) => i18n[lang][key];
