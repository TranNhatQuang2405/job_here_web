import React, { useState, useEffect } from "react";
import "./JobSearchBar.css";
import _ from "underscore";
import { ButtonPrimary } from "Components/Button";
import { dropdownBusiness } from "Business";
import { useTranslation } from "react-i18next";

const JobSearchBar = () => {
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
  const { t } = useTranslation();

  useEffect(() => {
    let isSubscribed = true;
    const first = async () => {
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
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
  }, []);

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
    console.log("-----searchData", searchData);
  };

  return (
    <div className="JobSearchBar__container">
      <div className="jh-container">
        <div className="p-0 m-0">
          <form method="get" onSubmit={onSearch}>
            <div className="d-flex justify-content-between">
              <div className="JobSearchBar__input-data JobSearchBar__search-input">
                <input
                  className="form-control JobSearchBar__input jh-box-input"
                  value={searchData.text}
                  onChange={onChangeTextSearch}
                  placeholder={t("Job, Position Name ...")}
                  autoComplete="off"
                />
              </div>
              <div className="JobSearchBar__input-data JobSearchBar__search-select">
                <span className="JobSearchBar__input-icon">
                  <i className="bi bi-briefcase-fill" />
                </span>
                <select
                  id="category"
                  className="form-control JobSearchBar__input jh-box-input"
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
              <div className="JobSearchBar__input-data JobSearchBar__search-select-company">
                <span className="JobSearchBar__input-icon">
                  <i className="bi bi-building" />
                </span>
                <select
                  id="company-field-advanced"
                  className="form-control JobSearchBar__input jh-box-input"
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
              <div className="JobSearchBar__input-data JobSearchBar__search-select">
                <span className="JobSearchBar__input-icon">
                  <i className="bi bi-geo-alt-fill" />
                </span>
                <select
                  className="form-control JobSearchBar__input jh-box-input"
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
              <div className="JobSearchBar__input-data search-submit">
                <ButtonPrimary style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <i className="bi bi-search" /> Tìm kiếm
                </ButtonPrimary>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSearchBar;
