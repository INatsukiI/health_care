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
import { GraphData } from "../types/graphData";

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

const HealthCareGraph = ({ graphData }: { graphData: GraphData }) => {
  if (!graphData) {
    return null;
  }
  return (
    <div className="flex-auto w-62">
      <Chart type="bar" data={graphData} className="p-6 space-y-4" />
    </div>
  );
};

export default HealthCareGraph;
