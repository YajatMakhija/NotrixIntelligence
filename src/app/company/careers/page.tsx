import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Careers",
  "Open roles at Notrix. We will publish positions here as they open.",
);

export default function CareersPage() {
  return (
    <PlaceholderPage
      eyebrow="Company"
      title="Careers"
      intro="No open roles are listed yet. If the work on this site is the kind of problem you want to work on, write to us."
    />
  );
}
