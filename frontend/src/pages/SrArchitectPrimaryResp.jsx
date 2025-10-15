// src/pages/SrArchitectResponsibilities.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Copy, Layers, Brain, Shield, Database, Server, Cloud, BookOpen, Zap, RefreshCw, FileText, GitBranch, Globe, Cpu, Puzzle, Lock, Compass } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

export default function SrArchitectResponsibilities() {
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(false);

  const sections = [
    {
      id: 1,
      title: "🧭 1️⃣ Craft & Communicate Architecture Vision and Trade-offs",
      icon: Compass,
      content: `What it means:
You define the big-picture architecture — what technologies to use, why, and how everything fits together. You also explain the trade-offs (e.g., performance vs cost, consistency vs availability).

Example:
You decide to move from a monolithic app to a microservices design.

✅ Pros: Faster deployments, independent scaling, modularity.

⚠️ Cons: Higher operational complexity, distributed tracing overhead.
You present a diagram and an internal whitepaper showing expected latency improvements and cost impact so leadership understands the decision.`
    },
    {
      id: 2,
      title: "🧱 2️⃣ Develop Architectural Plans & Oversee Implementation of Integrated Systems",
      icon: GitBranch,
      content: `What it means:
You don’t stop at diagrams — you turn them into detailed blueprints (roadmaps, integration APIs, sequence diagrams) and guide teams during implementation.

Example:
For a new payment platform, you:

Create a sequence diagram showing flow between Wallet, Ledger, and Transaction Service.

Define API contracts (JSON schema).

Join sprint reviews and code reviews to ensure teams stick to the design.`
    },
    {
      id: 3,
      title: "🤝 3️⃣ Collaborate with Business & Enterprise Architects; Guide Development Teams",
      icon: Server,
      content: `What it means:
You translate business goals into technical strategy and help developers overcome technical hurdles.

Example:
The business wants to achieve GDPR compliance.
You define technical tasks: encrypt sensitive fields at rest, implement consent tracking, and audit trails.
You guide dev teams on choosing AES-256 encryption and integration with Vault for key management.`
    },
    {
      id: 4,
      title: "⚡ 4️⃣ Provide Recommendations to Improve Performance, Reliability, Reusability within Constraints",
      icon: Zap,
      content: `What it means:
You optimize systems while staying within budget and resource limits.

Example:
Teams repeatedly implement caching. You recommend a shared Redis cache service and a reusable Auth microservice, improving performance and cutting redundant work.`
    },
    {
      id: 5,
      title: "🛡️ 5️⃣ Ensure Systems (Own and Acquired) Conform to Org Standards",
      icon: Shield,
      content: `What it means:
When new systems (e.g., from acquisitions) join, you audit and align them to your company’s security, compliance, and design standards.

Example:
An acquired company uses basic authentication. You create a migration plan to move them to OAuth2, define a remediation timeline, and track adoption.`
    },
    {
      id: 6,
      title: "🌐 6️⃣ Engage with Teams/Vendors; Assist on Design, Demos, Emerging Tech",
      icon: Globe,
      content: `What it means:
You support vendor evaluation and tech pilots, ensuring new technologies fit enterprise strategy.

Example:
You lead a proof-of-concept (POC) with a vector database vendor (like Pinecone) for a semantic search use case, and demo it to product leadership for approval.`
    },
    {
      id: 7,
      title: "💬 7️⃣ Communicate Technical Solutions and Impacts to Stakeholders",
      icon: BookOpen,
      content: `What it means:
You explain complex technical ideas in simple business terms so executives and non-technical teams can make decisions.

Example:
You propose adopting an API Gateway:

Explain it reduces duplication and improves customer experience.

Show an ROI chart projecting a 6-month payback through reduced outages.`
    },
    {
      id: 8,
      title: "📘 8️⃣ Maintain Architectural Blueprints, Standards, and Documentation",
      icon: FileText,
      content: `What it means:
You keep architecture documentation and diagrams up to date for consistency and governance.

Example:
Publish updated System Context and Component Diagrams in Confluence.
Maintain Architecture Decision Records (ADRs) explaining why you chose AWS SQS over Kafka for a particular use case.`
    },
    {
      id: 9,
      title: "⚖️ 9️⃣ Present Decision Matrix with Recommendations and Rationale",
      icon: Database,
      content: `What it means:
You present multiple options, evaluate each objectively, and justify the recommended one.

Example:
You evaluate:

Option	Cost	Time	Risk	Decision
Lift & Shift	Low	Fast	High	❌
Refactor	Medium	Moderate	Medium	✅
Rebuild	High	Slow	Low	❌

You recommend Refactor, supported by data and reasoning.`
    },
    {
      id: 10,
      title: "🔧 🔄 1️⃣0️⃣ Identify & Mitigate Technical Debt",
      icon: RefreshCw,
      content: `What it means:
You proactively address architectural debt — outdated or risky designs that slow progress.

Example:
Create a roadmap to clean up database schema, normalize tables, and migrate in phases during low-traffic hours.
Align it with business releases to avoid disruption.`
    },
    {
      id: 11,
      title: "🧠 1️⃣1️⃣ Continuously Enhance Technical Knowledge; Apply Emergent Technologies",
      icon: Cpu,
      content: `What it means:
You stay ahead of trends and pilot new technologies when they add measurable value.

Example:
Conduct an internal LLM safety workshop and implement a developer-assistant chatbot using an LLM + company documentation for faster onboarding.`
    },
    {
      id: 12,
      title: "🧩 1️⃣2️⃣ Promote Reusable Frameworks and Architectural Patterns",
      icon: Puzzle,
      content: `What it means:
You reduce duplication by building common frameworks and libraries.

Example:
Deliver an internal Authentication SDK and a Helm chart template so teams can deploy microservices quickly with security and logging already integrated.`
    },
    {
      id: 13,
      title: "🔒 1️⃣3️⃣ Guide Teams to Deliver Secure Solutions per Enterprise Standards",
      icon: Lock,
      content: `What it means:
You ensure all designs meet security best practices — least privilege, encryption, threat modeling.

Example:
For every public API, enforce:

Threat modeling review before release.
Secrets managed via HashiCorp Vault (no plaintext keys).
Encryption in transit (TLS 1.3) and at rest (AES-256).`
    },
    {
      id: 14,
      title: "🤖 1️⃣4️⃣ Apply AI-First Solutions and Enable Teams for AI Approaches",
      icon: Brain,
      content: `What it means:
You promote AI-driven architectures — automation, augmentation, and intelligent decision-making.

Example:
You design a retrieval-augmented generation (RAG) system for customer support:

Uses a vector DB (like Pinecone) + LLM for Q&A.
Includes logs and human-in-loop fallback for compliance.
Reduces response time and boosts agent productivity.`
    },
    {
      id: 15,
      title: "💡 Summary",
      icon: Layers,
      content: `Focus Area	Your Role	Example Impact
Vision	Define & justify system direction	Shift to microservices with trade-off analysis
Implementation	Guide teams to deliver architecture	Payments integration blueprints
Optimization	Improve speed, cost, reuse	Shared Redis & Auth services
Governance	Maintain standards & compliance	Audit acquired systems
Communication	Bridge tech & business	ROI-based API gateway proposal
Innovation	Explore AI & emerging tech	LLM developer assistant pilot`
    }
  ];

  const handleCopyAll = () => {
    const textToCopy = sections.map(s => `${s.title}\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={"Senior Architect – Primary Responsibilities"} />

        <div className="flex justify-end mb-6">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white hover:scale-105 transition-transform"
          >
            <Copy size={18} /> {copied ? "Copied!" : "Copy All"}
          </button>
        </div>

        <div className="space-y-4">
          {sections.map(({ id, title, icon: Icon, content }) => (
            <div key={id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <button
                onClick={() => setExpanded(expanded === id ? null : id)}
                className="flex justify-between items-center w-full px-6 py-2 border-gray-100
                bg-gradient-to-r from-indigo-100 via-blue-200 to-gray-300 rounded-lg text-left hover:bg-blue-500 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-green-400" size={22} />
                  <h3 className="text-md">{title}</h3>
                </div>
                {expanded === id ? <ChevronUp className="text-green-400" /> : <ChevronDown className="text-gray-400" />}
              </button>

              <AnimatePresence initial={false}>
                {expanded === id && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 whitespace-pre-wrap text-gray-300"
                  >
                    {content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}