"use client";

import { useState, type ReactNode } from "react";

/** Скрывает личные данные (телефон, Telegram) размытием до клика. Для демонстрационной версии. */
export function Spoiler({
  children,
  hint,
  href,
  external = false,
}: {
  children: ReactNode;
  hint: string;
  href?: string;
  external?: boolean;
}) {
  const [shown, setShown] = useState(false);

  if (shown) {
    return href ? (
      <a
        href={href}
        className="underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    ) : (
      <span>{children}</span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShown(true)}
      title={hint}
      aria-label={hint}
      className="cursor-pointer select-none rounded px-1 text-inherit blur-[6px] transition-[filter] hover:blur-[4px] focus-visible:blur-[4px]"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
