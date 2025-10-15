import React from "react";

export default function Overview() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Job Tracker App — Overview
      </h2>

      <p className="mb-4 text-gray-700">
        The <strong>Job Tracker App</strong> is a full-stack web application
        designed to simplify tracking of job applications, interviews, company details,
        and acknowledgment follow-ups — all in one centralized place.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        Key Features
      </h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>📋 Add, update, and delete job applications.</li>
        <li>🏢 Manage company and position information.</li>
        <li>🎤 Integrated voice command system for column hide/show.</li>
        <li>🧩 Track acknowledgments from companies with Job ID, date, and notes.</li>
        <li>🕵️ Filter, search, and organize application data easily.</li>
        <li>💾 Data stored via Spring Boot REST APIs and PostgreSQL.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        App Usage
      </h2>
      <ol className="list-decimal ml-6 space-y-2 text-gray-700">
        <li>Start the Spring Boot backend using <code>mvn spring-boot:run</code>.</li>
        <li>Run the React frontend with <code>npm run dev</code>.</li>
        <li>Use the navigation menu (hamburger icon) to switch between pages:
          <ul className="list-disc ml-8">
            <li><strong>Dashboard:</strong> overview of applications.</li>
            <li><strong>Add/Edit:</strong> create or modify job applications.</li>
            <li><strong>Company:</strong> manage company details.</li>
            <li><strong>Position:</strong> manage open positions and skills.</li>
            <li><strong>Voice Debug:</strong> test voice-based commands.</li>
            <li><strong>Acknowledgment:</strong> track received job confirmations.</li>
          </ul>
        </li>
        <li>Data syncs automatically with the backend API.</li>
        <li>View, edit, and delete entries directly from data tables.</li>
      </ol>

      <p className="mt-6 text-gray-700">
        This project is ideal for interview preparation, tracking job hunt progress,
        and managing communications with multiple companies efficiently.
      </p>
    </div>
  );
}
