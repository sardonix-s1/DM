import Link from "next/link";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";
import { Logo } from "./Logo";
import { Spoiler } from "./Spoiler";

const links = ["courses", "about", "teachers", "groups", "gallery", "contacts"] as const;

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const c = brand.contacts;
  return (
    <footer className="mt-24 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm text-white/70">{dict.footer.tagline}</p>
        </div>
        <nav aria-label={dict.footer.sections}>
          <h2 className="text-sm font-semibold text-white/60">{dict.footer.sections}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {links.map((k) => (
              <li key={k}>
                <Link href={`/${lang}/${k}`} className="hover:text-cyan">
                  {dict.nav[k]}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${lang}/privacy`} className="hover:text-cyan">
                {dict.form.privacy}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white/60">{dict.footer.contacts}</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Spoiler hint={dict.common.reveal} href={c.phoneHref}>
                {c.phone}
              </Spoiler>
            </li>
            <li>
              <Spoiler hint={dict.common.reveal} href={c.telegramUrl} external>
                {c.telegram}
              </Spoiler>
            </li>
            <li>
              <Spoiler hint={dict.common.reveal} href={c.channelUrl} external>
                {dict.contacts.channel}
              </Spoiler>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {brand.name}. {dict.footer.rights} {dict.footer.photos}
      </div>
    </footer>
  );
}
