import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Support",
  "Give support teams access to product knowledge, previous cases and internal expertise.",
);

export default function SupportSolutionPage() {
  return (
    <PlaceholderPage
      eyebrow="Solutions"
      title="Support"
      intro="Product knowledge, previous cases and internal expertise — available to the person on the ticket."
    />
  );
}
