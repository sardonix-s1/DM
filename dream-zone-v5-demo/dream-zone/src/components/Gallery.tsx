"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "@/data/gallery";
import type { Locale } from "@/i18n/config";
import { Photo } from "./Photo";

export function Gallery({
  images,
  lang,
  labels,
}: {
  images: GalleryImage[];
  lang: Locale;
  labels: { open: string; close: string };
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${labels.open}: ${img.alt[lang]}`}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sky"
            >
              <Photo
                src={img.src}
                alt={img.alt[lang]}
                className="transition-transform duration-300 hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[active].alt[lang]}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy"
          >
            {labels.close}
          </button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[active].src}
              alt={images[active].alt[lang]}
              referrerPolicy="no-referrer"
              className="mx-auto max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
