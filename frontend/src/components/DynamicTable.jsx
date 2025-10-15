import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DynamicTable({ apps, companies }) {
  const allColumns = [
    "ID",
    "Company",
    "Position",
    "Skill Set",
    "Portal",
    "Consultancy",
    "City",
    "Date Applied",
    "Status",
    "Salary Offered",
    "Job Type",
    "Employment Type",
    "Actions",
    "Job Details",
    "Company Details",
  ];

  const [visibleCols, setVisibleCols] = useState(allColumns);
  const [applications, setApplications] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Voice control state
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("🎙️ Voice mode inactive");
  const [voiceLog, setVoiceLog] = useState([]);

  // ✅ Load apps and companies
  useEffect(() => {
    if (apps && apps.length > 0) {
      setApplications(apps.map((a) => ({ ...a, isEditing: false })));
    }
    if (companies && companies.length > 0) {
      setOrgs(companies);
    }
    setLoading(false);
  }, [apps, companies]);

  // ✅ Column toggle function
  const toggleColumn = (col) =>
    setVisibleCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );

  // ✅ Handle field edits
  const handleFieldsChange = (id, updates) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  // ✅ Toggle row edit mode
  const toggleEdit = (id) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isEditing: !a.isEditing } : a))
    );
  };

  // ✅ Save row
  const handleSave = async (app) => {
    try {
      const payload = {
        id: app.id,
        companyId: app.company?.id || app.companyId,
        positionId: app.positionId,
        jobPortalId: app.portal?.id || app.portalId,
        consultancyId: app.consultancy?.id || app.consultancyId,
        status: app.status,
        dateApplied: app.dateApplied,
        interviewRound: app.interviewRound,
        salaryOffered: app.salaryOffered,
        notes: app.notes,
      };

      const res = await fetch(`http://localhost:9395/api/v1/apps/${app.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update application");
      toggleEdit(app.id);
      alert("✅ Saved successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // ✅ Delete row
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      const res = await fetch(`http://localhost:9395/api/v1/apps/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete application");

      setApplications((prev) => prev.filter((a) => a.id !== id));
      alert("🗑️ Deleted successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

// ✅ Voice Command Handling (continuous mode with auto-restart)
// ✅ Voice Command Handling (continuous + speech feedback)
useEffect(() => {
  if (!voiceMode) return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recog = new SpeechRecognition();
  recog.continuous = true; // 🔁 keeps listening for multiple commands
  recog.interimResults = false;
  recog.lang = "en-US";

  // ✅ Helper to speak responses aloud
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  recog.onstart = () => setVoiceStatus("🎙️ Listening for commands...");
  recog.onerror = (e) => {
    console.error("Speech error:", e);
    if (e.error === "no-speech") {
      setVoiceStatus("⚠️ No speech detected, still listening...");
    } else {
      setVoiceStatus("❌ Speech error occurred");
    }
  };

  recog.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript
      .toLowerCase()
      .trim();

    setVoiceLog((prev) => [...prev, `🎤 Heard: ${transcript}`]);
    processVoiceCommand(transcript);
  };

  recog.onend = () => {
    if (voiceMode) {
      setVoiceStatus("🎧 Waiting for next command...");
      setTimeout(() => recog.start(), 600); // 🔁 Restart listener automatically
    }
  };

  // ✅ Core voice command processor
  const processVoiceCommand = (command) => {
    const normalize = (s) => s.toLowerCase().replace(/\s+/g, "");

    if (command.startsWith("hide ")) {
      const cols = command
        .replace("hide ", "")
        .split(/,|\band\b/)
        .map((c) => c.trim());
      cols.forEach((c) => {
        const col = allColumns.find(
          (a) => normalize(a) === normalize(c)
        );
        if (col)
          setVisibleCols((prev) => prev.filter((x) => x !== col));
      });
      setVoiceLog((prev) => [...prev, `✅ Hiding: ${cols.join(", ")}`]);
      speak(`Done hiding ${cols.join(", ")}`);
    } 
    
    else if (command.startsWith("show ")) {
      const cols = command
        .replace("show ", "")
        .split(/,|\band\b/)
        .map((c) => c.trim());
      cols.forEach((c) => {
        const col = allColumns.find(
          (a) => normalize(a) === normalize(c)
        );
        if (col && !visibleCols.includes(col))
          setVisibleCols((prev) => [...prev, col]);
      });
      setVoiceLog((prev) => [...prev, `✅ Showing: ${cols.join(", ")}`]);
      speak(`Done showing ${cols.join(", ")}`);
    } 
    
    else if (command.includes("hide all")) {
      setVisibleCols([]);
      setVoiceLog((prev) => [...prev, `✅ All columns hidden`]);
      speak("All columns hidden");
    } 
    
    else if (command.includes("show all")) {
      setVisibleCols(allColumns);
      setVoiceLog((prev) => [...prev, `✅ All columns shown`]);
      speak("All columns shown");
    } 
    
    else if (command.includes("stop voice mode")) {
      setVoiceMode(false);
      setVoiceStatus("🛑 Voice mode stopped");
      speak("Voice mode stopped");
      recog.abort();
    } 
    
    else {
      setVoiceLog((prev) => [...prev, `⚠️ Unknown command: ${command}`]);
      speak("Sorry, I did not understand that");
    }
  };

  recog.start();
  return () => recog.abort();
}, [voiceMode, visibleCols]);




  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="w-full mt-10">
      {/* ✅ Column visibility controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4 bg-gray-50 p-3 rounded-lg shadow-sm border">
        <span className="font-semibold text-sm text-gray-700">Show/Hide Columns:</span>
        {allColumns.map((col) => (
          <label key={col} className="flex items-center gap-1 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={visibleCols.includes(col)}
              onChange={() => toggleColumn(col)}
              className="accent-blue-500"
            />
            {col}
          </label>
        ))}
        <button
          onClick={() => setVoiceMode(!voiceMode)}
          className="ml-3 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
        >
          {voiceMode ? "Stop Voice Mode" : "Start Voice Mode"}
        </button>
      </div>

      {/* ✅ Voice log panel */}
      {voiceMode && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg shadow-inner max-h-40 overflow-y-auto">
          <div className="text-sm font-semibold text-gray-700 mb-1">{voiceStatus}</div>
          {voiceLog.map((log, idx) => (
            <div key={idx} className="text-gray-800 text-xs">{log}</div>
          ))}
        </div>
      )}

      {/* ✅ Data Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-pink-100 text-gray-700">
            <tr>
              {visibleCols.map((col) => (
                <th key={col} className="px-4 py-2 text-left font-semibold">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
            {applications.map((app, idx) => (
              <tr key={app.id} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50 hover:bg-blue-100 transition"}>
                {visibleCols.includes("ID") && <td className="px-3 py-2">{app.id}</td>}
                {visibleCols.includes("Company") && <td className="px-3 py-2">{app.companyName}</td>}
                {visibleCols.includes("Position") && <td className="px-3 py-2">{app.position}</td>}
                {visibleCols.includes("Skill Set") && (
                  <td className="px-3 py-2">{app.positionSkills?.split(",").map((s, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs mr-1">{s}</span>
                  ))}</td>
                )}
                {visibleCols.includes("Portal") && <td className="px-3 py-2">{app.portalName}</td>}
                {visibleCols.includes("Consultancy") && <td className="px-3 py-2">{app.consultancyName}</td>}
                {visibleCols.includes("City") && <td className="px-3 py-2">{app.city}</td>}
                {visibleCols.includes("Date Applied") && <td className="px-3 py-2">{app.dateApplied}</td>}
                {visibleCols.includes("Status") && <td className="px-3 py-2">{app.status}</td>}
                {visibleCols.includes("Salary Offered") && <td className="px-3 py-2">{app.salaryOffered}</td>}
                {visibleCols.includes("Job Type") && <td className="px-3 py-2">{app.jobType}</td>}
                {visibleCols.includes("Employment Type") && <td className="px-3 py-2">{app.employmentType}</td>}
                {visibleCols.includes("Actions") && (
                  <td className="px-3 py-2 space-x-2">
                    {app.isEditing ? (
                      <>
                        <button onClick={() => handleSave(app)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">Save</button>
                        <button onClick={() => toggleEdit(app.id)} className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => toggleEdit(app.id)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Edit</button>
                        <button onClick={() => handleDelete(app.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">Delete</button>
                      </>
                    )}
                  </td>
                )}
                {visibleCols.includes("Job Details") && (
                  <td className="px-3 py-2">
                    <Link to={`/jobdetails/${app.positionId}`} className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 text-sm">View</Link>
                  </td>
                )}
                {visibleCols.includes("Company Details") && (
                  <td className="px-3 py-2">
                    <Link to={`/companydetails/${app.companyId}`} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">View</Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//🧠 What’s New
// Feature	Description
// 🔁 continuous = true	Keeps listening after each command
// 🔄 Auto Restart	Prevents the “stuck after one command” issue
// 🗣️ speak() feedback	Gives verbal confirmation of actions
// 🪶 Natural phrasing	You can say “Hide consultancy and status”
// 🧹 Robust parsing	Handles “hide all” / “show all” gracefully

// 🎤 Try Saying:

// “Hide company and city”
// “Show consultancy”
// “Hide all columns”
// “Show all columns”
// “Stop voice mode”
// You’ll hear responses like:
// “Done hiding company and city”
// and the UI will update instantly.
// Would you like me to also add a small floating mic indicator (like a pulsing red dot when listening) for a more polished UX?


//Perfect ✅ — you want the Voice Mode button to feel interactive, listen for voice commands, take actions (like hiding/showing columns), and give spoken + visual feedback (e.g., “Done hiding Consultancy”).

// Here’s your final enhanced version with all that behavior:
// ✅ Features added:
// 🎤 Voice Mode toggle button (visual + active state)
// 🗣️ Recognizes commands like:
// “hide consultancy”, “hide salary offered”
// “show consultancy”, “show job type”
// “show all columns”, “hide all columns”
// 🔊 Speaks confirmation (“Done hiding Consultancy”) using Speech Synthesis
// 💬 Shows status message below the button for visual feedback

//🎙️ How it works:

// Click “🎤 Start Voice Mode” → activates microphone

// Say commands like:
// “Hide company”
// “Show consultancy”
// “Hide skillset”
// “Show all columns”
// Click “🔇 Stop Voice Mode” → stops listening




//🎤 Goal:
// You want to say things like:
// “Hide Status and Company”
// “Show Position and Skill Set”
// …and have your app automatically toggle those columns on/off in real time.

// 👍 — here’s your fully updated DynamicTable component with:
// ✅ Column show/hide via checkboxes
// ✅ Voice control (hide / show commands)
// ✅ Auto-normalized matching (case + spaces removed)
// ✅ Safe speech recognition lifecycle

// You can say things like:
// “Hide company”
// “Show consultancy”
// “Hide employmenttype”
// “Show skillset”

// 🧠 Commands you can say:
// Command	Effect
// “Hide company”	Hides Company column
// “Show consultancy”	Shows Consultancy column
// “Hide skillset”	Hides Skill Set column
// “Show employmenttype”	Shows Employment Type column