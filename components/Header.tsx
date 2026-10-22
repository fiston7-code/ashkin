"use client";
import { useApp } from "@/lib/store";

export default function Header() {
 const { currency, setCurrency, lang, setLang, tab } = useApp();
  const btn = "bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-300 hover:bg-slate-700 transition";
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2"> {tab !== "list" && (
  <button onClick={() => history.back()} aria-label="Retour" className="w-8 h-8 mr-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center">
    <i className="fa-solid fa-arrow-left text-xs" />
  </button>
)}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md text-sm">H</div>
        <div>
          <h1 className="font-bold text-base text-white tracking-tight leading-none">ASH Kin</h1>
          <span className="text-[10px] text-brand-500 font-medium tracking-wide">Batela Sekele 🤫</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setCurrency(currency === "USD" ? "CDF" : "USD")} className={btn}>
          {currency === "USD" ? "USD ($)" : "CDF (FC)"}
        </button>
        <button onClick={() => setLang(lang === "FR" ? "LN" : "FR")} className={btn}>{lang}</button>
      </div>
    </header>
  );
}