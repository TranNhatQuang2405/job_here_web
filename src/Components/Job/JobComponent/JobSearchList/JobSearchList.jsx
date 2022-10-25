import React, { useState } from "react";
import "./JobSearchList.css";
import _ from "underscore";
import { JobList } from "Components/Job";
import Slider from "react-slick";

const JobSearchList = () => {
  const [sort, setSort] = useState("top_related");

  const onChangeSort = (e) => {
    setSort(e.target.value);
  };

  const sortList = [
    {
      label: "Phù hợp nhất",
      value: "top_related",
    },
    {
      label: "Cập nhật gần nhất",
      value: "up_top",
    },
    {
      label: "Cần tuyển gấp",
      value: "urgent",
    },
    {
      label: "Lương cao nhất",
      value: "high_salary",
    },
    {
      label: "Việc mới đăng",
      value: "new",
    },
  ];

  let testData = [];
  for (let i = 0; i < 40; i++) {
    testData.push(i);
  }

  let chunkSize = 18;
  let jobData = [];
  for (let i = 0; i < testData.length; i += chunkSize) {
    const chunk = testData.slice(i, i + chunkSize);
    jobData.push(chunk);
  }

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="JobSearchList__container mt-3 jh-container">
      <div className="JobSearchList__header">
        <span>
          Tìm thấy <b className="JobSearchList__text-highlight">136</b> việc làm phù hợp
          với yêu cầu của bạn.
        </span>
      </div>
      <div className="JobSearchList__show-important">
        <span>Ưu tiên hiển thị:</span>
        {_.map(sortList, (item) => {
          return (
            <div key={item.value} className="JobSearchList__option-item-sort">
              <input
                type="radio"
                value={item.value}
                onChange={onChangeSort}
                name="sort"
                checked={sort === item.value}
              />
              <span> {item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="JobSearchList__result">
        <JobList />
        <Slider {...settings}>
          {_.map(jobData, (item, index) => {
            return <JobList key={index} data={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default JobSearchList;
