import React, { useState } from "react";
import "./JobPage.css";
import { JobItem } from "Components/Job";
import {
  JobCompanyInfo,
  JobInfo,
  JobKeywork,
  JobReport,
  JobShare,
} from "Components/Job/JobComponent";
import { ButtonPrimary } from "Components/Button";

const JobPage = () => {
  const [isApply, setIsApply] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const onApply = () => {
    setIsApply(!isApply);
  };

  const onSave = () => {
    setIsSave(!isSave);
  };

  return (
    <div className="JobPage__container">
      <div className="JobPage__header container">
        <div className="JobPage__header-detail">
          <a
            href="https://www.topcv.vn/viec-lam"
            className="JobPage__text-highlight JobPage__bold"
          >
            Trang chủ
          </a>
          <i className="bi bi-chevron-right" />
          <a
            href="https://www.topcv.vn/tim-viec-lam-nhan-vien-marketing"
            className="JobPage__text-highlight JobPage__bold"
          >
            Tìm việc làm nhân viên marketing
          </a>
          <i className="bi bi-chevron-right" />
          <span className="text-dark-blue">Tuyển Nhân Viên Marketing Tại Q7-HCM</span>
        </div>
        <div className="JobPage__header-job">
          <div className="JobPage__header-job-box-header d-flex align-items-center">
            <a
              href="https://www.topcv.vn/cong-ty/cong-ty-tnhh-giao-duc-quoc-te-masterkid/39472.html"
              title="Công Ty TNHH Giáo Dục Quốc Tế MasterKid"
              className="JobPage__header-job-company-logo"
            >
              <div className="JobPage__header-box-company-logo d-flex align-items-center justify-content-center">
                <img
                  src="https://cdn.topcv.vn/80/company_logos/cong-ty-tnhh-giao-duc-quoc-te-masterkid-625675732dc19.jpg"
                  alt="Công Ty TNHH Giáo Dục Quốc Tế MasterKid"
                  className="img-responsive"
                />
              </div>
            </a>
            <div className="JobPage__header-box-info-job flex-grow-1">
              <h1 className="JobPage__header-job-title JobPage__text-highlight">
                Nhân Viên Marketing Tại Q7-HCM
              </h1>
              <div className="JobPage__header-company-title">
                <a
                  href="https://www.topcv.vn/cong-ty/cong-ty-tnhh-giao-duc-quoc-te-masterkid/39472.html"
                  className="text-dark-blue"
                >
                  Công Ty TNHH Giáo Dục Quốc Tế MasterKid
                </a>
              </div>

              <div className="JobPage__header-job-deadline">
                <i className="bi bi-clock" /> Hạn nộp hồ sơ: 30/10/2022
              </div>
            </div>
            <div className="JobPage__header-box-apply">
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
                        <ButtonPrimary
                          secondary
                          onClick={onSave}
                          style={{ width: "100%" }}
                        >
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
      </div>
      <div className="JobPage__tab-company container mt-2 mb-2">
        <ul className="JobPage__tab-company-nav">
          <li className="JobPage__tab-company-nav-active">
            <a href="#tab-info" data-toggle="tab">
              Tin tuyển dụng
            </a>
          </li>
          <li className="">
            <a href="#tab-info-company">Thông tin công ty</a>
          </li>
          <li className="">
            <a href="#tab-job">Việc làm liên quan</a>
          </li>
        </ul>
      </div>
      <div className="JobPage__job-info container ms-auto me-auto">
        <div className="JobPage__box-job-info">
          <h2 className="JobPage__job-info-title">Chi tiết tin tuyển dụng</h2>
          <div className="row">
            <div className="col-md-8 ms-0">
              <JobInfo isSave={isSave} onApply={onApply} onSave={onSave} />
            </div>
            <div className="col-md-4 col-box-right">
              <JobShare />
              <JobReport />
              <JobKeywork />
            </div>
          </div>
        </div>
      </div>
      <div className="JobPage__company-info container mt-4 ms-auto me-auto">
        <JobCompanyInfo />
      </div>
      <div className="JobPage__job-tab container mt-4 ms-auto me-auto">
        <div className="JobPage__box-job-similar box-white">
          <h2 className="box-title mb-3">Việc làm liên quan</h2>
          <JobItem />
          <JobItem />
          <JobItem />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
