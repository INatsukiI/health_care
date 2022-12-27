import React from "react";
// 棒グラフ用のコンポーネントをインポート
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
import { GraphData } from "../types/graphData";
Chart.register(CategoryScale);

const HealthCareGraph = ({ graphData }: { graphData: GraphData }) => {
  if (!graphData) {
    return null;
  }

  return (
    <div className="flex-auto w-62">
      <Line data={graphData} className="p-6 space-y-4" />
    </div>
  );
};

export default HealthCareGraph;
