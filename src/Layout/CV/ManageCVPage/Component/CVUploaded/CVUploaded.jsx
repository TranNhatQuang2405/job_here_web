import React, { useState, useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { LoadingSpinner } from 'Components/Loading'
import { useTranslation } from "react-i18next";
import { cvBusiness, uploadBusiness, userBusiness } from "Business";
import { useDispatch } from "react-redux";
import { error, confirm, success } from "Config/Redux/Slice/AlertSlice";
import { ButtonPrimary } from "Components/Button";
import { CVItem } from "Components/CV";
import _ from "underscore";


function CVUploaded() {
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

    const onChangeCVName = (e) => {
        setCVName(e.target.value);
    };

    const getCVData = async () => {
        let result = await cvBusiness.GetListCV();
        if (result.data.httpCode === 200) {
            let listCV = result.data?.objectData || []
            setListCV(listCV.filter(x => x.cvType === "UPLOADED"));
        }
        setLoading(false);
    };

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

    const handleConfirmBeforeDelete = async (cvId) => {
        dispatch(confirm({
            message: t("cv.delete.confirm"),
            title: t("cv.delete"),
            onConfirm: (() => handleDeleteCV(cvId))
        }))
    }

    const onChangeCurrentCV = async (e) => {
        if (e.target.files.length > 0) {
            setUploadPending({ cv: true });
            let result = await uploadBusiness.UploadCV(e.target.files[0]);
            if (result && result.data.httpCode === 200) {
                if (!cvName) {
                    setCVName(result.data?.objectData?.fileName ?? "");
                }
                setCurrentCV(result.data.objectData);
            }
            setUploadPending({ cv: false });
        }
    };

    const onUploadCV = async () => {
        if (!cvName) {
            dispatch(error({
                message: t("Please enter CV name!"),
                title: t("CV Manage")
            }))
        } else if (!!currentCV.url && !!cvName) {
            setPending(true)
            let result = await userBusiness.SaveCV(currentCV.url, cvName);
            setPending(false)
            if (result.data.httpCode === 200) {
                dispatch(success({
                    message: t(result.data?.message ?? ""),
                    title: t("CV Manage")
                }))
                setCVName("");
                setCurrentCV({});
                await getCVData();
            }
        }
    };
    return (
        <div className="jh-box-item p-3">
            <h4>{t("CV Manage")}</h4>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <div className="mt-3 ManageCVPage_form">
                        <Row>
                            <Col>
                                <p className="mb-1">{t("CV Name")}</p>
                                <input
                                    type="text"
                                    value={cvName}
                                    onChange={onChangeCVName}
                                    placeholder={t("Enter CV Name")}
                                    className="ManageCVPage__form-data jh-box-input mb-2"
                                />
                            </Col>
                            <Col>
                                <p className="mb-1">{t("Choose CV File (Pdf)")}</p>
                                <input
                                    type="file"
                                    name="cv_file"
                                    className="mb-2 w-100"
                                    accept="pdf"
                                    onChange={onChangeCurrentCV}
                                />
                                {uploadPending.cv ? (
                                    <div className="">
                                        <Spinner animation="border" variant="light" className="" />
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </Col>
                        </Row>
                        <div className="ManageCVPage_form-btn">
                            <ButtonPrimary onClick={onUploadCV}>
                                {pending ? <Spinner animation="border"></Spinner> : t("Upload CV")}
                            </ButtonPrimary>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6>{t("All your CV")}</h6>
                        {listCV.length === 0 ? (
                            <p>{t("You have no CV")}</p>
                        ) : (
                            <div>
                                <Row>
                                    {_.map(listCV, (item) => (
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
        </div>)
}

export default CVUploaded