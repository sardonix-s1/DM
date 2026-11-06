import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { courses } from "@/data/courses";

export async function getPageContext(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l: Locale = lang;
  return { lang: l, dict: getDictionary(l) };
}

export function courseOptions(lang: Locale) {
  return courses.map((c) => ({ slug: c.slug, name: c.name[lang] }));
}
