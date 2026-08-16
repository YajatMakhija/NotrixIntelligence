import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Sales",
  "Surface customer history, deal context, conversations and relevant internal knowledge.",
);

export default function SalesSolutionPage() {
  return (
    <PlaceholderPage
      eyebrow="Solutions"
      title="Sales"
      intro="Customer history, deal context, conversations and the internal knowledge that usually lives with one person."
    />
  );
}
