import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import HealthCareFrom from "../components/health_care-form";
import HealthCareGraph from "../components/health_care-graph";
import Layout from "../components/layouts/layout";
import { useAuth } from "../context/auth";
import { NextPageWithLayout } from "./_app";

const HealthCare: NextPageWithLayout = () => {
  const { isLoading, fbUser } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container">
      <div className="flex flex-col mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex">
          <HealthCareFrom isEditMode={false} />
          <div className="flex-auto w-15"></div>
          <HealthCareGraph />
        </div>
      </div>
    </div>
  );
};

HealthCare.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HealthCare;
