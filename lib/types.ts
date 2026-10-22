export type Stay = "passage" | "nuitee";
export type Currency = "USD" | "CDF";
export type Lang = "FR" | "LN";

export interface Hotel {
  id: number;
  name: string;
  commune: string;
  lat: number;
  lng: number;
  pricePassageUSD: number;
  priceNuiteeUSD: number;
  rating: number;
  landmark: string;
  phone: string;
  isOpen: boolean;
  amenities: string[];
  image?: string;
}