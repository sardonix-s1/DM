import type { Localized } from "@/i18n/config";

export type GalleryImage = {
  /** Путь в public/, например "/images/gallery/class-1.jpg". */
  src: string;
  alt: Localized;
};

/** Реальные фотографии центра. Пока пусто. */
export const gallery: GalleryImage[] = [];
