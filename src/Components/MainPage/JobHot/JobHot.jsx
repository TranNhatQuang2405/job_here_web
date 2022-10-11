import React from "react";
import _ from "underscore";
import $ from "jquery";
import "./JobHot.css";
import { JobListSmall } from "Components/Job";

const JobHot = () => {
  const locationData = [
    {
      city: "Thành phố Hồ Chí Minh",
      isActive: true,
    },
    {
      city: "Quận 1",
      isActive: false,
    },
    {
      city: "Quận 2",
      isActive: false,
    },
    {
      city: "Quận 3",
      isActive: false,
    },
    {
      city: "Quận 4",
      isActive: false,
    },
    {
      city: "Quận 5",
      isActive: false,
    },
    {
      city: "Quận 6",
      isActive: false,
    },
    {
      city: "Quận 7",
      isActive: false,
    },
    {
      city: "Quận 8",
      isActive: false,
    },
    {
      city: "Quận 9",
      isActive: false,
    },
    {
      city: "Quận 10",
      isActive: false,
    },
    {
      city: "Quận 11",
      isActive: false,
    },
    {
      city: "Quận 12",
      isActive: false,
    },
    {
      city: "Thủ Đức",
      isActive: false,
    },
    {
      city: "Gò Vấp",
      isActive: false,
    },
    {
      city: "Bình Thạnh",
      isActive: false,
    },
    {
      city: "Tân Bình",
      isActive: false,
    },
    {
      city: "Tân Phú",
      isActive: false,
    },
    {
      city: "Phú Nhuận",
      isActive: false,
    },
    {
      city: "Bình Tân",
      isActive: false,
    },
    {
      city: "Củ Chi",
      isActive: false,
    },
    {
      city: "Hóc Môn",
      isActive: false,
    },
    {
      city: "Bình Chánh",
      isActive: false,
    },
    {
      city: "Nhà Bè",
      isActive: false,
    },
    {
      city: "Cần Giờ",
      isActive: false,
    },
  ];

  const scrollLocation = (direction) => () => {
    let far = ($(".JobHot__list-location").width() / 6) * direction;
    let pos = $(".JobHot__list-location").scrollLeft() + far;
    $(".JobHot__list-location").animate({ scrollLeft: pos }, 500);
  };

  return (
    <div className="JobHot__container jh-container mt-3">
      <div className="JobHot__box-smart-box">
        <div className="JobHot__box-label">
          <p>
            <div className="JobHot__dot" />
            Đề xuất bởi JobHere AI
          </p>
        </div>
      </div>
      <div className="JobHot__box-header d-flex">
        <h2>Tin tuyển dụng, việc làm tốt nhất</h2>
        <span class="pull-right feature-job-link">
          <a
            href="https://www.topcv.vn/viec-lam-tot-nhat"
            target="_blank"
            rel="noreferrer"
          >
            Xem tất cả <i className="bi bi-arrow-right" />
          </a>
        </span>
      </div>
      <div className="JobHot__box-smart-filter">
        <div className="JobHot__box-smart-location d-flex align-items-center">
          <div className="JobHot__prev-location me-2">
            <a onClick={scrollLocation(-1)}>
              <i className="bi bi-chevron-left" />
            </a>
          </div>
          <div className="JobHot__list-location">
            {_.map(locationData, (item, index) => {
              return (
                <div
                  key={index}
                  className={
                    item.isActive
                      ? "JobHot__item-location-active"
                      : "JobHot__item-location"
                  }
                >
                  {item.city}
                </div>
              );
            })}
          </div>
          <div className="JobHot__next-location ms-2">
            <a onClick={scrollLocation(1)}>
              <i className="bi bi-chevron-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="JobHot__list-job">
        <JobListSmall />
      </div>
    </div>
  );
};

export default JobHot;
