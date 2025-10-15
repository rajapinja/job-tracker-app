import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import api from '../services/api';

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

  useEffect(() => {
    console.log("api : ",api);
    fetchDropdownData();   
  }, []);

  const fetchDropdownData = async () => {
    try {
      const companiesRes = await api.get('/api/v1/companies')

      if(companiesRes.data && companiesRes.data.length > 0){
        setCompanies(companiesRes.data);
      }  
      
    } catch (err) {
      console.error(err);
      alert('Failed to load dropdown data');
    }
  };

  const handleChange = (e) => setPosition({ ...position, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Position Data:", position);
        try {

                const payload = {
                    title: position.title,
                    department: position.department,
                    skills: position.skills.split(",").map(s => s.trim()),
                    experienceLevel: position.experience,    
                    companyId: Number(position.companyId), // 👈 send just ID
                    jobType: position.jobtype,
                    employmentType: position.employmenttype,
                    salaryRange: position.salaryrange,
                    jobDescription: position.jobdescription,
                }

                const res = await api.post("http://localhost:9395/api/v1/positions",payload)

                    setPosition(res.data);
                    alert("✅ Position added successfully!");
                    setPosition({
                        title: "",
                        department: "",
                        skills: "",
                        experience: "",
                        companyId: "", // ✅ correct
                        jobtype: "",
                        employmenttype: "",
                        salaryrange: "",
                        jobdescription: "",
                    });
        } catch (err) {
            console.error(err);
            alert("❌ " + err.message);
        }
    };

 

  return (
    <div className="w-full mt-12 rounded-2xl p-[2px] 
      bg-gradient-to-br from-blue-300 via-pink-300 to-teal-400 
      shadow-lg hover:shadow-[0_0_25px_rgba(255,0,150,0.3)] transition-all duration-300 ">
      <div className="rounded-2xl bg-white dark:bg-gray-900 p-8">
        <SectionHeading
          icon={<Briefcase className="text-blue-600 w-6 h-6 mr-2" />}
          title="Add Position"
        />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full place-items-center">
         <select
            name="companyId"
            value={position.companyId}
            onChange={handleChange}
            className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200"
            >
            <option value="">Select Company</option>
            {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
            ))}
         </select>

          {/* Input Type */}
          {["title", "department", "skills", "experience","jobtype","employmenttype","jobdescription","salaryrange"].map((field) => (
            <input
              key={field}
              name={field}
              value={position[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
              text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
              outline-none transition duration-200"
            />
          ))}

          {/* TextArea */}
          {["jobdescription"].map((field) => (
             <textarea
              key={field}
              name={field}
              value={position[field]}
              onChange={handleChange}
              rows="8"
              placeholder="Plese enter job description here"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-400 focus:border-pink-400 dark:bg-gray-800 dark:text-white"
            ></textarea>
          ))}

          <button
            type="submit"
            className="w-3/4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 
            text-white rounded-lg font-semibold text-sm shadow-md 
            hover:opacity-90 hover:scale-[1.02] transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
