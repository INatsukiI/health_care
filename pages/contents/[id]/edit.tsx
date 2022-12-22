import React from "react";
import HealthCareFrom from "../../../components/health_care-form";

const EditPage = () => {
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

export default EditPage;
