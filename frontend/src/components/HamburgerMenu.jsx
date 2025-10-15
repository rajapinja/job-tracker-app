import { Link } from "react-router-dom";
import {
  HomeIcon,
  MessageSquare,
  Book,
  Building2,
  Briefcase,
  Globe2,
  Users,
  Menu,
  Mail,
  Compass,
  Network,
  Layers2,
  Layers3,
} from "lucide-react";
import { useState } from "react";
import VoiceModeToggle from "./VoiceModeToggle";

export default function HamburgerMenu({ onVoiceCommand, position = "bottom-left" }) {
  const [open, setOpen] = useState(false);

  // ✅ dropdown placement logic
  const dropdownPlacement = {
    "top-left": "top-full left-0 mt-2", // 👇 expands downward
    "top-right": "top-full right-0 mt-2", // 👇 expands downward
    "bottom-left": "bottom-full left-0 mb-2", // 👆 expands upward
    "bottom-right": "bottom-full right-0 mb-2", // 👆 expands upward
  };

  // ✅ Icon button placement
  const iconPlacement = {
    "top-left": "top-7 left-4",
    "top-right": "top-7 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div className={`fixed ${iconPlacement[position]} z-50`}>
      <div className="relative">
        {/* 🍔 Hamburger Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="p-3 rounded bg-gradient-to-br from-purple-500 via-white to-blue-500 
                    dark:bg-gradient-to-br dark:from-purple-700 dark:via-white dark:to-blue-700 shadow-lg hover:bg-gray-100 dark:hover:bg-blue-400"
        >
          <Menu className="w-4 h-4 dark:text-teal-600" />
        </button>

        {/* 📋 Dropdown Menu */}
        {open && (
          <div
           className={`absolute ${dropdownPlacement[position]} w-52 
                            bg-gradient-to-br from-pink-100 via-white to-blue-100 
                            dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
                            shadow-xl rounded-2xl border border-white/30 
                            backdrop-blur-lg p-2 space-y-2 animate-fadeIn`}
            >
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700"
            >
              <HomeIcon className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Home</span>
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Dashboard</span>
            </Link>

            <Link
              to="/addedit"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Book className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Add Edit</span>
            </Link>

            <Link
              to="/company"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Building2 className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Company</span>
            </Link>

            <Link
              to="/position"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Briefcase className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Position</span>
            </Link>

            <Link
              to="/jobportal"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Globe2 className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Job Portal</span>
            </Link>

            <Link
              to="/consultancy"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Users className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Consultancy</span>
            </Link>

            <Link
              to="/applications"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Layers2 className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Applications</span>
            </Link>
            <Link
              to="/jobacknowledgment"
              onClick={() => setOpen(false)}    
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Mail className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Job Acknowledgment</span>
            </Link>

            <Link
              to="/architecture-vision"
              onClick={() => setOpen(false)}    
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Compass className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Architecture Vision</span>
            </Link> 
            <Link
              to="/architecture"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Network className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Architecture Diagram</span>
            </Link>
            <Link
              to="/sr-architect-resp"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-300 dark:hover:bg-gray-700"
            >
              <Layers3 className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">Sr. Architect Resp.</span>
            </Link>           

            {/* Voice Toggle (optional small icon) */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <VoiceModeToggle onCommand={onVoiceCommand} small />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
