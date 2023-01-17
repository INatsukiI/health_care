import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/layouts/layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <div className="animate-tracking-in-expand-fwd-bottom">
        <h2 className="mt-16 text-3xl">Health Recoder リリースノート</h2>
        <div className="p-6">
          <h2 className="text-2xl mb-4">Version 1.0</h2>
          <p>2022年1月11日</p>
          <ul className="list-inside list-disc">
            <li>アプリをリリースしました!</li>
            <li>ヘッダーのLoginリンクからログインしてお使いください.</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 animate-tracking-in-expand-fwd-bottom">
        <h2 className="mt-16 text-3xl">お問い合わせ</h2>
        <div className="p-6">
          <h2 className="text-2xl mb-4">Contact me</h2>
          <p className="leading-relaxed">
            お問い合わせは下記の連絡先にご連絡ください
          </p>
          <p className="leading-relaxed">Twitter: 準備中...</p>
          <p className="leading-relaxed">Gmail: natukiomura@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
