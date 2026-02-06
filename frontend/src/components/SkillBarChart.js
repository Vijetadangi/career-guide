import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const SkillBarChart = ({ scores }) => {
  const data = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: "Skill Strength (%)",
        data: Object.values(scores),
        backgroundColor: ["#2f5bea", "#6c8cff", "#9bb1ff"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SkillBarChart;
