import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader, Section } from "@/components/ui";
import { brand } from "@/config/brand";
import { courseOptions, getPageContext } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang, dict } = await getPageContext(params);
  return buildMetadata({ lang, path: "/contacts", title: dict.contacts.title, description: dict.contacts.lead });
}

export default async function ContactsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await getPageContext(params);
  const c = brand.contacts;
  const rows: { label: string; value: string; href?: string; external?: boolean }[] = [
    { label: dict.contacts.phone, value: c.phone, href: c.phoneHref },
    { label: dict.contacts.telegram, value: c.telegram, href: c.telegramUrl, external: true },
    { label: dict.contacts.channel, value: "t.me/dreamzone_edu", href: c.channelUrl, external: true },
    { label: dict.contacts.address, value: c.address ?? dict.contacts.toBeAdded },
    { label: dict.contacts.hours, value: c.hours ?? dict.contacts.toBeAdded },
  ];

  return (
    <>
      <PageHeader title={dict.contacts.title} lead={dict.contacts.lead} />
      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <dl className="grid gap-5 rounded-[var(--radius-card)] bg-sky p-6 sm:p-8">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="text-sm text-ink/60">{r.label}</dt>
                <dd className="mt-0.5 text-lg font-medium text-navy">
                  {r.href ? (
                    <a
                      href={r.href}
                      className="underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
            {c.mapUrl && (
              <a href={c.mapUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-deep underline">
                {dict.contacts.map}
              </a>
            )}
          </dl>
          <div id="apply" className="scroll-mt-20">
            <ContactForm lang={lang} dict={dict} courses={courseOptions(lang)} />
          </div>
        </div>
      </Section>
    </>
  );
}
