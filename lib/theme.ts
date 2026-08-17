import type { CSSProperties } from "react";
import type { StoreInfoType } from "@/models/schema";

type StoreTheme = NonNullable<StoreInfoType["theme"]>;

/**
 * Convert a hex color ("#3b82f6" or "#39f") to the `H S% L%` triple that the
 * shadcn CSS variables expect (they are used as `hsl(var(--primary))`). Values
 * that aren't hex (already a triple, or an unknown format) pass through as-is.
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

const DARK_FG = "0 0% 9%";
const LIGHT_FG = "0 0% 98%";

/** Set a color var plus a contrasting `-foreground` var for readable text. */
function setPair(
  style: Record<string, string>,
  name: string,
  value: string
): void {
  const triple = toHslTriple(value);
  style[`--${name}`] = triple;
  style[`--${name}-foreground`] = lightnessOf(triple) > 55 ? DARK_FG : LIGHT_FG;
}

/**
 * Inline CSS-variable style for a tenant's theme. Only overrides the tokens the
 * hospital actually set — everything else falls back to the defaults in
 * globals.css. Returned object is spread onto a wrapper in the tenant layout.
 */
export function themeStyle(theme: StoreTheme | null | undefined): CSSProperties {
  const style: Record<string, string> = {};
  if (!theme) return style as CSSProperties;

  if (theme.primary) setPair(style, "primary", theme.primary);
  if (theme.secondary) setPair(style, "secondary", theme.secondary);
  if (theme.accent) setPair(style, "accent", theme.accent);
  if (theme.background) {
    const triple = toHslTriple(theme.background);
    style["--background"] = triple;
    // Body text should stay readable on a custom background.
    style["--foreground"] = lightnessOf(triple) > 55 ? DARK_FG : LIGHT_FG;
  }
  if (theme.radius) style["--radius"] = theme.radius;

  return style as CSSProperties;
}
