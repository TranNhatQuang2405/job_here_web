import React, { useRef } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import "./CVItem.css";
import { useTranslation } from "react-i18next";
import { TrashFill } from "react-bootstrap-icons";
import Moment from "moment";
import { CVBody } from "..";
const CVItem = ({ cvData = {}, handleDeleteCV }) => {
    const { t } = useTranslation();

    const cvRef = useRef()

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

    const getCvDataForBody = () => {
        try {
            const cvDataForBody = JSON.parse(cvData.cvContent)
            return cvDataForBody
        } catch (e) {
            return null
        }
    }

    const cvTemplate = cvData?.cvTemplate

    if (cvData.cvType === "CREATED") {
        return (
            <div className="CVItem__container mb-2 px-3 pt-3" id={`cvId-${cvData.cvId}`} ref={cvRef}>
                <div onClick={() => handleDeleteCV(cvData.cvId)} className="CVItem__remove">
                    <TrashFill />
                </div>
                <div className="mt-3">
                    <CVBody cvData={getCvDataForBody()} templateData={cvTemplate} parentWidth={cvRef?.current?.offsetWidth} />
                </div>
                <div className="CVItem__cv-content">
                    <div className="CVItem__cv-name">
                        <a className="CVItem__cv-name-href" href={cvData.cvUrl} target="_blank" rel="noreferrer">
                            {cvData.cvName}
                        </a>
                    </div>
                    <p className="CVItem__cv-create-date">
                        {t("Create Date")}: {Moment(cvData.createDate).format("DD/MM/YYYY")}
                    </p>
                    <p className="CVItem__cv-type">{cvData.cvType}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="CVItem__container mb-2 px-3 pt-3">
                <div onClick={() => handleDeleteCV(cvData.cvId)} className="CVItem__remove">
                    <TrashFill />
                </div>
                <div className="mt-3">
                    <Document
                        error={<div className="CVItem__error"></div>}
                        file={cvData.cvUrl}
                    >
                        <Page className="CVItem__iframe" pageNumber={1} />
                    </Document>
                    {/* <embed title={cvData.cvName} src={cvData.cvUrl} type="application/pdf" className="CVItem__iframe">
                </embed> */}
                </div>
                <div className="CVItem__cv-content">
                    <div className="CVItem__cv-name">
                        <a className="CVItem__cv-name-href" href={cvData.cvUrl} target="_blank" rel="noreferrer">
                            {cvData.cvName}
                        </a>
                    </div>
                    <p className="CVItem__cv-create-date">
                        {t("Create Date")}: {Moment(cvData.createDate).format("DD/MM/YYYY")}
                    </p>
                    <p className="CVItem__cv-type">{cvData.cvType}</p>
                </div>
            </div>
        );
    }
};

export default CVItem;
