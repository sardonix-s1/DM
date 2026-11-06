"use client";

import { useState } from "react";

/**
 * Фото, заполняющее родителя (родитель: relative + aspect-ratio).
 * Если картинка не загрузилась, показываем фирменный градиент вместо битого значка.
 */
export function Photo({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div role="img" aria-label={alt} className="absolute inset-0 bg-gradient-to-br from-brand to-navy" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
