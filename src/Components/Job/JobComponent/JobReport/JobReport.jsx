import React from "react";
import "./JobReport.css";
import { ButtonPrimary } from "Components/Button";

const JobReport = () => {
  return (
    <div className="JobReport__container mt-3">
      <h3>Báo cáo tin tuyển dụng</h3>
      <p>
        Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có một trong các dấu hiệu
        sau, hãy phản ánh với chúng tôi.
      </p>
      <div id="carouselReportCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item">
            <div className="slider__item">
              <img
                className="slider__image"
                src="https://www.topcv.vn/v4/image/report/1.png"
                alt="Item 1"
              />
              <p className="slider__caption">Thông tin thiếu minh bạch</p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="slider__item">
              <img
                className="slider__image"
                src="https://www.topcv.vn/v4/image/report/2.png"
                alt="Item 2"
              />
              <p className="slider__caption">Hứa hẹn lương cao bất thường</p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="slider__item">
              <img
                className="slider__image"
                src="https://www.topcv.vn/v4/image/report/3.png"
                alt="Item 3"
              />
              <p className="slider__caption">
                Yêu cầu nộp phí phỏng vấn, phí giữ chỗ, phí đồng phục,...{" "}
              </p>
            </div>
          </div>
          <div className="carousel-item active">
            <div className="slider__item">
              <img
                className="slider__image"
                src="https://www.topcv.vn/v4/image/report/4.png"
                alt="Item 4"
              />
              <p className="slider__caption">
                Yêu cầu nạp tiền điện thoại hoặc đặt lệnh mua hàng trên app/website
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselReportCaptions"
          data-bs-slide="prev"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselReportCaptions"
          data-bs-slide="next"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselReportCaptions"
            data-bs-slide-to="0"
            className=""
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselReportCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className=""
          ></button>
          <button
            type="button"
            data-bs-target="#carouselReportCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className=""
          ></button>
          <button
            type="button"
            data-bs-target="#carouselReportCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
            className="active"
            aria-current="true"
          ></button>
        </div>
      </div>
      <ButtonPrimary secondary>Báo cáo tin tuyển dụng</ButtonPrimary>
    </div>
  );
};

export default JobReport;
