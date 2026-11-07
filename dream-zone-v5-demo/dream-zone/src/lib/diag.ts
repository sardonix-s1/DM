/**
 * ВРЕМЕННАЯ диагностика сборки. Next в production скрывает тексты ошибок серверных
 * компонентов, поэтому здесь мы заранее выполняем дерево и печатаем настоящие
 * сообщения в лог с префиксом [DIAG]. Ничего не подавляется: исключения пробрасываются
 * дальше, а probe() только читает дерево. После починки этот файл удалить.
 */
const CLIENT_REF = Symbol.for("react.client.reference");

function log(where: string, e: unknown) {
  const text = e instanceof Error ? `${e.name}: ${e.message}\n${e.stack ?? ""}` : String(e);
  console.error(`[DIAG] ${where}\n${text}`);
}

/** Оборачивает функцию: при ошибке печатает её и пробрасывает дальше. */
export function diag<A extends unknown[], R>(name: string, fn: (...a: A) => R): (...a: A) => R {
  return (...args: A): R => {
    try {
      const out = fn(...args);
      if (out instanceof Promise) {
        return out.catch((e: unknown) => {
          log(name, e);
          throw e;
        }) as R;
      }
      return out;
    } catch (e) {
      log(name, e);
      throw e;
    }
  };
}

/** Что нельзя передавать из серверного компонента в клиентский. */
function checkProps(value: unknown, path: string, depth = 0): void {
  if (depth > 12 || value == null) return;
  const t = typeof value;
  if (t === "function") return log(`${path}: функция в props клиентского компонента`, "не сериализуется");
  if (t === "symbol") return log(`${path}: symbol в props клиентского компонента`, "не сериализуется");
  if (t === "bigint") return;
  if (t !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((v, i) => checkProps(v, `${path}[${i}]`, depth + 1));
    return;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null && !(value instanceof Date)) {
    return log(`${path}: объект класса ${proto?.constructor?.name} в props клиентского компонента`, "не сериализуется");
  }
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) checkProps(v, `${path}.${k}`, depth + 1);
}

/** Выполняет серверные компоненты дерева и печатает ошибки, не бросая их. */
export async function probe(node: unknown, path = "root", depth = 0): Promise<void> {
  try {
    if (depth > 80 || node == null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) await probe(node[i], `${path}[${i}]`, depth + 1);
      return;
    }
    const el = node as { type?: unknown; props?: Record<string, unknown> };
    if (!("type" in el) || !("props" in el)) return;
    const t = el.type as { $$typeof?: unknown; displayName?: string; name?: string } | string | symbol;
    const name =
      typeof t === "string" ? t : typeof t === "symbol" ? String(t) : (t?.displayName ?? t?.name ?? "anonymous");
    const here = `${path}>${name}`;

    if ((typeof t === "function" || typeof t === "object") && t && (t as { $$typeof?: unknown }).$$typeof === CLIENT_REF) {
      checkProps(el.props, here);
      return;
    }
    if (typeof t === "function") {
      let out: unknown;
      try {
        out = await (t as (p: unknown) => unknown)(el.props);
      } catch (e) {
        log(here, e);
        return;
      }
      await probe(out, here, depth + 1);
      return;
    }
    await probe(el.props?.children, here, depth + 1);
  } catch (e) {
    log(`probe ${path}`, e);
  }
}
