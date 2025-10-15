import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import api from "../services/api";
import { useNavigate, useParams } from 'react-router-dom';

export default function AddPosition() {
  const [companies, setCompanies] = useState([]);
  const [position, setPosition] = useState({
    title: "",
    department: "",
    skills: "",
    experience: "",
    companyId: "",
    jobtype: "",
    employmenttype: "",
    salaryrange: "",
    jobdescription: "",
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const res = await api.get("/api/v1/companies");
      if (res.data?.length > 0) setCompanies(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dropdown data");
    }
  };

  const handleChange = (e) =>
    setPosition({ ...position, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: position.title,
        department: position.department,
        skills: position.skills.split(",").map((s) => s.trim()),
        experienceLevel: position.experience,
        companyId: Number(position.companyId),
        jobType: position.jobtype,
        employmentType: position.employmenttype,
        salaryRange: position.salaryrange,
        jobDescription: position.jobdescription,
      };

      await api.post("http://localhost:9395/api/v1/positions", payload);
      alert("✅ Position added successfully!");
      setPosition({
        title: "",
        department: "",
        skills: "",
        experience: "",
        companyId: "",
        jobtype: "",
        employmenttype: "",
        salaryrange: "",
        jobdescription: "",
      });
       navigate('/');
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="w-full max-w-4xl rounded-2xl p-[2px]
        bg-gradient-to-br from-blue-300 via-pink-300 to-teal-400
        shadow-lg hover:shadow-[0_0_25px_rgba(255,0,150,0.3)]
        transition-all duration-300"
      >
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-5">
          <SectionHeading
            icon={<Briefcase className="text-blue-600 w-6 h-6 mr-2" />}
            title="Add Position"
          />

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
          >
            {/* Company Dropdown */}
            <div className="flex flex-col w-full items-center">
              {/* <label className="text-sm font-medium mb-1 self-start text-gray-700 dark:text-gray-200">
                Company
              </label> */}
              <select
                name="companyId"
                value={position.companyId}
                onChange={handleChange}
                className="w-full md:w-3/4 px-4 py-3 border border-gray-300 rounded-lg 
                text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 
                focus:border-blue-400 outline-none transition duration-200"
              >
                <option value="">Select Company</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Text Inputs */}
            {[
              "title",
              "department",
              "skills",
              "experience",
              "jobtype",
              "employmenttype",
              "salaryrange",
            ].map((field) => (
              <div key={field} className="flex flex-col w-full items-center">
                {/* <label className="text-sm font-medium mb-1 self-start text-gray-700 dark:text-gray-200">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label> */}
                <input
                  name={field}
                  value={position[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="w-full md:w-3/4 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
                  text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                  outline-none transition duration-200"
                />
              </div>
            ))}

            {/* Textarea (Full Width) */}
            <div className="col-span-2 flex flex-col items-center">
              {/* <label className="text-sm font-medium mb-1 self-start text-gray-700 dark:text-gray-200">
                Job Description
              </label> */}
              <textarea
                name="jobdescription"
                value={position.jobdescription}
                onChange={handleChange}
                rows="8"
                placeholder="Please enter job description here..."
                className="w-11/12 md:w-3/4 border border-gray-300 rounded-lg p-3 text-gray-800 
                shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 
                dark:bg-white dark:text-gray-800 transition duration-200"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="w-2/4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 
                text-white rounded-lg font-semibold text-sm shadow-md 
                hover:opacity-90 hover:scale-[1.02] transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
