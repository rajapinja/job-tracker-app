import { useState } from "react";
import { Building2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { useNavigate, useParams } from 'react-router-dom';

export default function AddCompany() {
  const [company, setCompany] = useState({
    name: "",
    industry: "",
    location: "",
    website: "",
    description: ""
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Company Data:", company);
    // TODO: integrate with backend POST /api/companies
    try {
      const payload = {
       name: company.name,
       industry: company.industry,
       location: company.location,
       website: company.website,
       description: company.description,
      };

      const res = await fetch(`http://localhost:9395/api/v1/companies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update application");    
      alert("Saved successfully!");

      // 🧹 Reset form fields
      setCompany({
        name: "",
        industry: "",
        location: "",
        website: "",
        description: "",
      });
       navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className=" mt-10 max-w-xl mx-auto rounded-2xl p-[2px] 
      bg-gradient-to-br from-blue-300 via-pink-300 to-teal-400 
      shadow-lg hover:shadow-[0_0_25px_rgba(255,0,150,0.3)] 
      transition-all duration-300"
    >
      <div className="rounded-2xl bg-white dark:bg-gray-900 dark:text-white p-5">
        <SectionHeading
          icon={<Building2 className="text-pink-600 w-6 h-6 mr-2" />}
          title="Add Company"
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-5 mt-4"
        >
          {[
            { name: "name", type: "input", placeholder: "Company Name" },
            { name: "industry", type: "input", placeholder: "Industry" },
            { name: "location", type: "input", placeholder: "Location" },
            { name: "website", type: "input", placeholder: "Website URL" },
            { name: "description", type: "textarea", placeholder: "Nature of Business" }
          ].map((field) => (

            field.type === "input" ? (

            <input
              key={field.name}
              name={field.name}
              value={company[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-3/4 px-4 py-3 border border-gray-300 
                rounded-lg text-gray-800 text-sm shadow-sm 
                focus:ring-2 focus:ring-pink-400 focus:border-pink-400 
                outline-none transition duration-200 dark:bg-gray-900 dark:text-gray-400
                 placeholder-gray-500 dark:placeholder-gray-400"
            />
          ):(
             <textarea
              key={field.name}
              name={field.name}
              value={company[field.name]}
              onChange={handleChange}
              rows="5"
              placeholder={field.placeholder}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm 
              focus:ring-2 focus:ring-pink-400 focus:border-pink-400
               placeholder-gray-500 dark:placeholder-gray-400
              dark:bg-gray-900 dark:text-gray-100"
            ></textarea>
          ))
          )}
          <button
            type="submit"
            className="w-2/4 py-3 bg-gradient-to-r from-blue-500 to-green-400 
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
