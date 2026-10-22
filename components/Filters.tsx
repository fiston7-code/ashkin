"use client";
import { useApp } from "@/lib/store";
import { COMMUNES } from "@/lib/hotels";
import { formatPrice } from "@/lib/price";

const LABELS: Record<string, string> = {
  Bandalungwa: "Bandalungwa (Bandal)",
  Kalamu: "Kalamu (Victoire / Matonge)",
};

export default function Filters() {
  const { commune, setCommune, stay, setStay, maxBudget, setMaxBudget, currency, setPosition } = useApp();

  function locate() {
    if (!("geolocation" in navigator)) {
      alert("La géolocalisation n'est pas supportée sur ce navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPosition({ lat: p.coords.latitude, lng: p.coords.longitude });
        setCommune("ALL");
        alert("Position détectée ! Les hôtels sont triés du plus proche au plus éloigné.");
      },
      () => alert("Géolocalisation non activée. Sélectionnez votre commune manuellement.")
    );
  }

  const on = "flex-1 py-1 text-[11px] font-semibold rounded-lg bg-brand-600 text-white transition";
  const off = "flex-1 py-1 text-[11px] font-semibold rounded-lg text-slate-400 hover:text-white transition";

  return (
    <section className="bg-slate-900/60 p-3 border-b border-slate-800 space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <select value={commune} onChange={(e) => setCommune(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500 appearance-none">
            <option value="ALL">Toutes les Communes (Kinshasa)</option>
            {COMMUNES.map((c) => (
              <option key={c} value={c}>{LABELS[c] ?? c}</option>
            ))}
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none" />
        </div>
        <button onClick={locate} className="bg-brand-600/20 text-brand-400 border border-brand-500/30 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 hover:bg-brand-600/30 transition whitespace-nowrap">
          <i className="fa-solid fa-location-crosshairs" /> Proche
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/80">
          <button onClick={() => setStay("passage")} className={stay === "passage" ? on : off}>Passage (2-4h)</button>
          <button onClick={() => setStay("nuitee")} className={stay === "nuitee" ? on : off}>Nuitée</button>
        </div>
        <div className="bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/80 flex flex-col justify-center">
          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-0.5">
            <span>Max Budget</span>
            <span className="font-bold text-brand-400 text-xs">{formatPrice(maxBudget, currency)}</span>
          </div>
          <input type="range" min={10} max={70} step={5} value={maxBudget} onChange={(e) => setMaxBudget(+e.target.value)} className="w-full accent-brand-500 h-1 bg-slate-700 rounded-lg cursor-pointer" />
        </div>
      </div>
    </section>
  );
}