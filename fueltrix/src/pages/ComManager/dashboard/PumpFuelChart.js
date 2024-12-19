import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import "./PumpFuelChart.css"; // Import the CSS file

// Register required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const PumpFuelChart = ({ vehiclesData }) => {
  // Prepare the chart data
  const data = {
    labels: vehiclesData.map((vehicle) => vehicle.registrationNumber), // Vehicle registration numbers as x-axis labels
    datasets: [
      {
        label: "Pumped Fuel Volume (L)", // Label for the dataset
        data: vehiclesData.map((vehicle) => parseFloat(vehicle.pumpedVolume)), // Pumped volume for each vehicle
        fill: false, // Don't fill under the line
        borderColor: "#007BFF", // Line color
        tension: 0.1, // Line smoothness
        pointRadius: 5, // Display points for each vehicle
        pointBackgroundColor: "#FFFFFF", // Point color
        borderWidth: 2, // Line thickness
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
        title: {
          display: true,
          text: "Vehicle Registration Number", // Label for the x-axis
          color: "#aaa",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Pumped Fuel Volume (L)", // Label for the y-axis
          color: "#aaa",
        },
        grid: {
          color: "#ddd",
        },
        beginAtZero: true, // Ensure the y-axis starts at 0
      },
    },
  };

  return (
    <div className="pump-fuel-chart">
      <h3>Pumped Fuel Volume for Each Vehicle</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default PumpFuelChart;
