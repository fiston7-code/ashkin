"use client";
import { useState } from "react";
import { useApp } from "@/lib/store";
import { formatPrice, priceOf } from "@/lib/price";
import { shareMessage, whatsappUrl } from "@/lib/share";

const TIMES = ["Maintenant", "Dans 30 minutes", "À 18h00", "À 20h00", "Ce soir"];
const LABELS: Record<string, string> = { Maintenant: "Maintenant / Tout de suite" };

export default function ShareModal() {
  const { selected: h, shareOpen, setShareOpen, stay, currency } = useApp();
  const [time, setTime] = useState("Maintenant");
  if (!h || !shareOpen) return null;

  const msg = shareMessage(h, stay, time, formatPrice(priceOf(h, stay), currency));

  async function copy() {
    try {
      await navigator.clipboard.writeText(msg);
      alert("Message copié ! Vous pouvez le coller dans vos messages.");
    } catch {
      alert("Impossible de copier. Sélectionnez le texte manuellement.");
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-4 space-y-3 shadow-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-paper-plane text-emerald-400" /> Partager avec votre partenaire
          </h3>
          <button onClick={() => setShareOpen(false)} className="text-slate-400 hover:text-white" aria-label="Fermer">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div>
          <label className="text-[11px] text-slate-400 block mb-1">Heure de RDV proposée :</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
            {TIMES.map((x) => <option key={x} value={x}>{LABELS[x] ?? x}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[11px] text-slate-400 block mb-1">Aperçu du message :</label>
          <textarea readOnly rows={5} value={msg} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-[11px] text-slate-300 focus:outline-none resize-none" />
        </div>

        <div className="space-y-2">
          <button onClick={() => window.open(whatsappUrl(msg), "_blank")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md">
            <i className="fa-brands fa-whatsapp text-sm" /> Ouvrir WhatsApp
          </button>
          <button onClick={copy} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 rounded-xl flex items-center justify-center gap-2 text-xs border border-slate-700">
            <i className="fa-solid fa-copy" /> Copier le texte
          </button>
        </div>
      </div>
    </div>
  );
}