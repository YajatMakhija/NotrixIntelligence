import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Cookie policy",
  "How Notrix uses cookies and similar technologies.",
);

export default function CookiesPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      title="Cookie policy"
      intro="Cookie practices will be published here before general availability."
    />
  );
}
