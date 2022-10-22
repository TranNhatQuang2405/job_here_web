import React from "react";
import "./JobListSmall.css";
import _ from "underscore";
import { JobItemSmall } from "Components/Job";
import { Row } from "react-bootstrap";

const JobListSmall = ({ data = [] }) => {
  return (
    <div className="jh-container">
      <Row>
        {_.map(data, (item, index) => {
          return <JobItemSmall key={index} />;
        })}
      </Row>
    </div>
  );
};

export default JobListSmall;
