import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import SectionHeading from "../components/SectionHeading";
import { Currency } from 'lucide-react';

const empty = {
  resumeSent: false,
  resumeUrl: '',
  // jobDescription: '',
  jobUrl: '',
  companyId: '',
  positionId: '',
  jobPortalId: '',
  consultancyId: '',
  location: '',
  city: '',
  country: '',
  applicationDate: '',
  shortlisted: false,
  interviewDate: '',
  interviewRound: 'Level-1',
  salaryOffered: '',
  currency: 'INR',
  expectedJoiningDate: '',
  domain: '',
  cloudPlatform: '',
  aiPlatform: '',
  endDate: '',
  status: 'APPLIED',
  notes: '',
  jobType: 'Full-Time',
  employmentType: 'Permanent',
};

export default function AddEditApplication() {

  const [form, setForm] = useState(empty);
  const [companies, setCompanies] = useState([]);
  const [positions, setPositions] = useState([]);
  const [portals, setPortals] = useState([]);
  const [consultancies, setConsultancies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("api : ", api);
    fetchDropdownData();
    if (id) fetchOne();
  }, [id]);

  const fetchDropdownData = async () => {
    try {
      const [companiesRes, positionsRes, portalsRes, consultanciesRes] = await Promise.all([
        api.get('/api/v1/companies'),
        api.get('/api/v1/positions'),
        api.get('/api/v1/job-portals'),
        api.get('/api/v1/consultancies')
      ]);
      setCompanies(companiesRes.data);
      setPositions(positionsRes.data);
      setPortals(portalsRes.data);
      setConsultancies(consultanciesRes.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load dropdown data');
    }
  };

  const fetchOne = async () => {
    try {
      const res = await api.get('/api/v1/apps/' + id);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch application');
    }
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        alert('Updating existing application');
        await api.put('/api/v1/apps/' + id, form);
      } else {
        alert('Creating new application');
        await api.post('/api/v1/apps', form);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="mt-6 relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-300 via-pink-300 to-teal-400 shadow-md 
        transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]">
      <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 overflow-x-auto max-w-8xl mx-auto">
        <main className="p-4 flex-1 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4">{id ? 'Edit' : 'Add'} Application</h2>

          <form onSubmit={save} className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded shadow">
            {/* Dropdowns for Relations */}
            <div className="grid grid-cols-2 gap-3">
              <select value={form.companyId} onChange={e => set('companyId', e.target.value)} className="p-2 border rounded">
                <option value="">Select Company</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select value={form.positionId} onChange={e => set('positionId', e.target.value)} className="p-2 border rounded">
                <option value="">Select Position</option>
                {positions.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>

              <select value={form.jobPortalId} onChange={e => set('jobPortalId', e.target.value)} className="p-2 border rounded">
                <option value="">Select Job Portal</option>
                {portals.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>

              <select value={form.consultancyId} onChange={e => set('consultancyId', e.target.value)} className="p-2 border rounded">
                <option value="">Select Consultancy</option>
                {consultancies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select value={form.currency} onChange={e => set('currency', e.target.value)} className="p-2 border rounded flex items-center">
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
              </select>
              <select value={form.status} onChange={e => set('status', e.target.value)} className="p-2 border rounded">
                <option value="APPLIED">Applied</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEWING">Interviewing</option>
                <option value="OFFERED">Offered</option>
                <option value="REJECTED">Rejected</option>
                <option value="WITHDRAWN">Withdrawn</option>
                <option value="ACCEPTED">Accepted</option>
              </select>
              <select value={form.interviewRound} onChange={e => set('interviewRound', e.target.value)} className="p-2 border rounded">
                <option value="Level-1">Level-1</option>
                <option value="Level-2">Level-2</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
                <option value="C-Level">C-Level</option>
              </select>
              <select value={form.jobType} onChange={e => set('jobType', e.target.value)} className="p-2 border rounded">
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
              <select value={form.employmentType} onChange={e => set('employmentType', e.target.value)} className="p-2 border rounded">
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>             
            </div>

            <div className="grid grid-cols-2 gap-3">

              <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" className="p-2 border rounded" />
              <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="Country" className="p-2 border rounded" />
              <input value={form.applicationDate} onChange={e => set('applicationDate', e.target.value)} type="date" placeholder="Application Date" className="p-2 border rounded" />
              <input value={form.interviewDate} onChange={e => set('interviewDate', e.target.value)} type="datetime-local" placeholder="Interview Date" className="p-2 border rounded" />
              <input value={form.domain} onChange={e => set('domain', e.target.value)} placeholder="Domain (Banking/Insurance...)" className="p-2 border rounded" />
              <input value={form.cloudPlatform} onChange={e => set('cloudPlatform', e.target.value)} placeholder="Cloud (AWS/Azure/GCP...)" className="p-2 border rounded" />
              <input value={form.aiPlatform} onChange={e => set('aiPlatform', e.target.value)} placeholder="AI Stack (OpenAI/Groq...)" className="p-2 border rounded" />
              <input value={form.salaryOffered} onChange={e => set('salaryOffered', e.target.value)} placeholder="Salary Offered" className="p-2 border rounded" />

            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.resumeSent}
                onChange={e => set('resumeSent', e.target.checked)}
                className="h-4 w-4"
              />
              <label className="select-none">Resume Sent</label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input value={form.endDate} onChange={e => set('endDate', e.target.value)} type="datetime-local" placeholder="End Date" className="p-2 border rounded" />
              <input value={form.expectedJoiningDate} onChange={e => set('expectedJoiningDate', e.target.value)} type="datetime-local" placeholder="Expected Joining Date" className="p-2 border rounded" />
              <input value={form.resumeUrl} onChange={e => set('resumeUrl', e.target.value)} placeholder="Resume URL" className="p-2 border rounded" />
              <input value={form.jobUrl} onChange={e => set('jobUrl', e.target.value)} placeholder="Job URL" className="p-2 border rounded" />
            </div>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Job Description / Notes" className="p-2 border rounded w-full h-24" />

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                onClick={save}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
