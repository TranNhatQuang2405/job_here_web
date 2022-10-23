import React from "react";
import { JobPage } from "Components/Job";
import { JobHot, JobNew, JobSearchBar, JobSearchList } from "Components/MainPage";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <JobSearchBar />
      <JobSearchList />
      <JobNew />
      <JobHot />
      <JobPage />
    </div>
  );
};

export default MainPage;
