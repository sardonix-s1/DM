import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { EmptyState, PageHeader, Section } from "@/components/ui";
import { gallery } from "@/data/gallery";
import { getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({ lang, path: "/gallery", title: dict.gallery.title, description: dict.gallery.lead });
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await getPageContext(params);
  return (
    <>
      <PageHeader title={dict.gallery.title} lead={dict.gallery.lead} />
      <Section>
        {gallery.length ? (
          <Gallery images={gallery} lang={lang} labels={dict.gallery} />
        ) : (
          <EmptyState title={dict.gallery.placeholder} text={dict.gallery.emptyText} />
        )}
      </Section>
    </>
  );
}
