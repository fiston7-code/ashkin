// Photos réelles : public/hotels/<id>/1.webp, 2.webp, ...

// Ajoute une ligne ici quand tu as les photos d'un hôtel.
const PLACEHOLDER = "/hotels/placeholder.svg";

const PHOTOS: Record<number, string[]> = {
  1: ["/hotels/1/1.webp", "/hotels/1/2.webp", "/hotels/1/3.webp", "/hotels/1/4.webp"],
  2: ["/hotels/2/1.webp", "/hotels/2/2.webp", "/hotels/2/3.webp", "/hotels/2/4.webp"],
  3: ["/hotels/3/1.webp", "/hotels/3/2.webp", "/hotels/3/3.webp", "/hotels/3/4.webp"],
  4: ["/hotels/4/1.webp", "/hotels/4/2.webp", "/hotels/4/3.webp", "/hotels/4/4.webp"],
  5: ["/hotels/5/1.webp", "/hotels/5/2.webp", "/hotels/5/3.webp"],
  6: ["/hotels/6/1.webp", "/hotels/6/2.webp", "/hotels/6/3.webp", "/hotels/6/4.webp"],
  7: ["/hotels/7/1.webp", "/hotels/7/2.webp", "/hotels/7/3.webp", "/hotels/7/4.webp"],
  8: ["/hotels/8/1.webp", "/hotels/8/2.webp", "/hotels/8/3.webp", "/hotels/8/4.webp"],
};

export const photosOf = (id: number): string[] =>
  PHOTOS[id] && PHOTOS[id].length > 0 ? PHOTOS[id] : [PLACEHOLDER];

export const coverOf = (id: number): string => photosOf(id)[0];
