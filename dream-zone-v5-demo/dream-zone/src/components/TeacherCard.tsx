import type { Teacher } from "@/data/teachers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";
import { Photo } from "./Photo";
import { DemoBadge } from "./ui";

export function TeacherCard({ teacher, lang, dict }: { teacher: Teacher; lang: Locale; dict: Dictionary }) {
  const name = teacher.name[lang];
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-navy/10 bg-white shadow-card">
      <div className="relative aspect-[4/5] bg-sky">
        {teacher.photo && <Photo src={teacher.photo} alt={name} />}
        {teacher.demo && <DemoBadge label={dict.common.demo} />}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-navy">{name}</h3>
        <p className="mt-1 text-sm font-medium text-brand-deep">{teacher.specialty[lang]}</p>
        {teacher.bio && <p className="mt-3 text-sm text-ink/75">{teacher.bio[lang]}</p>}
      </div>
    </article>
  );
}
