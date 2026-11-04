import Image from "next/image";
import type { Teacher } from "@/data/teachers";
import type { Locale } from "@/i18n/config";

export function TeacherCard({ teacher, lang }: { teacher: Teacher; lang: Locale }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-navy/10 bg-white shadow-card">
      <div className="relative aspect-[4/3] bg-sky">
        {teacher.photo && (
          <Image src={teacher.photo} alt={teacher.name} fill sizes="(min-width:1024px) 360px, 90vw" className="object-cover" />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-navy">{teacher.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand-deep">{teacher.specialty[lang]}</p>
        {teacher.bio && <p className="mt-3 text-sm text-ink/75">{teacher.bio[lang]}</p>}
      </div>
    </article>
  );
}
