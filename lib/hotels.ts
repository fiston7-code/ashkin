import type { Hotel } from "./types";

export const COMMUNES = [
  "Gombe", "Bandalungwa", "Kalamu", "Limete",
  "Lemba", "Ngaliema", "Kintambo", "Kasa-Vubu",
] as const;

export const KINSHASA_CENTER = { lat: -4.335, lng: 15.305 };

export const hotels: Hotel[] = [
  { id: 1, name: "Résidence Le Fleuve Quietude", commune: "Gombe", lat: -4.3033, lng: 15.3082, pricePassageUSD: 25, priceNuiteeUSD: 45, rating: 4.6, landmark: "Avenue Justice, en face de l'école belge", phone: "+243810000001", isOpen: true, amenities: ["Groupe électrogène", "Clim", "Eau chaude", "Wifi", "Parking"] },
  { id: 2, name: "Hôtel Plaza Bandal", commune: "Bandalungwa", lat: -4.3385, lng: 15.2861, pricePassageUSD: 15, priceNuiteeUSD: 30, rating: 4.4, landmark: "Bandal Synafoc, derrière le terrain de basket", phone: "+243820000002", isOpen: true, amenities: ["Groupe électrogène", "Clim", "Eau chaude", "Bar"] },
  { id: 3, name: "Auberge Victoire Palace", commune: "Kalamu", lat: -4.3412, lng: 15.3128, pricePassageUSD: 12, priceNuiteeUSD: 22, rating: 4.2, landmark: "Place Victoire, derrière la maison communale", phone: "+243840000003", isOpen: true, amenities: ["Clim", "Eau chaude", "Sécurité 24h"] },
  { id: 4, name: "Villa Discrétion Limete", commune: "Limete", lat: -4.3582, lng: 15.3371, pricePassageUSD: 20, priceNuiteeUSD: 35, rating: 4.5, landmark: "Limete Résidentiel, 7ème Rue, près de la station", phone: "+243850000004", isOpen: true, amenities: ["Groupe électrogène", "Clim", "Parking fermé", "Wifi"] },
  { id: 5, name: "Oasis de Lemba Terminus", commune: "Lemba", lat: -4.3891, lng: 15.3285, pricePassageUSD: 10, priceNuiteeUSD: 18, rating: 4.0, landmark: "Lemba Terminus, à côté du marché", phone: "+243890000005", isOpen: true, amenities: ["Clim", "Eau chaude"] },
  { id: 6, name: "Le Palmier Ngaliema", commune: "Ngaliema", lat: -4.321, lng: 15.2642, pricePassageUSD: 30, priceNuiteeUSD: 55, rating: 4.7, landmark: "Ma Campagne, vers la colline", phone: "+243900000006", isOpen: true, amenities: ["Groupe électrogène", "Clim", "Wifi", "Vue", "Eau chaude"] },
  { id: 7, name: "Relais de Kintambo Magasin", commune: "Kintambo", lat: -4.3168, lng: 15.279, pricePassageUSD: 15, priceNuiteeUSD: 28, rating: 4.1, landmark: "Kintambo Magasin, près du grand rond-point", phone: "+243810000007", isOpen: false, amenities: ["Clim", "Groupe électrogène"] },
  { id: 8, name: "Hôtel Secret Kasa-Vubu", commune: "Kasa-Vubu", lat: -4.335, lng: 15.305, pricePassageUSD: 14, priceNuiteeUSD: 25, rating: 4.3, landmark: "Avenue Assossa, près du Stade des Martyrs", phone: "+243820000008", isOpen: true, amenities: ["Clim", "Bar", "Wifi"] },
  { id: 9, name: "Eden Rose Matonge", commune: "Kalamu", lat: -4.344, lng: 15.316, pricePassageUSD: 18, priceNuiteeUSD: 30, rating: 4.4, landmark: "Au cœur de Matonge, avenue Stade", phone: "+243840000009", isOpen: true, amenities: ["Groupe électrogène", "Clim", "Eau chaude"] },
  { id: 10, name: "Résidence Bandal Tschangu", commune: "Bandalungwa", lat: -4.341, lng: 15.289, pricePassageUSD: 20, priceNuiteeUSD: 38, rating: 4.5, landmark: "Bandal Makelele, près de l'arrêt Block", phone: "+243850000010", isOpen: true, amenities: ["Groupe électrogène", "Clim", "Eau chaude", "Parking"] },
];