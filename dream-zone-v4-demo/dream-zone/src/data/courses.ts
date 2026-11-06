import type { Localized } from "@/i18n/config";

export type Course = {
  slug: string;
  name: Localized;
  /** Короткое описание. Пишем только то, что известно из брифа. */
  summary: Localized;
  /** false — направление упоминалось в публикациях, но не подтверждено центром. */
  confirmed: boolean;
  popular: boolean;
  // Необязательные поля: показываются, только если заполнены подтверждёнными данными.
  audience?: Localized;
  level?: Localized;
  format?: Localized;
  duration?: Localized;
  price?: Localized;
};

export const courses: Course[] = [
  {
    slug: "ielts",
    confirmed: true,
    popular: true,
    name: { ru: "IELTS", uz: "IELTS", en: "IELTS" },
    summary: {
      ru: "Подготовка к международному экзамену IELTS.",
      uz: "Xalqaro IELTS imtihoniga tayyorgarlik.",
      en: "Preparation for the international IELTS exam.",
    },
  },
  {
    slug: "cefr-multi-level",
    confirmed: true,
    popular: true,
    name: { ru: "CEFR / Multi-level", uz: "CEFR / Multi-level", en: "CEFR / Multi-level" },
    summary: {
      ru: "Подготовка к экзамену CEFR / Multi-level.",
      uz: "CEFR / Multi-level imtihoniga tayyorgarlik.",
      en: "Preparation for the CEFR / Multi-level exam.",
    },
  },
  {
    slug: "pre-ielts",
    confirmed: true,
    popular: true,
    name: { ru: "Pre-IELTS", uz: "Pre-IELTS", en: "Pre-IELTS" },
    summary: {
      ru: "Подготовительный курс перед IELTS.",
      uz: "IELTS oldidan tayyorlov kursi.",
      en: "A preparatory course before IELTS.",
    },
  },
  {
    slug: "general-english",
    confirmed: true,
    popular: true,
    name: { ru: "General English", uz: "General English", en: "General English" },
    summary: {
      ru: "Общий курс английского языка.",
      uz: "Ingliz tilining umumiy kursi.",
      en: "A general English course.",
    },
  },
  {
    slug: "russian",
    confirmed: true,
    popular: false,
    name: { ru: "Русский язык", uz: "Rus tili", en: "Russian" },
    summary: {
      ru: "Курс русского языка.",
      uz: "Rus tili kursi.",
      en: "A Russian language course.",
    },
  },
  // Ниже — направления, которые встречались в публикациях. Нужно подтверждение центра.
  {
    slug: "turkish",
    confirmed: false,
    popular: false,
    name: { ru: "Турецкий язык", uz: "Turk tili", en: "Turkish" },
    summary: {
      ru: "Направление уточняется у администратора.",
      uz: "Yoʻnalish administratordan aniqlashtiriladi.",
      en: "Ask the administrator whether this course is available.",
    },
  },
  {
    slug: "chess",
    confirmed: false,
    popular: false,
    name: { ru: "Шахматы", uz: "Shaxmat", en: "Chess" },
    summary: {
      ru: "Направление уточняется у администратора.",
      uz: "Yoʻnalish administratordan aniqlashtiriladi.",
      en: "Ask the administrator whether this course is available.",
    },
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}
