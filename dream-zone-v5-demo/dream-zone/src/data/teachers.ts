import type { Localized } from "@/i18n/config";
import { pexels } from "@/lib/photos";

export type Teacher = {
  id: string;
  name: Localized;
  /** Путь к фото, например "/images/teachers/name.jpg". */
  photo?: string;
  specialty: Localized;
  /** Только подтверждённая квалификация и опыт. */
  bio?: Localized;
  /** true — демонстрационная карточка (стоковое фото, без имени). Перед публикацией заменить. */
  demo?: boolean;
};

const n = (i: number): Localized => ({
  ru: `Преподаватель ${i}`,
  uz: `Oʻqituvchi ${i}`,
  en: `Teacher ${i}`,
});

const ielts: Localized = { ru: "IELTS", uz: "IELTS", en: "IELTS" };
const general: Localized = { ru: "General English", uz: "General English", en: "General English" };
const russian: Localized = { ru: "Русский язык", uz: "Rus tili", en: "Russian" };
const cefr: Localized = { ru: "CEFR / Multi-level", uz: "CEFR / Multi-level", en: "CEFR / Multi-level" };
const preIelts: Localized = { ru: "Pre-IELTS", uz: "Pre-IELTS", en: "Pre-IELTS" };

/** ДЕМО: стоковые фото и безымянные карточки. Без выдуманных биографий и квалификаций. */
export const teachers: Teacher[] = [
  { id: "demo-1", demo: true, name: n(1), photo: pexels(8423062, 800), specialty: ielts },
  { id: "demo-2", demo: true, name: n(2), photo: pexels(6325958, 800), specialty: general },
  { id: "demo-3", demo: true, name: n(3), photo: pexels(5212321, 800), specialty: russian },
  { id: "demo-4", demo: true, name: n(4), photo: pexels(8617725, 800), specialty: cefr },
  { id: "demo-5", demo: true, name: n(5), photo: pexels(5905751, 800), specialty: preIelts },
  { id: "demo-6", demo: true, name: n(6), photo: pexels(38889899, 800), specialty: ielts },
  { id: "demo-7", demo: true, name: n(7), photo: pexels(5212320, 800), specialty: general },
  { id: "demo-8", demo: true, name: n(8), photo: pexels(8502048, 800), specialty: russian },
  { id: "demo-9", demo: true, name: n(9), photo: pexels(8500408, 800), specialty: cefr },
];
