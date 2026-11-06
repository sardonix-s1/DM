"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";

export function LangSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(ru|uz|en)/, "");

  return (
    <nav aria-label={label} className="flex rounded-full border border-navy/15 p-0.5 text-sm font-medium">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`rounded-full px-3 py-1 transition-colors ${
            l === lang ? "bg-navy text-white" : "text-ink hover:bg-sky"
          }`}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </nav>
  );
}
