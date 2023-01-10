import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/layouts/layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div className="container">
      <Link href="/login">認証ページへ</Link>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
