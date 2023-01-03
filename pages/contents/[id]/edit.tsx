import React, { ReactElement } from "react";
import HealthCareFrom from "../../../components/health_care-form";
import Layout from "../../../components/layouts/layout";
import { NextPageWithLayout } from "../../_app";

const EditPage: NextPageWithLayout = () => {
  return (
    <div className="container">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex">
          <HealthCareFrom isEditMode={true} />
          <div className="flex-auto"></div>
        </div>
      </div>
    </div>
  );
};

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPage;
