import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { getCourse } from "@/data/courses";

export const runtime = "nodejs";

// Простой rate limit в памяти процесса: 5 заявок за 10 минут с одного IP.
// На serverless-хостинге память не общая между инстансами; для защиты посерьёзнее
// нужен внешний лимитер (например, Upstash). Honeypot работает независимо.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

/** Убираем символы, которые могут сломать разметку сообщения. */
const clean = (s: string) => s.replace(/[<>&]/g, "").replace(/\s+/g, " ").trim();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const lead = parsed.data;

  // Honeypot заполнен: делаем вид, что всё хорошо, и ничего не отправляем.
  if (lead.website) return NextResponse.json({ ok: true });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });

  const course = lead.course ? getCourse(lead.course)?.name.ru ?? "—" : "Нужна консультация";
  const text = [
    "Новая заявка с сайта DREAM ZONE",
    `Имя: ${clean(lead.name)}`,
    `Телефон: ${clean(lead.phone)}`,
    `Курс: ${course}`,
    lead.comment ? `Комментарий: ${clean(lead.comment)}` : null,
    `Язык сайта: ${lead.lang.toUpperCase()}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    // Не логируем URL запроса: в нём токен.
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
