import React from "react";
import { JobInteresting, JobNew, JobSearch } from "Components/Job";
import { Keyword } from "Components/Keyword";

const MainPage = () => {
  return (
    <div>
      <JobSearch />
      <JobNew />
      <JobInteresting />
      <Keyword />
    </div>
  );
};

export default MainPage;
