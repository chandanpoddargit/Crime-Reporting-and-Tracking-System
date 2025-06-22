import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [chartData, setChartData] = useState({});

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      const labels = Object.keys(res.data);
      const data = Object.values(res.data);

      setChartData({
        labels,
        datasets: [
          {
            label: "Crime Count",
            data,
            backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"],
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="form-container">
      <h2>Crime Statistics</h2>
      {chartData?.labels ? (
        <Pie data={chartData} />
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
};

export default Statistics;
