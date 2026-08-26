import type { StoreInfoType } from "@/models/schema";

type StoreTheme = NonNullable<StoreInfoType["theme"]>;

/**
 * Convert a hex color ("#3b82f6" or "#39f") to the `H S% L%` triple that the
 * shadcn CSS variables expect (used as `hsl(var(--primary))`). Values that
 * aren't hex (already a triple, or an unknown format) pass through as-is.
 */
function toHslTriple(value: string): string {
  const input = value.trim();
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input);
  if (!m) return input;

  let hex = m[1];
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;

  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/** Lightness (0-100) of an `H S% L%` triple; used to pick readable text. */
function lightnessOf(triple: string): number {
  const parts = triple.split(/\s+/);
  return parseFloat(parts[2] ?? "50") || 50;
}

/** Strip characters that could break out of the <style> context (defense in depth). */
function safe(value: string): string {
  return value.replace(/[<>{};]/g, "").trim();
}

const DARK_FG = "0 0% 9%";
const LIGHT_FG = "0 0% 98%";

/** Set a color var plus a contrasting `-foreground` var for readable text. */
function setPair(
  vars: Record<string, string>,
  name: string,
  value: string
): void {
  const triple = safe(toHslTriple(value));
  if (!triple) return;
  vars[`--${name}`] = triple;
  vars[`--${name}-foreground`] = lightnessOf(triple) > 55 ? DARK_FG : LIGHT_FG;
}

/**
 * Build a `:root { … }` CSS string overriding the shadcn tokens the hospital
 * set. Only overrides provided tokens — everything else keeps the globals.css
 * defaults. Returns "" when there's nothing to theme. Injected as a <style> tag
 * in the tenant layout; correct because each SSR response serves one tenant.
 */
export function themeCss(theme: StoreTheme | null | undefined): string {
  if (!theme) return "";

  const vars: Record<string, string> = {};
  if (theme.primary) setPair(vars, "primary", theme.primary);
  if (theme.secondary) setPair(vars, "secondary", theme.secondary);
  if (theme.accent) setPair(vars, "accent", theme.accent);
  if (theme.background) {
    const triple = safe(toHslTriple(theme.background));
    if (triple) {
      vars["--background"] = triple;
      vars["--foreground"] = lightnessOf(triple) > 55 ? DARK_FG : LIGHT_FG;
    }
  }
  if (theme.radius) vars["--radius"] = safe(theme.radius);

  const decls = Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return decls ? `:root{${decls}}` : "";
}
