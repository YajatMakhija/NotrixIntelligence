import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Company Brain",
  "Company Brain connects your company's knowledge, systems, and conversations into an intelligent layer that understands how your organization works.",
);

export default function CompanyBrainPage() {
  return (
    <PlaceholderPage
      eyebrow="Product"
      title="Company Brain"
      intro="The intelligence layer for your company. Full product detail lives on the homepage while this page is written out."
    />
  );
}
