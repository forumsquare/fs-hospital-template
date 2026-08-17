// Tenant resolution for the multi-tenant template.
//
// The KV map (TENANTS namespace) is the source of truth for host -> store and
// is written exclusively by fs_api; here we only READ it. Key scheme:
//   host:<hostname>  ->  { storeId, status, templateId }

export const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "forumsquare.in";

export type TenantStatus = "DRAFT" | "PUBLISHED" | "SUSPENDED";

export type TenantRecord = {
  storeId: string;
  status: TenantStatus;
  templateId: string;
};

// System subdomains that never map to a hospital site.
const RESERVED = new Set([
  "www",
  "api",
  "admin",
  "dashboard",
  "app",
  "cdn",
  "static",
  "mail",
  "blog",
  "status",
  "customers",
]);

/** Strip the port, lowercase, and map local-dev hosts (episkin.localhost). */
export const normalizeHost = (host: string): string =>
  host
    .split(":")[0]
    .toLowerCase()
    .replace(".localhost", `.${ROOT_DOMAIN}`);

/**
 * The single-level subdomain of a `*.ROOT_DOMAIN` host, or null when the host
 * is the apex, a reserved name, a multi-level subdomain, or a custom domain.
 */
export const subdomainFromHost = (host: string): string | null => {
  const h = normalizeHost(host);
  const suffix = `.${ROOT_DOMAIN}`;
  if (!h.endsWith(suffix)) return null;
  const sub = h.slice(0, -suffix.length);
  if (!sub || sub.includes(".") || RESERVED.has(sub)) return null;
  return sub;
};

/** Read the tenant record for a hostname from the KV map (60s edge cache). */
export const resolveTenant = async (
  kv: KVNamespace,
  host: string
): Promise<TenantRecord | null> => {
  const raw = await kv.get(`host:${normalizeHost(host)}`, { cacheTtl: 60 });
  return raw ? (JSON.parse(raw) as TenantRecord) : null;
};
