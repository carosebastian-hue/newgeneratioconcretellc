// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// `npm run build:static` sets STATIC_EXPORT=1 to build a single-page app (SPA) for shared
// hosting (cPanel): plain TanStack Start build (no nitro, default server entry) whose only
// pre-rendered file is the app shell; every route renders in the browser.
// The normal `npm run build` (Cloudflare) is unchanged.
const staticExport = process.env.STATIC_EXPORT === "1";

export default defineConfig(
  staticExport
    ? {
        nitro: false,
        tanstackStart: { spa: { enabled: true } },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
