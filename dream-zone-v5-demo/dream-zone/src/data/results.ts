import type { Localized } from "@/i18n/config";
import { pexels } from "@/lib/photos";

export type ResultPhoto = {
  src: string;
  caption: Localized;
};

/**
 * ДЕМО: стоковые фото сертификатов вместо настоящих. Без имён, баллов и выдуманных цифр.
 * Перед публикацией заменить сканами или фото настоящих сертификатов выпускников центра
 * (с разрешением на публикацию).
 */
export const resultPhotos: ResultPhoto[] = [
  {
    src: pexels(8177922, 900),
    caption: { ru: "Сертификат об окончании курса", uz: "Kursni tugatganlik haqida sertifikat", en: "Course completion certificate" },
  },
  {
    src: pexels(9829483, 900),
    caption: { ru: "Сертификат ученика", uz: "Oʻquvchi sertifikati", en: "A student's certificate" },
  },
  {
    src: pexels(2293027, 900),
    caption: { ru: "Полученный сертификат", uz: "Olingan sertifikat", en: "A certificate received" },
  },
  {
    src: pexels(7944121, 900),
    caption: { ru: "Сертификат в руках выпускника", uz: "Bitiruvchi qoʻlidagi sertifikat", en: "A certificate in a graduate's hands" },
  },
  {
    src: pexels(7942548, 900),
    caption: { ru: "Вручение сертификата", uz: "Sertifikat topshirish", en: "Receiving a certificate" },
  },
  {
    src: pexels(7972710, 900),
    caption: { ru: "Ученики с сертификатами", uz: "Sertifikatli oʻquvchilar", en: "Students with certificates" },
  },
];
