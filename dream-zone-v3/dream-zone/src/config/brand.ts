/**
 * Конфиг бренда. Для другого учебного центра в основном меняется этот файл,
 * файлы в src/data, словари в src/i18n/dictionaries, фото и цвета в globals.css.
 */
/** Безопасно разбирает адрес сайта: пустое или некорректное значение не должно ронять сборку. */
function resolveSiteUrl(): string {
  const fallback = "http://localhost:3000";
  let raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;
  if (!/^https?:\/\//.test(raw)) raw = `https://${raw}`;
  try {
    return new URL(raw).origin;
  } catch {
    return fallback;
  }
}

export const brand = {
  name: "DREAM ZONE",
  legalName: "Dream Zone LC",
  siteUrl: resolveSiteUrl(),

  /**
   * Путь к оригинальному логотипу (SVG/PNG с прозрачным фоном), например "/logo.svg".
   * Пока null — в шапке и футере временно показано текстовое название.
   */
  logo: null as string | null,

  images: {
    /** Фото для первого экрана, например "/images/hero.jpg". Пока null — показан помеченный блок-заглушка. */
    hero: null as string | null,
    heroAlt: "DREAM ZONE",
  },

  /** Только подтверждённые данные из брифа. Остальное оставлено null и не показывается. */
  contacts: {
    phone: "+998 95 150 16 66",
    phoneHref: "tel:+998951501666",
    telegram: "@DreamZone_Admin",
    telegramUrl: "https://t.me/DreamZone_Admin",
    channelUrl: "https://t.me/dreamzone_edu",
    address: null as string | null,
    hours: null as string | null,
    mapUrl: null as string | null,
  },
} as const;
