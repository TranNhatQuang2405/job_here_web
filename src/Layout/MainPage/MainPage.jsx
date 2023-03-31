import React from "react";
import { JobInteresting, JobNew } from "Components/Job";
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
      <CompanyTop />
    </div>
  );
};

export default MainPage;
