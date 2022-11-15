import React from "react";
import "./CVItem.css";
import { useTranslation } from "react-i18next";
import Moment from "moment";

const CVItem = ({ cvData = {} }) => {
  const { t } = useTranslation();

  return (
    <div className="CVItem__container jh-box-item p-2">
      <div>
        <object data={cvData.cvUrl} type="application/pdf" className="w-100">
          <p>
            Alternative text - include a link{" "}
            <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a>
          </p>
        </object>
      </div>
      <a className="CVItem__cv-name" href={cvData.cvUrl} target="_blank" rel="noreferrer">
        {cvData.cvName}
      </a>
      <p className="CVItem__cv-create-date">
        {t("Create Date")}: {Moment(cvData.createDate).format("DD/MM/YYYY")}
      </p>
      <p className="CVItem__cv-type">{cvData.cvType}</p>
    </div>
  );
};

export default CVItem;
