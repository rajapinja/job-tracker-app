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

  // ✅ Load data
  useEffect(() => {
    if (apps && apps.length > 0) {
      setApplications(apps.map((a) => ({ ...a, isEditing: false })));
    }
    if (companies && companies.length > 0) {
      setOrgs(companies);
    }
    setLoading(false);
  }, [apps, companies]);

  const toggleColumn = (col) =>
    setVisibleCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );

  const handleFieldsChange = (id, updates) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const toggleEdit = (id) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isEditing: !a.isEditing } : a))
    );
  };

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

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="w-full mt-10">
      {/* ✅ Column Visibility Controls */}
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
      </div>

      {/* ✅ Data Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-pink-100 text-gray-700">
            <tr>
              {visibleCols.includes("ID") && <th className="px-4 py-2 text-left font-semibold">ID</th>}
              {visibleCols.includes("Company") && <th className="px-4 py-2 text-left font-semibold">Company</th>}
              {visibleCols.includes("Position") && <th className="px-4 py-2 text-left font-semibold">Position</th>}
              {visibleCols.includes("Skill Set") && <th className="px-4 py-2 text-left font-semibold">Skill Set</th>}
              {visibleCols.includes("Portal") && <th className="px-4 py-2 text-left font-semibold">Portal</th>}
              {visibleCols.includes("Consultancy") && <th className="px-4 py-2 text-left font-semibold">Consultancy</th>}
              {visibleCols.includes("City") && <th className="px-4 py-2 text-left font-semibold">City</th>}
              {visibleCols.includes("Date Applied") && <th className="px-4 py-2 text-left font-semibold">Date Applied</th>}
              {visibleCols.includes("Status") && <th className="px-4 py-2 text-left font-semibold">Status</th>}
              {visibleCols.includes("Salary Offered") && <th className="px-4 py-2 text-left font-semibold">Salary Offered</th>}
              {visibleCols.includes("Job Type") && <th className="px-4 py-2 text-left font-semibold">Job Type</th>}
              {visibleCols.includes("Employment Type") && <th className="px-4 py-2 text-left font-semibold">Employment Type</th>}
              {visibleCols.includes("Actions") && <th className="px-4 py-2 text-left font-semibold">Actions</th>}
              {visibleCols.includes("Job Details") && <th className="px-4 py-2 text-left font-semibold">Job Details</th>}
              {visibleCols.includes("Company Details") && <th className="px-4 py-2 text-left font-semibold">Company Details</th>}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
            {applications.map((app, index) => (
              <tr
                key={app.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-blue-50"
                } hover:bg-blue-100 transition`}
              >
                {visibleCols.includes("ID") && <td className="px-3 py-2">{app.id}</td>}
                {visibleCols.includes("Company") && <td className="px-3 py-2">{app.companyName}</td>}
                {visibleCols.includes("Position") && <td className="px-3 py-2">{app.position}</td>}
                {visibleCols.includes("Skill Set") && (
                  <td className="px-3 py-2">
                    {app.positionSkills?.split(",").map((s, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs mr-1">
                        {s}
                      </span>
                    ))}
                  </td>
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
                        <button
                          onClick={() => handleSave(app)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => toggleEdit(app.id)}
                          className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleEdit(app.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                )}

                {visibleCols.includes("Job Details") && (
                  <td className="px-3 py-2">
                    <Link
                      to={`/jobdetails/${app.positionId}`}
                      className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 text-sm"
                    >
                      View
                    </Link>
                  </td>
                )}

                {visibleCols.includes("Company Details") && (
                  <td className="px-3 py-2">
                    <Link
                      to={`/companydetails/${app.companyId}`}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      View
                    </Link>
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
