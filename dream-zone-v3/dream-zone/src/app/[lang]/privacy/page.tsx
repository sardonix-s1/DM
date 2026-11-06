import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({
    lang,
    path: "/privacy",
    title: dict.privacy.title,
    description: dict.privacy.body[0],
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dict } = await getPageContext(params);
  return (
    <>
      <PageHeader title={dict.privacy.title} />
      <Section>
        <div className="max-w-2xl space-y-4 leading-relaxed text-ink/85">
          {dict.privacy.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
