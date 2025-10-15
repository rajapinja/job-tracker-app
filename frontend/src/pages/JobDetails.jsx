import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeading from '../components/SectionHeading';

export default function JobDetails() {

  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9395/api/v1/positions/job-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setAnswer(data.practiceAnswer || "");
      });
  }, [id]);

  const handleSave = async () => {

    const payload = {        
        jobDescription : description,
        practiceAnswer : answer 
    }

    await fetch(`http://localhost:9395/api/v1/positions`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Saved!");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 bg-gray-100 dark:bg-gray-800 rounded dark:border-gray-700">
      <SectionHeading title={"Job Details"} />
      <p><strong>Position Offered:</strong> {job.title}</p>
      <p><strong>Job Type:</strong> {job.jobType}</p>
      <p><strong>Employment Type:</strong> {job.employmentType}</p>
      <div>
        <strong>Skills:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills?.map((s, i) => (
            <span key={i} className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">
              {s}
            </span>
          ))}
        </div>
      </div>      
      <div>
        <strong>Description:</strong>     
        {job.jobDescription != null ? ( 
          <div>
            <p className="whitespace-pre-wrap bg-gray-50 border p-3 rounded mt-2">
                {job.jobDescription}
            </p>     

            <strong>Practice Answer:</strong>
            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={8}
                className="w-full border rounded p-2 mt-2"
                placeholder="Write your preparation notes or sample answers here..."
            />           
          </div>
         ):(
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="w-full border rounded p-2 mt-2"
                placeholder="Provide job description here..."
            />
        )}
       </div>
       <button
         onClick={handleSave}
         className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
         Save Answer
        </button>
    </div>
  );
}
