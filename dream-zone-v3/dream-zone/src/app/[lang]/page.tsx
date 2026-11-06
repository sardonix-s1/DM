import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { GroupCard } from "@/components/GroupCard";
import { TeacherCard } from "@/components/TeacherCard";
import { Gallery } from "@/components/Gallery";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink, EmptyState, Section } from "@/components/ui";
import { brand } from "@/config/brand";
import { courses } from "@/data/courses";
import { getActiveGroups } from "@/data/groups";
import { teachers } from "@/data/teachers";
import { getPublishableReviews } from "@/data/reviews";
import { gallery } from "@/data/gallery";
import { courseOptions, getPageContext } from "@/lib/page";
import { diag } from "@/lib/diag";

export default diag("HomePage", async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await getPageContext(params);
  const popular = courses.filter((c) => c.popular);
  const groups = getActiveGroups().slice(0, 3);
  const reviews = getPublishableReviews();

  return (
    <>
      <Hero lang={lang} dict={dict} />

      <Section title={dict.advantages.title}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.advantages.items.map((item) => (
            <li key={item.title} className="rounded-[var(--radius-card)] bg-sky p-6">
              <h3 className="font-display text-base font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={dict.courses.popular}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((c) => (
            <CourseCard key={c.slug} course={c} lang={lang} dict={dict} />
          ))}
        </div>
        <p className="mt-6">
          <Link href={`/${lang}/courses`} className="font-semibold text-brand-deep underline">
            {dict.courses.all}
          </Link>
        </p>
      </Section>

      <Section title={dict.groups.title}>
        {groups.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {groups.map((g) => (
              <GroupCard key={g.id} group={g} lang={lang} dict={dict} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={dict.groups.emptyTitle}
            text={dict.groups.emptyText}
            actions={
              <>
                <ButtonLink href={brand.contacts.phoneHref}>{dict.common.call}</ButtonLink>
                <ButtonLink href={brand.contacts.telegramUrl} variant="outline" external>
                  {dict.common.telegram}
                </ButtonLink>
              </>
            }
          />
        )}
      </Section>

      {teachers.length > 0 && (
        <Section title={dict.teachers.title}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.slice(0, 3).map((t) => (
              <TeacherCard key={t.id} teacher={t} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      {reviews.length > 0 && (
        <Section title={dict.results.title}>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <blockquote key={r.id} className="rounded-[var(--radius-card)] border border-navy/10 p-6 shadow-card">
                <p>{r.text[lang]}</p>
                <footer className="mt-4 text-sm font-semibold text-navy">{r.author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      )}

      {gallery.length > 0 && (
        <Section title={dict.gallery.title}>
          <Gallery images={gallery.slice(0, 6)} lang={lang} labels={dict.gallery} />
        </Section>
      )}

      <Section title={dict.faq.title}>
        <FAQ dict={dict} />
      </Section>

      <Section className="scroll-mt-20" >
        <div id="apply" className="grid items-start gap-8 rounded-[2rem] bg-navy p-6 text-white sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">{dict.cta.title}</h2>
            <p className="mt-3 max-w-md text-white/80">{dict.cta.text}</p>
            <p className="mt-6 text-lg font-semibold">
              <a href={brand.contacts.phoneHref} className="hover:text-cyan">
                {brand.contacts.phone}
              </a>
            </p>
          </div>
          <div className="text-ink">
            <ContactForm lang={lang} dict={dict} courses={courseOptions(lang)} />
          </div>
        </div>
      </Section>
    </>
  );
});
