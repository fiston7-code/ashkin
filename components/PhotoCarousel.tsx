
"use client";

import { useRef, useState } from "react";

export default function PhotoCarousel({
  photos,
  alt,
}: {
  photos: string[];
  alt: string;
}) {
  const [i, setI] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function goToPhoto(index: number) {
    const track = trackRef.current;
    if (!track || photos.length === 0) return;

    const next = (index + photos.length) % photos.length;

    track.scrollTo({
      left: next * track.clientWidth,
      behavior: "smooth",
    });

    setI(next);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    setI(
      Math.round(track.scrollLeft / track.clientWidth)
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-800 text-sm text-slate-400">
        Aucune photo disponible
      </div>
    );
  }

  return (
    <div className="group relative h-full w-full overflow-hidden bg-slate-900">
      {/* Photos avec défilement fluide */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {photos.map((src, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${alt} - photo ${n + 1}`}
            loading={n === 0 ? "eager" : "lazy"}
            draggable={false}
            className="h-full w-full shrink-0 snap-center object-cover"
          />
        ))}
      </div>

      {/* Flèche précédente */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={() => goToPhoto(i - 1)}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/65 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-slate-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Flèche suivante */}
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={() => goToPhoto(i + 1)}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/65 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-slate-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Indicateurs de position */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/65 px-3 py-2 backdrop-blur-sm">
            {photos.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Afficher la photo ${n + 1}`}
                aria-current={i === n ? "true" : undefined}
                onClick={() => goToPhoto(n)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === n
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Compteur de photos */}
          <div className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-slate-950/65 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {i + 1} / {photos.length}
          </div>
        </>
      )}
    </div>
  );
}
