// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AddEditApplication from "./pages/AddEditApplication";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import AddCompany from "./pages/AddCompany";
import AddConsultancy from "./pages/AddConsultancy";
import AddPosition from "./pages/AddPosition";
import AddJobPortal from "./pages/AddJobPortal";
import ApplicationsPage from "./pages/ApplicationsPage";
import HamburgerMenu from "./components/HamburgerMenu";
import JobAcknowledgment from "./components/JobAcknowledgment";
import Overview from "./components/Overview";
import Deployment from "./components/Deployment";
import ArchitecturalVisionAndTechnologyStrategy from "./pages/ArchitecturalVisionAndTechnologyStrategy";
import ArchitecturalDiagram from "./pages/ArchitecturalDiagram";
import SrArchitectPrimaryResp from "./pages/SrArchitectPrimaryResp";


export default function App() {
  const [open, setOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);

  // Heights (adjust to your actual Topbar/Footer height)
  const topbarHeight = 64; // in px
  const footerHeight = 52; // in px (3/4 of default)

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">

        {/* Top Navigation */}
        <div className="fixed top-0 left-0 w-full z-40">
          <Topbar />
        </div>

        {/* Main Content */}
        <main
          className="relative flex-1 container mx-auto px-6 py-6"
          style={{
            paddingTop: `${topbarHeight}px`,
            paddingBottom: `${footerHeight + 80}px`, // extra space so chatbot sits above footer
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />           
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company" element={<AddCompany />} />
            <Route path="/position" element={<AddPosition />} />
            <Route path="/jobportal" element={<AddJobPortal />} />
            <Route path="/consultancy" element={<AddConsultancy />} />
            <Route path="/addedit" element={<AddEditApplication />} />
            <Route path="/jobdetails/:id" element={<JobDetails />} />
            <Route path="/companydetails/:companyId" element={<CompanyDetailsPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/jobacknowledgment" element={<JobAcknowledgment />} />
            {/* <Route path="/overview" element={<Overview />} />
            <Route path="/deployment" element={<Deployment />} /> */}
            {/* <Route path="/voicedebug" element={<VoiceDebug />} /> */}
            <Route path="/architecture-vision" element={<ArchitecturalVisionAndTechnologyStrategy />} />
            <Route path="/architecture" element={<ArchitecturalDiagram />} />
            <Route path="/sr-architect-resp" element={<SrArchitectPrimaryResp />} />
          </Routes>

        </main>

        {/* Footer - fixed at bottom, reduced height */}
        <div
          className="fixed bottom-0 left-0 w-full z-40"
          style={{ height: `${footerHeight}px` }}
        >
          <Footer />
        </div>

        {/* Hamburger Menu at Top-Left */}
        <HamburgerMenu 
          position="top-left"
          showVoiceToggle={true}
          voiceMode={voiceMode}
          onVoiceToggle={() => setVoiceMode((v) => !v)}
        />
         {/* Hamburger Menu at Bottom-Right */}
        <HamburgerMenu 
          position="bottom-right"
          showVoiceToggle={true}
          voiceMode={voiceMode}
          onVoiceToggle={() => setVoiceMode((v) => !v)}
        />
      </div>
    </Router>
  );
}
