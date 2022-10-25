import React, { useState } from "react";
import "./JobPage.css";
import { Row, Col } from "react-bootstrap";
import { JobItem } from "Components/Job";
import {
  JobCompanyInfo,
  JobHeader,
  JobInfo,
  JobKeywork,
  JobReport,
  JobShare,
} from "Components/Job";

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
      <div className="JobPage__header jh-container">
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
        <JobHeader />
      </div>
      <div className="JobPage__tab-company jh-container mt-2 mb-2">
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
      <div className="JobPage__job-info jh-container">
        <div className="JobPage__box-job-info">
          <h2 className="JobPage__job-info-title">Chi tiết tin tuyển dụng</h2>
          <Row>
            <Col md={8}>
              <JobInfo isSave={isSave} onApply={onApply} onSave={onSave} />
            </Col>
            <Col md={4}>
              <JobShare />
              <JobReport />
              <JobKeywork />
            </Col>
          </Row>
        </div>
      </div>
      <div className="JobPage__company-info jh-container mt-4">
        <JobCompanyInfo />
      </div>
      <div className="JobPage__job-tab jh-container mt-4">
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
