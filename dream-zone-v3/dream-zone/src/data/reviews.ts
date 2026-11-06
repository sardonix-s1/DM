import type { Localized } from "@/i18n/config";

export type Review = {
  id: string;
  author: string;
  text: Localized;
  /** true — есть разрешение автора на публикацию. Без него запись не показывается. */
  permissionConfirmed: boolean;
};

/** Только настоящие отзывы с разрешением на публикацию. Пока пусто. */
export const reviews: Review[] = [];

export function getPublishableReviews() {
  return reviews.filter((r) => r.permissionConfirmed);
}
