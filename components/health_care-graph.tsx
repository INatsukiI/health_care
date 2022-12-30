import React from "react";
// 棒グラフ用のコンポーネントをインポート
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const HealthCareGraph = () => {
  const labels = ["12/10", "12/11", "12/12", "12/13", "12/14", "12/15"];
  const graphData = {
    labels: labels,
    datasets: [
      {
        type: "line" as const,
        label: "体重",
        data: [50, 51.5, 52, 53, 55, 53],
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
      },
      {
        type: "bar" as const,
        label: "体温",
        data: [36.2, 36.5, 36.0, 36.3, 36.5],
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex-auto w-62">
      <Chart type="bar" data={graphData} className="p-6 space-y-4" />
    </div>
  );
};

export default HealthCareGraph;
