// Per-environment WebSocket origin (inlined at build). Falls back to production
// so an unset var never breaks the live site. Staging build sets this to
// wss://staging-api.forumsquare.in via .env.staging.
export const wsBaseUrl =
  process.env.NEXT_PUBLIC_WS_URL ?? "wss://api.forumsquare.in";
// export const wsBaseUrl = "ws://localhost:8787";
