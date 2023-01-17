import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import { useAuth } from "../../context/auth";
import { db } from "../../firebase/client";
import { Content } from "../../types/content";
import { NextPageWithLayout } from "../_app";

const Index: NextPageWithLayout = () => {
  const { isLoading, user, fbUser } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Content[]>([]);
  const Today = new Date();
  const todayYear = Today.getFullYear();
  const todayMonth = String(Today.getMonth() + 1).padStart(2, "0");

  useEffect(() => {
    if (fbUser) {
      const ref = collection(db, `users/${fbUser.uid}`, "contents");
      const q = query(
        ref,
        where("datetime", ">=", `${todayYear}-${todayMonth}-01`),
        where("datetime", "<", `${todayYear}-${todayMonth}-32`)
      );

      getDocs(q).then((snap) => {
        snap.forEach((doc) => {
          setData((data) => [...data, doc.data() as Content]);
        });
      });
    }
  }, [fbUser, todayMonth, todayYear]);

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/");
    return null;
  }

  if (!user) {
    return (
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        アカウント未登録
      </h5>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              日付
            </th>
            <th scope="col" className="px-6 py-3">
              体温
            </th>
            <th scope="col" className="px-6 py-3">
              体重
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={e.datetime}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {e.datetime}
              </th>
              <td className="px-6 py-4">{e.body_tmp}</td>
              <td className="px-6 py-4">{e.wight}</td>
              <td className="px-6 py-4">
                <Link
                  href={`contents/${e.datetime}/edit`}
                  className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600"
                >
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
