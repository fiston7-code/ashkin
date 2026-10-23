"use client";
import { useState } from "react";
import { useApp } from "@/lib/store";
import { formatPrice, priceOf } from "@/lib/price";
import { shareMessage, whatsappUrl } from "@/lib/share";

const TIMES = ["Maintenant", "Dans 30 minutes", "À 18h00", "À 20h00", "Ce soir"];
const LABELS: Record<string, string> = { Maintenant: "Maintenant / Tout de suite" };

export default function ShareModal() {
  const { selected: h, shareOpen, stay, currency } = useApp();
  const [time, setTime] = useState("Maintenant");
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  if (!h || !shareOpen) return null;

  const msg = shareMessage(h, stay, time, formatPrice(priceOf(h, stay), currency));

  async function copy() {
    try {
      await navigator.clipboard.writeText(msg);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    setTimeout(() => setCopied(null), 2500);
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex flex-col justify-end sm:justify-center sm:items-center sm:p-4"
      onClick={() => history.back()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Partager avec votre partenaire"
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[92dvh] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-2 shrink-0">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 min-w-0">
            <i className="fa-solid fa-paper-plane text-emerald-400" />
            <span className="truncate">Partager avec votre partenaire</span>
          </h3>
          <button
            onClick={() => history.back()}
            className="w-11 h-11 shrink-0 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center active:scale-95 transition"
            aria-label="Fermer"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-3 space-y-4">
          <div>
            <label htmlFor="rdv-time" className="text-sm text-slate-400 block mb-1.5">
              Heure de RDV proposée
            </label>
            <select
              id="rdv-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-12 bg-slate-800 border border-slate-700 rounded-xl px-3.5 text-base text-slate-200 focus:outline-none focus:border-brand-500"
            >
              {TIMES.map((x) => (
                <option key={x} value={x}>{LABELS[x] ?? x}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="msg-preview" className="text-sm text-slate-400 block mb-1.5">
              Aperçu du message
            </label>
            <textarea
              id="msg-preview"
              readOnly
              rows={7}
              value={msg}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm leading-relaxed text-slate-300 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="shrink-0 bg-slate-900 border-t border-slate-800 p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] space-y-2">
          <button
            onClick={() => window.open(whatsappUrl(msg), "_blank")}
            className="w-full min-h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-base shadow-md active:scale-95 transition"
          >
            <i className="fa-brands fa-whatsapp text-xl" /> Ouvrir WhatsApp
          </button>
          <button
            onClick={copy}
            className="w-full min-h-12 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-base border border-slate-700 active:scale-95 transition"
          >
            {copied === "ok" ? (
              <><i className="fa-solid fa-check text-emerald-400" /> Copié !</>
            ) : copied === "fail" ? (
              <><i className="fa-solid fa-triangle-exclamation text-amber-400" /> Copie impossible</>
            ) : (
              <><i className="fa-solid fa-copy" /> Copier le texte</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}