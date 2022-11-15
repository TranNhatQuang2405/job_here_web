import React, { useState, useEffect } from "react";
import "./JobItemSmall.css";
import { Col } from "react-bootstrap";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { ButtonPrimary } from "Components/Button";
import { Link } from "react-router-dom";
import { dropdownBusiness } from "Business";

const JobItemSmall = ({ jobData = {} }) => {
  const [isSave, setIsSave] = useState(false);
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let result = await dropdownBusiness.UnitDropdown();
      if (result.data.httpCode === 200) {
        let u = result.data.objectData.find((x) => x.unit === jobData.unit);
        if (u) setLocalData({ unitName: u.unitName });
      }
    };
    getData();
  }, []);

  let tagData = [
    {
      label: `${
        jobData.salaryMin === jobData.salaryMax
          ? jobData.salaryMin
          : `${jobData.salaryMin} - ${jobData.salaryMax}`
      } ${localData?.unitName ?? ""}`,
    },
    {
      label: jobData?.city?.cityName ?? "",
    },
  ];

  const onSaveJob = () => {
    // setIsSave(!isSave);
  };

  return (
    <Col md={4} sm={6} className="JobItemSmall__container">
      <div className="JobItemSmall__feature-job-item">
        <div className="d-flex">
          <Link to={`/Job/${jobData?.jobId ?? 0}`} target="_blank" rel="noreferrer">
            <CompanyLogo src={jobData?.avatarUrl ?? null} />
          </Link>
          <div className="JobItemSmall__col-title flex-grow-1">
            <Link
              to={`/Job/${jobData?.jobId ?? 0}`}
              target="_blank"
              rel="noreferrer"
              className="JobItemSmall__title d-block w-100"
            >
              <strong className="transform-job-title underline-box-job highlight">
                {jobData?.jobName ?? ""}
              </strong>
            </Link>
            <Link
              to={`/Company/${jobData?.companyId ?? 0}`}
              target="_blank"
              rel="noreferrer"
              className="JobItemSmall__company d-block w-100"
            >
              {jobData?.companyName ?? ""}
            </Link>
          </div>
          <div className="JobItemSmall__col-like">
            <ButtonPrimary
              onClick={onSaveJob}
              secondary
              style={{ padding: "4px", height: "25px", overflow: "hidden" }}
            >
              <i className={isSave ? "bi bi-heart-fill" : "bi bi-heart"} />
            </ButtonPrimary>
          </div>
        </div>
        <div className="col-job-info">
          <TagList tagData={tagData} />
        </div>
      </div>
    </Col>
  );
};

export default JobItemSmall;
