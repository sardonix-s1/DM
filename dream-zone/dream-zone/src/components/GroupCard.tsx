import type { Group } from "@/data/groups";
import { getCourse } from "@/data/courses";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";

export function GroupCard({ group, lang, dict }: { group: Group; lang: Locale; dict: Dictionary }) {
  const course = getCourse(group.courseSlug);
  const date = new Date(group.startDate + "T00:00:00").toLocaleDateString(lang === "uz" ? "uz-UZ" : lang, {
    day: "numeric",
    month: "long",
  });
  const rows: [string, string | undefined][] = [
    [dict.groups.start, date],
    [dict.groups.schedule, group.schedule?.[lang]],
    [dict.groups.teacher, group.teacher],
    [dict.groups.format, group.format?.[lang]],
  ];

  return (
    <article className="rounded-[var(--radius-card)] border border-navy/10 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-navy">{course?.name[lang] ?? group.courseSlug}</h3>
        <span className="shrink-0 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-brand-deep">
          {dict.groups.status[group.status]}
        </span>
      </div>
      {group.demo && <p className="mt-1 text-xs font-medium text-ink/60">{dict.common.demo}</p>}
      <dl className="mt-4 grid gap-2 text-sm">
        {rows
          .filter((r): r is [string, string] => Boolean(r[1]))
          .map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-ink/60">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
      </dl>
    </article>
  );
}
