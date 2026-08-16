import type { Metadata } from "next";
import { SITE } from "./site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://notrix.ai"),
  title: {
    default: "Notrix | The Intelligence Layer for Your Company",
    template: `%s — ${SITE.name}`,
  },
  description:
    "Company Brain connects your company's knowledge, systems, and conversations into an intelligent layer that understands how your organization works.",
  icons: { icon: "/notrix-monogram.png", apple: "/notrix-monogram.png" },
  openGraph: {
    title: "Notrix | The Intelligence Layer for Your Company",
    description:
      "Company Brain connects your company's knowledge, systems, and conversations into an intelligent layer that understands how your organization works.",
    type: "website",
    images: [{ url: "/notrix-monogram.png", alt: SITE.name }],
  },
};

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title: `${title} — ${SITE.name}`, description },
  };
}
