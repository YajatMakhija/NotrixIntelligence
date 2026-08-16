import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Engineering",
  "Understand architecture, technical decisions, repositories, incidents and documentation with Company Brain.",
);

export default function EngineeringSolutionPage() {
  return (
    <PlaceholderPage
      eyebrow="Solutions"
      title="Engineering"
      intro="Architecture, technical decisions, repositories, incidents and documentation — retrieved with the context around them."
    />
  );
}
