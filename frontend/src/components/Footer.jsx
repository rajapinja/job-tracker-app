import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-0 py-0 sm:py-1 text-center 
      bg-gradient-to-r from-teal-600 via-blue-800 via-purple-600 to-pink-600 
      text-gray-300 dark:from-gray-800 dark:to-teal-900 dark:text-gray-400 rounded-t">

      {/* Main Line */}
      <p className="text-xs sm:text-sm md:text-base font-semibold tracking-wide">
        © 2025 LARAID SOFTWARE SOLUTIONS PVT LTD{" "}
        <sup className="text-[10px] sm:text-xs opacity-80">@Raja Pinja</sup>
      </p>

      {/* Sub Line */}
      <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 mt-1">
        NEET PG RESULTS — Built with{" "}
        <span className="font-medium text-gray-200">Vite</span> •{" "}
        <span className="font-medium text-gray-200">React</span> •{" "}
        <span className="font-medium text-gray-200">Tailwind</span>
      </p>
    </footer>
  );
}
