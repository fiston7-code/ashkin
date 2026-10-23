"use client";
import { useApp, type Tab } from "@/lib/store";
import { t, type I18nKey } from "@/lib/i18n";

const TABS: { id: Tab; icon: string; key: I18nKey }[] = [
  { id: "list", icon: "fa-list-ul", key: "tab_hotels" },
  { id: "map", icon: "fa-map-location-dot", key: "tab_map" },
  { id: "ai", icon: "fa-wand-magic-sparkles", key: "tab_ai" },
  { id: "info", icon: "fa-shield-cat", key: "tab_info" },
];

export default function Tabs() {
  const { tab, setTab, lang } = useApp();

  function go(id: Tab) {
    if (id === tab) return;
    if (id === "list") history.back();
    else setTab(id);
  }

  return (
    <nav
      aria-label="Navigation principale"
      className="bg-slate-900 border-b border-slate-800 flex overflow-x-auto no-scrollbar text-slate-400"
    >
      {TABS.map((x) => {
        const active = tab === x.id;
        return (
          <button
            key={x.id}
            onClick={() => go(x.id)}
            aria-current={active ? "page" : undefined}
            className={`relative flex-1 min-w-[76px] min-h-14 px-2 py-2 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 text-xs sm:text-sm font-medium border-b-2 transition active:bg-slate-800/60 ${
              active
                ? "text-brand-500 border-brand-500"
                : "border-transparent hover:text-slate-200"
            }`}
          >
            <i className={`fa-solid ${x.icon} text-lg sm:text-base ${x.id === "ai" && !active ? "text-brand-400" : ""}`} />
            <span className="whitespace-nowrap">{t(lang, x.key)}</span>
            {x.id === "ai" && (
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse absolute top-2 right-3 sm:right-2" />
            )}
          </button>
        );
      })}
    </nav>
  );
}