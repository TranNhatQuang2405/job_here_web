import React, { useState, useEffect } from "react";
import "./JobAppliedPage.css";
import _ from "underscore";
import { JobItem } from "Components/Job";
import { useTranslation } from "react-i18next";
import { userBusiness } from "Business";
import { LoadingSpinner } from "Components/Loading";

const JobAppliedPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [timePicker, setTimePicker] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [timePicker]);

  const getData = async () => {
    setLoading(true);
    let result = await userBusiness.GetAppliedJob(timePicker.month, timePicker.year);
    if (result.data.httpCode === 200) {
      setData(result?.data?.objectData ?? []);
    }
    setLoading(false);
  };

  const onChangeMonth = async (e) => {
    setTimePicker({ ...timePicker, month: e.target.value });
  };

  const onChangeYear = async (e) => {
    setTimePicker({ ...timePicker, year: e.target.value });
  };
  return (
    <div className="jh-container jh-box-item p-3 pb-0 mt-3 mb-3">
      <h4 className="mb-2">{t("Jobs you have applied")}</h4>
      <div className="d-flex align-items-center mb-3">
        <p className="m-0 me-3">{t("Pick Time")} (MM-YYYY)</p>
        <select
          id="category"
          className="form-control JobAppliedPage__input jh-box-input me-2"
          tabIndex="-1"
          aria-hidden="true"
          aria-controls="joketypes"
          aria-expanded="false"
          value={timePicker.month}
          onChange={onChangeMonth}
        >
          {_.map([...Array(12)], (item, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <select
          id="category"
          className="form-control JobAppliedPage__input jh-box-input"
          tabIndex="-1"
          aria-hidden="true"
          aria-controls="joketypes"
          aria-expanded="false"
          value={timePicker.year}
          onChange={onChangeYear}
        >
          {_.map([...Array(5)], (item, index) => (
            <option key={index} value={index + 2022}>
              {index + 2022}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <p>{t("There is no applied job in this time!")}</p>
      ) : (
        _.map(data, (item) => <JobItem key={item.jobId} jobData={item} applied />)
      )}
    </div>
  );
};

export default JobAppliedPage;
