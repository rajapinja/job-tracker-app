// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, MessageSquare, BookOpen, Book, HomeIcon, Building2, Briefcase, Globe2, Users } from "lucide-react";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import { useState } from "react";
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
import VoiceDebug from "./components/VoiceDebug";
import HamburgerMenu from "./components/HamburgerMenu";


export default function App() {
  const [open, setOpen] = useState(false);

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
          {/* <Route
            path="/chatbot"
            element={
              <div className="relative" style={{ marginBottom: `${footerHeight}px` }}>
                <ChatBotPrototype />
              </div>
            }
          />*/}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/company" element={<AddCompany />} />
          <Route path="/position" element={<AddPosition />} />
          <Route path="/jobportal" element={<AddJobPortal />} />
          <Route path="/consultancy" element={<AddConsultancy />} />
          <Route path="/addedit" element={<AddEditApplication />} /> 
          <Route path="/jobdetails/:id" element={<JobDetails />} />
          <Route path="/companydetails/:companyId" element={<CompanyDetailsPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/voicedebug" element={<VoiceDebug />} />
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
        <HamburgerMenu />
        {/* <div className="fixed top-14 left-4 z-50 ">
          <button
            onClick={() => setOpen(!open)}
            className="p-3 rounded bg-white dark:bg-gray-500 shadow-lg hover:bg-gray-100 dark:hover:bg-blue-400"
          >
            <Menu className="w-4 h-4" />
          </button>

          {open && (
            <div className="mt-2 w-48 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg border p-2 space-y-2 z-50">
               <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <HomeIcon className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600" >Home</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <MessageSquare className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">Dashboard</span>
              </Link>
              <Link
                to="/addedit"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <Book className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">Add Edit</span>
              </Link>             
              <Link
                to="/company"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <Building2 className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">Company</span>
              </Link>
               <Link
                to="/position"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <Briefcase className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">Position</span>
              </Link>    
               <Link
                to="/jobportal"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <Globe2 className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">Job Portal</span>
              </Link>          
              <Link
                to="/consultancy"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <Users className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">Consultancy</span>
              </Link>            
              <Link
                to="/applications"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <Users className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">Applications</span>
              </Link>
               <Link
                to="/voicedebug"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                <Users className="w-5 h-5 text-green-600" />
                <span className="dark:text-yellow-600">VoiceDebug</span>
              </Link>  
            </div>
          )}
        </div> */}
      </div>
    </Router>
  );
}
