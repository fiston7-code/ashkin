"use client";
import { useApp, type Tab } from "@/lib/store";
import { t, type I18nKey } from "@/lib/i18n";

const TABS: { id: Tab; icon: string; key: I18nKey; extra?: string }[] = [
  { id: "list", icon: "fa-list-ul", key: "tab_hotels" },
  { id: "map", icon: "fa-map-location-dot", key: "tab_map" },
  { id: "ai", icon: "fa-wand-magic-sparkles text-brand-400", key: "tab_ai" },
  { id: "info", icon: "fa-shield-cat", key: "tab_info" },
];

export default function Tabs() {
  const { tab, setTab, lang } = useApp();
  return (
    <nav className="bg-slate-900 px-2 border-b border-slate-800 flex justify-around text-xs font-medium text-slate-400">
      {TABS.map((x) => (
        <button
          key={x.id}
          onClick={() => setTab(x.id)}
          className={
            tab === x.id
              ? "py-2.5 px-3 text-brand-500 border-b-2 border-brand-500 flex items-center gap-1.5 transition relative"
              : "py-2.5 px-3 flex items-center gap-1.5 transition hover:text-slate-200 relative"
          }
        >
          <i className={`fa-solid ${x.icon}`} /> <span>{t(lang, x.key)}</span>
          {x.id === "ai" && <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse absolute top-2 right-1" />}
        </button>
      ))}
    </nav>
  );
}