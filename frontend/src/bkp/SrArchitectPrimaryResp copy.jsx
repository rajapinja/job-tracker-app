// src/pages/SrArchitectResponsibilities.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Copy, Layers, Brain, Shield, Database, Server, Cloud, BookOpen, Zap, RefreshCw, FileText, GitBranch, Globe, Cpu } from "lucide-react";

export default function SrArchitectResponsibilities() {
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(false);

  const sections = [
    {
      id: 1,
      title: "Craft & communicate architecture vision and trade-offs",
      icon: Layers,
      what: "Define high-level architecture goals, key technologies, constraints and why certain trade-offs were made (cost vs latency, consistency vs availability).",
      example: "Propose a microservices approach to replace a monolith to improve deploy velocity; present a slide showing cost estimates, latency improvement, and risks of increased operational overhead."
    },
    {
      id: 2,
      title: "Develop architectural plans & oversee implementation of integrated systems",
      icon: GitBranch,
      what: "Produce roadmaps, component diagrams, integration contracts and shepherd teams during delivery.",
      example: "Create sequence diagrams and an integration API contract for a payments platform; validate the first sprint’s implementation in code review."
    },
    {
      id: 3,
      title: "Collaborate with business & enterprise architects; guide development teams",
      icon: Server,
      what: "Translate business strategy into technical requirements and help teams resolve complex technical blockers.",
      example: "Work with product to prioritize GDPR compliance and guide devs to add field-level encryption and consent tracking."
    },
    {
      id: 4,
      title: "Provide recommendations to improve performance, reliability, reusability within constraints",
      icon: Zap,
      what: "Advise on optimizations and reusable components, while respecting budgets and resource limits.",
      example: "Recommend using a shared caching layer (Redis) and a reusable authentication service to reduce duplicate work and improve response times."
    },
    {
      id: 5,
      title: "Ensure systems (own and acquired) conform to org standards",
      icon: Shield,
      what: "Audit acquired solutions, propose remediation plans and integrate them to enterprise standards.",
      example: "Find an acquired service using basic auth, propose migration to OAuth2 and a timeline for rework."
    },
    {
      id: 6,
      title: "Engage with teams/vendors; assist on design, demos, emerging tech",
      icon: Globe,
      what: "Support vendor selection, run architecture reviews, and pilot new tech.",
      example: "Run a POC with a vector DB vendor for semantic search and demo results to product and engineering."
    },
    {
      id: 7,
      title: "Communicate technical solutions and impacts to stakeholders",
      icon: BookOpen,
      what: "Explain benefits, costs, and risks in business terms so leadership can decide.",
      example: "Present a one-pager showing expected customer experience improvement and 6-month ROI for API gateway adoption."
    },
    {
      id: 8,
      title: "Maintain architectural blueprints, standards, and documentation",
      icon: FileText,
      what: "Keep diagrams, patterns, and decision records up to date for consistency.",
      example: "Publish System Context, Component diagrams and ADRs (Architecture Decision Records) in the team wiki."
    },
    {
      id: 9,
      title: "Present decision matrix with recommendations and rationale",
      icon: Database,
      what: "Show options, scoring criteria and the selected design with justification.",
      example: "A 3-option matrix (Lift & Shift | Refactor | Rebuild) scoring on cost, time, risk — recommending “Refactor” with supporting data."
    },
    {
      id: 10,
      title: "Identify & mitigate technical debt (short and long term)",
      icon: RefreshCw,
      what: "Prioritize debt remediation, create backlog items and align with roadmaps.",
      example: "Create epic for database schema cleanup and phase migrations by non-peak windows to limit risk."
    },
    {
      id: 11,
      title: "Continuously enhance technical knowledge; apply emergent technologies",
      icon: Cpu,
      what: "Stay current and pilot new technologies where they add measurable value.",
      example: "Run internal workshop on LLM safety patterns and pilot an LLM assistant for developer docs."
    },
    {
      id: 12,
      title: "Promote reusable frameworks and architectural patterns",
      icon: Cloud,
      what: "Build libraries, templates, and platform components that teams can reuse.",
      example: "Deliver an internal authentication SDK and a Kubernetes helm chart template used across services."
    },
    {
      id: 13,
      title: "Guide teams to deliver secure solutions per enterprise standards",
      icon: Shield,
      what: "Enforce security patterns (threat modeling, encryption, least privilege) and review designs.",
      example: "Require threat model sign-off for public APIs and ensure secrets are in a vault (no hardcoded keys)."
    },
    {
      id: 14,
      title: "Apply AI-first solutions and enable teams for AI approaches",
      icon: Brain,
      what: "Encourage using AI where it brings value (automation, augmentation), define safe guardrails and patterns.",
      example: "Architect a hybrid retrieval-augmented generation workflow for customer support triage using an LLM + vector DB with logging and human-in-the-loop fallback."
    }
  ];

  const handleCopyAll = () => {
    const textToCopy = sections
      .map(s => `${s.title}\nWhat: ${s.what}\nExample: ${s.example}`)
      .join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-green-400 to-blue-500 drop-shadow-md">
          Senior Architect – Primary Responsibilities
        </h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white hover:scale-105 transition-transform"
          >
            <Copy size={18} />
            {copied ? "Copied!" : "Copy All"}
          </button>
        </div>

        <div className="space-y-4">
          {sections.map(({ id, title, icon: Icon, what, example }) => (
            <div
              key={id}
              className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === id ? null : id)}
                className="flex justify-between items-center w-full px-6 py-2 
                bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 rounded-lg text-left hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-green-400" size={22} />
                  <h3 className="text-md">{title}</h3>
                </div>
                {expanded === id ? (
                  <ChevronUp className="text-green-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {expanded === id && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-300"
                  >
                    <p className="mb-2">
                      <span className="font-semibold text-green-400">What:</span> {what}
                    </p>
                    <p>
                      <span className="font-semibold text-blue-400">Example:</span> {example}
                    </p>
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
