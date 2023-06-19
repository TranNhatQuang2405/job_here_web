import React from "react";
import { JobByIndustry, JobInteresting, JobNew } from "Components/Job";
import { TopBody, QuickBox } from "./Component";
import { Keyword } from "Components/Keyword";
import { CompanyTop } from "Components/Company";

const MainPage = () => {
  return (
    <div>
      <TopBody />
      <QuickBox />
      <JobNew />
      <JobInteresting />
      <Keyword />
      <JobByIndustry />
      <CompanyTop />
    </div>
  );
};

export default MainPage;
