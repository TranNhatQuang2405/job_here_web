import React, { useState } from "react";
import "./JobHeader.css";
import { ButtonPrimary } from "Components/Button";

const JobHeader = () => {
  const [isApply, setIsApply] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const onApply = () => {
    setIsApply(!isApply);
  };

  const onSave = () => {
    setIsSave(!isSave);
  };

  return (
    <div className="JobHeader__container">
      <div className="JobHeader_job-box-header d-flex align-items-center">
        <a href="#" title="Company Name" className="JobHeader_job-company-logo">
          <div className="JobHeader_box-company-logo d-flex align-items-center justify-content-center">
            <img
              src="https://cdn.topcv.vn/80/company_logos/cong-ty-tnhh-giao-duc-quoc-te-masterkid-625675732dc19.jpg"
              alt="Công Ty TNHH Giáo Dục Quốc Tế MasterKid"
              className="img-responsive"
            />
          </div>
        </a>
        <div className="JobHeader_box-info-job flex-grow-1">
          <h1 className="JobHeader_job-title JobPage__text-highlight">
            Nhân Viên Marketing Tại Q7-HCM
          </h1>
          <div className="JobHeader_company-title">
            <a href="#">
              Công Ty TNHH Giáo Dục Quốc Tế MasterKid
            </a>
          </div>

          <div className="JobHeader_job-deadline">
            <i className="bi bi-clock" /> Hạn nộp hồ sơ: 30/10/2022
          </div>
        </div>
        <div className="JobHeader_box-apply">
          <div className="text-center">
            {!isApply ? (
              <>
                <p>
                  <ButtonPrimary onClick={onApply}>
                    <i className="bi bi-send" /> ỨNG TUYỂN NGAY
                  </ButtonPrimary>
                </p>
                <div>
                  {!isSave ? (
                    <ButtonPrimary secondary onClick={onSave} style={{ width: "100%" }}>
                      <i className="bi bi-heart" /> LƯU TIN
                    </ButtonPrimary>
                  ) : (
                    <ButtonPrimary onClick={onSave} style={{ width: "100%" }}>
                      <i className="bi bi-heart-fill" /> ĐÃ LƯU
                    </ButtonPrimary>
                  )}
                </div>
              </>
            ) : (
              <>
                <p>
                  <ButtonPrimary onClick={onApply} style={{ width: "100%" }}>
                    <i className="bi bi-arrow-counterclockwise" /> ỨNG TUYỂN LẠI
                  </ButtonPrimary>
                </p>
                <div>
                  <ButtonPrimary secondary style={{ width: "100%" }}>
                    <i className="bi bi-chat-left-dots" /> NHẮN TIN
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
