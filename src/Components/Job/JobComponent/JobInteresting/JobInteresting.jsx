import React, { useState, useEffect } from "react";
import "./JobInteresting.css";
import _ from "underscore";
import { JobListSmall } from "Components/Job";
import { jobBusiness } from "Business";
import { useTranslation } from "react-i18next";
import Pagination from "react-bootstrap/Pagination";

const JobInteresting = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { t } = useTranslation();
  const size = 3;

  useEffect(() => {
    getData();
  }, [currentPage]);

  const getData = async () => {
    let result = await jobBusiness.GetListJobInteresting(currentPage, size);
    if (result.data.httpCode === 200) {
      if (totalPage !== result.data.objectData.totalPage) {
        let newTotalPage = result.data.objectData.totalPage;
        setTotalPage(newTotalPage);
      }
      setData(result?.data?.objectData?.pageData ?? []);
    }
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setCurrentPage(page);
    }
  };

  if (!data) return null;

  return (
    <div className="JobInteresting__container jh-container jh-box-item mt-3 mb-3 p-3">
      <div className="JobInteresting__box-smart-box">
        <div className="JobInteresting__box-label">
          <div>
            <div className="JobInteresting__dot" />
            {t("Recommended by JobHere AI")}
          </div>
        </div>
      </div>
      <div className="JobInteresting__box-header d-flex">
        <h2>{t("Interesting Job")}</h2>
      </div>
      <div>
        <JobListSmall data={data} />
        <div className="d-flex justify-content-center align-items-center">
          {totalPage > 0 && (
            <Pagination>
              <Pagination.First onClick={onChangePage(0)} />
              <Pagination.Prev onClick={onChangePage(currentPage - 1)} />
              {_.map([...Array(totalPage)], (item, index) => (
                <Pagination.Item
                  key={index}
                  active={index === currentPage}
                  onClick={onChangePage(index)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={onChangePage(currentPage + 1)} />
              <Pagination.Last onClick={onChangePage(totalPage - 1)} />
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobInteresting;
