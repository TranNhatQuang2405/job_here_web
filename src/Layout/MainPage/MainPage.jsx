import React from "react";
import { JobPage, JobApply } from "Layout/Job";
import { CompanyPage } from "Layout/Company";
import { JobHot, JobNew, JobSearch } from "Components/Job";
import { EditUserInfo } from "Layout/User";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <JobSearch />
      <JobNew />
      {/* <JobHot /> */}
    </div>
  );
};

export default MainPage;
