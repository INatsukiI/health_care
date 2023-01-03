import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "../components/layouts/layout";
import { useAuth } from "../context/auth";
import { NextPageWithLayout } from "./_app";

const Mypage: NextPageWithLayout = () => {
  const { isLoading, fbUser, user } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  } else {
    console.log(fbUser);
  }

  return (
    <div>
      <h1>マイページ</h1>
      <p>名前:{user && user.name}</p>
      <p>プロフィール:{user && user.profile}</p>
    </div>
  );
};

Mypage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Mypage;
