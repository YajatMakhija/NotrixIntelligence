import type { Metadata } from "next";
import { SITE } from "./constants";

export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Notrix Intelligence builds a knowledge layer from your company data and deploys AI agents, enterprise search, and workflow automation — one AI ecosystem for the enterprise.",
  icons: {
    icon: "/notrix-logo.png",
    apple: "/notrix-logo.png",
  },
  openGraph: {
    title: SITE.name,
    description:
      "AI that knows your company. Automates your departments. Enterprise AI ecosystem platform.",
    type: "website",
    images: [{ url: "/notrix-logo.png", alt: SITE.name }],
  },
};

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title: `${title} | ${SITE.name}`, description },
  };
}
