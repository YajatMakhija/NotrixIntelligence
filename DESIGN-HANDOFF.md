# Notrix website and console

Editable Figma designs: https://www.figma.com/design/BOwfKN45Tx1rgTuo3aOwM5

Desktop website: node 2:2. Desktop console: 2:3. Mobile website: 2:4. Mobile console: 10:4.

## Run

`npm run dev` starts development. `npm run build` creates the production build. `npm run start -- --port 3010` serves it.

The website opens at `/`. The console is `/console`; the legacy `/cnosole` redirects to it. The existing login uses an illustrative session and redirects signed-in visitors into the console. Sign out to return to marketing pages.

## Delivered

Refined homepage, shared navigation, product demonstrations, integration strip, workflow examples, solutions, security section, and the existing interior website routes. Responsive console with spaces, searchable sources, empty states, agent lists, and illustrative cited answers. Figma contains native editable text, frames and auto-layout groups for desktop and mobile designs.

## Validation

Production build generated all 55 pages. TypeScript and targeted ESLint passed. Browser checks covered 1440px and 390px layouts, login, cited answers, source-search empty state, space switching, and sign-out. No console messages were reported during console checks. Reference screenshots are in `.impeccable/review/`.

## Scope and next integration

This is a working frontend and design deliverable. Console responses, source permissions, and agent workflows remain labelled demonstration data. Production authentication/SSO, ingestion, retrieval, and execution require backend integration. The existing login is not production authentication. No production deployment was performed.

Ponytail 4.9.0 is installed in Codex. `grill-me` and its `grilling` dependency are installed in `.agents/skills/`; they are available to subsequent tasks. The installer initially included unrelated skills; these were moved to `.design-backups/extra-installed-skills/` and removed from the active lock file. `security-guidance` was not installed.

Files replaced during implementation were backed up under `.design-backups/20260912-160354/`. Existing uncommitted work was preserved. No commits were made.
