import React, { ReactElement } from "react";
import Layout from "../components/layouts/layout";
import UserFrom from "../components/user-form";
import { NextPageWithLayout } from "./_app";

const EditProfile: NextPageWithLayout = () => {
  return <UserFrom isEditMode={true} />;
};

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditProfile;
