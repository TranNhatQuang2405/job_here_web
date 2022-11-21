import React, { useState, useEffect } from "react";
import "./JobSearch.css";
import _ from "underscore";
import { ButtonPrimary } from "Components/Button";
import { JobList } from "Components/Job";
import { dropdownBusiness, userBusiness } from "Business";
import { useTranslation } from "react-i18next";
import Pagination from "react-bootstrap/Pagination";
import { LoadingSpinner } from "Components/Loading";

const JobSearch = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [searchData, setSearchData] = useState({
    text: "",
    industryField: "",
    skillField: "",
    cityField: "",
  });
  const [dropdownData, setDropdownData] = useState({
    industry: [],
    skill: [],
    city: [],
  });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const size = 8;

  useEffect(() => {
    const getDropdownData = async () => {
      let prepare = [];
      prepare.push(dropdownBusiness.IndustryDropdown());
      prepare.push(dropdownBusiness.AllSkillDropdown());
      prepare.push(dropdownBusiness.CityDropdown());
      let results = await Promise.all(prepare);
      if (!results.find((x) => x.data.httpCode !== 200)) {
        let industry = results[0].data.objectData;
        let skill = results[1].data.objectData;
        let city = results[2].data.objectData;

        setDropdownData({ industry: industry, skill: skill, city: city });
      }
    };
    getDropdownData();
  }, []);

  useEffect(() => {
    getData();
  }, [currentPage]);

  const getData = async () => {
    setLoading(true);
    let { text, industryField, skillField, cityField } = searchData;
    let result = await userBusiness.FindJob(
      currentPage,
      size,
      text,
      skillField,
      cityField,
      industryField
    );
    if (result.data.httpCode === 200) {
      if (totalPage !== result.data.objectData.totalPage) {
        let newTotalPage = result.data.objectData.totalPage;
        setTotalPage(newTotalPage);
      }
      let listJob = result.data?.objectData?.pageData ?? [];
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

  const onChangeTextSearch = (e) => {
    setSearchData({
      ...searchData,
      text: e.target.value,
    });
  };

  const onChangeIndustryField = (e) => {
    setSearchData({
      ...searchData,
      industryField: e.target.value,
    });
  };

  const onChangeSkillField = (e) => {
    setSearchData({
      ...searchData,
      skillField: e.target.value,
    });
  };

  const onChangeCityField = (e) => {
    setSearchData({
      ...searchData,
      cityField: e.target.value,
    });
  };

  const onSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="JobSearch__container">
      <div className="jh-container">
        <div className="p-0 m-0">
          <form method="get" onSubmit={onSearch}>
            <div className="d-flex justify-content-between">
              <div className="JobSearch__input-data JobSearch__search-input">
                <input
                  className="form-control JobSearch__input jh-box-input"
                  value={searchData.text}
                  onChange={onChangeTextSearch}
                  placeholder={t("Job, Position Name ...")}
                  autoComplete="off"
                />
              </div>
              <div className="JobSearch__input-data JobSearch__search-select">
                <span className="JobSearch__input-icon">
                  <i className="bi bi-briefcase-fill" />
                </span>
                <select
                  id="category"
                  className="form-control JobSearch__input jh-box-input"
                  tabIndex="-1"
                  aria-hidden="true"
                  aria-controls="joketypes"
                  aria-expanded="false"
                  value={searchData.industryField}
                  onChange={onChangeIndustryField}
                >
                  <option value="">{t("All industry")}</option>
                  {_.map(dropdownData.industry, (item) => (
                    <option key={item.industryId} value={item.industryId}>
                      {item.industryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="JobSearch__input-data JobSearch__search-select-company">
                <span className="JobSearch__input-icon">
                  <i className="bi bi-building" />
                </span>
                <select
                  id="company-field-advanced"
                  className="form-control JobSearch__input jh-box-input"
                  value={searchData.skillField}
                  onChange={onChangeSkillField}
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <option value="">{t("All skill")}</option>
                  {_.map(dropdownData.skill, (item) => (
                    <option key={item.skillId} value={item.skillId}>
                      {item.skillName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="JobSearch__input-data JobSearch__search-select">
                <span className="JobSearch__input-icon">
                  <i className="bi bi-geo-alt-fill" />
                </span>
                <select
                  className="form-control JobSearch__input jh-box-input"
                  id="city"
                  value={searchData.cityField}
                  onChange={onChangeCityField}
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <option value="">{t("All location")}</option>
                  {_.map(dropdownData.city, (item) => (
                    <option key={item.cityId} value={item.cityId}>
                      {item.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="JobSearch__input-data search-submit">
                <ButtonPrimary style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <i className="bi bi-search" /> Tìm kiếm
                </ButtonPrimary>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="jh-container">
        {loading ? (
          <LoadingSpinner />
        ) : data.length === 0 ? (
          <div className="pt-3 d-flex justify-content-center">
            <p>{t("No result")}!</p>
          </div>
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
    </div>
  );
};

export default JobSearch;
