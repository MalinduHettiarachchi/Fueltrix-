import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./SessionChart.css"; // Import CSS for styling

// Register required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SessionChart = ({ groupedFuelData }) => {
  // Prepare the data for the chart based on groupedFuelData
  const chartData = {
    labels: Object.keys(groupedFuelData), // Vehicle types (x-axis)
    datasets: [
      {
        label: "Total Pumped Volume (L)",
        data: Object.values(groupedFuelData), // Total pumped volume (y-axis)
        borderColor: "#007BFF",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true,
        tension: 0.4, // For a smoother curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide gridlines
        },
        ticks: {
          color: "#aaa", // Customize x-axis labels color
        },
      },
      y: {
        grid: {
          color: "#333", // Customize gridline color
        },
        ticks: {
          color: "#aaa", // Customize y-axis labels color
          stepSize: 5, // Customize step size for the y-axis ticks
        },
      },
    },
  };

  return (
    <div className="session-chart">
      <div className="session-info">
        <h3>Pumped Diesel Fuel</h3>
        <p>
          <span className="session-count">
            {Object.values(groupedFuelData).reduce((a, b) => a + b, 0).toFixed(2)} L
          </span>
        </p>
        <p>Total pumped volume for vehicles</p>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SessionChart;
