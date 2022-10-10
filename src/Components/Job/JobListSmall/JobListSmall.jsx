import React from "react";
import "./JobListSmall.css";
import _ from "underscore";
import { JobItemSmall } from "Components/Job";
import { Row } from "react-bootstrap";

const JobListSmall = () => {
  return (
    <div className="JobListSmall__container">
      <Row className="JobListSmall__grid">
        {_.map([1, 2, 3, 4, 5, 6], (item, index) => {
          return <JobItemSmall key={index} />;
        })}
      </Row>
    </div>
  );
};

export default JobListSmall;
