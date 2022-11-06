import React from "react";
import _ from "underscore";
import "./JobInfo.css";
import { IconCircle } from "Components/Icon";
import { ButtonPrimary } from "Components/Button";
import { Row, Col } from "react-bootstrap/";
import { useTranslation } from "react-i18next";

const JobInfo = ({ jobData = {} }) => {
  const { t } = useTranslation();

  return (
    <div className="JobInfo__container">
      <div className="JobInfo__box-info">
        <p>{t("Common infomation")}</p>
        <div className="JobInfo__box-main">
          {(!!jobData.salaryMin || !!jobData.salaryMax) && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"salary"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Salary")} </strong> <br />
                <span>
                  {jobData.salaryMin === jobData.salaryMax
                    ? jobData.salaryMin
                    : `${jobData.salaryMin} - ${jobData.salaryMax}`}{" "}
                  {jobData.unitName}
                </span>
              </div>
            </div>
          )}
          {!!jobData.amount && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"group"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Amount")} </strong> <br />
                <span>{jobData.amount}</span>
              </div>
            </div>
          )}
          {!!jobData.jobTypeNames && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"work"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Job Type")} </strong> <br />
                <span>
                  {_.map(jobData.jobTypeNames, (item) => item.jobTypeName).join(", ")}
                </span>
              </div>
            </div>
          )}
          {!!jobData.titleName && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"level"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Level")} </strong> <br />
                <span>{jobData.titleName}</span>
              </div>
            </div>
          )}
          {!!jobData.genderName && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"gender"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Gender")} </strong> <br />
                <span>{jobData.genderName}</span>
              </div>
            </div>
          )}
          {!!jobData.experienceNames && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"experience"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Experience")} </strong>
                <br />
                <span>
                  {_.map(jobData.experienceNames, (item) => item.experienceName).join(
                    ", "
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="JobInfo__box-address">
        <p>{t("Work address")}</p>
        <div>{jobData.address}</div>
      </div>
      <div className="JobInfo__job-data">
        <h3>{t("Job description")}</h3>
        <div className="JobInfo__content-tab">
          <p>{jobData.description}</p>
        </div>
        <h3>{t("Require")}</h3>
        <div className="JobInfo__content-tab">
          <p>{jobData.require}</p>
        </div>
        <h3>{t("Benefit")}</h3>
        <div className="JobInfo__content-tab">
          <p>{jobData.benefit}</p>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
