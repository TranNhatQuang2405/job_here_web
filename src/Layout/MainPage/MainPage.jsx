import React from "react";
import { JobPage } from "Components/Job";
import { CompanyPage } from "Components/Company";
import { JobHot, JobNew, JobSearchBar, JobSearchList } from "Components/Job";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      {/* <JobSearchBar />
      <JobSearchList />
      <JobNew />
      <JobHot /> */}
      {/* <JobPage /> */}
      <CompanyPage />
    </div>
  );
};

export default MainPage;
