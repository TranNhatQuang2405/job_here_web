import React, { useRef, useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import "./CVItem.css";
import { useTranslation } from "react-i18next";
import { TrashFill } from "react-bootstrap-icons";
import Moment from "moment";
import { CVBody } from "..";
import { useNavigate } from "react-router-dom";
const CVItem = ({ cvData = {}, handleDeleteCV }) => {

    const { t } = useTranslation();
    const cvTemplate = cvData?.cvTemplate
    const navigate = useNavigate()
    const [currentWidth, setCurrentWidth] = useState(0)
    const cvRef = useRef()
    const getCvDataForBody = () => {
        try {
            const cvDataForBody = JSON.parse(cvData.cvContent)
            return cvDataForBody
        } catch (e) {
            return null
        }
    }
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;



    const viewCV = () => {
        navigate(`/ViewCV/${cvData.cvId}`)
    }


    useEffect(() => {
        if (cvRef.current) {
            setCurrentWidth(cvRef?.current?.offsetWidth - 20)
        }
    }, [cvRef])


    if (cvData.cvType === "CREATED") {
        return (
            <div className="CVItem__container mb-2 px-3 pt-3" id={`cvId-${cvData.cvId}`} ref={cvRef}>
                <div onClick={() => handleDeleteCV(cvData.cvId)} className="CVItem__remove">
                    <TrashFill />
                </div>
                <div className="mt-3">
                    <div className="CVItem__cvCreated">
                        <CVBody cvData={getCvDataForBody()} templateData={cvTemplate} parentWidth={currentWidth} />
                    </div>
                </div>
                <div className="CVItem__cv-content" onClick={viewCV}>
                    <div className="CVItem__cv-name">
                        <a className="CVItem__cv-name-href"
                            href={cvData.cvUrl}
                            onClick={viewCV}
                        >
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
