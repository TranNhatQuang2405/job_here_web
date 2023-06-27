import React, { useRef } from "react";
import "./JobHeader.css";
import { ButtonPrimary } from "Components/Button";
import { ModalApplyJob } from "Components/Modal";
import company_default_img from "Assets/Images/company_default_img.jpg";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Moment from "moment";
import { jobBusiness } from "Business";
import { useSelector, useDispatch } from "react-redux";
import { GetAllSavedJob, SaveTemporary, UnSaveTemporary } from "Config/Redux/Slice/SavedJobSlice";
import { changeCurrentPath } from "Config/Redux/Slice/CurrentPathSlice";
import moment from "moment"

const JobHeader = ({ jobData = {}, className }) => {
    const { t } = useTranslation();
    const applyJobRef = useRef();
    const dispatch = useDispatch();
    const savedJobList = useSelector((state) => state.SavedJob.listSavedJob) || [];
    const sessionInfo = useSelector((state) => state.User.sessionInfo);
    const location = useLocation();
    const onApply = () => {
        applyJobRef?.current?.onToggleModal?.();
    };

    const goToSignIn = () => {
        let path = location.pathname
        dispatch(changeCurrentPath(path))
    }

    const checkValid = () => {
        let timeReceived = moment(jobData.endDate)
        let currentTime = moment()
        return currentTime.isSameOrBefore(timeReceived)
    }

    const onSave = async () => {
        let result = null;
        if (savedJobList.includes(jobData.jobId)) {
            dispatch(UnSaveTemporary(jobData.jobId))
            result = await jobBusiness.UnsaveJob(jobData.jobId);
        } else {
            dispatch(SaveTemporary(jobData.jobId))
            result = await jobBusiness.SaveJob(jobData.jobId);
        }
        if (result.data.httpCode === 200) {
            dispatch(GetAllSavedJob());
        }
    };

    return (
        <div className={"JobHeader__container jh-box-item" + (className ? " " + className : "")}>
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
                    {checkValid() === true ?
                        <div className="text-center">
                            <div className="mb-3">
                                {!sessionInfo ? (
                                    <ButtonPrimary onClick={goToSignIn}>
                                        <i className="bi bi-send" /> {t("aplly.nologin")}
                                    </ButtonPrimary>
                                ) : (
                                    <ButtonPrimary onClick={onApply}>
                                        <i className="bi bi-send" /> {t("APPLY NOW")}
                                    </ButtonPrimary>
                                )}
                            </div>
                            <div>
                                {!sessionInfo ? (
                                    <ButtonPrimary secondary onClick={goToSignIn} style={{ width: "100%" }}>
                                        {t("saveJob.nologin")}
                                    </ButtonPrimary>
                                ) : (
                                    !savedJobList.includes(jobData.jobId) ? (
                                        <ButtonPrimary secondary onClick={onSave} style={{ width: "100%" }}>
                                            <i className="bi bi-heart" /> {t("SAVE JOB")}
                                        </ButtonPrimary>
                                    ) : (
                                        <ButtonPrimary onClick={onSave} style={{ width: "100%" }}>
                                            <i className="bi bi-heart-fill" /> {t("SAVED")}
                                        </ButtonPrimary>
                                    )
                                )}
                            </div>
                        </div> : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default JobHeader;
