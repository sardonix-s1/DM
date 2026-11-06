import Link from "next/link";
import type { Course } from "@/data/courses";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";

export function CourseCard({ course, lang, dict }: { course: Course; lang: Locale; dict: Dictionary }) {
  return (
    <Link
      href={`/${lang}/courses/${course.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-navy/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand"
    >
      <h3 className="font-display text-xl font-semibold text-navy">{course.name[lang]}</h3>
      <p className="mt-2 flex-1 text-ink/75">{course.summary[lang]}</p>
      <div className="mt-5 flex items-center justify-between text-sm font-semibold text-brand-deep">
        <span>{dict.common.details}</span>
        {!course.confirmed && (
          <span className="rounded-full bg-sky px-2.5 py-0.5 text-xs font-medium text-ink/70">
            {dict.common.toConfirm}
          </span>
        )}
      </div>
    </Link>
  );
}
