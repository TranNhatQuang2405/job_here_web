import React, { useState, useEffect } from "react";
import "./JobSavedPage.css";
import _ from "underscore";
import { useTranslation } from "react-i18next";
import { dropdownBusiness, jobBusiness } from "Business";
import Pagination from "react-bootstrap/Pagination";
import { JobList } from "Components/Job";
import { LoadingSpinner } from "Components/Loading";
import { PathTree } from "Components/Path";
import { useSelector } from "react-redux";

const JobSavedPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { t } = useTranslation();
  const size = 8;
  let savedJobList = useSelector((state) => state.SavedJob.listSavedJob) || [];

  useEffect(() => {
    getData();
  }, [currentPage, savedJobList]);

  const getData = async () => {
    setLoading(true);
    let result = await jobBusiness.GetSavedJob(currentPage, size);
    if (result.data.httpCode === 200) {
      if (totalPage !== result.data.objectData.totalPage) {
        let newTotalPage = result.data.objectData.totalPage;
        setTotalPage(newTotalPage);
      }
      let listJob = result?.data?.objectData?.pageData ?? [];
      let _unitname = await dropdownBusiness.UnitDropdown();
      if (_unitname.data.httpCode === 200) {
        for (let i = 0; i < listJob.length; i++) {
          listJob[i].unitName = _unitname.data.objectData.find(
            (x) => x.unit === listJob[i].unit
          ).unitName;
        }
      }
      setData(listJob);
    }
    setLoading(false);
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <PathTree />
      <div>
        <h4>{t("SavedJob")}</h4>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {data.length === 0 ? (
              <p>{t("jh-saved-job-page-no-job")}</p>
            ) : (
              <div>
                <JobList data={data} />
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSavedPage;
