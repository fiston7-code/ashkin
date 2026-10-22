"use client";
import { useApp, type HotelWithDistance } from "@/lib/store";
import { formatPrice, priceOf } from "@/lib/price";
import { IMAGES } from "@/lib/images";

export default function HotelCard({ h }: { h: HotelWithDistance }) {
  const { stay, currency, setSelected } = useApp();
  const price = formatPrice(priceOf(h, stay), currency);
  return (
    <div onClick={() => setSelected(h)} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition flex flex-col cursor-pointer">
      <div className="relative h-36 bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES[h.id]} alt={h.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-400 border border-amber-400/20">
          <i className="fa-solid fa-star text-[9px]" /> {h.rating}
        </div>
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold ${h.isOpen ? "bg-emerald-500/80" : "bg-rose-500/80"} text-white backdrop-blur`}>
          {h.isOpen ? "Disponible" : "Complet"}
        </div>
        <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-800">
          <span className="text-[9px] text-slate-400 block">{stay === "passage" ? "Passage" : "Nuitée"}</span>
          <span className="text-xs font-bold text-brand-400">{price}</span>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xs text-white truncate max-w-[200px]">{h.name}</h3>
          <span className="text-[10px] text-slate-400 font-medium">{h.distanceKm} km</span>
        </div>
        <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
          <i className="fa-solid fa-location-dot text-brand-500 text-[10px]" />
          <span>{h.commune} — {h.landmark}</span>
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {h.amenities.slice(0, 3).map((a) => (
            <span key={a} className="bg-slate-800 text-slate-300 text-[9px] px-1.5 py-0.5 rounded border border-slate-700/50">{a}</span>
          ))}
          {h.amenities.length > 3 && <span className="text-[9px] text-slate-500">+{h.amenities.length - 3}</span>}
        </div>
      </div>
    </div>
  );
}