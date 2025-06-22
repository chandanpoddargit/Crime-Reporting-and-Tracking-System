import { useState } from "react";
import axios from "axios";

const ReportCrime = () => {
  const [form, setForm] = useState({
    type: "",
    location: "",
    datetime: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (file) formData.append("evidence", file);

    try {
      const res = await axios.post("http://localhost:5000/api/reports", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Crime reported successfully!");
    } catch (err) {
      console.error(err);
      alert("Error reporting crime.");
    }
  };

  return (
    <div className="form-container">
      <h2>Report Crime</h2>
      <form onSubmit={handleSubmit}>
        <input name="type" placeholder="Crime Type" required onChange={handleChange} />
        <input name="location" placeholder="Location" required onChange={handleChange} />
        <input type="datetime-local" name="datetime" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportCrime;
