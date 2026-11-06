import type { Localized } from "@/i18n/config";
import { pexels } from "@/lib/photos";

export type GalleryImage = {
  /** Путь в public/ (например "/images/gallery/class-1.jpg") или адрес картинки. */
  src: string;
  alt: Localized;
};

/** ДЕМО: стоковые фото Pexels. Перед публикацией заменить настоящими фотографиями центра. */
export const gallery: GalleryImage[] = [
  {
    src: pexels(29242202, 1200),
    alt: { ru: "Занятие английским в классе", uz: "Sinfda ingliz tili darsi", en: "An English class in session" },
  },
  {
    src: pexels(29242208, 1200),
    alt: { ru: "Ученики в аудитории", uz: "Auditoriyadagi oʻquvchilar", en: "Students in the classroom" },
  },
  {
    src: pexels(8199759, 1200),
    alt: { ru: "Самостоятельная подготовка с ноутбуком", uz: "Noutbuk bilan mustaqil tayyorgarlik", en: "Self-study with a laptop" },
  },
  {
    src: pexels(8199761, 1200),
    alt: { ru: "Совместная работа над заданием", uz: "Topshiriq ustida birgalikda ishlash", en: "Working on a task together" },
  },
  {
    src: pexels(16420473, 1200),
    alt: { ru: "Группа учеников за занятиями", uz: "Dars paytidagi oʻquvchilar guruhi", en: "A group of students studying" },
  },
  {
    src: pexels(7777691, 1200),
    alt: { ru: "Ученики с ноутбуками", uz: "Noutbukli oʻquvchilar", en: "Students with laptops" },
  },
];
