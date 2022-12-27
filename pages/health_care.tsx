import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HealthCareFrom from "../components/health_care-form";
import HealthCareGraph from "../components/health_care-graph";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { Content } from "../types/content";
import { GraphData } from "../types/graphData";

const HealthCare = () => {
  const { isLoading, fbUser } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<GraphData>();

  useEffect(() => {
    if (fbUser) {
      const ref = collection(db, `users/${fbUser.uid}`, "contents");
      getDocs(
        query(
          ref,
          where("datetime", ">=", "2022-12-1"),
          where("datetime", "<", "2022-12-32")
        )
      ).then((snap) => {
        snap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      });
    }
  }, [fbUser]);

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  }

  // const getAllDays = (year: number, month: number) =>{
  //   // 最初の日付
  //   const date = new Date(year, month, 1);

  //   const dates = [];

  //   // 次月になるまでループさせる
  //   while (date.getMonth() === month) {
  //     // 配列に追加していく
  //     dates.push(new Date(date));
  //     date.setDate(date.getDate() + 1);
  //   }

  //   return dates;
  // }

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

  return (
    <div className="container">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex">
          <HealthCareFrom isEditMode={false} />
          <div className="flex-auto w-15"></div>
          <HealthCareGraph graphData={graphData} />
        </div>
      </div>
    </div>
  );
};

export default HealthCare;
