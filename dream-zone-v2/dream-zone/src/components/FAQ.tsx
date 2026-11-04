import type { Dictionary } from "@/i18n/dictionaries/ru";

export function FAQ({ dict }: { dict: Dictionary }) {
  return (
    <div className="divide-y divide-navy/10 rounded-[var(--radius-card)] border border-navy/10 bg-white">
      {dict.faq.items.map((item) => (
        <details key={item.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy">
            {item.q}
            <span aria-hidden="true" className="text-2xl leading-none text-brand transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-ink/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
