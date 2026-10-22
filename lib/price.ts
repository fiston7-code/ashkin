import type { Currency, Hotel, Stay } from "./types";

export const CDF_PER_USD = Number(process.env.NEXT_PUBLIC_CDF_PER_USD ?? 2850);

export const priceOf = (h: Hotel, stay: Stay) =>
  stay === "passage" ? h.pricePassageUSD : h.priceNuiteeUSD;

export function formatPrice(usd: number, currency: Currency): string {
  if (currency === "USD") return `$${usd}`;
  return `${Math.round(usd * CDF_PER_USD).toLocaleString("fr-FR")} FC`;
}