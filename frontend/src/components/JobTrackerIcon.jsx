// JobTrackerIcon.jsx
import React from 'react'

export default function JobTrackerIcon({ size = 24, className = '', title = 'Job Tracker' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* briefcase body */}
      <rect x="2" y="7" width="20" height="13" rx="2" ry="2"></rect>
      {/* briefcase handle */}
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>

      {/* checklist overlay (three small lines + check for 2nd) */}
      <line x1="7.5" y1="11.5" x2="11" y2="11.5" strokeWidth="1.4"></line>
      <line x1="7.5" y1="14" x2="11" y2="14" strokeWidth="1.4"></line>
      <line x1="7.5" y1="16.5" x2="11" y2="16.5" strokeWidth="1.4"></line>

      {/* checks */}
      <polyline points="12.5 11 13.5 12 15 10.2" strokeWidth="1.6"></polyline>
    </svg>
  )
}
