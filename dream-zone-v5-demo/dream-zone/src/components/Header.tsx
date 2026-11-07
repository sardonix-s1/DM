"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";

const links = ["courses", "about", "teachers", "groups", "results", "gallery", "contacts"] as const;

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${lang}`} aria-label={dict.nav.home} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map((k) => (
            <Link key={k} href={`/${lang}/${k}`} className="text-ink transition-colors hover:text-brand-deep">
              {dict.nav[k]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} label={dict.common.language} />
          <Link
            href={`/${lang}/contacts#apply`}
            className="hidden rounded-full bg-brand-deep px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy sm:inline-block"
          >
            {dict.common.apply}
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.common.closeMenu : dict.common.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-navy/10 bg-white px-4 py-4 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((k) => (
              <li key={k}>
                <Link
                  href={`/${lang}/${k}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-sky"
                >
                  {dict.nav[k]}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${lang}/contacts#apply`}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-brand-deep px-5 py-3 text-center font-semibold text-white"
              >
                {dict.common.apply}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
