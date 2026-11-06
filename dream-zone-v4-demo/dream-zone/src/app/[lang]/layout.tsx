import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/onest";
import "@fontsource-variable/unbounded";
import "../globals.css";
import { brand } from "@/config/brand";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { diag, probe } from "@/lib/diag";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const generateMetadata = diag(
  "layout.generateMetadata",
  async ({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> => {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const dict = getDictionary(lang);
    return {
      metadataBase: new URL(brand.siteUrl),
      ...buildMetadata({ lang, path: "", title: dict.meta.title, description: dict.meta.description }),
      title: { default: dict.meta.title, template: `%s — ${brand.name}` },
      icons: { icon: "/favicon.svg" },
    };
  },
);

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const tree = (
    <html lang={lang}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.common.skip}
        </a>
        <Header lang={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
  await probe(tree); // ВРЕМЕННО: печатает настоящие ошибки в лог сборки ([DIAG]), ничего не скрывает
  return tree;
}
