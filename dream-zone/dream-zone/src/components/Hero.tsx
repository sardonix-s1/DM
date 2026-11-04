"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";

/** Фирменные 3D-элементы: кольцо, лента и бумажный самолётик. Чистый SVG, без тяжёлых библиотек. */
function Ring({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ringA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38c9f2" />
          <stop offset="1" stopColor="#1689f5" />
        </linearGradient>
        <linearGradient id="ringB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b6bd6" />
          <stop offset="1" stopColor="#071b36" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="74" fill="none" stroke="url(#ringB)" strokeWidth="30" />
      <path d="M26 100a74 74 0 0 1 148 0" fill="none" stroke="url(#ringA)" strokeWidth="30" />
      <circle cx="100" cy="100" r="59" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />
    </svg>
  );
}

function Plane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M8 56L112 10 78 108 56 70z" fill="#38c9f2" />
      <path d="M8 56L112 10 56 70z" fill="#1689f5" />
      <path d="M56 70L112 10 78 108z" fill="#0b6bd6" />
      <path d="M56 70l-6 28 18-20z" fill="#071b36" />
    </svg>
  );
}

function Ribbon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="rib" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1689f5" />
          <stop offset="1" stopColor="#38c9f2" />
        </linearGradient>
      </defs>
      <path d="M4 70C50 10 90 10 120 60s70 50 116-10" fill="none" stroke="url(#rib)" strokeWidth="26" strokeLinecap="round" />
      <path d="M4 70C50 10 90 10 120 60s70 50 116-10" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();
  const float = (dy: number, d: number) =>
    reduce ? {} : { animate: { y: [0, dy, 0] }, transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <section className="relative overflow-hidden bg-sky">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <p className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-deep shadow-sm">
            {dict.hero.tag}
          </p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
          >
            {dict.hero.title}
          </motion.h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/80">{dict.hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/courses`}
              className="rounded-full bg-brand-deep px-7 py-3.5 font-semibold text-white shadow-card transition-colors hover:bg-navy"
            >
              {dict.common.choose}
            </Link>
            <Link
              href={`/${lang}/contacts#apply`}
              className="rounded-full border-2 border-navy px-7 py-3 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              {dict.common.apply}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md sm:aspect-square lg:max-w-none">
          {/* Фото: пока нет настоящей фотографии, показываем помеченный блок */}
          <div className="absolute inset-[8%] overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-navy shadow-card">
            {brand.images.hero ? (
              <Image
                src={brand.images.hero}
                alt={brand.images.heroAlt}
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-end p-5">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  {dict.common.demo}: {dict.common.photoPlaceholder}
                </span>
              </div>
            )}
          </div>

          <motion.div {...float(-14, 6)} className="absolute -left-2 top-2 w-[34%] sm:left-0">
            <Ring />
          </motion.div>
          <motion.div {...float(12, 7)} className="absolute -right-1 top-[6%] w-[26%]">
            <Plane />
          </motion.div>
          <motion.div {...float(-10, 8)} className="absolute -bottom-2 right-[4%] w-[46%]">
            <Ribbon />
          </motion.div>

          <div className="absolute bottom-[10%] left-0 rounded-2xl border border-navy/10 bg-white p-4 shadow-card">
            <p className="text-xs text-ink/60">{dict.hero.floatLabel}</p>
            <p className="mt-0.5 text-sm font-semibold text-navy">{dict.hero.floatText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
