import React, { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";
import {
  ChevronDown,
  ChevronUp,
  Layers,
  Server,
  Shield,
  Wrench,
  Monitor,
  Compass,
} from "lucide-react";

export default function ArchitecturalDiagram() {
  const [expanded, setExpanded] = useState({
    frontend: true,
    backend: true,
    security: true,
    devops: false,
    observability: false,
    details: false,
  });

  const containersRef = useRef({});

  const toggle = (section) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  // Initialize Mermaid for a given container
  const renderMermaid = (id, diagram) => {
    const element = containersRef.current[id];
    if (element) {
      element.innerHTML = diagram;
      mermaid.init(undefined, element);
    }
  };

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });

    // Render all diagrams
    renderAllDiagrams();
  }, []);

  useEffect(() => {
    // Re-render diagrams on expand/collapse
    renderAllDiagrams();
  }, [expanded]);

  const renderAllDiagrams = () => {
    renderMermaid("frontendDiagram", `
      graph TD
        F1[User Interface] --> F2[State Management (React Query / Redux)]
        F2 --> F3[REST API Calls]
        subgraph Frontend ["Frontend Layer - React/Vite/Tailwind/UnoCSS"]
          F1
          F2
          F3
        end
    `);

    renderMermaid("backendDiagram", `
graph TD
B1[Controller Layer] --> B2[Service Layer]
B2 --> B3[Repository Layer]
B2 --> MQ((Kafka / Async Queue - Future))
subgraph Backend ["Backend Layer - Spring Boot"]
  B1 --> B2
  B2 --> B3
  B2 --> MQ
end
DB[(PostgreSQL Database)]
B3 --> DB
`);

    renderMermaid("securityDiagram", `
graph TD
S1[OAuth2 / Keycloak] --> B1[Controller Layer]
S2[Input Validation & CSRF Protection] --> A1[User Interface]
subgraph Security ["Security Layer"]
  S1 --> B1
  S2 --> A1
end
`);

    renderMermaid("devopsDiagram", `
graph TD
D1[GitHub Actions / Jenkins] --> D2[Docker Build]
D2 --> D3[Deploy Dev/Test/Prod]
subgraph DevOps ["CI/CD Pipeline"]
  D1 --> D2
  D2 --> D3
end
`);

    renderMermaid("observabilityDiagram", `
graph TD
B1[Controller Layer] --> O1[Spring Actuator Metrics]
O1 --> O2[ELK / Prometheus / Grafana]
subgraph Observability ["Monitoring & Logging"]
  B1 --> O1
  O1 --> O2
end
`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white/70 rounded-2xl shadow-md border border-gray-100">
      <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 text-transparent bg-clip-text drop-shadow-md">
        🧭 Job Tracker — Enterprise Architecture Overview
      </h1>

      {/* Layer toggle buttons */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {[
          { key: "frontend", label: "Frontend", icon: <Layers size={18} /> },
          { key: "backend", label: "Backend", icon: <Server size={18} /> },
          { key: "security", label: "Security", icon: <Shield size={18} /> },
          { key: "devops", label: "DevOps", icon: <Wrench size={18} /> },
          { key: "observability", label: "Observability", icon: <Monitor size={18} /> },
          { key: "details", label: "What This Diagram Shows", icon: <Compass size={18} /> },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center justify-between px-4 py-2 border rounded-lg text-sm font-semibold shadow-sm transition-all ${
              expanded[key]
                ? "bg-gradient-to-r from-green-400 to-blue-400 text-white"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center gap-2">{icon}{label}</span>
            {expanded[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        ))}
      </div>

      {/* Render each layer as separate diagram */}
      {expanded.frontend && (
        <div ref={(el) => (containersRef.current.frontendDiagram = el)} className="bg-gray-50 rounded-xl p-4 overflow-x-auto shadow-inner mb-4"></div>
      )}
      {expanded.backend && (
        <div ref={(el) => (containersRef.current.backendDiagram = el)} className="bg-gray-50 rounded-xl p-4 overflow-x-auto shadow-inner mb-4"></div>
      )}
      {expanded.security && (
        <div ref={(el) => (containersRef.current.securityDiagram = el)} className="bg-gray-50 rounded-xl p-4 overflow-x-auto shadow-inner mb-4"></div>
      )}
      {expanded.devops && (
        <div ref={(el) => (containersRef.current.devopsDiagram = el)} className="bg-gray-50 rounded-xl p-4 overflow-x-auto shadow-inner mb-4"></div>
      )}
      {expanded.observability && (
        <div ref={(el) => (containersRef.current.observabilityDiagram = el)} className="bg-gray-50 rounded-xl p-4 overflow-x-auto shadow-inner mb-4"></div>
      )}

      {/* What This Diagram Shows */}
      {expanded.details && (
        <div className="mt-6 border border-gray-200 rounded-2xl p-5 bg-gray-50 shadow-inner transition-all">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700">
            🪄 What This Diagram Shows
          </h2>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-green-700">Frontend Layer</h3>
              <ul className="list-disc pl-6">
                <li>React/Vite/Tailwind handles UI & state management.</li>
                <li>Communicates securely via REST API.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700">Backend Layer</h3>
              <ul className="list-disc pl-6">
                <li>Spring Boot layered architecture (Controller → Service → Repository).</li>
                <li>Interacts with PostgreSQL.</li>
                <li>Optional Kafka async pipeline.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700">Security Layer</h3>
              <ul className="list-disc pl-6">
                <li>OAuth2 / Keycloak integration.</li>
                <li>Input validation & CSRF protection.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700">DevOps Layer</h3>
              <ul className="list-disc pl-6">
                <li>GitHub Actions / Jenkins CI/CD.</li>
                <li>Docker deployment to Dev/Test/Prod.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700">Observability Layer</h3>
              <ul className="list-disc pl-6">
                <li>Spring Actuator for metrics.</li>
                <li>ELK / Prometheus / Grafana for monitoring.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        Click the buttons above to expand or collapse architectural layers dynamically.
      </p>
    </div>
  );
}
