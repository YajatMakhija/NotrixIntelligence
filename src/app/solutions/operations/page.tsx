import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Operations",
  "Understand processes, policies, workflows and cross-team dependencies.",
);

export default function OperationsSolutionPage() {
  return (
    <PlaceholderPage
      eyebrow="Solutions"
      title="Operations"
      intro="Processes, policies, workflows and the dependencies between teams that never made it into a single document."
    />
  );
}
