import React from "react";
import { JobPage, JobApply } from "Layout/Job";
import { CompanyPage } from "Layout/Company";
import { JobInteresting, JobNew, JobSearch } from "Components/Job";
import { EditUserInfo } from "Layout/User";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <JobSearch />
      <JobNew />
      <JobInteresting />
    </div>
  );
};

export default MainPage;
