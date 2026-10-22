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
    html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${open ? "#db2777" : "#64748b"};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -24],
  });

export default function MapView() {
  const state = useApp();
  const { stay, currency, position, setSelected } = state;
  const list = selectHotels(state);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const center = position ?? KINSHASA_CENTER;

  return (
    <section className="flex-1 relative isolate bg-slate-900 flex flex-col min-h-[420px]">
      <MapContainer ref={setMap} center={[center.lat, center.lng]} zoom={13} style={{ height: "100%", width: "100%", position: "absolute", inset: 0 }}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={18} />

        {position && (
          <CircleMarker center={[position.lat, position.lng]} radius={8} pathOptions={{ color: "#fff", fillColor: "#3b82f6", fillOpacity: 1, weight: 3 }}>
            <Popup>Vous êtes ici</Popup>
          </CircleMarker>
        )}

        {list.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={pin(h.isOpen)}>
            <Popup>
              <div className="w-40 text-slate-900 text-xs">
                <strong>{h.name}</strong>
                <br />
                <span className="font-bold" style={{ color: "#db2777" }}>{formatPrice(priceOf(h, stay), currency)}</span> ({h.commune})
                <button onClick={() => setSelected(h)} className="mt-1.5 w-full bg-brand-600 text-white rounded-md py-1 text-[10px]">
                  Voir la fiche
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-3 left-3 right-3 z-[500] bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-xs text-slate-300 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <i className="fa-solid fa-circle-info text-brand-400" /> Cliquez sur un marqueur pour voir la fiche
        </span>
        <button onClick={() => map?.setView([center.lat, center.lng], 13)} className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-[10px]">
          Recentrer
        </button>
      </div>
    </section>
  );
}