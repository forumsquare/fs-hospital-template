import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import { purgeCache } from "@opennextjs/cloudflare/overrides/cache-purge";

export default defineCloudflareConfig({
  // R2 persists rendered pages; the regional cache keeps hot pages PoP-local.
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "long-lived" }),
  // D1 tracks per-tag revalidation timestamps — this is what makes
  // revalidateTag() work, and the basis for Phase 2b's per-tenant invalidation.
  tagCache: d1NextTagCache,
  // Durable Object queue dedupes concurrent ISR regenerations under load.
  queue: doQueue,
  // Purge the edge cache immediately on revalidate (via Durable Object).
  cachePurge: purgeCache({ type: "durableObject" }),
  // Serve cached ISR/SSG straight from cache on cold start. Mutually exclusive
  // with PPR (we deliberately choose interception — see plan §4b.6).
  enableCacheInterception: true,
});
