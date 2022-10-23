import React from "react";
import { JobPage } from "Components/Job";
import { JobHot, JobSearchBar, JobSearchList } from "Components/MainPage";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <JobSearchBar />
      <JobSearchList />
      <JobHot />
      <JobPage />
    </div>
  );
};

export default MainPage;
