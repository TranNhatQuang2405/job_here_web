import React, { useState, useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { LoadingSpinner } from 'Components/Loading'
import { useTranslation } from "react-i18next";
import { cvBusiness, uploadBusiness, userBusiness } from "Business";
import { useDispatch } from "react-redux";
import { error, confirm, success } from "Config/Redux/Slice/AlertSlice";
import { ButtonPrimary } from "Components/Button";
import { CVItem } from "Components/CV";

function CVCreated() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [listCV, setListCV] = useState([]);
    const [cvName, setCVName] = useState("");
    const [currentCV, setCurrentCV] = useState({});
    const [pending, setPending] = useState(false)
    const [uploadPending, setUploadPending] = useState({
        cv: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCVData();
    }, []);


    const handleConfirmBeforeDelete = async (cvId) => {
        dispatch(confirm({
            message: t("cv.delete.confirm"),
            title: t("cv.delete"),
            onConfirm: (() => handleDeleteCV(cvId))
        }))
    }

    const handleDeleteCV = async (cvId) => {
        let result = await userBusiness.DeleteCV(cvId)
        if (result.data.httpCode === 200) {
            setTimeout(() => {
                dispatch(success(
                    {
                        message: t(result.data.message),
                        title: t("cv.delete"),
                    }
                ))
            }, 1000);
            await getCVData();
        }
        else {
            dispatch(error({
                message: t(result.data.message),
                title: t("cv.delete"),
            }))
        }
    }

    const getCVData = async () => {
        let result = await cvBusiness.GetListCV();
        if (result.data.httpCode === 200) {
            let listCV = result.data?.objectData || []
            setListCV(listCV.filter(x => x.cvType === "CREATED"));
        }
        setLoading(false);
    };

    return (
        <div className="jh-box-item p-3">
            <h4>{t("CV Manage")}</h4>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <div className="mt-3">
                        <h6>{t("All your CV")}</h6>
                        {listCV.length === 0 ? (
                            <p>{t("You have no CV")}</p>
                        ) : (
                            <div>
                                <Row>
                                    {listCV.map((item) => (
                                        <Col md={4} sm={6} key={item.cvId} className="mb-3">
                                            <CVItem handleDeleteCV={handleConfirmBeforeDelete} cvData={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CVCreated