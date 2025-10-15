import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  HomeIcon,
  MessageSquare,
  Book,
  Building2,
  Briefcase,
  Globe2,
  Users,
} from "lucide-react";

export default function HamburgerMenu() {
    
  const [open, setOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/dashboard", label: "Dashboard", icon: MessageSquare },
    { to: "/addedit", label: "Add Edit", icon: Book },
    { to: "/company", label: "Company", icon: Building2 },
    { to: "/position", label: "Position", icon: Briefcase },
    { to: "/jobportal", label: "Job Portal", icon: Globe2 },
    { to: "/consultancy", label: "Consultancy", icon: Users },
    { to: "/applications", label: "Applications", icon: Users },
    { to: "/voicedebug", label: "Voice Debug", icon: Users },
  ];

  return (
    <div className="fixed top-14 left-4 z-50">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-3 rounded bg-white dark:bg-gray-500 shadow-lg hover:bg-gray-100 dark:hover:bg-blue-400 transition"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="mt-2 w-48 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg border p-2 space-y-2 z-50">
          {menuItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              <Icon className="w-5 h-5 text-green-600" />
              <span className="dark:text-yellow-600">{label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
