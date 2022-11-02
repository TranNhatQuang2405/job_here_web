import React from "react";
import "./JobAppliedPage.css";
import _ from "underscore";
import { JobItem } from "Components/Job";
import { useTranslation } from "react-i18next";

const JobAppliedPage = () => {
  const { t } = useTranslation();

  return (
    <div className="jh-container jh-box-item p-3 pb-0 mt-3 mb-3">
      <h4 className="mb-2">{t("Jobs you have applied")}</h4>
      {_.map([1, 2, 3, 4, 5], (item, index) => (
        <JobItem key={index} />
      ))}
    </div>
  );
};

export default JobAppliedPage;
