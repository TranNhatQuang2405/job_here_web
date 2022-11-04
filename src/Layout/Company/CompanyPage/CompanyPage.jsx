import React, { useState } from "react";
import "./CompanyPage.css";
import _ from "underscore";
import { Row, Col } from "react-bootstrap";
import { ButtonPrimary } from "Components/Button";
import { CompanyLogo } from "Components/Company";
import { JobItem, JobShare } from "Components/Job";

const CompanyPage = () => {
  const [follow, setFollow] = useState(false);

  const onFollowCompany = () => {
    setFollow(!follow);
  };

  return (
    <div className="CompanyPage__container">
      <div className="CompanyPage__breadcrumb jh-container">
        <ul className="nav d-flex">
          <li className="nav-item">
            <a className="text-highlight bold" href="https://www.topcv.vn/cong-ty">
              Danh sách Công ty
            </a>
          </li>
          <li className="nav-item">
            <i className="bi bi-chevron-right" />
          </li>
          <li className="nav-item">
            Thông tin công ty &amp; tin tuyển dụng từ Ngân Hàng TMCP Việt Nam Thịnh Vượng
            (VPBank)
          </li>
        </ul>
      </div>
      <div className="CompanyPage__header jh-container jh-box-item mb-3">
        <div className="CompanyPage__cover-wrapper">
          <img
            src="https://static.topcv.vn/company_covers/Nb4sWTWAzahLcXAuffCb.jpg"
            alt=""
            width="100%"
            height="236px"
          />
        </div>
        <div className="CompanyPage__company-detail-overview">
          <div className="CompanyPage__company-logo">
            <CompanyLogo
              src="https://cdn.topcv.vn/140/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-610d052a2213d.jpg"
              alt="Ngân Hàng TMCP Việt Nam Thịnh Vượng (VPBank)"
              size={130}
            />
          </div>
          <div className="CompanyPage__company-header-info flex-grow-1">
            <h1 className="CompanyPage__company-detail-name text-highlight">
              Ngân Hàng TMCP Việt Nam Thịnh Vượng (VPBank)
            </h1>
            <div className="d-flex">
              <p className="CompanyPage__website">
                <i className="bi bi-house-door-fill" />{" "}
                <a
                  href="https://www.vpbank.com.vn/ca-nhan"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.vpbank.com.vn/ca-nhan
                </a>
              </p>
              <p className="CompanyPage__company-size">
                <i className="bi bi-people-fill" /> 10000+ nhân viên
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={onFollowCompany}>
            {follow ? "Đang theo dõi" : "Theo dõi công ty"}
          </ButtonPrimary>
        </div>
      </div>
      <div className="CompanyPage__detail jh-container mb-3">
        <Row>
          <Col md={8}>
            <div className="CompanyPage__company-info jh-box-item">
              <h4>Giới thiệu công ty</h4>
              <div class="CompanyPage__company-body pt-3">
                <p>
                  VPBank tiếp tục theo đuổi mục tiêu khẳng định vị thế của ngân hàng trên
                  thị trường, đó là nằm trong nhóm 5 Ngân hàng TMCP tư nhân và nhóm 3 Ngân
                  hàng TMCP tư nhân bán lẻ hàng đầu về quy mô cho vay khách hàng, huy động
                  khách hàng và lợi nhuận và chú trọng tăng trưởng chất lượng hoạt động.
                </p>
                <p>
                  Những thành quả đạt được trong giai đoạn chuyển đổi vừa qua đã khẳng
                  định chiến lược đúng đắn của VPBank, với những thay đổi tích cực về hình
                  ảnh, chất lượng dịch vụ, tính chuyên nghiệp, v.v. Sự tin cậy của khách
                  hàng đối với VPBank cũng ngày càng củng cố với việc gia tăng liên tục số
                  lượng khách hàng mới và nguồn vốn huy động. Đặc biệt hơn cả là VPBank
                  đang trở thành một địa chỉ thu hút nhân tài trong ngành tài chính ngân
                  hàng. Những yếu tố then chốt này đã, đang, và sẽ trở thành vũ khí chiến
                  lược của VPBank trong hành trình hướng tới mục tiêu trở thành Ngân hàng
                  thân thiện nhất với người tiêu dùng nhờ ứng dụng công nghệ và lọt vào
                  nhóm 3 Ngân hàng giá trị nhất Việt Nam.
                </p>
                <p>
                  Theo bảng xếp hạng được Brand Finance - công ty tư vấn định giá thương
                  hiệu hàng đầu thế giới - công bố đầu tháng 2 vừa qua, thứ hạng thương
                  hiệu của VPBank đã tăng thêm 37 bậc - lên vị trí thứ 243, là ngân hàng
                  TMCP Việt Nam duy nhất lọt vào Top 250 ngân hàng có giá trị nhất toàn
                  cầu, VPBank vào top 5 ngân hàng thương mại uy tín nhất Việt Nam 2020
                  (Theo Vietnam Report), nhận giải thưởng “Nơi làm việc tốt nhất châu Á”
                  (theo HR Asia)
                </p>
              </div>
            </div>
            <div className="CompanyPage__company-job pt-3 jh-box-item">
              <h4>Tuyển dụng</h4>
              <div className="pt-3">
                {_.map([0, 1, 2, 3, 4], (item, index) => {
                  return <JobItem key={index} />;
                })}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="CompanyPage__box-address jh-box-item mb-3">
              <h4>Địa chỉ công ty</h4>
              <p className="pt-3">
                <i class="bi bi-geo-alt-fill"></i> 89 Láng Hạ, Đống Đa, Hà Nội
              </p>
            </div>
            <JobShare
              url="https://www.topcv.vn/cong-ty/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank/493.html"
              company
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CompanyPage;
