import type { Localized } from "@/i18n/config";
import { pexels } from "@/lib/photos";

export type ResultPhoto = {
  src: string;
  caption: Localized;
};

/**
 * ДЕМО: стоковые фото вместо настоящих результатов. Без баллов и выдуманных цифр.
 * Перед публикацией заменить фотографиями выпускников центра (с разрешением на публикацию).
 */
export const resultPhotos: ResultPhoto[] = [
  {
    src: pexels(7972710, 900),
    caption: { ru: "Выпускники с сертификатами", uz: "Sertifikatli bitiruvchilar", en: "Graduates with certificates" },
  },
  {
    src: pexels(16255363, 900),
    caption: { ru: "Праздник выпускников", uz: "Bitiruvchilar bayrami", en: "Graduation celebration" },
  },
  {
    src: pexels(7944238, 900),
    caption: { ru: "Радость после экзамена", uz: "Imtihondan keyingi quvonch", en: "Celebrating after the exam" },
  },
  {
    src: pexels(8106652, 900),
    caption: { ru: "Группа выпускников", uz: "Bitiruvchilar guruhi", en: "A group of graduates" },
  },
];
