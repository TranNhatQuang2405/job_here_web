import React from "react";
import "./JobNew.css";
import _ from "underscore";
import { JobHeader } from "Components/Job/JobComponent";
import Slider from "react-slick";

const JobNew = () => {
  let data = [1, 2, 3, 4, 5, 6];

  const settings = {
    dots: true,
    lazyLoad: true,
    speed: 500,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="JobNew__container jh-container mt-3 pt-2 pb-4">
      <Slider {...settings}>
        {_.map(data, (item, index) => {
          return <JobHeader key={index} />;
        })}
      </Slider>
    </div>
  );
};

export default JobNew;
