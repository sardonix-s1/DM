import type { Metadata } from "next";
import { EmptyState, PageHeader, Section } from "@/components/ui";
import { getPublishableReviews } from "@/data/reviews";
import { getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({ lang, path: "/results", title: dict.results.title, description: dict.results.lead });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await getPageContext(params);
  const reviews = getPublishableReviews();
  return (
    <>
      <PageHeader title={dict.results.title} lead={dict.results.lead} />
      <Section>
        {reviews.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <blockquote key={r.id} className="rounded-[var(--radius-card)] border border-navy/10 p-6 shadow-card">
                <p>{r.text[lang]}</p>
                <footer className="mt-4 text-sm font-semibold text-navy">{r.author}</footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <EmptyState title={dict.results.emptyTitle} text={dict.results.emptyText} />
        )}
      </Section>
    </>
  );
}
