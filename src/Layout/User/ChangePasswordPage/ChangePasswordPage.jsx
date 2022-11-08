import React, { useState, useRef } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import "./ChangePasswordPage.css";
import { WarningModal } from "Components/Modal";
import { useTranslation } from "react-i18next";
import { userBusiness } from "Business";
import { ValidatePassword } from "Config/Validate";

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const modalRef = useRef();
  const [data, setData] = useState({
    oldPass: "",
    newPass: "",
    newPass2: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeOldPass = (e) => {
    setData((prev) => ({ ...prev, oldPass: e.target.value }));
  };

  const onChangeNewPass = (e) => {
    setData((prev) => ({ ...prev, newPass: e.target.value }));
  };

  const onChangeNewPass2 = (e) => {
    setData((prev) => ({ ...prev, newPass2: e.target.value }));
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    let { oldPass, newPass, newPass2 } = data;

    if (!ValidatePassword(newPass)) {
      modalRef.current.setMessage(t("jh-invalid-password"));
      modalRef.current.onToggleModal();
    } else if (newPass !== newPass2) {
      modalRef.current.setMessage(t("Please re-enter correct password!"));
      modalRef.current.onToggleModal();
    } else {
      let changePassword = await userBusiness.ChangePassword(oldPass, newPass);
      modalRef.current.setMessage(changePassword.data?.message ?? "");
      modalRef.current.onToggleModal();
    }
  };

  return (
    <div className="jh-container mt-3 mb-3">
      <WarningModal ref={modalRef} title={t("Change Password")} />
      <Row className="justify-content-center">
        <Col lg={6} xs={11}>
          <div className="jh-box-item p-4">
            <div className="text-center mb-4">
              <h4 className="ChangePasswordPage__title">{t("Change Password")}</h4>
            </div>

            <Form onSubmit={onChangePassword}>
              <FormGroup className="mb-3">
                <FormLabel className="ChangePasswordPage__form-label">
                  {t("Old password")}
                </FormLabel>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="ChangePasswordPage__input-text">
                    <i className="bi bi-lock-fill" />
                  </InputGroup.Text>

                  <FormControl
                    className="ChangePasswordPage__form-control jh-box-input"
                    placeholder={t("Enter old password")}
                    aria-label="Enter old password"
                    type="password"
                    onChange={onChangeOldPass}
                    value={data.oldPass}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel className="ChangePasswordPage__form-label">
                  {t("New password")}
                </FormLabel>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="ChangePasswordPage__input-text">
                    <i className="bi bi-lock-fill" />
                  </InputGroup.Text>

                  <FormControl
                    className="ChangePasswordPage__form-control jh-box-input"
                    placeholder={t("Enter new password")}
                    aria-label="Enter new password"
                    type="password"
                    autoComplete="true"
                    value={data.newPass}
                    onChange={onChangeNewPass}
                    required
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel className="ChangePasswordPage__form-label">
                  {t("Re-enter new password")}
                </FormLabel>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="ChangePasswordPage__input-text">
                    <i className="bi bi-lock-fill" />
                  </InputGroup.Text>

                  <FormControl
                    className="ChangePasswordPage__form-control jh-box-input"
                    placeholder={t("Enter new password")}
                    aria-label="Enter new password"
                    type="password"
                    autoComplete="true"
                    value={data.newPass2}
                    onChange={onChangeNewPass2}
                    required
                  />
                </InputGroup>
              </FormGroup>

              <Button
                variant="primary"
                type="submit"
                className="ChangePasswordPage__btn-ChangePasswordPage w-100"
              >
                {loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  t("Change Password")
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePasswordPage;
