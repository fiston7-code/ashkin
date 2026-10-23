"use client";
import { useApp } from "@/lib/store";

export default function Header() {
  const { currency, setCurrency, lang, setLang, tab } = useApp();
  const btn =
    "min-h-11 min-w-11 px-3 bg-slate-800 border border-slate-700 rounded-full text-sm font-semibold text-slate-300 hover:bg-slate-700 active:scale-95 transition";
  const showBack = tab !== "list";

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        {showBack && (
          <button
            onClick={() => history.back()}
            aria-label="Retour"
            className="w-11 h-11 shrink-0 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center active:scale-95 transition"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
        )}
        <div
          className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 items-center justify-center font-bold text-white shadow-md text-base ${
            showBack ? "hidden sm:flex" : "flex"
          }`}
        >
          H
        </div>
        <div className="min-w-0">
          <h1 className="font-bold text-lg text-white tracking-tight leading-none truncate">ASH Kin</h1>
          <span className="block text-xs text-brand-500 font-medium tracking-wide truncate mt-0.5">
            Batela Sekele 🤫
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          onClick={() => setCurrency(currency === "USD" ? "CDF" : "USD")}
          aria-label="Changer de devise"
          className={btn}
        >
          {currency === "USD" ? "USD" : "CDF"}
          <span className="hidden sm:inline">{currency === "USD" ? " ($)" : " (FC)"}</span>
        </button>
        <button
          onClick={() => setLang(lang === "FR" ? "LN" : "FR")}
          aria-label="Changer de langue"
          className={btn}
        >
          {lang}
        </button>
      </div>
    </header>
  );
}