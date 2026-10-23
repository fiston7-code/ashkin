"use client";
import { useApp, type HotelWithDistance } from "@/lib/store";
import { formatPrice, priceOf } from "@/lib/price";
import { IMAGES } from "@/lib/images";

export default function HotelCard({ h }: { h: HotelWithDistance }) {
  const { stay, currency, setSelected } = useApp();
  const price = formatPrice(priceOf(h, stay), currency);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setSelected(h)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelected(h);
        }
      }}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 active:scale-[0.98] focus:outline-none focus-visible:border-brand-500 transition flex flex-col cursor-pointer"
    >
      <div className="relative h-44 sm:h-52 bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES[h.id]} alt={h.name} loading="lazy" className="w-full h-full object-cover" />

        <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-400/20">
          <i className="fa-solid fa-star text-[11px]" /> {h.rating}
        </div>

        <div
          className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
            h.isOpen ? "bg-emerald-500/80" : "bg-rose-500/80"
          }`}
        >
          {h.isOpen ? "Disponible" : "Complet"}
        </div>

        <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400 block leading-tight">{stay === "passage" ? "Passage" : "Nuitée"}</span>
          <span className="text-base font-bold text-brand-400 leading-tight">{price}</span>
        </div>
      </div>

      <div className="p-3.5 space-y-2">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-bold text-base text-white leading-snug min-w-0 break-words">{h.name}</h3>
          <span className="text-sm text-slate-400 font-medium whitespace-nowrap pt-0.5">{h.distanceKm} km</span>
        </div>

        <p className="text-sm text-slate-400 flex items-start gap-1.5">
          <i className="fa-solid fa-location-dot text-brand-500 text-xs mt-1" />
          <span className="min-w-0 break-words">{h.commune} — {h.landmark}</span>
        </p>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {h.amenities.slice(0, 3).map((a) => (
            <span key={a} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md border border-slate-700/50">
              {a}
            </span>
          ))}
          {h.amenities.length > 3 && (
            <span className="text-xs text-slate-500 self-center">+{h.amenities.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}