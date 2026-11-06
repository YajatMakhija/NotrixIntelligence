---
name: Notrix
description: Professional-services house for Company Brain
colors:
  paper: "#fafaf9"
  ink: "#0f0e0d"
  mute: "#706d66"
  line: "#e4e2db"
  gold: "#c4b07a"
  blue: "#3157E8"
  success: "#237A57"
typography:
  display:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.0125em"
  wordmark:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontWeight: 400
    fontStyle: italic
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  control: "4px"
spacing:
  page-x: "36px"
  header: "72px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
---

# Design system

## Product

Company Brain is the intelligence layer for a company. The site should read as a professional-services house, not a SaaS dashboard. Notrix is the company. The product name is always Company Brain.

## Visual world

Warm near-white paper, black ink, stone mute. Gold is the header ask. Black is the closing request. Blue is reserved for selection inside the product window. Green is reserved for verified and security states. Dark ink bands carry audience and control sections.

## Type

Source Serif 4 at 80 / 56 / 36 / 32 for display, weight 400. Source Sans 3 at 14 / 16 / 17 for navigation and body. The wordmark is italic serif, lowercase, centered in the header.

## Layout

Three-zone header. Left-aligned 80px headline, then a full-width product still with a 36px inset. Lists and rules over cards. No eyebrow. No metric wall. No customer logo strip.

## Motion

The authored moment is the workspace: a question types, sources resolve, a cited answer streams. Everything else is a short ease-out. Content stays visible if scripts fail.

## Copy

Plain and specific. No fabricated customers, certifications, or percentages. Illustrative product content is labelled illustrative.

## Reference landing page

The shipped landing page in `src/components/home/ReferenceLanding.tsx`, styled by `src/app/reference.css`, uses a light enterprise editorial direction based on the supplied reference. Source Serif 4 provides display typography, while Source Sans 3 handles UI and body text. The palette centers on `#fbfbfa` paper and `#171815` ink; `#3157e8` appears only for product selection and focus states, and green is reserved for governance.

Responsive gutters are 64px on desktop, 34px on tablet, and 22px on mobile, with breakpoints at 1100px and 760px. The split hero includes a stepped CSS typing reveal and a static fallback for reduced-motion preferences. Its product window is tilted on desktop and becomes unrotated at responsive sizes. A dark security section creates the main tonal shift. Product panels use 10px radii, while controls use 4px radii.

All logos are Notrix assets. The page intentionally excludes a logo or company strip, fabricated customers, metrics, testimonials, and certifications. Illustrative content is explicitly labeled. Production screenshots passed at 1440px and 390px widths.

## Customer access flow

The `/login` and `/signup` routes use a dedicated split-screen shell with a dark editorial story panel and a focused white form panel. Authentication uses a clear Sign in/Create account switch. Signup is a two-step sequence: administrator details followed by company identity and first-use context. On small screens, the composition stacks without horizontal overflow.

Workspace creation carries the company name and a slug-based `notrix.company-name.com` preview into the illustrative console. The console navigation exposes Overview, Data ingestion, Customers, and Agents. Data connections and customer creation are interactive UI demonstrations; production identity, storage, DNS, and third-party connections require backend infrastructure.
