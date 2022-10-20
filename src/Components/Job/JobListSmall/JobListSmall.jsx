import React from "react";
import "./JobListSmall.css";
import _ from "underscore";
import { JobItemSmall } from "Components/Job";
import { Container, Row } from "react-bootstrap";

const JobListSmall = ({ data = [] }) => {
  return (
    <Container>
      <Row>
        {_.map(data, (item, index) => {
          return <JobItemSmall key={index} />;
        })}
      </Row>
    </Container>
  );
};

export default JobListSmall;
