import { useEffect, useState } from "react";
import API from "../services/api";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Submitted Applications
      </h2>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Experience</th>
                <th className="py-2 px-4">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t hover:bg-gray-100">
                  <td className="py-2 px-4">{app.fullName}</td>
                  <td className="py-2 px-4">{app.email}</td>
                  <td className="py-2 px-4">{app.phone}</td>
                  <td className="py-2 px-4">
                    {app.experience?.years || 0} yrs @{" "}
                    {app.experience?.company || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
