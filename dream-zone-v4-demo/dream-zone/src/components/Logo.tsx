import Image from "next/image";
import { brand } from "@/config/brand";

/** Если brand.logo не задан, показываем временный текстовый вариант. */
export function Logo({ light = false }: { light?: boolean }) {
  if (brand.logo) {
    return <Image src={brand.logo} alt={brand.name} width={160} height={40} className="h-9 w-auto" priority />;
  }
  return (
    <span
      className={`font-display text-lg font-semibold tracking-tight ${light ? "text-white" : "text-navy"}`}
    >
      DREAM<span className="text-brand"> ZONE</span>
    </span>
  );
}
