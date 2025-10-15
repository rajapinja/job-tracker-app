import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  CalendarDays,
  Cloud,
  Database,
  FileSpreadsheet,
  Search,
  Settings,
  Users,
  Sparkles,
  Workflow,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Overview from "../components/Overview";
import Deployment from "../components/Deployment";

export default function HomePage() {
  const [showOverview, setShowOverview] = useState(false);
  const [showDeployment, setShowDeployment] = useState(false);

  const features = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      title: "Track Applications",
      desc: "Easily log all job applications with company details, role, location, portal, and consultancy information.",
    },
    {
      icon: <Search className="w-8 h-8 text-purple-500" />,
      title: "Smart Search",
      desc: "Find specific jobs by skill, company, or date with advanced filters and search capabilities.",
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-pink-500" />,
      title: "Interview Scheduler",
      desc: "Organize upcoming interviews by date, round (L1, L2, HR), and set reminders with notifications.",
    },
    {
      icon: <Database className="w-8 h-8 text-amber-500" />,
      title: "Data Storage",
      desc: "Securely store your job data in PostgreSQL, with audit logs and version tracking via Kafka events.",
    },
    {
      icon: <Cloud className="w-8 h-8 text-teal-500" />,
      title: "Cloud-Integrated",
      desc: "Supports AWS, Azure, and GCP for deployment — ready to scale with microservices architecture.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Consultancy Insights",
      desc: "Track which consultancies or recruiters helped with each application, and measure success rates.",
    },
    {
      icon: <Workflow className="w-8 h-8 text-indigo-500" />,
      title: "Workflow Automation",
      desc: "Automatically update job statuses or generate analytics dashboards using Kafka events.",
    },
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-gray-500" />,
      title: "Reports & Analytics",
      desc: "Visualize your progress — total jobs applied, interviews attended, offers received, and success ratio.",
    },
    {
      icon: <Settings className="w-8 h-8 text-slate-500" />,
      title: "Custom Preferences",
      desc: "Configure portals, tags, cloud environments, and salary expectations to personalize your tracking.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-8 dark:bg-gray-900 dark:text-gray-200">       

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center">
            <Sparkles className="w-10 h-10 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-400">
            <SectionHeading title={"Job Application Tracker"} />
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A full-stack platform to manage, analyze, and optimize your job search process —
            integrated with AI insights, Keycloak security, and Kafka-driven automation.
          </p>
        </motion.div>

        {/* Features Grid (Existing Middle Section) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition dark:text-gray-300 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4 mb-3">
                {f.icon}
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
                  {f.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm dark:text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Overview Section (Collapsible Card) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <button
            onClick={() => setShowOverview(!showOverview)}
            className="w-full flex justify-between items-center mt-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 
                       rounded-lg border-gray-100 shadow hover:shadow-md transition-all"
          >
            <h3 className="text-md text-blue-800 dark:text-blue-300">
              📘 App Overview & Usage
            </h3>
            {showOverview ? <ChevronUp /> : <ChevronDown />}
          </button>

          {showOverview && (           
            <Overview />
          )}
        </motion.div>

        {/* Deployment Section (Collapsible Card at Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <button
            onClick={() => setShowDeployment(!showDeployment)}
            className="w-full flex justify-between items-center bg-gradient-to-r from-green-100 to-orange-100 dark:from-gray-700 dark:to-gray-800 
                       rounded-lg border-gray-100 shadow hover:shadow-md transition-all"
          >
            <h3 className="text-md text-green-800 dark:text-green-300">
              ⚙️ Deployment Instructions (Docker + AWS + Terraform)
            </h3>
            {showDeployment ? <ChevronUp /> : <ChevronDown />}
          </button>

          {showDeployment && (
            <Deployment />
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500">
          © 2025 Job Application Tracker — Built with React, Tailwind, Vite, Keycloak, and Spring Boot.
        </div>
      </div>
    </div>
  );
}
