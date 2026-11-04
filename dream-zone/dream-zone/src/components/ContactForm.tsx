"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadInput } from "@/lib/lead-schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ru";

type Option = { slug: string; name: string };
type Status = "idle" | "sending" | "success" | "error" | "notConfigured" | "rateLimited";

const field =
  "mt-1.5 w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:border-brand";

export function ContactForm({
  lang,
  dict,
  courses,
  defaultCourse = "",
}: {
  lang: Locale;
  dict: Dictionary;
  courses: Option[];
  defaultCourse?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      course: defaultCourse,
      comment: "",
      consent: false,
      website: "",
      lang,
    },
  });

  const err = (code?: string) => (code ? dict.form.errors[code as keyof typeof dict.form.errors] : undefined);

  async function onSubmit(values: LeadInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang }),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else if (res.status === 503) setStatus("notConfigured");
      else if (res.status === 429) setStatus("rateLimited");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const message: Record<Exclude<Status, "idle" | "sending">, string> = {
    success: dict.form.success,
    error: dict.form.error,
    notConfigured: dict.form.notConfigured,
    rateLimited: dict.form.rateLimited,
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[var(--radius-card)] border border-navy/10 bg-white p-6 shadow-card sm:p-8"
    >
      <h2 className="font-display text-2xl font-semibold text-navy">{dict.form.title}</h2>
      <p className="mt-2 text-ink/75">{dict.form.lead}</p>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="lead-name" className="font-medium">
            {dict.form.name}
          </label>
          <input
            id="lead-name"
            autoComplete="name"
            placeholder={dict.form.namePh}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "lead-name-err" : undefined}
            className={field}
            {...register("name")}
          />
          {errors.name && (
            <p id="lead-name-err" role="alert" className="mt-1 text-sm text-red-700">
              {err(errors.name.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-phone" className="font-medium">
            {dict.form.phone}
          </label>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={dict.form.phonePh}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "lead-phone-err" : undefined}
            className={field}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="lead-phone-err" role="alert" className="mt-1 text-sm text-red-700">
              {err(errors.phone.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-course" className="font-medium">
            {dict.form.course}
          </label>
          <select id="lead-course" className={field} {...register("course")}>
            <option value="">{dict.form.courseNone}</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead-comment" className="font-medium">
            {dict.form.comment}
          </label>
          <textarea
            id="lead-comment"
            rows={3}
            placeholder={dict.form.commentPh}
            className={field}
            {...register("comment")}
          />
          {errors.comment && (
            <p role="alert" className="mt-1 text-sm text-red-700">
              {err(errors.comment.message)}
            </p>
          )}
        </div>

        {/* Honeypot: скрыто от людей и от скринридеров */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" {...register("website")} />
          </label>
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1 h-5 w-5 accent-[#0b6bd6]" {...register("consent")} />
            <span>
              {dict.form.consent}{" "}
              <Link href={`/${lang}/privacy`} className="font-medium text-brand-deep underline">
                {dict.form.privacy}
              </Link>
            </span>
          </label>
          {errors.consent && (
            <p role="alert" className="mt-1 text-sm text-red-700">
              {err(errors.consent.message)}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-brand-deep px-7 py-3.5 font-semibold text-white transition-colors hover:bg-navy disabled:opacity-60"
        >
          {status === "sending" ? dict.form.sending : dict.form.submit}
        </button>

        <div aria-live="polite">
          {status !== "idle" && status !== "sending" && (
            <p
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                status === "success" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
              }`}
            >
              {message[status]}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
