import { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";

export default function JobAcknowledgment() {
  const [ackList, setAckList] = useState([]);
  const [ack, setAck] = useState({
    id: null,
    company: "",
    position: "",
    jobId: "",
    dateReceived: "",
    status: "Acknowledged",
    notes: "",  
    code: "",
    username: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);


  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:9395";

  // ✅ Fetch all acknowledgments on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/v1/acknowledgments`)
      .then((res) => res.json())
      .then(setAckList)
      .catch((err) => console.error("❌ Error fetching:", err));
  }, []);

  // ✅ Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAck({ ...ack, [name]: value });
  };

  // ✅ Save or update acknowledgment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ack.company || !ack.position || !ack.jobId || !ack.dateReceived) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${API_BASE}/api/v1/acknowledgments/${ack.id}`
      : `${API_BASE}/api/v1/acknowledgments`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ack),
    });

    if (!res.ok) {
      alert("❌ Failed to save acknowledgment");
      return;
    }

    const saved = await res.json();
    if (isEditing) {
      setAckList((prev) =>
        prev.map((a) => (a.id === saved.id ? saved : a))
      );
      setIsEditing(false);
    } else {
      setAckList((prev) => [...prev, saved]);
    }

    setAck({
      id: null,
      company: "",
      position: "",
      jobId: "",
      dateReceived: "",
      status: "Acknowledged",
      notes: "",      
      code: "",
      username: "",
      email: "",
    });
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setAck(item);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this acknowledgment?")) return;

    const res = await fetch(`${API_BASE}/api/v1/acknowledgments/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAckList((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("❌ Failed to delete record");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        📬 Job Acknowledgment Tracker
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow bg-white"
      >
        <input
          type="text"
          name="company"
          value={ack.company}
          onChange={handleChange}
          placeholder="Company"
          className="p-3 border rounded-md"
          required
        />
        <input
          type="text"
          name="position"
          value={ack.position}
          onChange={handleChange}
          placeholder="Position"
          className="p-3 border rounded-md"
          required
        />
        <input
          type="text"
          name="jobId"
          value={ack.jobId}
          onChange={handleChange}
          placeholder="Job ID"
          className="p-3 border rounded-md"
          required
        />
        <input
          type="date"
          name="dateReceived"
          value={ack.dateReceived}
          onChange={handleChange}
          className="p-3 border rounded-md"
          required
        />

        <input
          type="text"
          name="code"
          value={ack.code}
          onChange={handleChange}
          placeholder="Code"
          className="p-3 border rounded-md"
        />

        <input
          type="text"
          name="username"   
            value={ack.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-3 border rounded-md"
        />

        <input
          type="email"
          name="email"
          value={ack.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-3 border rounded-md"
        />


        <select
          name="status"
          value={ack.status}
          onChange={handleChange}
          className="p-3 border rounded-md"
        >
          <option>Acknowledged</option>
          <option>Interview Scheduled</option>
          <option>Offer Received</option>
          <option>Rejected</option>
          <option>Follow-up Needed</option>
        </select>

        <textarea
          name="notes"
          value={ack.notes}
          onChange={handleChange}
          placeholder="Notes / Comments"
          className="col-span-2 p-3 border rounded-md"
        />

      <button
        type="submit"
        className="col-span-2 w-1/4 justify-self-center py-3 bg-gradient-to-r from-blue-500 to-purple-400 
          text-white rounded-lg font-semibold text-sm shadow-md 
          hover:opacity-90 hover:scale-[1.02] transition-all"
      >
        {isEditing ? "💾 Update Acknowledgment" : "➕ Save Acknowledgment"}
      </button>
      
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gradient-to-r from-blue-100 to-pink-100 text-gray-800">
            <tr>
              <th className="p-3 text-left border-b border-gray-300">Company</th>
              <th className="p-3 text-left border-b border-gray-300">Position</th>
              <th className="p-3 text-left border-b border-gray-300">Job ID</th>
              <th className="p-3 text-left border-b border-gray-300">Date</th>
              <th className="p-3 text-left border-b border-gray-300">Status</th>
              <th className="p-3 text-left border-b border-gray-300">Notes</th>
              <th className="p-3 text-left border-b border-gray-300">Code</th>
              <th className="p-3 text-left border-b border-gray-300">Username</th>
              <th className="p-3 text-left border-b border-gray-300">Email</th>
              <th className="p-3 text-center border-b border-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ackList.map((a, i) => (
              <tr
                key={a.id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-blue-50"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 border-b border-gray-200">{a.company}</td>
                <td className="p-3 border-b border-gray-200">{a.position}</td>
                <td className="p-3 border-b border-gray-200">{a.jobId}</td>
                <td className="p-3 border-b border-gray-200">{a.dateReceived}</td>

                <td className="p-3 border-b border-gray-200 font-medium">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      a.status === "Offer Received"
                        ? "bg-green-200 text-green-800"
                        : a.status === "Interview Scheduled"
                        ? "bg-blue-200 text-blue-800"
                        : a.status === "Rejected"
                        ? "bg-red-200 text-red-800"
                        : a.status === "Follow-up Needed"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>

                {/* <td className="p-3 border-b border-gray-200">{a.notes}</td> */}
                <td className="p-3 border-b border-gray-200 max-w-xs">
                  {expandedRow === a.id ? (
                    <>
                      <span>{a.notes}</span>
                      <button
                        onClick={() => setExpandedRow(null)}
                        className="text-blue-600 ml-2 text-xs hover:underline"
                      >
                        Show Less
                      </button>
                    </>
                  ) : (
                    <>
                      <span>
                        {a.notes && a.notes.length > 60
                          ? `${a.notes.slice(0, 60)}...`
                          : a.notes || "-"}
                      </span>
                      {a.notes && a.notes.length > 60 && (
                        <button
                          onClick={() => setExpandedRow(a.id)}
                          className="text-blue-600 ml-2 text-xs hover:underline"
                        >
                          Show More
                        </button>
                      )}
                    </>
                  )}
                </td>
                <td className="p-3 border-b border-gray-200">{a.code}</td>
                <td className="p-3 border-b border-gray-200">{a.username}</td>
                <td className="p-3 border-b border-gray-200">{a.email}</td>

                <td className="p-3 border-b border-gray-200 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

//✨ How it works

// Notes are truncated to 60 characters by default.
// When the user clicks Show More, the full note text expands.
// Clicking Show Less collapses it again.
// Each row toggles independently using its id.

//🎨 Improvements made

// ✅ Alternating striped rows (white / gray-50)
// ✅ Soft hover highlight (hover:bg-blue-50)
// ✅ Compact DataTable spacing (3px padding + subtle borders)
// ✅ Gradient header preserved
// ✅ Rounded + shadow for entire table container
// ✅ Responsive horizontal scroll for small screens
//✅ Features:

// Adds acknowledgment entries.
// Displays them in a table.
// Clears form on submit.
// Can easily connect to your existing backend routes.

//✅ Features Summary
// Feature	Description
// ➕ Add	Add acknowledgment after resume submission
// ✏️ Edit	Modify acknowledgment if status or notes change
// ❌ Delete	Remove record
// 🧭 Status	Track Acknowledged, Interview Scheduled, Offer, etc.
// 📆 Date	When acknowledgment was received
// 🧠 Notes	Optional context like “Awaiting HR reply”