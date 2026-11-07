import type { ResultPhoto } from "@/data/results";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";
import { Photo } from "./Photo";
import { DemoBadge } from "./ui";

export function ResultCard({ item, lang, dict }: { item: ResultPhoto; lang: Locale; dict: Dictionary }) {
  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-navy/10 bg-white shadow-card">
      <div className="relative aspect-[4/3] bg-sky">
        <Photo src={item.src} alt={item.caption[lang]} />
        <DemoBadge label={dict.common.demo} />
      </div>
      <figcaption className="p-4 text-sm font-medium text-navy">{item.caption[lang]}</figcaption>
    </figure>
  );
}
