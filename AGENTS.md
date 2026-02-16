# Repository Guidelines

## Project Structure & Module Organization
This project is a Next.js App Router application.
- `app/`: route entry files (`layout.tsx`, `page.tsx`) and global styles in `app/globals.css`.
- `components/`: UI components; main screen logic lives in `DesktopCalendarClock.tsx`.
- `hooks/`: reusable state/data hooks such as `useCalendar` and `useWeather`.
- `service/`: API access layer for calendar and weather endpoints.
- `lib/`: shared utilities (for example `cn` and browser geolocation helpers).
- `public/`: static assets (`*.svg`, icons).

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local development server with Turbopack (`http://localhost:3000`).
- `npm run build`: create a production build.
- `npm run start`: run the production build locally.
- `npm run lint`: run ESLint with Next.js + TypeScript rules; required before opening a PR.

If you use `pnpm`, keep lockfile updates intentional (`pnpm-lock.yaml` exists alongside `package-lock.json`).

## Coding Style & Naming Conventions
- Use TypeScript and React function components.
- Follow existing formatting: 2-space indentation, clear typing, and concise component logic.
- Naming patterns:
  - Components: PascalCase (`SettingsModal.tsx`)
  - Hooks: `useXxx` (`useWeather.ts`)
  - Utilities/services: descriptive camelCase exports (`getTodayWeather`)
- Prefer `@/*` path aliases for internal imports.
- Keep data fetching and transformation in `hooks/` + `service/`, not inside presentational JSX blocks.

## Responsive Layout Rules
- All pages/components must be responsive and must not overflow the viewport on common widths (`320`, `375`, `768`, `1024`, `1440`).
- On mobile/tablet, allow page-level vertical scrolling (`min-h-screen` + `overflow-y-auto`) and avoid locking the viewport with `overflow-hidden`.
- On desktop/fullscreen layouts, internal panels may scroll, but content should stay within the screen and avoid global horizontal scroll.
- Prefer responsive spacing/typography/sizing (`sm`/`md`/`lg` breakpoints) over fixed large pixel values.
- For grid/flex containers, use safe constraints like `minmax(0, 1fr)`, `min-w-0`, and `min-h-0` to prevent child overflow.
- Long text/content (such as `yi/ji`, weather descriptions) must use wrapping behavior (`break-words` or equivalent) to avoid clipping.
- If a section can grow vertically (e.g., forecast list), use conditional internal scroll on large screens and natural page flow on mobile.
- Any UI refactor must include manual responsive checks in `npm run dev` for both portrait mobile and desktop.

## Testing Guidelines
No automated test framework is currently configured, and no coverage threshold is enforced.
- Minimum check for each change:
  1. `npm run lint`
  2. Manual verification in `npm run dev` (calendar grid, clock ticking, weather display, fullscreen/settings interactions)
- When adding tests, place them near related modules (example: `hooks/useWeather.test.ts`) and add the run command to `package.json`.

## Commit & Pull Request Guidelines
- Prefer Conventional Commit prefixes used in history: `feat:`, `fix:`.
  - Example: `fix: 修复日历星期错误`
- Keep each commit focused on one concern.
- PRs should include:
  - Short summary of behavior changes
  - Related issue/task link (if available)
  - Validation notes (`npm run lint`, manual checks)
  - Screenshot or GIF for UI changes

## Security & Configuration Tips
- `service/index.ts` currently uses a hardcoded API host; prefer environment variables for future endpoint changes.
- Geolocation is browser-based; preserve graceful handling for denied permissions when updating weather/location flows.
