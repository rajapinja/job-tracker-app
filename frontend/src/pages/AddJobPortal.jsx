import { useState } from "react";
import { Globe2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddJobPortal() {

  const [portal, setPortal] = useState({
    name: "",
    url: "",
    contactEmail: "",
    active: "true"
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => setPortal({ ...portal, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("portal.active:", portal.active);
    try {
       const payload = {

        name: portal.name,
        url: portal.url,
        contactEmail: portal.contactEmail,
        active: portal.active === "true" // convert to boolean

      }

      const res = await api.post("/api/v1/job-portals", payload);
        setPortal(res.data);             
        alert("✅ Job Portal added successfully!");
        setPortal({ name: "", url: "", contactEmail: "", active: true });
        navigate('/');
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="mt-24 max-w-xl mx-auto rounded-2xl p-[2px] 
      bg-gradient-to-br from-blue-300 via-pink-300 to-teal-400 
      shadow-lg hover:shadow-[0_0_25px_rgba(255,0,150,0.3)] transition-all duration-300">
      <div className="rounded-2xl bg-white dark:bg-gray-900 p-5">
        <SectionHeading
          icon={<Globe2 className="text-teal-600 w-6 h-6 mr-2" />}
          title="Add Job Portal"
        />
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 mt-4">
          {["name", "url", "contactEmail"].map((field) => (
            <input
              key={field}
              name={field}
              value={portal[field]}
              onChange={handleChange}
              placeholder={field === "contactEmail" ? "Contact Email" : field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
              text-sm shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 
              outline-none transition duration-200"
            />
          ))}

          {/* ✅ Active Dropdown */}
          <select
            name="active"
            value={String(portal.active)} // convert boolean to string
            onChange={handleChange}
            className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition duration-200"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-3/4 py-3 bg-gradient-to-r from-teal-500 to-blue-500 
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
