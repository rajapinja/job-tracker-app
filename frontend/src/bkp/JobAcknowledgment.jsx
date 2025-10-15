import { useState, useEffect } from "react";

export default function JobAcknowledgment() {
  const [ackList, setAckList] = useState([]);
  const [ack, setAck] = useState({
    company: "",
    position: "",
    jobId: "",
    dateReceived: "",
    notes: "",
    code:"",
    username:"",
    email:"",
    status:"Acknowledged"
  });

  // ✅ Fetch existing records on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/acknowledgments`)
      .then((res) => res.json())
      .then(setAckList)
      .catch((err) => console.error("Error fetching acknowledgments:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAck({ ...ack, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ack.company || !ack.position || !ack.jobId || !ack.dateReceived) {
      alert("Please fill all required fields.");
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/acknowledgments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ack),
    });

    if (res.ok) {
      const saved = await res.json();
      setAckList((prev) => [...prev, saved]);
      setAck({ company: "", position: "", jobId: "", dateReceived: "", notes: "" });
    } else {
      alert("Failed to save acknowledgment");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center">📬 Job Acknowledgments Tracker</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-md bg-white"
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
        <textarea
          name="notes"
          value={ack.notes}
          onChange={handleChange}
          placeholder="Notes / Status Update"
          className="col-span-2 p-3 border rounded-md"
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

        <input
          type="text"
          name="status"
          value={ack.status}
          onChange={handleChange}
          placeholder="Status"
          className="p-3 border rounded-md"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save Acknowledgment
        </button>
      </form>

      {/* Table */}
      <table className="w-full text-sm border rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Job ID</th>
            <th className="p-2 border">Date Received</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {ackList.map((a, i) => (
            <tr key={i} className="text-center hover:bg-gray-50">
              <td className="border p-2">{a.company}</td>
              <td className="border p-2">{a.position}</td>
              <td className="border p-2">{a.jobId}</td>
              <td className="border p-2">{a.dateReceived}</td>
              <td className="border p-2">{a.notes}</td>
              <td className="border p-2">{a.username}</td>
              <td className="border p-2">{a.email}</td>
              <td className="border p-2">{a.code}</td>
              <td className="border p-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//✅ Features:

// Adds acknowledgment entries.
// Displays them in a table.
// Clears form on submit.
// Can easily connect to your existing backend routes.