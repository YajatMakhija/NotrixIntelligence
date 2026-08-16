import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Terms",
  "Terms of use for Notrix and Company Brain.",
);

export default function TermsPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      title="Terms"
      intro="Terms of use will be published here before general availability."
    />
  );
}
