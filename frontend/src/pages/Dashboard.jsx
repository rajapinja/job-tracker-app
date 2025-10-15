import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import ApplicationsTable from '../components/ApplicationTable';
import Company from '../components/Company';
import MainHeading from '../components/MainHeading';

export default function Dashboard() {

  const [apps, setApps] = useState([]);
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 max-w-7xl mx-auto rounded-lg shadow-lg">
     <MainHeading title={"Dashboard"} />
      <main className="p-4 flex-1">
        <section className="mb-6">
          <div className="flex justify-right items-center mb-4">    
            <div className="space-x-2">
              <Link
                to="/addedit"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Add Application
              </Link>
              {/* {companies.length > 0 && companies.map((c, index)=>(
               <Link
                    key={index}
                    to={`/companydetails/${c.id}`} // ✅ dynamically pass companyId
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    View Companies
                </Link>
                ))
              }    */}
            </div>
          </div>

          {/* Applications Table */}
          {apps.length > 0 ? (
            <ApplicationsTable apps={apps} companies={companies}/>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
              No data found.
            </p>
          )}
        </section>
        <section className="mt-10">
          {/* Companies Table */}
          {companies.length > 0 ? (          
            <Company companies={companies} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
                  No data found.
                </p>            
            )}
        </section>
      </main>
    </div>
  );
}
