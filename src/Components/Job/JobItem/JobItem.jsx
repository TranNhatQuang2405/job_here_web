import React, { useState, useEffect } from "react";
import "./JobItem.css";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { ButtonPrimary } from "Components/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { dropdownBusiness } from "Business";

const JobItem = ({ jobData = {}, applied = false }) => {
  const { t } = useTranslation();
  const [localData, setLocalData] = useState({});
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let result = await dropdownBusiness.UnitDropdown();
      if (result.data.httpCode === 200) {
        let u = result.data.objectData.find((x) => x.unit === jobData.unit);
        if (u) localData.unitName = u.unitName;
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
    {
      label: `${t("Update")} ${parseInt(
        (new Date() - new Date(jobData?.createDate ?? null)) / 86400000
      )} ${t("days ago")}`,
    },
  ];

  const onSaveJob = () => {
    // setIsSave(!isSave);
  };

  return (
    <div className="JobItem__container d-flex">
      <div className="JobItem__company-logo-wrapper">
        <Link
          target="_blank"
          rel="noreferrer"
          to={`/Job/${jobData?.jobId ?? 0}`}
          className="JobItem__company-logo d-block overflow-hidden"
        >
          <CompanyLogo src={jobData?.avatarUrl ?? null} size={80} />
        </Link>
      </div>
      <div className="JobItem__body d-flex flex-column w-100">
        <div className="JobItem__content d-flex w-100">
          <div className="me-auto">
            <h3 className="JobItem__title mt-0 mb-0">
              <Link target="_blank" rel="noreferrer" to={`/Job/${jobData?.jobId ?? 0}`}>
                {jobData?.jobName ?? ""}
              </Link>
            </h3>
            <p className="JobItem__company">
              <Link
                to={`/Company/${jobData?.companyId ?? 0}`}
                target="_blank"
                className="text-uppercase text-decoration-none"
                rel="nooppener noreferrer"
              >
                {jobData?.companyName ?? ""}
              </Link>
            </p>
          </div>
          <div className="ms-auto text-right">
            {applied ? (
              jobData.viewed && (
                <div>
                  <i className="bi bi-check-circle-fill primary-color" />
                </div>
              )
            ) : (
              <p className="JobItem__deadline">
                {t("jh-job-item-date-left-1")}
                <strong>
                  {parseInt((new Date(jobData?.endDate ?? null) - new Date()) / 86400000)}
                </strong>
                {t("jh-job-item-date-left-2")}
              </p>
            )}
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
