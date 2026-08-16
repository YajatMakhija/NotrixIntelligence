import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "How it works",
  "Connect, ingest, understand, retrieve, reason, and act — how Company Brain turns information into intelligence.",
);

export default function HowItWorksPage() {
  return (
    <PlaceholderPage
      eyebrow="Product"
      title="How Company Brain works"
      intro="From connected sources to governed action. The pipeline is already described on the homepage; this page will expand each stage."
    />
  );
}
