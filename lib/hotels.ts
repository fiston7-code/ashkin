import type { Hotel } from "./types";

export const COMMUNES = [
  "Gombe", "Bandalungwa", "Kalamu", "Limete",
  "Lemba", "Ngaliema", "Kintambo", "Kasa-Vubu", "Matete", 
  "barumbu"
] as const;

export const KINSHASA_CENTER = { lat: -4.335, lng: 15.305 };

export const hotels: Hotel[] = [
  { id: 1, name: "BGBH", commune: "Kalamu", lat: -4.3033, lng: 15.3082, pricePassageUSD: 10, priceNuiteeUSD: 15, rating: 4.6, landmark: "Avenue Bozene N.33 Q. Matonge , ref: école monseigneur moke ", phone: "+243994118760", isOpen: true, amenities: ["electricite", "Clim", "Eau", ] },
  { id: 2, name: "kimia hebergement", commune: "kasa-vubu", lat: -4.3385, lng: 15.2861, pricePassageUSD: 10, priceNuiteeUSD: 15, rating: 4.4, landmark: "Avenue: lukandu N.35 , ref: direction gambela-shaba", phone: "+243962319255", isOpen: true, amenities: [ "Clim", "2 bouteils d'Eau ", "wifi"] },
  { id: 3, name: "B.Lodge", commune: "Barumbu", lat: -4.3412, lng: 15.3128, pricePassageUSD: 10, priceNuiteeUSD: 15, rating: 4.2, landmark:"Avenue Progres, N 257 Q. Bon Marche, ref: Shettah 2, avant chapelle de vainqeur", phone: "+243829448292", isOpen: true, amenities: ["Clim", "Eau 24/24h", "Sécurité 24h"] },
  { id: 4, name: "Yala Hotel", commune: "Kasa-Vubu", lat: -4.3582, lng: 15.3371, pricePassageUSD: 35, priceNuiteeUSD: 35, rating: 4.5, landmark: "Avenue: Oshwe N.22, ref: direction ethiopie", phone: "+243895873198", isOpen: true, amenities: ["petit déjeuner", "Clim", "Piscine", "Wifi", "Sécurité 24h", "Ascenseur"] },
  { id: 5, name: "Chez kulutu", commune: "Kintambo", lat: -4.3891, lng: 15.3285, pricePassageUSD: 10, priceNuiteeUSD: 18, rating: 4.0, landmark: "Avenue: banana N.61, ref: arret mabaya", phone: "+243856845887", isOpen: true, amenities: [ "Eau"] },
  // { id: 6, name: "Le Palmier Ngaliema", commune: "Ngaliema", lat: -4.321, lng: 15.2642, pricePassageUSD: 30, priceNuiteeUSD: 55, rating: 4.7, landmark: "Ma Campagne, vers la colline", phone: "+243900000006", isOpen: true, amenities: ["Groupe électrogène", "Clim", "Wifi", "Vue", "Eau chaude"] },
  // { id: 7, name: "Relais de Kintambo Magasin", commune: "Kintambo", lat: -4.3168, lng: 15.279, pricePassageUSD: 15, priceNuiteeUSD: 28, rating: 4.1, landmark: "Kintambo Magasin, près du grand rond-point", phone: "+243810000007", isOpen: false, amenities: ["Clim", "Groupe électrogène"] },
  // { id: 8, name: "Hôtel Secret Kasa-Vubu", commune: "Kasa-Vubu", lat: -4.335, lng: 15.305, pricePassageUSD: 14, priceNuiteeUSD: 25, rating: 4.3, landmark: "Avenue Assossa, près du Stade des Martyrs", phone: "+243820000008", isOpen: true, amenities: ["Clim", "Bar", "Wifi"] },
  
];