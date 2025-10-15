import { useState } from "react";
import { Users2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddConsultancy() {
  const [consultancy, setConsultancy] = useState({
    name: "",
    specialization: "",
    contactPerson: "",
    contactEmail: "",
    phone: ""
  });

  const navigate = useNavigate();  

  const handleChange = (e) => setConsultancy({ ...consultancy, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const payload = {
        name: consultancy.name,
        specialization: consultancy.specialization,
        contactPerson: consultancy.contactPerson,
        email: consultancy.contactEmail,
        phone: consultancy.phone
       }
      const res = await api.post("/api/v1/consultancies", payload);      
      setConsultancy(res.data);
      alert("✅ Consultancy added successfully!");
      setConsultancy({ name: "", specialization: "", contactPerson: "", contactEmail: "",phone:""  });
      navigate('/');
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="mt-24 max-w-xl mx-auto rounded-2xl p-[2px] 
      bg-gradient-to-br from-blue-300 via-pink-300 to-teal-400 
      shadow-lg hover:shadow-[0_0_25px_rgba(255,0,150,0.3)] transition-all duration-300">
      <div className=" rounded-2xl bg-white dark:bg-gray-900 p-5">
        <SectionHeading
          icon={<Users2 className="text-purple-600 w-6 h-6 mr-2" />}
          title="Add Consultancy"
        />
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 mt-4">
          {["name", "specialization", "contactPerson", "contactEmail"].map((field) => (
            <input
              key={field}
              name={field}
              value={consultancy[field]}
              onChange={handleChange}
              placeholder={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
              text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 
              outline-none transition duration-200"
            />
          ))}
          <button
            type="submit"
            className="w-3/4 py-3 bg-gradient-to-r from-purple-500 to-green-500 
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
