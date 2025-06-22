import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/reports/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="dashboard">
      <h2>My Reports</h2>
      {reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        reports.map((rep) => (
          <div key={rep._id} className="report-card">
            <h3>{rep.type}</h3>
            <p><strong>Location:</strong> {rep.location}</p>
            <p><strong>Status:</strong> {rep.status}</p>
            <Link to={`/case/${rep._id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
