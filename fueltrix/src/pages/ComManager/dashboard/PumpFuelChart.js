import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./PumpFuelChart.css"; // Import the CSS file

// Register required chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PumpFuelChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Downloads",
        data: [10000, 11000, 9000, 12000, 15000, 10000, 8000],
        backgroundColor: [
          "#007BFF",
          "#007BFF",
          "#007BFF",
          "#007BFF",
          "#007BFF",
          "#007BFF",
          "#007BFF",
        ],
      },
      {
        label: "Page Views",
        data: [5000, 6000, 4000, 7000, 9000, 5000, 3000],
        backgroundColor: [
          "#80CFFF",
          "#80CFFF",
          "#80CFFF",
          "#80CFFF",
          "#80CFFF",
          "#80CFFF",
          "#80CFFF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#ddd",
        },
      },
    },
  };

  return (
    <div className="pump-fuel-chart">
      <h3>Page Views and Downloads</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PumpFuelChart;
