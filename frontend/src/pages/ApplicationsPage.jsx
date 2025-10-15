import DynamicTable from "../components/DynamicTable";
import api from '../services/api';
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  
  const [apps, setApps] = useState([]);
//   const applications = [   
//         {
//             ID: 1,
//             Company: "Google",
//             Position: "Senior Software Engineer",
//             SkillSet : "Java, Spring Boot, Microservices, GCP",
//             Portal: "LinkedIn",
//             Consultancy: "Self",
//             City: "Bangalore",
//             DateApplied: "2025-10-05",
//             Status: "Interview Scheduled",
//             JobType: "Full-Time",
//             EmploymentType: "Permanent",
//             Actions: "View | Edit",
//             JobDetails: "Backend services for Ads Platform",
//             CompanyDetails: "Tech giant focused on AI and Cloud",
//         },
//         {
//             ID: 2,
//             Company: "TCS",
//             Position: "Solution Architect",
//             SkillSet: "AWS, Terraform, CI/CD, Kubernetes",
//             Portal: "Naukri",
//             Consultancy: "ABC Consultants",
//             City: "Hyderabad",
//             DateApplied: "2025-09-28",
//             Status: "Applied",
//             JobType: "Hybrid",
//             EmploymentType: "Contract",
//             Actions: "View | Edit",
//             JobDetails: "Client delivery projects across BFSI",
//             CompanyDetails: "Leading IT services firm",
//         },
//         {
//             ID: 3,
//             Company: "Accenture",
//             Position: "Tech Lead",
//             SkillSet: "React, Node.js, GraphQL, Docker",
//             Portal: "Company Website",
//             Consultancy: "Self",
//             City: "Pune",
//             DateApplied: "2025-10-02",
//             Status: "Shortlisted",
//             JobType: "Remote",
//             EmploymentType: "Permanent",
//             Actions: "View | Edit",
//             JobDetails: "Full-stack modernization for enterprise app",
//             CompanyDetails: "Global consulting firm",
//         },
//         {
//             ID: 4,
//             Company: "Cognizant",
//             Position: "Data Engineer",
//             SkillSet: "Python, Spark, Airflow, Azure",
//             Portal: "Indeed",
//             Consultancy: "XYZ Talent",
//             City: "Chennai",
//             DateApplied: "2025-09-30",
//             Status: "In Review",
//             JobType: "Full-Time",
//             EmploymentType: "Permanent",
//             Actions: "View | Edit",
//             JobDetails: "Build data pipelines for healthcare domain",
//             CompanyDetails: "IT consulting and services",
//         },
//         {
//             ID: 5,
//             Company: "Amazon",
//             Position: "DevOps Engineer",
//             SkillSet: "AWS, Jenkins, Ansible, Linux",
//             Portal: "LinkedIn",
//             Consultancy: "Self",
//             City: "Hyderabad",
//             DateApplied: "2025-10-07",
//             Status: "Rejected",
//             JobType: "On-site",
//             EmploymentType: "Full-Time",
//             Actions: "View | Edit",
//             JobDetails: "Automation and deployment for eCommerce infra",
//             CompanyDetails: "Global eCommerce and cloud provider",
//         },
//     ];

   const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchJobApps();
    fetchCompanies();
  }, []);

  const fetchJobApps = async () => {
    try {
      // Try to fetch applications first
      const appsRes = await api.get('/api/v1/apps/all/data');
      if (appsRes.data && appsRes.data.length > 0) {
        setApps(appsRes.data);
      }      
    } catch (err) {
      console.error(err);
      alert('Failed to fetch data job apps. Is backend running?');
    }
  };

   const fetchCompanies = async () => {
    try {
      const compRes = await api.get('/api/v1/companies');
      if(compRes.data && compRes.data.length > 0){
        setCompanies(compRes.data);
      }       
      
    } catch (err) {
      console.error(err);
      alert('Failed to fetch data for companies. Is backend running?');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Applications</h1>
      <DynamicTable apps={apps} companies={companies} />
    </div>
  );
}
