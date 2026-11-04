import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { locales, ogLocales, type Locale } from "@/i18n/config";

/** path — без языка, например "" для главной или "/courses". */
export function buildMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const { lang, path, title, description } = opts;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${path}`;

  return {
    title,
    description,
    alternates: { canonical: `/${lang}${path}`, languages },
    openGraph: {
      title,
      description,
      url: `/${lang}${path}`,
      siteName: brand.name,
      locale: ogLocales[lang],
      type: "website",
    },
  };
}
