import { Link } from 'react-router-dom';
export default function ApplicationsTable({ applications }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-md border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Company</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Position</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Portal</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Consultancy</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">City</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date Applied</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Job Type</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Employment Type</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Edit</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app, index) => (
            <tr
              key={app.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-blue-100'} // striped rows
            >
              <td className="px-4 py-2 text-sm text-gray-700">{app.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.companyName}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.position}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.portalName}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.consultancyName}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.city}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.dateApplied}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.status}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.jobType}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{app.employmentType}</td>
              <td className="px-3 py-2">
                <Link
                    to={`/edit/${app.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
