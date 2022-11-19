import React, { useState, useEffect, useRef } from "react";
import "./ManageCVPage.css";
import _ from "underscore";
import { PathTree } from "Components/Path";
import { ButtonPrimary } from "Components/Button";
import { Row, Col, Spinner } from "react-bootstrap";
import { CVItem } from "Components/CV";
import { WarningModal } from "Components/Modal";
import { useTranslation } from "react-i18next";
import { cvBusiness, uploadBusiness, userBusiness } from "Business";
import { LoadingSpinner } from "Components/Loading";

const ManageCVPage = () => {
  const { t } = useTranslation();
  const [listCV, setListCV] = useState([]);
  const [cvName, setCVName] = useState("");
  const [currentCV, setCurrentCV] = useState({});
  const [uploadPending, setUploadPending] = useState({
    cv: false,
  });
  const [loading, setLoading] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    getCVData();
  }, []);

  const onChangeCVName = (e) => {
    setCVName(e.target.value);
  };

  const getCVData = async () => {
    let result = await cvBusiness.GetListCV();
    if (result.data.httpCode === 200) {
      setListCV(result.data.objectData);
    }
    setLoading(false);
  };

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
      modalRef.current.setMessage(t("Please enter CV name!"));
      modalRef.current.onToggleModal();
    } else if (!!currentCV.url && !!cvName) {
      let result = await userBusiness.SaveCV(currentCV.url, cvName);
      modalRef.current.setMessage(result.data?.message ?? "");
      modalRef.current.onToggleModal();
      if (result.data.httpCode === 200) {
        await getCVData();
        setCVName("");
        setCurrentCV({});
      }
    }
  };

  return (
    <div className="jh-container">
      <WarningModal ref={modalRef} title={t("CV Manage")} />
      <PathTree />
      <div className="jh-box-item p-3">
        <h4>{t("CV Manage")}</h4>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <div className="mt-3">
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
              <ButtonPrimary onClick={onUploadCV}>{t("Upload CV")}</ButtonPrimary>
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
                        <CVItem cvData={item} />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCVPage;
