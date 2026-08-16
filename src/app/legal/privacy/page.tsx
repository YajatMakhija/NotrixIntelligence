import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Privacy policy",
  "How Notrix handles personal data. The full policy will be published here before general availability.",
);

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="The privacy policy will be published here before general availability. Until then, contact us for our current data handling terms."
    />
  );
}
