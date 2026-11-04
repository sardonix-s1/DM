import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="bg-sky">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h1>
        {lead && <p className="mt-3 max-w-2xl text-lg text-ink/75">{lead}</p>}
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-4 pt-16 sm:px-6 ${className}`}>
      {title && <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{title}</h2>}
      {children}
    </section>
  );
}

export function EmptyState({
  title,
  text,
  actions,
}: {
  title: string;
  text: string;
  actions?: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-navy/25 bg-sky/60 p-8 text-center sm:p-12">
      <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-ink/75">{text}</p>
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "bg-brand-deep text-white hover:bg-navy"
      : "border-2 border-navy text-navy hover:bg-navy hover:text-white";
  const base = `inline-block rounded-full px-6 py-3 text-center font-semibold transition-colors ${cls}`;
  if (external || href.startsWith("tel:")) {
    return (
      <a href={href} className={base} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}
