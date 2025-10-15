import React, { useState } from "react";

export default function SrArchitectPrimaryResp() {
  const [copied, setCopied] = useState(false);

  const copyAll = async () => {
    const el = document.getElementById("full-content");
    if (!el) return;
    try {
      await navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">Primary responsibilities — Sr. Architect</h1>
          <p className="text-sm text-slate-500">Interactive .jsx page containing the full responsibilities with definitions and examples</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyAll}
            className="px-3 py-2 rounded-lg border hover:bg-slate-50"
            title="Copy entire content to clipboard"
          >
            {copied ? "Copied" : "Copy All"}
          </button>
        </div>
      </header>

      <main id="full-content" className="space-y-6 leading-relaxed text-slate-800">

        <section className="prose max-w-none">
          <h2>Craft & communicate architecture vision and trade-offs</h2>
          <p><strong>What:</strong> Define high-level architecture goals, key technologies, constraints and why certain trade-offs were made (cost vs latency, consistency vs availability).</p>
          <p><strong>Example:</strong> Propose a microservices approach to replace a monolith to improve deploy velocity; present a slide showing cost estimates, latency improvement, and risks of increased operational overhead.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Develop architectural plans & oversee implementation of integrated systems</h2>
          <p><strong>What:</strong> Produce roadmaps, component diagrams, integration contracts and shepherd teams during delivery.</p>
          <p><strong>Example:</strong> Create sequence diagrams and an integration API contract for a payments platform; validate the first sprint’s implementation in code review.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Collaborate with business & enterprise architects; guide development teams</h2>
          <p><strong>What:</strong> Translate business strategy into technical requirements and help teams resolve complex technical blockers.</p>
          <p><strong>Example:</strong> Work with product to prioritize GDPR compliance and guide devs to add field-level encryption and consent tracking.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Provide recommendations to improve performance, reliability, reusability within constraints</h2>
          <p><strong>What:</strong> Advise on optimizations and reusable components, while respecting budgets and resource limits.</p>
          <p><strong>Example:</strong> Recommend using a shared caching layer (Redis) and a reusable authentication service to reduce duplicate work and improve response times.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Ensure systems (own and acquired) conform to org standards</h2>
          <p><strong>What:</strong> Audit acquired solutions, propose remediation plans and integrate them to enterprise standards.</p>
          <p><strong>Example:</strong> Find an acquired service using basic auth, propose migration to OAuth2 and a timeline for rework.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Engage with teams/vendors; assist on design, demos, emerging tech</h2>
          <p><strong>What:</strong> Support vendor selection, run architecture reviews, and pilot new tech.</p>
          <p><strong>Example:</strong> Run a POC with a vector DB vendor for semantic search and demo results to product and engineering.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Communicate technical solutions and impacts to stakeholders</h2>
          <p><strong>What:</strong> Explain benefits, costs, and risks in business terms so leadership can decide.</p>
          <p><strong>Example:</strong> Present a one-pager showing expected customer experience improvement and 6-month ROI for API gateway adoption.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Maintain architectural blueprints, standards, and documentation</h2>
          <p><strong>What:</strong> Keep diagrams, patterns, and decision records up to date for consistency.</p>
          <p><strong>Example:</strong> Publish System Context, Component diagrams and ADRs (Architecture Decision Records) in the team wiki.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Present decision matrix with recommendations and rationale</h2>
          <p><strong>What:</strong> Show options, scoring criteria and the selected design with justification.</p>
          <p><strong>Example:</strong> A 3-option matrix (Lift & Shift | Refactor | Rebuild) scoring on cost, time, risk — recommending “Refactor” with supporting data.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Identify & mitigate technical debt (short and long term)</h2>
          <p><strong>What:</strong> Prioritize debt remediation, create backlog items and align with roadmaps.</p>
          <p><strong>Example:</strong> Create epic for database schema cleanup and phase migrations by non-peak windows to limit risk.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Continuously enhance technical knowledge; apply emergent technologies</h2>
          <p><strong>What:</strong> Stay current and pilot new technologies where they add measurable value.</p>
          <p><strong>Example:</strong> Run internal workshop on LLM safety patterns and pilot an LLM assistant for developer docs.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Promote reusable frameworks and architectural patterns</h2>
          <p><strong>What:</strong> Build libraries, templates, and platform components that teams can reuse.</p>
          <p><strong>Example:</strong> Deliver an internal authentication SDK and a Kubernetes helm chart template used across services.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Guide teams to deliver secure solutions per enterprise standards</h2>
          <p><strong>What:</strong> Enforce security patterns (threat modeling, encryption, least privilege) and review designs.</p>
          <p><strong>Example:</strong> Require threat model sign-off for public APIs and ensure secrets are in a vault (no hardcoded keys).</p>
        </section>

        <section className="prose max-w-none">
          <h2>Apply AI-first solutions and enable teams for AI approaches</h2>
          <p><strong>What:</strong> Encourage using AI where it brings value (automation, augmentation), define safe guardrails and patterns.</p>
          <p><strong>Example:</strong> Architect a hybrid retrieval-augmented generation workflow for customer support triage using an LLM + vector DB with logging and human-in-the-loop fallback.</p>
        </section>

      </main>

      <footer className="mt-8 text-sm text-slate-600">
        <p>Generated: SrArchitect_PrimaryResponsibilities.jsx — open, edit, or copy the content above.</p>
      </footer>
    </div>
  );
}
