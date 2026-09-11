# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (hot reload)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally

There is no lint, format, or test tooling configured in this project.

## Architecture

Vue 3 (`<script setup>`) + Vite + Tailwind CSS v4 + vue-router, deployed under the base path `/minifutgolf/` (see `vite.config.js` — matters for any absolute link/asset path). Tailwind v4 is configured CSS-first: theme tokens (`--color-primary`, `--color-dark`, `--color-muted`, etc.) live in `@theme` inside `src/style.css`, not in a `tailwind.config.js`.

**Routing** (`src/router/index.js`) uses `createWebHistory` (not hash mode) with five flat routes, each mapping directly to a view in `src/views/`: `/` (Home), `/storitve` (Storitve), `/predstavitev-prog` (PredstavitevProg), `/onas` (ONas), `/kontakt` (Kontakt). `App.vue` wraps `<RouterView>` with a persistent `NavBar` and `Footer`.

**Page container convention**: `src/components/PageContainer.vue` centralizes the responsive width/padding recipe shared by content pages (currently Storitve and PredstavitevProg) — `max-w-295` capped to `max-w-4xl` from the `lg` breakpoint up (intentionally no further override at `xl`/`2xl`, so the cap stays constant there). Vertical padding is exposed via `pt`/`pb` props (each defaulting to `pt-20 md:pt-28` / `pb-20 md:pb-28`) because different pages need different top/bottom spacing under the fixed navbar; everything else about the container is intentionally not configurable — prefer wrapping/overriding at the call site over adding new props. Pages with narrower, text-only layouts (ONas, Kontakt, the Home hero) don't use `PageContainer` and instead set their own `max-w-160`-style wrapper inline.

**3D model viewer** (`src/components/ModelViewer.vue`): wraps three.js (`GLTFLoader` + `OrbitControls`) to render `.glb` models (imported as URLs — `assetsInclude: ['**/*.glb']` in `vite.config.js`). Key behavior to preserve when touching it:
- Auto-rotates until the user "activates" interaction (desktop: single click; mobile: double-tap, to avoid hijacking page-scroll swipes), then hands control to `OrbitControls`.
- Deactivates on desktop mouse-leave and on mobile tap-outside, reverting to auto-rotate/scroll-through mode.
- `frameObject()` recenters and distances the camera from the model's bounding box so any `.glb` frames itself correctly regardless of its native scale/origin.
- A reset button restores the initial camera/rotation via `resetView()`.
- `PredstavitevProg.vue` only mounts the actual `<ModelViewer>` for a track once it scrolls into view (via `IntersectionObserver`, tracked per-track in `proge[].vidno`), since each instance owns a full WebGL context.

**Icons**: use `@tabler/icons-vue` (tree-shakeable named imports, e.g. `import { IconGift } from '@tabler/icons-vue'`) rendered via `<component :is="...">` where the icon is data-driven. Don't hand-roll SVG icon components — this was tried and replaced.

**Content is Slovenian** — all UI copy, labels, and code comments in existing files are written in Slovenian; match that when adding user-facing text.
