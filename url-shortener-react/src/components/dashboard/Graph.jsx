import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ graphData }) => {
  const hasData = graphData && graphData.length > 0;

  const labels = hasData
    ? graphData.map((item) => item.clickDate)
    : ["No Data"];

  const counts = hasData
    ? graphData.map((item) => item.count)
    : [0];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Clicks",
        data: counts,
        backgroundColor: hasData ? "rgba(59, 130, 246, 0.6)" : "rgba(148, 163, 184, 0.2)",
        borderColor: hasData ? "rgb(59, 130, 246)" : "rgba(148, 163, 184, 0.4)",
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#94a3b8",
          font: {
            family: "Inter",
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#94a3b8",
          font: {
            family: "Inter",
          },
          stepSize: 1,
        },
        grid: {
          color: "rgba(51, 65, 85, 0.3)",
        },
        title: {
          display: true,
          text: "Number of Clicks",
          color: "#94a3b8",
          font: {
            family: "Inter",
            weight: "medium",
          },
        },
      },
      x: {
        ticks: {
          color: "#94a3b8",
          font: {
            family: "Inter",
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Date",
          color: "#94a3b8",
          font: {
            family: "Inter",
            weight: "medium",
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
