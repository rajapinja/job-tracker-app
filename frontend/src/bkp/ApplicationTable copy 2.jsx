import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

export default function ApplicationsTable({ apps, companies }) {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orgs, setOrgs] = useState([]);

  // Load apps once
  useEffect(() => {
    if (apps && apps.length > 0) {
      const appsWithFlag = apps.map(app => ({ ...app, isEditing: false }));
      setApplications(appsWithFlag);
    }
    setLoading(false);
    if(companies && companies.length > 0){
        setOrgs(companies);
    }
  }, [apps, companies]);

  // Batch update multiple fields
  const handleFieldsChange = (id, updates) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, ...updates } : app
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

  // Save row
  const handleSave = async (app) => {
    try {
     const payload = {
            id: app.id,
            companyId: app.company?.id,        // or app.companyId if you store it
            positionId: app.positionId,      // or app.positionId
            jobPortalId: app.portal?.id,       // or app.portalId
            consultancyId: app.consultancy?.id,// or app.consultancyId           
            status: app.status,
            dateApplied: app.dateApplied,
            interviewRound: app.interviewRound,
            salaryOffered: app.salaryOffered,
            notes: app.notes,
            positionTitle:app.position,
            companyName:app.companyName,
            portalName:app.portalName,
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

  // Delete row
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`http://localhost:9395/api/v1/apps/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete application");

      // Remove from state
      setApplications(prev => prev.filter(app => app.id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  //[0_0_25px_rgba(0,255,255,0.4)] -cyan and pin [0_0_25px_rgba(255,0,150,0.3)]

  return (
    <div className="relative rounded-2xl overflow-x-auto p-[2px] 
    bg-gradient-to-r from-blue-300 via-pink-300 to-teal-400 shadow-md 
    // hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"> 
     <div className="rounded-2xl bg-white dark:bg-gray-900 p-6">
     <SectionHeading title={"Applications"} />
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {[
              "ID",
              "Company",
              "Position",
              "Skill Set",
              "Portal",
              "Consultancy",
              "City",
              "Date Applied",
              "Status",
              "Job Type",
              "Employment Type",
              "Actions",
              "Job Details",
              "Company Details",

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
                "skillSet",
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
                            handleFieldsChange(app.id, { [field]: e.target.value })
                        }
                        className="border rounded px-2 py-0.5 text-xs w-full"
                        />
                    ) : field === "skillSet" ? (
                        <div className="flex flex-wrap gap-1">
                        {app.positionSkills?.split(", ").map((skill, i) => (
                            <span
                            key={i}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs"
                            >
                            {skill}
                            </span>
                        ))}
                        </div>
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
                    <div className="flex flex-col space-y-1">
                        <button
                            onClick={() => toggleEdit(app.id)}
                            className="bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(app.id)}
                            className="bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                            Delete
                        </button>                  
                    </div>
                 )}               
               </td>
               <td className="px-3 py-2">
                 <Link
                    to={`/jobdetails/${app.positionId}`}
                    className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                 >
                    View
                 </Link>
               </td>
               <td>
                {/* {orgs.length > 0 && orgs.map((o, index)=>( */}
                <Link
                        key={index}
                        to={`/companydetails/${app.companyId}`} // ✅ dynamically pass companyId
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      View
                    </Link>
                    {/* ))
                }    */}
               </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
