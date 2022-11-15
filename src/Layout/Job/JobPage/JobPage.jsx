import React, { useState, useEffect } from "react";
import "./JobPage.css";
import { Row, Col } from "react-bootstrap";
import { JobHeader, JobInfo, JobKeywork, JobReport, JobShare } from "Components/Job";
import { PathTree } from "Components/Path";
import { LoadingPage } from "Layout/Common";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { dropdownBusiness, jobBusiness } from "Business";

const JobPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isApply, setIsApply] = useState(false);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const first = async () => {
      let stringPath = location.pathname;
      let tmpPath = stringPath.split("/");
      let jobId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
      let prepare = [];
      prepare.push(dropdownBusiness.UnitDropdown());
      prepare.push(dropdownBusiness.ExperienceDropdown());
      prepare.push(dropdownBusiness.JobtypeDropdown());
      prepare.push(dropdownBusiness.TitleDropdown());
      prepare.push(jobBusiness.GetJobInfo(jobId));
      prepare.push(dropdownBusiness.CityDropdown());
      prepare.push(dropdownBusiness.GenderDropdown());
      let results = await Promise.all(prepare);
      if (!results.find((x) => x.data.httpCode !== 200)) {
        let unit = results[0].data.objectData;
        let experience = results[1].data.objectData;
        let jobType = results[2].data.objectData;
        let title = results[3].data.objectData;
        let city = results[5].data.objectData;
        let data = results[4].data.objectData;
        let gender = results[6].data.objectData;

        let u = unit.find((x) => x.unit === data.unit);
        if (u) data.unitName = u.unitName;

        let g = gender.find((x) => x.gender === data.gender);
        if (g) data.genderName = g.genderName;

        data.experienceNames = [];
        data.experiences.forEach((element) => {
          let ex = experience.find((e) => e.experience === element);
          if (ex) data.experienceNames.push(ex);
        });

        data.jobTypeNames = [];
        data.jobTypes.forEach((element) => {
          let ex = jobType.find((e) => e.jobType === element);
          if (ex) data.jobTypeNames.push(ex);
        });

        let t = title.find((x) => x.title === data.title);
        if (t) data.titleName = t.titleName;

        let c = city.find((x) => x.cityId === data.cityId);
        if (c) data.cityName = c.cityName;
        setJobData(data);
      }
      setLoading(false);
    };
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
  }, [location.pathname]);

  const onApply = () => {
    // setIsApply(!isApply);
  };

  const onSave = () => {
    setIsSave(!isSave);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="JobPage__container">
      <div className="JobPage__header jh-container">
        <PathTree lastPath={jobData.jobName} />
        <JobHeader jobData={jobData} />
      </div>
      <div className="JobPage__job-info jh-container mt-3 mb-3">
        <div className="JobPage__box-job-info jh-box-item">
          <h2 className="JobPage__job-info-title">{t("Job detail")}</h2>
          <Row>
            <Col md={8}>
              <JobInfo jobData={jobData} />
            </Col>
            <Col md={4}>
              <JobShare path={location.pathname} />
              <JobReport />
              {/* <JobKeywork /> */}
            </Col>
          </Row>
        </div>
      </div>
      {/* <div className="JobPage__job-tab jh-container mt-4">
        <div className="JobPage__box-job-similar jh-box-item">
          <h2 className="box-title mb-3">Việc làm liên quan</h2>
          <JobItem />
          <JobItem />
          <JobItem />
        </div>
      </div> */}
    </div>
  );
};

export default JobPage;
