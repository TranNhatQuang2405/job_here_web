import React from "react";
import { JobInteresting, JobNew, JobSearch } from "Components/Job";
import { Keyword } from "Components/Keyword";
import { CompanyTop } from "Components/Company";

const MainPage = () => {
  return (
    <div>
      <JobSearch />
      <JobNew />
      <JobInteresting />
      <Keyword />
      <CompanyTop />
    </div>
  );
};

export default MainPage;
