import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Subprocessors",
  "The processors Notrix uses to operate Company Brain. This list will be published before general availability.",
);

export default function SubprocessorsPage() {
  return (
    <PlaceholderPage
      eyebrow="Trust"
      title="Subprocessors"
      intro="The subprocessor list will be published here before general availability. Current processors are disclosed under NDA during security review."
    />
  );
}
