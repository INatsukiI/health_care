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
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

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
  const todayYear = Today.getFullYear();
  const todayMonth = String(Today.getMonth() + 1).padStart(2, "0");
  console.log(`testtesttest${todayMonth}`);

  useEffect(() => {
    if (fbUser) {
      const ref = collection(db, `users/${fbUser.uid}`, "contents");
      const q = query(
        ref,
        where("datetime", ">=", `${todayYear}-${todayMonth}-01`),
        where("datetime", "<", `${todayYear}-${todayMonth}-32`)
      );
      const unsub = onSnapshot(q, (snap) => {
        setData([]);
        setdatetimeData([]);
        setbodyTmpData([]);
        setwightData([]);

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
  }, [fbUser, todayMonth, todayYear]);

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
