import type { Metadata } from "next";
import { CourseCard } from "@/components/CourseCard";
import { PageHeader, Section } from "@/components/ui";
import { courses } from "@/data/courses";
import { getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({ lang, path: "/courses", title: dict.courses.title, description: dict.courses.lead });
}

export default async function CoursesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await getPageContext(params);
  return (
    <>
      <PageHeader title={dict.courses.title} lead={dict.courses.lead} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} lang={lang} dict={dict} />
          ))}
        </div>
      </Section>
    </>
  );
}
