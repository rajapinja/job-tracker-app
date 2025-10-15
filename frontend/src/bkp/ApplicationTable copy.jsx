import { useState, useEffect } from "react";

export default function ApplicationsTable({ apps }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load apps once
  useEffect(() => {
    if (apps && apps.length > 0) {
      const appsWithFlag = apps.map(app => ({ ...app, isEditing: false }));
      setApplications(appsWithFlag);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [apps]);

  const handleFieldChange = (id, field, value) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, [field]: value } : app
      )
    );
  };

  const toggleEdit = (id) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, isEditing: !app.isEditing } : app
      )
    );
  };

  const handleSave = async (app) => {
  try {
    const payload = {
      id: app.id,
      companyName: app.companyName,
      positionName: app.position, // name string
      status: app.status,
      jobType: app.jobType,
      employmentType: app.employmentType,
    };

    const res = await fetch(`http://localhost:9395/api/v1/apps/${app.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update application");
    toggleEdit(app.id);
    alert("Saved successfully!");
  } catch (err) {
    alert(err.message);
  }
};


  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {[
              "ID",
              "Company",
              "Position",
              "Portal",
              "Consultancy",
              "City",
              "Date Applied",
              "Status",
              "Job Type",
              "Employment Type",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app, index) => (
            <tr
              key={app.id}
              className={index % 2 === 0 ? "bg-white" : "bg-blue-100"}
            >
              <td className="px-3 py-2">{app.id}</td>

              {[
                "companyName",
                "position",
                "portalName",
                "consultancyName",
                "city",
                "dateApplied",
                "status",
                "jobType",
                "employmentType",
              ].map((field) => (
                <td key={field} className="px-3 py-2">
                  {app.isEditing ? (
                    <input
                      type="text"
                      value={app[field] || ""}
                      onChange={(e) =>
                        handleFieldChange(app.id, field, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    app[field]
                  )}
                </td>
              ))}

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
                  <button
                    onClick={() => toggleEdit(app.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
