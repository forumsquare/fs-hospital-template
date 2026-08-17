import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { resolveTenant } from "@/lib/tenant";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const host = request.headers.get("host") ?? "";

  // Preserve the existing signup-cookie redirect (already-logged-in users
  // shouldn't see the signup page).
  const token = request.cookies.get("refreshToken")?.value;
  if (path.startsWith("/signup") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Resolve host -> tenant via the KV map (written by fs_api).
  const { env } = await getCloudflareContext({ async: true });
  const tenant = env.TENANTS ? await resolveTenant(env.TENANTS, host) : null;

  // Unknown host -> friendly not-found (negative result is edge-cached).
  if (!tenant) {
    return NextResponse.rewrite(new URL("/site-not-found", request.url));
  }

  // Unpublished (DRAFT/SUSPENDED) -> coming-soon, unless previewing.
  const preview = url.searchParams.has("preview");
  if (tenant.status !== "PUBLISHED" && !preview) {
    return NextResponse.rewrite(new URL("/coming-soon", request.url));
  }

  // Internal rewrite: /<path> -> /s/<storeId>/<path>. The visitor's URL is
  // unchanged; this only selects the tenant-scoped route tree + cache key.
  const rewritten = new URL(`/s/${tenant.storeId}${path}`, request.url);
  rewritten.search = url.search;
  return NextResponse.rewrite(rewritten);
}

export const config = {
  matcher: [
    // Run on everything except Next internals, the API, static files (any path
    // containing a dot), and the fallback pages the middleware rewrites to.
    "/((?!_next/|api/|site-not-found|coming-soon|favicon.ico|.*\\..*).*)",
  ],
};
