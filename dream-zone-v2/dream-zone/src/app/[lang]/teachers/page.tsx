import type { Metadata } from "next";
import { TeacherCard } from "@/components/TeacherCard";
import { EmptyState, PageHeader, Section } from "@/components/ui";
import { teachers } from "@/data/teachers";
import { getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({ lang, path: "/teachers", title: dict.teachers.title, description: dict.teachers.lead });
}

export default async function TeachersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await getPageContext(params);
  return (
    <>
      <PageHeader title={dict.teachers.title} lead={dict.teachers.lead} />
      <Section>
        {teachers.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((t) => (
              <TeacherCard key={t.id} teacher={t} lang={lang} />
            ))}
          </div>
        ) : (
          <EmptyState title={dict.teachers.emptyTitle} text={dict.teachers.emptyText} />
        )}
      </Section>
    </>
  );
}
