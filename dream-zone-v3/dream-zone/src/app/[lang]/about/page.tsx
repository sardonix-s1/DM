import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({ lang, path: "/about", title: dict.about.title, description: dict.about.lead });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dict } = await getPageContext(params);
  return (
    <>
      <PageHeader title={dict.about.title} lead={dict.about.lead} />
      <Section>
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink/85">
          {dict.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
