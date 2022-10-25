import React from "react";
import _ from "underscore";
import JobItem from "../JobItem/JobItem";
import "./JobList.css";

const JobList = ({ data = [] }) => {
  return (
    <div className="JobList__container">
      {_.map(data, (item, index) => {
        return <JobItem key={index} />;
      })}
    </div>
  );
};

export default JobList;
