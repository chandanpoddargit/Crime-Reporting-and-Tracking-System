import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CaseDetails = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCaseData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="form-container">
      <h2>Case Details</h2>
      {caseData ? (
        <div>
          <p><strong>Type:</strong> {caseData.type}</p>
          <p><strong>Location:</strong> {caseData.location}</p>
          <p><strong>Description:</strong> {caseData.description}</p>
          <p><strong>Status:</strong> {caseData.status}</p>
          {caseData.evidence && (
            <div>
              <p><strong>Evidence:</strong></p>
              {caseData.evidence.map((file, idx) => (
                <a key={idx} href={file} target="_blank" rel="noreferrer">View Evidence {idx + 1}</a>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading case details...</p>
      )}
    </div>
  );
};

export default CaseDetails;
