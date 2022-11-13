import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import "./ModalApplyJob.css";
import _ from "underscore";
import Modal from "react-bootstrap/Modal";
import { WarningModal } from "Components/Modal";
import { ButtonPrimary } from "Components/Button";
import { cvBusiness, userBusiness } from "Business";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ModalApplyJob = forwardRef(({ jobData }, ref) => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({
    note: "",
    cv: "",
    listCV: [],
  });
  const messRef = useRef();
  const { t } = useTranslation();
  let sessionInfo = useSelector((state) => state.User.sessionInfo);

  useImperativeHandle(ref, () => ({
    onToggleModal: () => setShow(!show),
  }));

  useEffect(() => {
    getCVData();
  }, []);

  const getCVData = async () => {
    let result = await cvBusiness.GetListCV();
    if (result.data.httpCode === 200) {
      if (result.data.objectData.length === 0) {
        messRef?.current?.setMessage?.(t("jh-no-cv-warning") + t("CV Manage") + "!");
        messRef?.current?.onToggleModal?.();
      } else {
        setInfo((prev) => ({
          ...prev,
          cv: result.data.objectData[0].cvId,
          listCV: result.data.objectData,
        }));
      }
    }
  };

  const onChangeCV = (e) => {
    setInfo((prev) => ({ ...prev, cv: e.target.value }));
  };

  const onChangeNote = (e) => {
    setInfo((prev) => ({ ...prev, note: e.target.value }));
  };

  const onHide = () => {
    setShow(false);
  };

  const onApply = async () => {
    console.log(info.cv);
    if (info.cv) {
      let result = await userBusiness.ApplyJob(info.cv, jobData.jobId, info.note);
      messRef?.current?.setMessage?.(result?.data?.message ?? "");
      messRef?.current?.onToggleModal?.();
      if (result.data.httpCode === 200) {
        setTimeout(() => {
          onHide();
        }, 5000);
      }
    }
  };

  return (
    <Modal centered show={show} onHide={onHide} dialogClassName="modal-90w">
      <WarningModal ref={messRef} />
      <Modal.Header closeButton>
        <Modal.Title>{jobData.jobName || t("Apply Job")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="form-group">
            <p>
              {t("Display Name")}: <b>{sessionInfo?.fullname ?? ""}</b>
            </p>
          </div>
          <div className="form-group">
            <p>
              {t("Email")} : <b>{sessionInfo?.email ?? ""}</b>
            </p>
          </div>
          <div className="form-group">
            <p>
              {t("Phone Number")} : <b>{sessionInfo?.phone ?? ""}</b>
            </p>
          </div>
          <div className="form-group">
            <p>CV :</p>
            <select
              className="form-control jh-box-input"
              tabIndex="-1"
              aria-hidden="true"
              aria-controls="joketypes"
              aria-expanded="false"
              value={info.cv}
              onChange={onChangeCV}
            >
              {_.map(info.listCV, (item) => (
                <option key={item.cvId} value={item.cvId}>
                  {item.cvName}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <p>{t("jh-apply-note")}</p>
            <textarea
              name="letter"
              className="form-control jh-box-input"
              rows="6"
              placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do làm việc tại công ty này. Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn có chưa có kinh nghiệm làm việc (hoặc CV không tốt)."
            ></textarea>
          </div>
          <div className="JobApply__footer d-flex justify-content-end pt-4">
            <ButtonPrimary secondary onClick={onHide} style={{ marginRight: "10px" }}>
              {t("Back")}
            </ButtonPrimary>
            <ButtonPrimary onClick={onApply}>{t("Apply Job")}</ButtonPrimary>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ModalApplyJob;
