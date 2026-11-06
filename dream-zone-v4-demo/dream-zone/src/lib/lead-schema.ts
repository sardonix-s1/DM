import { z } from "zod";

/** Сообщения — это коды; тексты берутся из словаря (dict.form.errors). */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone: z.string().trim().regex(/^\+?[\d\s\-()]{9,18}$/, "phone"),
  course: z.string().max(60),
  comment: z.string().trim().max(500, "comment"),
  consent: z.boolean().refine((v) => v === true, "consent"),
  /** Honeypot: человек не видит это поле, боты его заполняют. */
  website: z.string().max(100),
  lang: z.enum(["ru", "uz", "en"]),
});

export type LeadInput = z.infer<typeof leadSchema>;
