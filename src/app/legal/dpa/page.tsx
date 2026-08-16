import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Data processing agreement",
  "Request the Notrix DPA for enterprise procurement.",
);

export default function DpaPage() {
  return (
    <PlaceholderPage
      eyebrow="Trust"
      title="Data processing agreement"
      intro="The DPA is available under NDA for enterprise evaluation. Request it with your first message."
    />
  );
}
