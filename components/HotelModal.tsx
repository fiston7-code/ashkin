"use client";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/price";
import { IMAGES } from "@/lib/images";

export default function HotelModal() {
  const { selected: h, setShareOpen, currency } = useApp();
  if (!h) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-end sm:justify-center sm:items-center sm:p-4"
      onClick={() => history.back()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={h.name}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[92dvh] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="relative h-52 sm:h-56 bg-slate-800 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES[h.id]} alt={h.name} className="w-full h-full object-cover" />

            <button
              onClick={() => history.back()}
              className="absolute top-3 left-3 w-11 h-11 bg-slate-950/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm active:scale-95 transition"
              aria-label="Retour"
            >
              <i className="fa-solid fa-arrow-left" />
            </button>
            <button
              onClick={() => history.back()}
              className="absolute top-3 right-3 w-11 h-11 bg-slate-950/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm active:scale-95 transition"
              aria-label="Fermer"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div
              className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold uppercase backdrop-blur-sm text-white ${
                h.isOpen ? "bg-emerald-500/90" : "bg-rose-500/90"
              }`}
            >
              {h.isOpen ? "Chambres disponibles" : "Actuellement complet"}
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-start gap-3">
                <h2 className="text-xl font-bold text-white leading-snug min-w-0 break-words">{h.name}</h2>
                <div className="shrink-0 flex items-center gap-1 text-amber-400 text-sm font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  <i className="fa-solid fa-star text-xs" /> <span>{h.rating}</span>
                </div>
              </div>
              <p className="text-sm text-brand-400 font-medium">
                Commune de {h.commune} • {h.distanceKm} km environ
              </p>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1.5">
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Repère kinois précis</span>
              <p className="text-sm text-slate-200 font-medium flex items-start gap-2">
                <i className="fa-solid fa-map-pin text-brand-500 mt-1" />
                <span className="min-w-0 break-words">{h.landmark}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                <span className="text-xs text-slate-400 block">Passage (2-4h)</span>
                <p className="text-lg font-bold text-white">{formatPrice(h.pricePassageUSD, currency)}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                <span className="text-xs text-slate-400 block">Nuitée</span>
                <p className="text-lg font-bold text-brand-400">{formatPrice(h.priceNuiteeUSD, currency)}</p>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider block mb-2">
                Services &amp; confort
              </span>
              <div className="flex flex-wrap gap-2">
                {h.amenities.map((a) => (
                  <span
                    key={a}
                    className="bg-slate-800 text-slate-200 text-sm px-2.5 py-1.5 rounded-lg border border-slate-700/80 flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-check text-brand-400 text-xs" /> {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-slate-900 border-t border-slate-800 p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] space-y-2">
          <button
            onClick={() => setShareOpen(true)}
            className="w-full min-h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition text-base"
          >
            <i className="fa-brands fa-whatsapp text-xl" /> Envoyer à mon partenaire
          </button>
          <a
            href={`tel:${h.phone}`}
            className="w-full min-h-12 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition text-base"
          >
            <i className="fa-solid fa-phone" /> Appeler la réception
          </a>
        </div>
      </div>
    </div>
  );
}