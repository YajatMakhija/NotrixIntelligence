import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "About",
  "Notrix builds Company Brain — the intelligence layer for modern organizations.",
);

export default function AboutPage() {
  return (
    <PlaceholderPage
      eyebrow="Company"
      title="About Notrix"
      intro="Notrix builds Company Brain for organizations where context is the difference between a useful answer and a dangerous one."
    />
  );
}
