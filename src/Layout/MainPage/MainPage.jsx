import React from "react";
import { JobPage,JobApply } from "Layout/Job";
import { CompanyPage } from "Layout/Company";
import { JobHot, JobNew, JobSearchBar, JobSearchList } from "Components/Job";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      {/* <JobSearchBar />
      <JobSearchList />
      <JobNew />
      <JobHot /> */}
      <JobApply />
      {/* <CompanyPage /> */}
    </div>
  );
};

export default MainPage;
