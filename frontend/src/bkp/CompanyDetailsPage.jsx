import { useEffect, useState } from "react";
import SectionHeading from '../components/SectionHeading';


export default function CompanyDetailsPage({ companyId }) {

  const [company, setCompany] = useState(null);
  const [viewMode, setViewMode] = useState(true); // true = view, false = edit
  const [selectedPositions, setSelectedPositions] = useState([]);



  useEffect(() => {
    fetch(`http://localhost:9395/api/v1/company/${companyId}/details`)
      .then(res => res.json())
      .then(setCompany)
      .catch(err => console.error("Failed to load company:", err));
  }, [companyId]);

  const toggleMode = () => setViewMode(!viewMode);

  const handleSelect = (id) => {
    setSelectedPositions(prev =>
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );
  };

  if (!company) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <SectionHeading title={"Company Details"} />
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800">{company.name}</h1>
        <button
          onClick={toggleMode}
          className={`px-4 py-2 rounded-lg text-white ${
            viewMode ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {viewMode ? "Switch to Edit Mode" : "Switch to View Mode"}
        </button>
      </div>

      {/* Company Info */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2 text-lg">Company Details</h2>
        <p><strong>Industry:</strong> {company.industry}</p>
        <p><strong>Location:</strong> {company.location}</p>
        <p><strong>Website:</strong> <a href={company.website} className="text-blue-600 underline">{company.website}</a></p>
      </div>

      {/* Positions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2"><input type="checkbox" disabled /></th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Job Type</th>
              <th className="p-2 text-left">Employment</th>
              <th className="p-2 text-left">Salary</th>
              <th className="p-2 text-left">Skills</th>
            </tr>
          </thead>
          <tbody>
            {company.positions.map((pos) => (
              <tr key={pos.id} className="hover:bg-gray-50">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedPositions.includes(pos.id)}
                    onChange={() => handleSelect(pos.id)}
                  />
                </td>
                <td className="p-2">{pos.title}</td>
                <td className="p-2">{pos.jobType}</td>
                <td className="p-2">{pos.employmentType}</td>
                <td className="p-2">{pos.salaryRange || "N/A"}</td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-1">
                    {pos.skills?.map((skill, i) => (
                      <span key={i} className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optionally show Job Description of selected */}
      {selectedPositions.length === 1 && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold mb-2 text-lg">Job Description</h3>
          <p className="whitespace-pre-wrap text-gray-700">
            {company.positions.find(p => p.id === selectedPositions[0])?.jobDescription || "No description available"}
          </p>
        </div>
      )}
    </div>
  );
}


// 🧠 Features Recap

// ✅ Displays Company info (industry, location, website)
// ✅ Lists all positions with type, salary, and skill tags
// ✅ Checkbox to select positions
// ✅ View/Edit toggle button on top
// ✅ Expands job description for selected position