import { useEffect, useState } from "react";
import axios from "axios";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/applications")
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Submitted Applications</h2>
      {loading ? (
        "Loading..."
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.fullName}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Resume
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ViewApplications;
