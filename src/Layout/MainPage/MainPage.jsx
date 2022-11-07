import React from "react";
import { JobPage, JobApply } from "Layout/Job";
import { CompanyPage } from "Layout/Company";
import { JobHot, JobNew, JobSearchBar, JobSearchList, JobItem } from "Components/Job";
import { EditUserInfo } from "Layout/User";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <JobSearchBar />
      {/* <JobSearchList /> */}
      <JobNew />
      {/* <JobHot /> */}
      {/* <JobApply /> */}
      {/* <CompanyPage /> */}
      {/* <JobPage /> */}
      {/* <EditUserInfo /> */}
    </div>
  );
};

export default MainPage;
