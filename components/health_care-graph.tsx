import React from "react";
// 棒グラフ用のコンポーネントをインポート
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
Chart.register(CategoryScale);

const labels = ["12/10", "12/11", "12/12", "12/13", "12/14", "12/15"];
const graphData = {
  labels: labels,
  datasets: [
    {
      label: "体温",
      data: [36.2, 36.5, 36.0, 36.3, 36.5],
      borderColor: "rgb(75, 192, 192)",
    },
    {
      label: "体重",
      data: [50, 51.5, 52, 53, 55, 53],
      borderColor: "rgb(75, 100, 192)",
    },
  ],
};

const HealthCareGraph = () => {
  return (
    <div className="flex-auto w-62">
      <Line data={graphData} className="p-6 space-y-4" />
    </div>
  );
};

export default HealthCareGraph;
