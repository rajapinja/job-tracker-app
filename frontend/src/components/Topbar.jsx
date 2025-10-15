import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Briefcase, Menu } from "lucide-react";
import JobTrackerIcon from './JobTrackerIcon'

export default function Topbar({ setTheme, onMenuClick }) {
  const [q, setQ] = useState("")
  const navigate = useNavigate()
  const loc = useLocation()

  // Keep search query in sync with URL
  useEffect(() => {
    setQ(new URLSearchParams(loc.search).get("q") ?? "")
  }, [loc])

  const submit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  const toggleDark = () => {
    const c = document.documentElement.classList
    const isDark = c.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }

  return (
    <header className="h-16 pl-12 border-b bg-gradient-to-r from-blue-600 via-green-600 to-pink-700 text-white flex items-center">
  <div className="px-4 w-full flex items-center justify-between gap-3">

    {/* Left Section: Menu + Title */}
    <div className="flex items-center gap-3 justify-start">
      {/* Mobile menu button */}
      {/* <button
        className="md:hidden p-2 rounded hover:bg-indigo-700 z-50"
        onClick={onMenuClick}
      >
        <Menu size={24} />
      </button> */}

      {/* Icon + Title */}
      <div className="flex items-center space-x-2">
       {/* <Briefcase size={28} className="text-white" /> */}
        <JobTrackerIcon size={32} className="text-orange-500" />
        <h1 className="font-bold text-xl">JOB APPLICATION TRACKER</h1>
      </div>
    </div>

    {/* Right Section: Search + Theme Toggle */}
    <div className="flex items-center gap-3 flex-wrap justify-end">
      <form onSubmit={submit} className="flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search topics…"
          className="border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                     placeholder-gray-500 dark:placeholder-gray-400
                     caret-gray-800 dark:caret-gray-100
                     rounded px-3 py-1.5 text-sm w-50 sm:w-50
                     focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
        />
        <button
          type="submit"
          className="text-sm border dark:border-gray-800 rounded px-3 py-1.5 
                     hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-400 transition"
        >
          Search
        </button>
      </form>
      <button
        onClick={toggleDark}
        className="text-sm border dark:border-gray-800 rounded px-3 py-1.5 
                   hover:bg-gray-50 dark:hover:bg-gray-900 transition"
      >
        🌓
      </button>
    </div>

  </div>
</header>
  );
}
