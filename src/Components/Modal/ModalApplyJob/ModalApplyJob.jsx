import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useEffect,
} from "react";
import { Spinner } from "react-bootstrap";
import "./ModalApplyJob.css";
import _ from "underscore";
import Modal from "react-bootstrap/Modal";
import { WarningModal } from "Components/Modal";
import { ButtonPrimary } from "Components/Button";
import { cvBusiness, userBusiness } from "Business";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { error, success } from "Config/Redux/Slice/AlertSlice";
import { useDispatch } from "react-redux";
import { IconSpinner } from "Components/Icon";

const ModalApplyJob = forwardRef(({ jobData }, ref) => {
    const [show, setShow] = useState(false);
    const [pending, setPending] = useState(false)
    const [pendingApply, setPendingApply] = useState(false)
    const dispatch = useDispatch()
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
        if (show)
            getCVData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const getCVData = async () => {
        setPending(true)
        let result = await cvBusiness.GetListCV();
        setPending(false)
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

    const changeNote = (e) => {
        setInfo((prev) => ({ ...prev, note: e.target.value }));
    }

    const onHide = () => {
        setShow(false);
    };

    const onApply = async () => {
        if (info.cv) {
            setPendingApply(true)
            let result = await userBusiness.ApplyJob(info.cv, jobData.jobId, info.note);
            setPendingApply(false)
            let title = t("apply.result.title")
            if (result.data.httpCode === 200) {
                dispatch(success({ message: result.data.message, title: title, onHide: onHide }))
            } else {
                dispatch(error({ message: result.data.message, title: title, onHide: onHide }))
            }
        }
    };

    return (
        <Modal centered show={show} onHide={onHide} dialogClassName="modal-90w">
            <WarningModal ref={messRef} title={t("Apply Job")} />
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
                        {pending ?
                            <div align="center">
                                <Spinner animation="border" />
                            </div>
                            :
                            <select
                                className="form-control jh-box-input"
                                value={info.cv}
                                onChange={onChangeCV}
                            >
                                {_.map(info.listCV, (item) => (
                                    <option key={item.cvId} value={item.cvId}>
                                        {item.cvName}
                                    </option>
                                ))}
                            </select>
                        }
                    </div>
                    <div className="mt-2">
                        <p>{t("jh-apply-note")}</p>
                        <textarea
                            name="letter"
                            className="form-control jh-box-input"
                            rows="6"
                            placeholder={t("apply.placeholder")}
                            value={info.note}
                            onChange={changeNote}
                        ></textarea>
                    </div>
                    <div className="JobApply__footer d-flex justify-content-end pt-4">
                        <ButtonPrimary secondary onClick={onHide} style={{ marginRight: "10px" }}>
                            {t("apply.btn.back")}
                        </ButtonPrimary>
                        <ButtonPrimary onClick={onApply}>
                            {pendingApply ? <IconSpinner variant="dark" /> : t("apply.btn.apply")}
                        </ButtonPrimary>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
});

export default ModalApplyJob;
