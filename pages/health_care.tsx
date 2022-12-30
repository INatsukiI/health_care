/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, query, where } from "firebase/firestore";
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
  const [data, setData] = useState<Content[]>([]);

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
          console.log(doc.id, " => ", doc.data() as Content);
          setData((data) => [...data, doc.data() as Content]);
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

  if (!data) {
    return null;
  }

  return (
    <div className="container">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex">
          <HealthCareFrom isEditMode={false} />
          <div className="flex-auto w-15"></div>
          <HealthCareGraph />
        </div>
      </div>
      <>
        {data.map((e) => (
          <div key={e.datetime}>{e.datetime}</div>
        ))}
      </>
    </div>
  );
};

export default HealthCare;
