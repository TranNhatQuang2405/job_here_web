import React from "react";
import { JobPage } from "Components/Job";
import { JobHot } from "Components/MainPage";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <JobHot />
      <JobPage />
    </div>
  );
};

export default MainPage;
