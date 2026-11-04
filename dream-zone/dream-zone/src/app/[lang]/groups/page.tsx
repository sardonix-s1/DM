import type { Metadata } from "next";
import { GroupCard } from "@/components/GroupCard";
import { ButtonLink, EmptyState, PageHeader, Section } from "@/components/ui";
import { brand } from "@/config/brand";
import { getActiveGroups } from "@/data/groups";
import { getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600; // раз в час скрываем группы с прошедшей датой старта

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({ lang, path: "/groups", title: dict.groups.title, description: dict.groups.lead });
}

export default async function GroupsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await getPageContext(params);
  const groups = getActiveGroups();
  return (
    <>
      <PageHeader title={dict.groups.title} lead={dict.groups.lead} />
      <Section>
        {groups.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}
