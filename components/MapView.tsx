"use client";
import { useState } from "react";
import L, { type Map as LeafletMap } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { useApp, selectHotels } from "@/lib/store";
import { KINSHASA_CENTER } from "@/lib/hotels";
import { formatPrice, priceOf } from "@/lib/price";

const pin = (open: boolean) =>
  L.divIcon({
    className: "",
    html: `<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center"><div style="width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${open ? "#db2777" : "#64748b"};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -38],
  });

export default function MapView() {
  const state = useApp();
  const { stay, currency, position, setSelected } = state;
  const list = selectHotels(state);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const center = position ?? KINSHASA_CENTER;

  return (
    <section className="flex-1 relative isolate bg-slate-900 flex flex-col min-h-[60dvh]">
      <MapContainer
        ref={setMap}
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%", position: "absolute", inset: 0 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {position && (
          <CircleMarker
            center={[position.lat, position.lng]}
            radius={9}
            pathOptions={{ color: "#fff", fillColor: "#3b82f6", fillOpacity: 1, weight: 3 }}
          >
            <Popup>Vous êtes ici</Popup>
          </CircleMarker>
        )}

        {list.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={pin(h.isOpen)}>
            <Popup minWidth={190} maxWidth={240} autoPanPaddingBottomRight={[20, 100]}>
              <div className="text-slate-900 space-y-1">
                <strong className="block text-base leading-snug">{h.name}</strong>
                <div className="text-sm">
                  <span className="font-bold" style={{ color: "#db2777" }}>
                    {formatPrice(priceOf(h, stay), currency)}
                  </span>{" "}
                  · {h.commune}
                </div>
                {!h.isOpen && <div className="text-xs font-semibold text-rose-600">Actuellement complet</div>}
                <button
                  onClick={() => setSelected(h)}
                  className="mt-2 w-full min-h-11 bg-brand-600 text-white rounded-lg py-2 text-sm font-semibold active:scale-95 transition"
                >
                  Voir la fiche
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {list.length === 0 && (
        <div className="absolute top-3 left-3 right-3 z-[1000] bg-slate-900/95 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 text-center">
          Aucun hôtel pour ces filtres. Augmentez le budget ou changez de commune dans l&apos;onglet Hôtels.
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-[1000] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 pl-3.5 text-sm text-slate-300 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 min-w-0">
            <i className="fa-solid fa-circle-info text-brand-400 shrink-0" />
            <span className="truncate">
              <span className="sm:hidden">Touchez un marqueur</span>
              <span className="hidden sm:inline">Cliquez sur un marqueur pour voir la fiche</span>
            </span>
          </span>
          <button
            onClick={() => map?.setView([center.lat, center.lng], 13)}
            className="min-h-11 shrink-0 bg-slate-800 hover:bg-slate-700 active:scale-95 transition px-4 rounded-lg border border-slate-700 text-sm font-medium"
          >
            Recentrer
          </button>
        </div>
      </div>
    </section>
  );
}