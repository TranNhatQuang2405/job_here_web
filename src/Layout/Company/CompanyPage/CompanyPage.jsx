import React, { useState, useEffect } from "react";
import "./CompanyPage.css";
import _ from "underscore";
import { Row, Col } from "react-bootstrap";
import { CompanyLogo } from "Components/Company";
import { JobItem, JobShare } from "Components/Job";
import { PathTree } from "Components/Path";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { companyBusiness } from "Business";
import company_default_background from "Assets/Images/company_default_background.jpg";

const CompanyPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(true);

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
        _companyData.valid_urlCompany = getValidUrl(_companyData.urlCompany);
        setCompanyData(_companyData);
      }
      setLoading(false);
    };
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
  }, [location.pathname]);

  const getValidUrl = (url = "") => {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if (/^(:\/\/)/.test(newUrl)) {
      return `https${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `https://${newUrl}`;
    }

    return newUrl;
  };

  return (
    <div className="CompanyPage__container">
      <div className="jh-container">
        <PathTree lastPath={companyData.companyName || t("Company introduction")} />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
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
                  {!!companyData.urlCompany && (
                    <p className="CompanyPage__website">
                      <i className="bi bi-house-door-fill" />{" "}
                      <a
                        href={companyData.valid_urlCompany}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {companyData.urlCompany}
                      </a>
                    </p>
                  )}
                  {!!companyData.email && (
                    <p className="CompanyPage__company-size">
                      <i className="bi bi-envelope-fill" /> {companyData.email}
                    </p>
                  )}
                  {!!companyData.size && (
                    <p className="CompanyPage__company-size">
                      <i className="bi bi-people-fill" /> {companyData.size} {t("People")}
                    </p>
                  )}
                </div>
              </div>
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
                      className="CompanyPage__description"
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
      )}
    </div>
  );
};

export default CompanyPage;
