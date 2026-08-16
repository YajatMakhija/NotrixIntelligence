import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Integrations",
  "Connect the systems your company already uses — documents, conversations, engineering, CRM, and data.",
);

export default function IntegrationsPage() {
  return (
    <PlaceholderPage
      eyebrow="Product"
      title="Integrations"
      intro="Company Brain connects the systems your teams already run. The current connector set is listed on the homepage."
    />
  );
}
