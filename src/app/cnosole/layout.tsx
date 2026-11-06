import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Console",
  "Illustrative Company Brain console. Ask across sources with citations. Not connected to your systems.",
);

export default function CnosoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
