import React, { ReactElement } from "react";
import Layout from "../components/layouts/layout";
import { NextPageWithLayout } from "./_app";

const About: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-16 animate-tracking-in-expand-fwd-bottom">
        <h1 className="text-3xl text-center mb-8">Health Recoderについて</h1>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-400 ml-6">
          日々の体温・体重を記録することで、記録したデータを元にグラフを自動作成し、
          <br />
          自身の健康データの可視化を行ってくれるアプリです。
        </p>
      </div>
      <div className="mt-16 animate-tracking-in-expand-fwd-bottom">
        <h1 className="text-3xl text-center mb-8">背景</h1>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-400 ml-6">
          コロナ禍の中で、リモートワークやオンライン授業などで今まで以上に自宅での生
          <br />
          活が増えました。その中で、体調を崩された方も多いかと思います。
          <br />
          その問題を解決するため、自宅での生活の中でも自身の健康管理ができるアプリを
          <br />
          開発しました。
        </p>
      </div>
      <div className="mt-16 animate-tracking-in-expand-fwd-bottom">
        <h1 className="text-3xl text-center mb-8">私たちについて</h1>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-400">
          大学3年生(2023年1月現在)2人で開発したアプリケーションです。
        </p>
      </div>
      <div className="mt-16 animate-tracking-in-expand-fwd-bottom">
        <h1 className="text-3xl text-center mb-8">使用した技術</h1>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-400 ml-6">
          フレームワーク： Next.js
        </p>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-400 ml-6">
          データベース・認証： Firebase
        </p>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-400 ml-6">
          デプロイ： Versel
        </p>
      </div>
    </div>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
