import React, { useState } from "react";
import "./JobHeader.css";
import { ButtonPrimary } from "Components/Button";
import company_default_img from "Assets/Images/company_default_img.webp";
import { useTranslation } from "react-i18next";
import Moment from "moment";

const JobHeader = ({ jobData = {} }) => {
  const [isApply, setIsApply] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const { t } = useTranslation();

  const onApply = () => {
    setIsApply(!isApply);
  };

  const onSave = () => {
    setIsSave(!isSave);
  };

  return (
    <div className="JobHeader__container jh-box-item">
      <div className="JobHeader_job-box-header d-flex align-items-center">
        <a
          href="#"
          title={jobData?.companyName ?? ""}
          className="JobHeader_job-company-logo"
        >
          <div className="JobHeader_box-company-logo d-flex align-items-center justify-content-center">
            <img
              src={company_default_img}
              alt={jobData?.companyName ?? ""}
            />
          </div>
        </a>
        <div className="JobHeader_box-info-job flex-grow-1">
          <h1 className="JobHeader_job-title JobPage__text-highlight">
            {jobData?.jobName ?? "Job Name"}
          </h1>
          <div className="JobHeader_company-title">
            <a href="#">{jobData?.companyName ?? "Company Name"}</a>
          </div>

          <div className="JobHeader_job-deadline">
            <i className="bi bi-clock" /> {t("Deadline")}
            {": "}
            {Moment(jobData.endDate).format("DD/MM/yyyy")}
          </div>
        </div>
        <div className="JobHeader_box-apply">
          <div className="text-center">
            {!isApply ? (
              <>
                <p>
                  <ButtonPrimary onClick={onApply}>
                    <i className="bi bi-send" /> {t("APPLY NOW")}
                  </ButtonPrimary>
                </p>
                <div>
                  {!isSave ? (
                    <ButtonPrimary secondary onClick={onSave} style={{ width: "100%" }}>
                      <i className="bi bi-heart" /> {t("SAVE JOB")}
                    </ButtonPrimary>
                  ) : (
                    <ButtonPrimary onClick={onSave} style={{ width: "100%" }}>
                      <i className="bi bi-heart-fill" /> {t("SAVED")}
                    </ButtonPrimary>
                  )}
                </div>
              </>
            ) : (
              <>
                <p>
                  <ButtonPrimary onClick={onApply} style={{ width: "100%" }}>
                    <i className="bi bi-arrow-counterclockwise" /> {t("RE-APPLY")}
                  </ButtonPrimary>
                </p>
                <div>
                  <ButtonPrimary secondary style={{ width: "100%" }}>
                    <i className="bi bi-chat-left-dots" /> {t("MESSAGE")}
                  </ButtonPrimary>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
