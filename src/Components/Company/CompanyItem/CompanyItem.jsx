import React from "react";
import "./CompanyItem.css";
import { CompanyLogo } from "Components/Company";
import { Link } from "react-router-dom";
import company_default_background from "Assets/Images/company_default_background.jpg";

const CompanyItem = ({ companyData = {} }) => {
  let companyURL = `/Company/${companyData.companyId || ""}`;
  let companyNameUpper = companyData?.companyName?.toUpperCase() || ""
  return (
    <div className="CompanyItem__container jh-box-item">
      <div className="CompanyItem__banner">
        <Link to={companyURL}>
          <div className="CompanyItem__banner-wrapper">
            <img
              src={companyData.backgroundUrl || company_default_background}
              alt={companyNameUpper}
              className=""
            />
          </div>
        </Link>
        <div className="CompanyItem__logo">
          <Link to={companyURL}>
            <CompanyLogo src={companyData.avatarUrl} size={72} />
          </Link>
        </div>
      </div>
      <div className="CompanyItem__info">
        <h3>
          <Link to={companyURL} className="company-name">
            {companyNameUpper}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default CompanyItem;
