import React from "react";
import HealthCareFrom from "../components/health_care-form";
import HealthCareGraph from "../components/health_care-graph";

const HealthCare = () => {
  return (
    <div className="container">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex">
          <HealthCareFrom isEditMode={false} />
          <div className="flex-auto w-15"></div>
          <HealthCareGraph />
        </div>
      </div>
    </div>
  );
};

export default HealthCare;
