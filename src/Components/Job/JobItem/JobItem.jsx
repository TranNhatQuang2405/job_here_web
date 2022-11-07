import React, { useState } from "react";
import "./JobItem.css";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { ButtonPrimary } from "Components/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const JobItem = ({ jobData }) => {
  const { t } = useTranslation();
  const [isSave, setIsSave] = useState(false);
  let tagData = [
    {
      label: `${
        jobData.salaryMin === jobData.salaryMax
          ? jobData.salaryMin
          : `${jobData.salaryMin} - ${jobData.salaryMax}`
      }`,
    },
    {
      label: jobData.city.cityName,
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
        <Link
          target="_blank"
          rel="noreferrer"
          to={`/Job/${jobData.jobId}`}
          className="JobItem__company-logo d-block overflow-hidden"
        >
          <img src={jobData.avatarUrl} className="w-100" alt="company" />
        </Link>
      </div>
      <div className="JobItem__body d-flex flex-column w-100">
        <div className="JobItem__content d-flex w-100">
          <div className="me-auto">
            <h3 className="JobItem__title mt-0 mb-0">
              <Link target="_blank" rel="noreferrer" to={`/Job/${jobData.jobId}`}>
                {jobData?.jobName ?? ""}
              </Link>
            </h3>
            <p className="JobItem__company">
              <Link
                to="https://www.topcv.vn/cong-ty/general-electric-viet-nam/118203.html"
                target="_blank"
                className="text-uppercase text-decoration-none"
                rel="nooppener noreferrer"
              >
                General Electric Viet Nam
              </Link>
            </p>
          </div>
          <div className="ms-auto text-right">
            <p className="JobItem__deadline">
              {t("jh-job-item-date-left-1")}
              <strong>
                {parseInt((new Date(jobData?.endDate ?? null) - new Date()) / 86400000)}
              </strong>
              {t("jh-job-item-date-left-2")}
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
