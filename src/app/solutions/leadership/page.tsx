import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Leadership",
  "Ask questions across the organization and get answers grounded in company context.",
);

export default function LeadershipSolutionPage() {
  return (
    <PlaceholderPage
      eyebrow="Solutions"
      title="Leadership"
      intro="Questions across the organization, answered from company context rather than a slide that aged out last quarter."
    />
  );
}
