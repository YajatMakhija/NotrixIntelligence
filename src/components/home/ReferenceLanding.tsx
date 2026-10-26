"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

const tools = [
  ["slack", "Slack"],
  ["google-docs", "Google Docs"],
  ["notion", "Notion"],
  ["jira", "Jira"],
  ["confluence", "Confluence"],
  ["github", "GitHub"],
] as const;

const questions = [
  { short: "Launch plan", question: "What changed in the launch plan?", answer: "The launch moved to Friday. Design is approved, and QA is the remaining blocker.", followUp: "Who owns the final QA sign-off?", sources: [["slack", "Slack · Product"], ["google-docs", "Docs · Launch plan"], ["jira", "Jira · Release tasks"]] },
  { short: "Customer risk", question: "Which customer commitments need attention?", answer: "Two onboarding milestones are at risk. The open dependencies are an SSO review and the final data import.", followUp: "Draft an owner-by-owner follow-up.", sources: [["slack", "Slack · Customer team"], ["notion", "Notion · Account plan"], ["jira", "Jira · Delivery board"]] },
  { short: "Decision history", question: "Why did we change the rollout sequence?", answer: "The team moved Finance ahead of Sales so permission rules can be validated with a smaller, well-defined group.", followUp: "Show the original decision thread.", sources: [["google-docs", "Docs · Rollout brief"], ["slack", "Slack · Leadership"], ["github", "GitHub · Access service"]] },
] as const;

const capabilities: Array<[IconName, string, string]> = [
  ["search", "Find answers across your tools", "Ask one question across conversations, documents, tickets, and decisions."],
  ["clock", "Keep context accessible", "Preserve the reasoning behind decisions so teams can move without rebuilding history."],
  ["file", "See where every answer came from", "Keep source references close to the answer so people can verify the underlying evidence."],
];

const teamExamples = [
  { name: "Engineering", scenario: "Trace a technical decision across tickets, discussions, and code.", question: "Why did we change the authentication flow?", answer: "The team replaced the shared session with tenant-scoped tokens after the access review identified cross-workspace risk.", source: "Jira · SEC-184  ·  GitHub · auth-service" },
  { name: "Operations", scenario: "Turn scattered updates into a clear view of blockers and owners.", question: "What is blocking the regional rollout?", answer: "The remaining dependency is the data-processing agreement. Technical configuration and training are complete.", source: "Notion · Rollout tracker  ·  Slack · Operations" },
  { name: "New joiners", scenario: "Give new teammates the history behind how work gets done.", question: "How do we approve enterprise pricing exceptions?", answer: "Sales submits the commercial context, Finance confirms margin, and Legal reviews any non-standard terms before approval.", source: "Docs · Pricing policy  ·  Confluence · Deal desk" },
] as const;

const faqs = [
  ["Which tools can Notrix connect to?", "The landing page shows the proposed connector set. Exact availability and scope should be confirmed during product discovery."],
  ["How are source permissions handled?", "The intended model is to respect the access boundary of the person asking. The final behaviour depends on the connected system and deployment design."],
  ["How long does setup take?", "Start with one team, a small set of sources, and a clear success measure. A scoped onboarding plan is agreed before implementation."],
  ["Where can Notrix be deployed?", "Deployment options are discussed with your security team so infrastructure, data handling, and operational ownership are explicit."],
  ["Can administrators control connected sources?", "The administrative model is defined around the selected connectors, roles, and deployment boundary."],
  ["What happens during a demo?", "We use one real workflow to show how connected knowledge, sources, and permissions would work for your team."],
] as const;

export default function ReferenceLanding() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const question = questions[questionIndex];
  const team = teamExamples[teamIndex];

  return (
    <div className="reference-home">
      <section className="ref-hero ref-container">
        <div className="ref-hero-copy">
          <p className="ref-eyebrow">The Company Brain</p>
          <h1><span>Your company already</span><span>knows the answer.</span></h1>
          <p className="ref-lede">Bring conversations, documents, and decisions together so your team can ask questions and find answers with sources.</p>
          <div className="ref-actions">
            <Link className="ref-button ref-button-dark" href="/contact">Request a demo <Icon name="arrowRight" /></Link>
            <Link className="ref-button ref-button-light" href="#product-demo"><span className="ref-play">▶</span> See how it works</Link>
          </div>
        </div>
        <ConnectedHero />
      </section>

      <section className="ref-product ref-section ref-container" id="product-demo">
        <div className="ref-section-intro">
          <p className="ref-eyebrow">Product demonstration</p>
          <h2>See how your company’s knowledge comes together.</h2>
          <p>Choose an example question to see a focused, illustrative answer with its supporting sources.</p>
        </div>
        <div className="ref-example-switcher" aria-label="Example questions">
          {questions.map((item, index) => <button key={item.short} type="button" aria-pressed={index === questionIndex} onClick={() => setQuestionIndex(index)}>{item.short}</button>)}
        </div>
        <div className="ref-demo-frame">
          <aside>
            <div className="ref-demo-brand"><Image src="/notrix-n-logo.png" width={28} height={28} alt="" /> Notrix</div>
            <nav aria-label="Product demonstration"><span className="active"><Icon name="search" /> Ask</span><span><Icon name="file" /> Sources</span><span><Icon name="clock" /> History</span></nav>
          </aside>
          <div className="ref-demo-answer" key={question.question}>
            <p className="ref-demo-label">Example question</p>
            <div className="ref-demo-question"><Icon name="search" /> {question.question}</div>
            <p className="ref-answer-label"><span /> Notrix answer</p>
            <h3>{question.answer}</h3>
            <div className="ref-source-chips">{question.sources.map(([logo, label]) => <span key={label}><Image src={`/logos/${logo}.svg`} width={16} height={16} alt="" />{label}</span>)}</div>
            <button type="button" className="ref-follow-up"><Icon name="arrowRight" /> {question.followUp}</button>
          </div>
          <div className="ref-source-detail">
            <p className="ref-demo-label">Source detail</p>
            <strong>{question.sources[0][1]}</strong>
            <p>Relevant passage shown with its original location, author, and update time.</p>
            <Link href="/product/company-brain">Open source <Icon name="arrowRight" /></Link>
          </div>
        </div>
      </section>

      <section className="ref-capabilities ref-section ref-container">
        <div className="ref-section-intro"><p className="ref-eyebrow">Core capabilities</p><h2>One place to understand the work.</h2></div>
        <div className="ref-capability-grid">{capabilities.map(([icon, title, copy]) => <article key={title}><span><Icon name={icon} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="ref-teams ref-section ref-container">
        <div className="ref-team-copy"><p className="ref-eyebrow">Built for the work in front of you</p><h2>Shared context for every team.</h2><p>Each team asks different questions. The knowledge layer stays consistent.</p>
          <div className="ref-team-tabs" aria-label="Team use cases">{teamExamples.map((item, index) => <button key={item.name} type="button" aria-pressed={index === teamIndex} onClick={() => setTeamIndex(index)}>{item.name}</button>)}</div>
        </div>
        <div className="ref-team-preview" aria-live="polite" key={team.name}><p>{team.scenario}</p><div className="ref-team-question"><Icon name="search" /> {team.question}</div><div className="ref-team-response"><span>Answer</span><h3>{team.answer}</h3><small>{team.source}</small></div></div>
      </section>

      <section className="ref-integrations ref-section ref-container" id="integrations">
        <div className="ref-section-intro"><p className="ref-eyebrow">Integrations</p><h2>Connected to the tools your team uses.</h2><p>Bring the working context together while keeping every source recognisable.</p></div>
        <div className="ref-integration-grid">{tools.map(([id, name]) => <div key={id}><Image src={`/logos/${id}.svg`} width={34} height={34} alt="" /><span>{name}</span></div>)}</div>
        <p className="ref-availability">Connector availability and scope are confirmed during product discovery.</p>
      </section>

      <section className="ref-security" id="security">
        <div className="ref-container ref-security-inner">
          <div><p className="ref-eyebrow">Security and deployment</p><h2>Define the boundary before connecting the knowledge.</h2><p>Notrix is designed for a security review that makes permissions, data handling, deployment, and administrative control explicit.</p><Link href="/security">Explore security <Icon name="arrowRight" /></Link></div>
          <div className="ref-boundary" aria-label="Illustrative access boundary"><div className="ref-boundary-row"><span>Company tools</span><span>Notrix</span><span>Your people</span></div><div className="ref-boundary-flow"><Icon name="file" /><i /><div><Image src="/notrix-n-logo.png" width={42} height={42} alt="Notrix" /></div><i /><Icon name="users" /></div><p>Access boundary agreed with your security team</p></div>
        </div>
      </section>

      <section className="ref-start ref-section ref-container">
        <div className="ref-section-intro"><p className="ref-eyebrow">Getting started</p><h2>Start with one useful question.</h2></div>
        <ol>{["Connect relevant tools", "Configure access", "Start asking questions"].map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
      </section>

      <section className="ref-faq ref-section ref-container">
        <div className="ref-section-intro"><p className="ref-eyebrow">Frequently asked questions</p><h2>What teams ask before a pilot.</h2></div>
        <div>{faqs.map(([questionText, answer]) => <details key={questionText}><summary>{questionText}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="ref-final ref-container"><div className="ref-final-motif" aria-hidden="true" /><p className="ref-eyebrow">Get started</p><h2>Turn scattered knowledge into shared understanding.</h2><p>Choose one workflow and see what your company already knows.</p><Link className="ref-button ref-button-dark" href="/contact">Request a demo <Icon name="arrowRight" /></Link></section>
    </div>
  );
}

function ConnectedHero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = visualRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={visualRef} className={`ref-connected-hero ${paused || !visible ? "is-paused" : ""}`}>
      <svg className="ref-connections" viewBox="0 0 540 500" aria-hidden="true"><path d="M92 88 C172 108 202 178 270 236"/><path d="M260 58 C258 126 267 168 270 236"/><path d="M455 106 C374 120 330 174 270 236"/><path d="M76 340 C154 326 205 282 270 236"/><path d="M300 432 C296 352 284 292 270 236"/><path d="M475 348 C382 329 329 276 270 236"/></svg>
      {tools.map(([id, name], index) => <div className={`ref-tool ref-tool-${index + 1}`} key={id}><Image src={`/logos/${id}.svg`} width={30} height={30} alt={name} /></div>)}
      <div className="ref-info-fragment ref-fragment-one">Launch notes · updated</div><div className="ref-info-fragment ref-fragment-two">QA blocker · open</div>
      <div className="ref-core"><Image src="/notrix-n-logo.png" width={54} height={54} alt="Notrix" /></div>
      <div className="ref-hero-answer"><span>Illustrative answer</span><strong>What changed in the launch plan?</strong><p>The launch moved to Friday. Design is approved, and QA is the remaining blocker.</p><div><small>Slack · Product</small><small>Docs · Launch plan</small><small>Jira · Release tasks</small></div></div>
      <button type="button" className="ref-pause" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? "Play animation" : "Pause animation"}</button>
    </div>
  );
}
