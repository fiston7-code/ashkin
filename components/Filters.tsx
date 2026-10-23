"use client";
import { useState } from "react";
import { useApp } from "@/lib/store";
import { COMMUNES } from "@/lib/hotels";
import { formatPrice } from "@/lib/price";

const LABELS: Record<string, string> = {
  Bandalungwa: "Bandalungwa (Bandal)",
  Kalamu: "Kalamu (Victoire / Matonge)",
};

export default function Filters() {
  const { commune, setCommune, stay, setStay, maxBudget, setMaxBudget, currency, setPosition } = useApp();
  const [note, setNote] = useState<{ text: string; error?: boolean } | null>(null);

  function locate() {
    if (!("geolocation" in navigator)) {
      setNote({ text: "La géolocalisation n'est pas supportée sur ce navigateur.", error: true });
      return;
    }
    setNote({ text: "Recherche de votre position..." });
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPosition({ lat: p.coords.latitude, lng: p.coords.longitude });
        setCommune("ALL");
        setNote({ text: "Position détectée : hôtels triés du plus proche au plus éloigné." });
      },
      () => setNote({ text: "Géolocalisation non activée. Choisissez votre commune manuellement.", error: true }),
      { timeout: 10000 }
    );
  }

  const base = "flex-1 min-h-11 px-2 text-sm font-semibold rounded-lg transition";
  const on = `${base} bg-brand-600 text-white`;
  const off = `${base} text-slate-400 hover:text-white`;

  return (
    <section className="bg-slate-900/60 p-3 sm:p-4 border-b border-slate-800 space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 min-w-0">
          <select
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
            aria-label="Commune"
            className="w-full h-12 bg-slate-800 border border-slate-700 rounded-xl pl-3.5 pr-9 text-base text-slate-200 focus:outline-none focus:border-brand-500 appearance-none"
          >
            <option value="ALL">Toutes les communes</option>
            {COMMUNES.map((c) => (
              <option key={c} value={c}>{LABELS[c] ?? c}</option>
            ))}
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none" />
        </div>
        <button
          onClick={locate}
          className="h-12 shrink-0 bg-brand-600/20 text-brand-400 border border-brand-500/30 px-4 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-brand-600/30 active:scale-95 transition whitespace-nowrap"
        >
          <i className="fa-solid fa-location-crosshairs" /> Proche
        </button>
      </div>

      {note && (
        <p role="status" className={`text-xs ${note.error ? "text-rose-400" : "text-emerald-400"}`}>
          {note.text}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/80">
          <button onClick={() => setStay("passage")} className={stay === "passage" ? on : off}>
            Passage (2-4h)
          </button>
          <button onClick={() => setStay("nuitee")} className={stay === "nuitee" ? on : off}>
            Nuitée
          </button>
        </div>

        <div className="bg-slate-800/80 px-3.5 py-2.5 rounded-xl border border-slate-700/80 flex flex-col justify-center gap-1.5">
          <div className="flex justify-between items-center text-sm text-slate-400">
            <label htmlFor="budget">Budget max</label>
            <span className="font-bold text-brand-400 text-base">{formatPrice(maxBudget, currency)}</span>
          </div>
          <input
            id="budget"
            type="range"
            min={10}
            max={70}
            step={5}
            value={maxBudget}
            onChange={(e) => setMaxBudget(+e.target.value)}
            className="w-full h-8 accent-brand-500 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}