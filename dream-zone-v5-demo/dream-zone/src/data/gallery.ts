import type { Localized } from "@/i18n/config";
import { pexels } from "@/lib/photos";

export type GalleryImage = {
  /** Путь в public/ (например "/images/gallery/class-1.jpg") или адрес картинки. */
  src: string;
  alt: Localized;
};

const img = (id: number, ru: string, uz: string, en: string): GalleryImage => ({
  src: pexels(id, 1200),
  alt: { ru, uz, en },
});

/** ДЕМО: стоковые фото Pexels. Перед публикацией заменить настоящими фотографиями центра. */
export const gallery: GalleryImage[] = [
  img(29242202, "Занятие английским в классе", "Sinfda ingliz tili darsi", "An English class in session"),
  img(29242208, "Ученики в аудитории", "Auditoriyadagi oʻquvchilar", "Students in the classroom"),
  img(8199759, "Самостоятельная подготовка с ноутбуком", "Noutbuk bilan mustaqil tayyorgarlik", "Self-study with a laptop"),
  img(8199761, "Совместная работа над заданием", "Topshiriq ustida birgalikda ishlash", "Working on a task together"),
  img(16420473, "Группа учеников за занятиями", "Dars paytidagi oʻquvchilar guruhi", "A group of students studying"),
  img(7777691, "Ученики с ноутбуками", "Noutbukli oʻquvchilar", "Students with laptops"),
  img(5427868, "Преподаватель ведёт урок английского", "Oʻqituvchi ingliz tili darsini olib boryapti", "A teacher giving an English lesson"),
  img(5905444, "Преподаватель объясняет план занятия", "Oʻqituvchi dars rejasini tushuntirmoqda", "A teacher explaining the lesson plan"),
  img(6683485, "Разговор учеников на занятии", "Darsdagi oʻquvchilar suhbati", "Students talking in class"),
  img(5676744, "Учёба в группе", "Guruhda oʻqish", "Studying together in a group"),
  img(8419263, "Ученики в библиотеке", "Kutubxonadagi oʻquvchilar", "Students in the library"),
  img(16420457, "Группа за подготовкой к занятиям", "Darsga tayyorgarlik koʻrayotgan guruh", "A group preparing for class"),
  img(8199770, "Ученики за общим столом", "Umumiy stol atrofidagi oʻquvchilar", "Students at a shared desk"),
  img(9572688, "Подготовка к экзамену", "Imtihonga tayyorgarlik", "Preparing for an exam"),
];
