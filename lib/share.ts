import type { Hotel, Stay } from "./types";
import { mapsLink } from "./geo";

export function shareMessage(h: Hotel, stay: Stay, time: string, price: string) {
  const type = stay === "passage" ? "un passage" : "une nuitée";
  return (
    `Coucou ! Je propose qu'on se retrouve pour ${type} à ${h.name} (${h.commune}).\n` +
    `• Tarif : ${price}\n` +
    `• Repère : ${h.landmark}\n` +
    `• Heure : ${time}\n` +
    `• Localisation : ${mapsLink(h)}\n` +
    `Dis-moi si c'est bon pour toi !`
  );
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/?text=${encodeURIComponent(text)}`;
