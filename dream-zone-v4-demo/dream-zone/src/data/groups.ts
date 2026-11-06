import type { Localized } from "@/i18n/config";

export type Group = {
  id: string;
  courseSlug: string;
  teacher?: string;
  /** Дата старта в формате YYYY-MM-DD. После этой даты группа не считается открытой. */
  startDate: string;
  schedule?: Localized;
  format?: Localized;
  status: "open" | "soon" | "full";
  /** Пометка для демонстрационных записей. Перед публикацией удалить. */
  demo?: boolean;
};

/**
 * Список открытых групп. Пока пуст: на странице показывается «Уточните ближайший набор».
 * Пример записи:
 * { id: "ielts-nov", courseSlug: "ielts", startDate: "2026-11-15", status: "open",
 *   schedule: { ru: "Пн, Ср, Пт 18:00", uz: "Du, Cho, Ju 18:00", en: "Mon, Wed, Fri 6 pm" } }
 */
export const groups: Group[] = [];

/** Группы с прошедшей датой старта не показываются как открытые. */
export function getActiveGroups(now: Date = new Date()): Group[] {
  const today = now.toISOString().slice(0, 10);
  return groups.filter((g) => g.startDate >= today);
}
