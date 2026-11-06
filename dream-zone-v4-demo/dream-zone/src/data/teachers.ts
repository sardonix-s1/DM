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

/** ДЕМО: стоковые фото и безымянные карточки. Без выдуманных биографий и квалификаций. */
export const teachers: Teacher[] = [
  {
    id: "demo-1",
    demo: true,
    name: { ru: "Преподаватель 1", uz: "Oʻqituvchi 1", en: "Teacher 1" },
    photo: pexels(8423062, 800),
    specialty: { ru: "IELTS", uz: "IELTS", en: "IELTS" },
  },
  {
    id: "demo-2",
    demo: true,
    name: { ru: "Преподаватель 2", uz: "Oʻqituvchi 2", en: "Teacher 2" },
    photo: pexels(6325958, 800),
    specialty: { ru: "General English", uz: "General English", en: "General English" },
  },
  {
    id: "demo-3",
    demo: true,
    name: { ru: "Преподаватель 3", uz: "Oʻqituvchi 3", en: "Teacher 3" },
    photo: pexels(5212321, 800),
    specialty: { ru: "Русский язык", uz: "Rus tili", en: "Russian" },
  },
];
