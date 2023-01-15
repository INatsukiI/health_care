import Link from "next/link";
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
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-16 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          アカウント情報
        </h5>
        <div className="mx-auto mt-5">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            名前:{user?.name}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            プロフィール:{user?.profile}
          </p>
          <Link
            href="/edit_profile"
            className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-100 dark:bg-green-300 dark:hover:bg-green-500 dark:focus:ring-green-600"
          >
            編集
          </Link>
        </div>
      </div>
    </div>
  );
};

Mypage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Mypage;
