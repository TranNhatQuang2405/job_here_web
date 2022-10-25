import React, { useState } from "react";
import "./JobItemSmall.css";
import { Col } from "react-bootstrap";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { ButtonPrimary } from "Components/Button";

const JobItemSmall = () => {
  const [isSave, setIsSave] = useState(false);

  let tagData = [
    {
      label: "15-22 Triệu",
    },
    {
      label: "Hồ Chí Minh",
    },
  ];

  const onSaveJob = () => {
    setIsSave(!isSave);
  };

  return (
    <Col md={4} sm={6} className="JobItemSmall__container">
      <div className="JobItemSmall__feature-job-item">
        <div className="d-flex">
          <a
            href="https://www.topcv.vn/viec-lam/nhan-vien-hanh-chinh-van-phong/829306.html?ta_source=BoxFeatureJob"
            target="_blank"
            rel="noreferrer"
          >
            <CompanyLogo
              src="https://www.topcv.vn/v4/image/topcv-logo-company-default.png"
              alt="CÔNG TY TNHH KINH DOANH PHÁT TRIỂN THƯƠNG MẠI VÀ DỊCH VỤ LỘC PHÁT"
            />
          </a>
          <div className="JobItemSmall__col-title flex-grow-1">
            <a
              href="https://www.topcv.vn/viec-lam/nhan-vien-hanh-chinh-van-phong/829306.html?ta_source=BoxFeatureJob"
              target="_blank"
              rel="noreferrer"
              className="JobItemSmall__title d-block w-100"
            >
              <strong className="transform-job-title underline-box-job highlight">
                Nhân Viên Hành Chính Văn Phòng
              </strong>
            </a>
            <a
              href="https://www.topcv.vn/cong-ty/cong-ty-tnhh-kinh-doanh-phat-trien-thuong-mai-va-dich-vu-loc-phat/121342.html"
              target="_blank"
              rel="noreferrer"
              className="JobItemSmall__company d-block w-100"
            >
              CÔNG TY TNHH KINH DOANH PHÁT TRIỂN THƯƠNG MẠI VÀ DỊCH VỤ LỘC PHÁT
            </a>
          </div>
          <div className="JobItemSmall__col-like">
            <ButtonPrimary
              onClick={onSaveJob}
              secondary
              style={{ padding: "4px", height: "25px", overflow: "hidden" }}
            >
              <i className={isSave ? "bi bi-heart-fill" : "bi bi-heart"} />
            </ButtonPrimary>
          </div>
        </div>
        <div className="col-job-info">
          <TagList tagData={tagData} />
        </div>
      </div>
    </Col>
  );
};

export default JobItemSmall;
