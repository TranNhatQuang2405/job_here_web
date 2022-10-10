import React, { useState } from "react";
import "./JobItem.css";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { ButtonPrimary } from "Components/Button";

const JobItem = ({ id }) => {
  const [isSave, setIsSave] = useState(false);
  let tagData = [
    {
      label: "Trên 5 triệu",
    },
    {
      label: "Hồ Chí Minh",
    },
    {
      label: "Cập nhật 3 ngày trước",
    },
  ];

  const onSaveJob = () => {
    setIsSave(!isSave);
  };

  return (
    <div className="JobItem__container d-flex">
      <div className="JobItem__company-logo-wrapper">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.topcv.vn/viec-lam/production-internship/805020.html?ta_source=JobSearchList"
          className="JobItem__company-logo d-block overflow-hidden"
        >
          <img
            src="https://cdn.topcv.vn/80/company_logos/Y8fRFkG1cjdKCPOO5TdGUvseZfpNoESp_1662608920____1060a368c105a808be891a52e8aaf521.png"
            className="w-100"
            alt="company"
          />
        </a>
      </div>
      <div className="JobItem__body d-flex flex-column w-100">
        <div className="JobItem__content d-flex w-100">
          <div className="me-auto">
            <h3 className="JobItem__title mt-0 mb-0">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.topcv.vn/viec-lam/production-internship/805020.html?ta_source=JobSearchList"
              >
                Production Internship
              </a>
            </h3>
            <p className="JobItem__company">
              <a
                href="https://www.topcv.vn/cong-ty/general-electric-viet-nam/118203.html"
                target="_blank"
                className="text-uppercase text-decoration-none"
                rel="nooppener noreferrer"
              >
                General Electric Viet Nam
              </a>
            </p>
          </div>
          <div className="ms-auto text-right">
            <p className="JobItem__deadline">
              Còn <strong>50</strong> ngày để ứng tuyển
            </p>
          </div>
        </div>
        <div className="d-flex">
          <div className="JobItem__label-content me-auto">
            <TagList tagData={tagData} />
          </div>
          <div className="JobItem__save-job ms-auto mt-0 text-center">
            <ButtonPrimary
              onClick={onSaveJob}
              secondary
              style={{ padding: "4px", height: "26px", overflow: "hidden" }}
            >
              <i className={isSave ? "bi bi-heart-fill" : "bi bi-heart"} />
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
