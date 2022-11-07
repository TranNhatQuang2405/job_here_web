import React, { useState, useEffect } from "react";
import "./CompanyPage.css";
import _ from "underscore";
import { Row, Col } from "react-bootstrap";
import { ButtonPrimary } from "Components/Button";
import { CompanyLogo } from "Components/Company";
import { JobItem, JobShare } from "Components/Job";
import { PathTree } from "Components/Path";
import { LoadingPage } from "Layout/Common";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { companyBusiness } from "Business";
import company_default_background from "Assets/Images/company_default_background.jpg";

const CompanyPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const first = async () => {
      let stringPath = location.pathname;
      let tmpPath = stringPath.split("/");
      let companyId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
      let prepare = [];
      prepare.push(companyBusiness.GetCompanyInfo(companyId));
      prepare.push(companyBusiness.GetJobOfCompany(companyId));
      let results = await Promise.all(prepare);
      if (!results.find((x) => x.data.httpCode !== 200)) {
        let _companyData = results[0].data.objectData;
        _companyData.companyJobs = results[1].data.objectData;
        setCompanyData(_companyData);
      }
      setLoading(false);
    };
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
  }, [location.pathname]);

  const onFollowCompany = () => {
    setFollow(!follow);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="CompanyPage__container">
      <div className="jh-container">
        <PathTree lastPath={companyData.companyName} />
      </div>
      <div className="CompanyPage__header jh-container jh-box-item mb-3">
        <div className="CompanyPage__cover-wrapper">
          <img
            src={companyData.backgroundUrl || company_default_background}
            alt=""
            width="100%"
            height="236px"
          />
        </div>
        <div className="CompanyPage__company-detail-overview">
          <div className="CompanyPage__company-logo">
            <CompanyLogo
              src={companyData.avatarUrl}
              alt={companyData?.companyName || ""}
              size={130}
            />
          </div>
          <div className="CompanyPage__company-header-info flex-grow-1">
            <h1 className="CompanyPage__company-detail-name text-highlight">
              {companyData?.companyName || ""}
            </h1>
            <div className="d-flex">
              <p className="CompanyPage__website">
                <i className="bi bi-house-door-fill" />{" "}
                <a href={companyData.urlCompany} target="_blank" rel="noreferrer">
                  {companyData.urlCompany}
                </a>
              </p>
              <p className="CompanyPage__company-size">
                <i className="bi bi-envelope-fill" /> {companyData.email}
              </p>
              <p className="CompanyPage__company-size">
                <i className="bi bi-people-fill" /> {companyData.size} {t("People")}
              </p>
            </div>
          </div>
          {/* <ButtonPrimary onClick={onFollowCompany}>
            {follow ? "Đang theo dõi" : "Theo dõi công ty"}
          </ButtonPrimary> */}
        </div>
      </div>
      <div className="CompanyPage__detail jh-container mb-3">
        <Row>
          <Col md={8}>
            <div className="CompanyPage__company-info jh-box-item">
              <h4>{t("Company introduction")}</h4>
              <div className="CompanyPage__company-body pt-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: companyData.description || t("No Desription"),
                  }}
                />
              </div>
            </div>
            <div className="CompanyPage__company-job pt-3 jh-box-item">
              <h4>{t("Recruit")}</h4>
              <div className="pt-3">
                {_.map(companyData.companyJobs, (item) => {
                  return <JobItem key={item.jobId} jobData={item} />;
                })}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="CompanyPage__box-address jh-box-item mb-3">
              <h4>{t("Company address")}</h4>
              <p className="pt-3">
                <i className="bi bi-geo-alt-fill"></i> {companyData.address}
              </p>
            </div>
            <JobShare path={location.pathname} company />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CompanyPage;
