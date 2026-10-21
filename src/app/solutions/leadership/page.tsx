import type { Metadata } from "next";
import { SolutionPage } from "@/components/layout/SolutionPage";
import { pageMetadata } from "@/lib/metadata";
import { USE_CASES } from "@/lib/site";

const solution = USE_CASES.find((item) => item.id === "leadership")!;

export const metadata: Metadata = pageMetadata(solution.title, solution.body);

export default function LeadershipSolutionPage() {
  return (
    <SolutionPage
      title={solution.title}
      intro={solution.intro}
      points={solution.points}
    />
  );
}
