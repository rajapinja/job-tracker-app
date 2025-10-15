import React, { useState } from "react";
import {
  Layers,
  Server,
  Database,
  Monitor,
  Shield,
  Wrench,
  Activity,
  Users,
  Compass,
  ClipboardList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ArchitecturalDiagram from "./ArchitecturalDiagram";
import SectionHeading from "../components/SectionHeading";

export default function ArchitecturalVisionAndTechnologyStrategy() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  const sections = [
    {
      id: 1,
      title: "1. Architectural Vision & Technology Strategy",
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      content: `
✅ What You Did:
- Built a functional monolithic full-stack app (React + Spring Boot + PostgreSQL).
- Great for prototyping, quick demo, or personal use.

🚫 What’s Missing:
- No defined architecture blueprint (how components interact, scale, or secure data).
- No clear separation of concerns or future scaling plan.
- No non-functional requirements (NFRs): scalability, availability, security, observability, etc.

💡 As a Solution Architect, You Should:
Architecture Pattern: Define whether it’s a monolith, modular monolith, or microservice-based.
Tech Strategy: Document reasons for chosen stack.
Deployment Vision: Plan environment tiers (Dev / Test / Prod).
Scalability Plan: Identify what to modularize later.

📘 Example Artifact: “Architecture Vision Document (AVD)” with:
- System Context Diagram
- Component Diagram
- Technology Stack Justification
- Key NFRs (performance, maintainability, security)
      `,
    },
    {
      id: 2,
      title: "2. System Design (Backend Services Layer)",
      icon: <Server className="w-6 h-6 text-green-500" />,
      content: `
✅ What You Did:
- Spring Boot REST APIs with PostgreSQL database.

🚫 Missing or Weak Areas:
- No API Documentation / Standards (add Swagger/OpenAPI)
- No Layered Architecture (adopt Clean Architecture)
- No Validation & Exception Handling Strategy
- No Audit Trail
- No Async / Event-driven Design
- No Unit or Integration Testing Strategy

💡 Architect Move:
Define a Service Interaction Diagram — how JobService, CompanyService, and AckService interact via APIs or async events.
      `,
    },
    {
      id: 3,
      title: "3. Data Layer & Database Architecture",
      icon: <Database className="w-6 h-6 text-yellow-500" />,
      content: `
✅ What You Did:
- PostgreSQL setup for storing jobs and companies.

🚫 Missing:
- No ERD (Entity Relationship Diagram)
- No Database Normalization / Constraints
- No Data Versioning or Migration Strategy (use Flyway or Liquibase)
- No Backup / Restore / Archival Strategy
- No Data Retention Policy

💡 Architect Move:
Document Data Model + Lifecycle — how data is created, updated, archived, and deleted.
      `,
    },
    {
      id: 4,
      title: "4. Frontend Architecture (React)",
      icon: <Monitor className="w-6 h-6 text-purple-500" />,
      content: `
✅ What You Did:
- Simple React app with routes and voice feature.

🚫 Missing:
- No State Management Strategy (use Redux Toolkit or React Query)
- No Componentization / Folder Structure
- No Error Handling & Loading States
- No Theming / UI Consistency
- No Accessibility (a11y)

💡 Architect Move:
Define Frontend Architecture Blueprint with: /components, /hooks, /pages, /services, /store.
      `,
    },
    {
      id: 5,
      title: "5. Security Architecture",
      icon: <Shield className="w-6 h-6 text-red-500" />,
      content: `
🚫 Major Missing Area

Security Aspect → What’s Missing → What Architect Should Do:
- Authentication / Authorization → Anyone can access APIs → Integrate Keycloak/OAuth2
- Data Encryption → Use HTTPS + AES/GCM in DB
- Input Validation → Bean Validation + React validation
- Audit Logging → SLF4J + ELK integration
- Secret Management → Spring Cloud Vault / env vars
- CORS / CSRF Protection → Configure properly

💡 Architect Move:
Define a Security Architecture Document with:
- Authentication model
- Authorization matrix (role → feature)
- Data protection mechanisms
- Secure coding standards checklist
      `,
    },
    {
      id: 6,
      title: "6. DevOps & Deployment Architecture",
      icon: <Wrench className="w-6 h-6 text-orange-500" />,
      content: `
🚫 Missing:
- CI/CD Pipeline (GitHub Actions/Jenkins)
- Containerization (Docker Compose)
- Environment Segregation (Spring profiles)
- Infra as Code (Terraform)
- Monitoring & Logs (Prometheus + Grafana)
- Secrets Handling (Vault)

💡 Architect Move:
Create DevOps Architecture Diagram showing CI/CD stages → build → test → deploy → monitor.
      `,
    },
    {
      id: 7,
      title: "7. Observability & Performance",
      icon: <Activity className="w-6 h-6 text-cyan-500" />,
      content: `
🚫 Missing:
- Metrics & Health Checks (Spring Actuator)
- Centralized Logging (ELK)
- Tracing (OpenTelemetry + Jaeger)
- API Rate Limiting
- Frontend Performance Metrics (Lighthouse)

💡 Architect Move:
Define an Observability Strategy — how to monitor uptime, performance, and user activity.
      `,
    },
    {
      id: 8,
      title: "8. Collaboration & Governance",
      icon: <Users className="w-6 h-6 text-pink-500" />,
      content: `
🚫 Missing:
- Architecture Governance
- Coding Standards
- Documentation
- Knowledge Sharing

💡 Architect Move:
Create Architecture Decision Records (ADRs) — markdown files explaining why each decision was made.
      `,
    },
    {
      id: 9,
      title: "9. Example: How You’d Present It in an Interview or Review",
      icon: <Compass className="w-6 h-6 text-indigo-500" />,
      content: `
"As the Solution Architect for the Job Tracker App, I would define a modular architecture with clear separation between UI, API, and data layers. I’d enforce secure communication via OAuth2 and HTTPS, containerize the stack for CI/CD automation, and design a scalable data model with auditing and observability built in. Additionally, I’d align the roadmap to support future multi-user functionality and cloud deployment readiness."
      `,
    },
    {
      id: 10,
      title: "10. Summary Table — Architect’s Eye View",
      icon: <ClipboardList className="w-6 h-6 text-teal-500" />,
      content: `
| Area | Current | Missing / To Improve | Why It Matters |
|------|----------|----------------------|----------------|
| Architecture Vision | Monolithic | Need blueprint, NFRs | Guides scalability and design |
| Backend Design | CRUD APIs | Missing modularity & docs | Maintainability |
| Database | Basic | Need versioning, backups | Data integrity |
| Frontend | Working | Missing state management & structure | Scalability |
| Security | Weak | No auth/encryption | Data protection |
| DevOps | Manual | No CI/CD, no IaC | Automation & repeatability |
| Observability | Absent | Add metrics, tracing | Monitoring health |
| Governance | Minimal | Add ADRs, coding standards | Consistency & clarity |
      `,
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* <h2 className="text-2xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-700 via-indigo-300 to-purple-700 text-transparent bg-clip-text drop-shadow-md"> */}
        <SectionHeading title={"Architectural Vision & Technology Strategy"} />
      {/* </h2> */}

      <div className="space-y-4 mt-2">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className=" rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white/70"
          >
            <button
              className="flex justify-between border border-gray-100 rounded-lg w-full p-2 text-left items-center
              bg-gradient-to-r from-gray-200 via-blue-100 to-purple-100"
              onClick={() => toggle(sec.id)}
            >
              <div className="flex items-center space-x-3">
                {sec.icon}
                <h3 className="text-md">{sec.title}</h3>
              </div>
              {expanded === sec.id ? (
                <ChevronUp className="text-gray-500" />
              ) : (
                <ChevronDown className="text-gray-500" />
              )}
            </button>
            {expanded === sec.id && (
              <div className="p-4 border-t border-gray-100 text-sm whitespace-pre-wrap leading-relaxed bg-gray-50">
                {sec.content}
              </div>
            )}
          </div>
        ))}        
      </div>
      {/* Architect Diagram */}
      <div className="space-y-4 mt-4">       
        <button
              className="flex justify-between border border-gray-100 rounded-lg w-full p-2 text-left items-center
              bg-gradient-to-r from-gray-200 via-blue-100 to-purple-100"
              onClick={() => toggle(11)}
            >
              <div className="flex items-center space-x-3">               
                <Layers className="w-6 h-6 text-blue-500" />                
                <h3 className="text-md">11. Architectural Diagram</h3>
              </div>
              {expanded === 11 ? (
                <ChevronUp className="text-gray-500" />
              ) : (
                <ChevronDown className="text-gray-500" />
              )}
          </button>
          {expanded === 11 && (
           <div className="p-4 border-t border-gray-100 text-sm whitespace-pre-wrap leading-relaxed bg-gray-50">
                <ArchitecturalDiagram />
           </div>
          )}
      </div>
    </div>
  );
}
