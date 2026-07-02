import { CinematicHero } from "@/components/giga/CinematicHero";
import { ClosingCTA } from "@/components/giga/ClosingCTA";
import { CustomerSpotlight } from "@/components/giga/CustomerSpotlight";
import { FeatureGrid } from "@/components/giga/FeatureGrid";
import { ImproveSection } from "@/components/giga/ImproveSection";
import { ProductShowcase } from "@/components/giga/ProductShowcase";
import { ProductSpotlight } from "@/components/giga/ProductSpotlight";
import { StatsBand } from "@/components/giga/StatsBand";
import { StepFlow } from "@/components/giga/StepFlow";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProductSpotlight />
      <StatsBand />
      <FeatureGrid />
      <ProductShowcase
        id="knowledge-layer"
        eyebrow="Knowledge Layer"
        title="Turn company data into intelligence"
        description="Notrix ingests documents, tickets, CRM records, and conversations — then builds a unified, permission-aware knowledge graph your entire organization can query and act on."
        exploreLabel="Explore Knowledge Layer"
        theme="dark"
        mockType="knowledge"
        steps={[
          { title: "Connect", description: "Plug into 50+ enterprise data sources." },
          { title: "Chunk", description: "Intelligent segmentation with context preservation." },
          { title: "Enrich", description: "Entity extraction, tagging, and relationship mapping." },
          { title: "Govern", description: "RBAC, audit logs, and data residency controls." },
          { title: "Query", description: "Hybrid semantic + keyword retrieval with citations." },
        ]}
      />
      <StepFlow />
      <ProductShowcase
        id="agent-runtime"
        eyebrow="Agent Runtime"
        title="Agents that execute, not just answer"
        description="Build autonomous agents grounded in your knowledge layer. Define policies in plain language, connect tools, and deploy agents that handle complex multi-step workflows."
        exploreLabel="Explore Agent Runtime"
        theme="dark"
        mockType="agent"
        steps={[
          { title: "Create the agent", description: "Ground agents in brand standards and compliance rules." },
          { title: "Define policies", description: "Set guardrails for automation, escalation, and sensitive cases." },
          { title: "Design the logic", description: "Map flows and connect tools across your enterprise stack." },
          { title: "Test and launch", description: "Simulate edge cases and validate before production." },
          { title: "Monitor and improve", description: "Track outcomes and refine policies from live data." },
        ]}
      />
      <ImproveSection />
      <ProductShowcase
        id="enterprise-search"
        eyebrow="Enterprise Search"
        title="Find anything. Instantly."
        description="Semantic search across every document, ticket, wiki, and conversation. Every answer cited, every result permission-filtered."
        exploreLabel="Explore Enterprise Search"
        theme="dark"
        mockType="search"
        steps={[
          { title: "Ask naturally", description: "Natural language queries across all connected sources." },
          { title: "Get cited answers", description: "Every response linked to source documents." },
          { title: "Filter by context", description: "Department, date, project, and access-level filters." },
        ]}
      />
      <ProductShowcase
        id="workflow-engine"
        eyebrow="Workflow Engine"
        title="Automate what takes armies of people"
        description="Multi-step agentic pipelines that trigger on events, branch on conditions, and execute across systems — with full audit trails."
        exploreLabel="Explore Workflow Engine"
        theme="light"
        mockType="workflow"
        steps={[
          { title: "Define triggers", description: "Events, schedules, or agent-initiated starts." },
          { title: "Branch logic", description: "Conditional paths with human-in-the-loop checkpoints." },
          { title: "Execute actions", description: "API calls, agent tasks, notifications, and approvals." },
        ]}
      />
      <CustomerSpotlight />
      <ClosingCTA />
    </>
  );
}
