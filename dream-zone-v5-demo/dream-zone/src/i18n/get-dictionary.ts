import type { Locale } from "./config";
import { ru, type Dictionary } from "./dictionaries/ru";
import { uz } from "./dictionaries/uz";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { ru, uz, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
