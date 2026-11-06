import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader, Section } from "@/components/ui";
import { courses, getCourse } from "@/data/courses";
import { locales } from "@/i18n/config";
import { courseOptions, getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { diag } from "@/lib/diag";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => courses.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await getPageContext(params);
  const course = getCourse(slug);
  if (!course) return {};
  return buildMetadata({
    lang,
    path: `/courses/${slug}`,
    title: course.name[lang],
    description: course.summary[lang],
  });
}

export default diag("CoursePage", async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const { lang, dict } = await getPageContext(params);
  const course = getCourse(slug);
  if (!course) notFound();

  // Показываем только заполненные и подтверждённые поля.
  const facts: [string, string | undefined][] = [
    [dict.courses.audience, course.audience?.[lang]],
    [dict.courses.level, course.level?.[lang]],
    [dict.courses.format, course.format?.[lang]],
    [dict.courses.duration, course.duration?.[lang]],
    [dict.courses.price, course.price?.[lang]],
  ];
  const filled = facts.filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <>
      <PageHeader title={course.name[lang]} lead={course.summary[lang]} />
      <Section>
        <p className="mb-6">
          <Link href={`/${lang}/courses`} className="font-semibold text-brand-deep underline">
            {dict.common.backToCourses}
          </Link>
        </p>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            {filled.length > 0 ? (
              <dl className="grid gap-4 rounded-[var(--radius-card)] border border-navy/10 p-6 shadow-card">
                {filled.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-sm text-ink/60">{k}</dt>
                    <dd className="mt-0.5 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="rounded-[var(--radius-card)] bg-sky p-6 text-ink/80">
                {course.confirmed ? dict.courses.noDetails : `${dict.courses.unconfirmed}. ${dict.courses.noDetails}`}
              </p>
            )}
          </div>
          <div id="apply" className="scroll-mt-20">
            <ContactForm lang={lang} dict={dict} courses={courseOptions(lang)} defaultCourse={course.slug} />
          </div>
        </div>
      </Section>
    </>
  );
});
