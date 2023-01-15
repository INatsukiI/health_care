import React, { ReactElement } from "react";
import HealthCareFrom from "../../../components/health_care-form";
import Layout from "../../../components/layouts/layout";
import { NextPageWithLayout } from "../../_app";

const EditPage: NextPageWithLayout = () => {
  return (
    <div className="mt-16">
      <HealthCareFrom isEditMode={true} />
    </div>
  );
};

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPage;
