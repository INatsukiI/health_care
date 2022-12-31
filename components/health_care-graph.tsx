/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
import { Content } from "../types/content";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { collection, getDocs, query, where } from "firebase/firestore";

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
  const { fbUser } = useAuth();
  const [data, setData] = useState<Content[]>([]);
  const [datetimeData, setdatetimeData] = useState<string[]>([]);
  const [bodyTmpData, setbodyTmpData] = useState<number[]>([]);
  const [wightData, setwightData] = useState<number[]>([]);
  const Today = new Date();
  const todayMonth = Today.getMonth() + 1;

  useEffect(() => {
    if (fbUser) {
      const ref = collection(db, `users/${fbUser.uid}`, "contents");
      getDocs(
        query(
          ref,
          where("datetime", ">=", `2022-${todayMonth}-01`),
          where("datetime", "<", `2022-${todayMonth}-32`)
        )
      ).then((snap) => {
        snap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data() as Content);
          setData((data) => [...data, doc.data() as Content]);
          setdatetimeData((datetimeData) => [
            ...datetimeData,
            doc.data().datetime.split("-")[1] +
              "-" +
              doc.data().datetime.split("-")[2],
          ]);
          setbodyTmpData((bodyTmpData) => [
            ...bodyTmpData,
            doc.data().body_tmp as number,
          ]);
          setwightData((wightData) => [
            ...wightData,
            doc.data().wight as number,
          ]);
        });
      });
    }
  }, [fbUser]);

  const labels = datetimeData;
  const graphData = {
    labels: labels,
    datasets: [
      {
        type: "line" as const,
        label: "体重",
        data: wightData,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
      },
      {
        type: "bar" as const,
        label: "体温",
        data: bodyTmpData,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
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
