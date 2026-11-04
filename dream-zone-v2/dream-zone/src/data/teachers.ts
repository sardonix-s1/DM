import type { Localized } from "@/i18n/config";

export type Teacher = {
  id: string;
  name: string;
  /** Путь к фото, например "/images/teachers/name.jpg". */
  photo?: string;
  specialty: Localized;
  /** Только подтверждённая квалификация и опыт. */
  bio?: Localized;
};

/** Пока пусто: нужны имена, фото и подтверждённые данные от центра. */
export const teachers: Teacher[] = [];
