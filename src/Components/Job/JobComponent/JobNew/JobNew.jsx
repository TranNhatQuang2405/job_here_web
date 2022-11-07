import React, { useEffect, useState } from "react";
import "./JobNew.css";
import _ from "underscore";
import { JobHeader } from "Components/Job";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { jobBusiness } from "Business";

const JobNew = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let result = await jobBusiness.GetNewJob();
      if (result.data.httpCode === 200) {
        setData(result?.data?.objectData ?? []);
      }
    };
    getData();
  }, []);

  const settings = {
    dots: true,
    lazyLoad: true,
    speed: 500,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (data.length === 0) return null;

  return (
    <div className="JobNew__container jh-container mt-3 pt-2 pb-4">
      <h4 className="ps-3">{t("New Job")}</h4>
      <Slider {...settings}>
        {_.map(data, (item) => {
          return <JobHeader key={item.jobId} jobData={item} />;
        })}
      </Slider>
    </div>
  );
};

export default JobNew;
