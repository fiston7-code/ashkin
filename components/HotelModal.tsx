"use client";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/price";
import { IMAGES } from "@/lib/images";

export default function HotelModal() {
  const { selected: h, setSelected, setShareOpen, currency } = useApp();
  if (!h) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4">
      <div className="bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="relative h-48 bg-slate-800 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES[h.id]} alt={h.name} className="w-full h-full object-cover" />
          <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-8 h-8 bg-slate-950/70 text-white rounded-full flex items-center justify-center backdrop-blur" aria-label="Fermer">
            <i className="fa-solid fa-xmark" />
          </button>
          <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur text-white ${h.isOpen ? "bg-emerald-500/90" : "bg-rose-500/90"}`}>
            {h.isOpen ? "Chambres Disponibles" : "Actuellement Complet"}
          </div>
        </div>

        <div className="p-4 space-y-4 flex-1">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-white">{h.name}</h2>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
                <i className="fa-solid fa-star" /> <span>{h.rating}</span>
              </div>
            </div>
            <p className="text-xs text-brand-400 font-medium">Commune de {h.commune} • {h.distanceKm} km environ</p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Repère Kinois Précis</span>
            <p className="text-xs text-slate-200 font-medium flex items-start gap-1.5">
              <i className="fa-solid fa-map-pin text-brand-500 mt-0.5" />
              <span>{h.landmark}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400">Tarif Passage (2-4h)</span>
              <p className="text-sm font-bold text-white">{formatPrice(h.pricePassageUSD, currency)}</p>
            </div>
            <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400">Tarif Nuitée</span>
              <p className="text-sm font-bold text-brand-400">{formatPrice(h.priceNuiteeUSD, currency)}</p>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block mb-2">Services &amp; Confort</span>
            <div className="flex flex-wrap gap-1.5">
              {h.amenities.map((a) => (
                <span key={a} className="bg-slate-800 text-slate-200 text-[10px] px-2 py-1 rounded-lg border border-slate-700/80 flex items-center gap-1">
                  <i className="fa-solid fa-check text-brand-400 text-[9px]" /> {a}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button onClick={() => setShareOpen(true)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition text-xs">
              <i className="fa-brands fa-whatsapp text-base" /> Envoyer à mon partenaire
            </button>
            <a href={`tel:${h.phone}`} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition text-xs">
              <i className="fa-solid fa-phone" /> Appeler la réception
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}