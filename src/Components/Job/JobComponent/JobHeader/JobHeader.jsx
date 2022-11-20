import React, { useRef } from "react";
import "./JobHeader.css";
import { ButtonPrimary } from "Components/Button";
import { ModalApplyJob } from "Components/Modal";
import company_default_img from "Assets/Images/company_default_img.jpg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Moment from "moment";
import { jobBusiness } from "Business";
import { useSelector, useDispatch } from "react-redux";
import { GetAllSavedJob } from "Config/Redux/Slice/SavedJobSlice";

const JobHeader = ({ jobData = {} }) => {
  const { t } = useTranslation();
  const applyJobRef = useRef();
  const dispatch = useDispatch();
  let savedJobList = useSelector((state) => state.SavedJob.listSavedJob) || [];

  const onApply = () => {
    applyJobRef?.current?.onToggleModal?.();
  };

  const onSave = async () => {
    let result = null;
    if (savedJobList.includes(jobData.jobId)) {
      result = await jobBusiness.UnsaveJob(jobData.jobId);
    } else {
      result = await jobBusiness.SaveJob(jobData.jobId);
    }
    if (result.data.httpCode === 200) {
      dispatch(GetAllSavedJob());
    }
  };

  return (
    <div className="JobHeader__container jh-box-item">
      <ModalApplyJob ref={applyJobRef} jobData={jobData} />
      <div className="JobHeader_job-box-header d-flex align-items-center">
        <Link
          to={`/Company/${jobData?.companyId ?? ""}`}
          title={jobData?.companyName ?? ""}
          className="JobHeader_job-company-logo"
        >
          <div className="JobHeader_box-company-logo d-flex align-items-center justify-content-center">
            <img
              src={jobData.avatar || company_default_img}
              alt={jobData?.companyName ?? ""}
              className="w-100"
            />
          </div>
        </Link>
        <div className="JobHeader_box-info-job flex-grow-1">
          <Link to={`/Job/${jobData?.jobId ?? ""}`}>
            <h1 className="JobHeader_job-title JobPage__text-highlight">
              {jobData?.jobName ?? "Job Name"}
            </h1>
          </Link>
          <div className="JobHeader_company-title">
            <Link to={`/Company/${jobData?.companyId ?? ""}`}>
              {jobData?.companyName ?? "Company Name"}
            </Link>
          </div>

          <div className="JobHeader_job-deadline">
            <i className="bi bi-clock" /> {t("Deadline")}
            {": "}
            {Moment(jobData.endDate).format("DD/MM/yyyy")}
          </div>
        </div>
        <div className="JobHeader_box-apply">
          <div className="text-center">
            <p>
              <ButtonPrimary onClick={onApply}>
                <i className="bi bi-send" /> {t("APPLY NOW")}
              </ButtonPrimary>
            </p>
            <div>
              {!savedJobList.includes(jobData.jobId) ? (
                <ButtonPrimary secondary onClick={onSave} style={{ width: "100%" }}>
                  <i className="bi bi-heart" /> {t("SAVE JOB")}
                </ButtonPrimary>
              ) : (
                <ButtonPrimary onClick={onSave} style={{ width: "100%" }}>
                  <i className="bi bi-heart-fill" /> {t("SAVED")}
                </ButtonPrimary>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
