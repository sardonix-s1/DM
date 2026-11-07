import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { locales } from "@/i18n/config";
import { courses } from "@/data/courses";

const pages = ["", "/courses", "/about", "/teachers", "/groups", "/results", "/gallery", "/contacts", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...courses.map((c) => `/courses/${c.slug}`)];
  return locales.flatMap((lang) =>
    paths.map((p) => ({
      url: `${brand.siteUrl}/${lang}${p}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${brand.siteUrl}/${l}${p}`])),
      },
    })),
  );
}
