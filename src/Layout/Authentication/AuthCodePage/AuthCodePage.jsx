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
  Spinner,
} from "react-bootstrap";
import { ButtonPrimary } from "Components/Button";
import "./AuthCodePage.css";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { authBusiness } from "Business";
import { WarningModal } from "Components/Modal";
import { ValidateAuthCode } from "Config/Validate";
import { SetIsNotPending, SetIsPending } from "Config/Redux/Slice/UserSlice";
import { success, warning, custom } from "Config/Redux/Slice/AlertSlice";
import { useNavigate } from "react-router-dom";

const AuthCodePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef();

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onAuthSuccess = () => {
    dispatch(SetIsPending());
    navigate("/SignIn")
    dispatch(SetIsNotPending());

  }

  const onAuthCode = async (e) => {
    e.preventDefault();
    if (!ValidateAuthCode(code)) {
      dispatch(warning({
        message: t("authCode.validate.wrong"),
        title: t("authCode.validate.title"),
      }))
    } else {
      setLoading(true);
      let authCode = await authBusiness.AuthCode(parseInt(code));
      setLoading(false);
      if (authCode.data.httpCode === 200) {
        dispatch(success({
          message: authCode.data.message,
          title: t("authCode.result.title"),
          onHide: onAuthSuccess
        }));
      } else {
        dispatch(custom({
          message: authCode.data.message,
          title: t("authCode.result.title"),
          httpCode: authCode.data.httpCode
        }))
      }
    }
  };

  const onResend = () => { };

  return (
    <div className="AuthCode">
      <WarningModal ref={modalRef} title={t("Authentication Code")} />
      <div className="AuthCode__account-pages pt-5">
        <Row className="justify-content-center">
          <Col lg={4} xs={11}>
            <div className="text-center">
              <h4 className="AuthCode__title">{t("Authentication Code")}</h4>
              <p className="text-muted mb-1">
                {t(
                  "authCode.subTitle"
                )}
              </p>
            </div>
            <Card className="AuthCode__card mt-2">
              <Card.Body className="p-4">
                <div className="p-3">
                  <Form onSubmit={onAuthCode}>
                    <FormGroup className="mb-4">
                      <FormLabel className="AuthCode__form-label">
                        {t("Authentication Code")}
                      </FormLabel>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="AuthCode__input-text">
                          <i className="bi bi-envelope-fill" />
                        </InputGroup.Text>
                        <FormControl
                          type="text"
                          className="AuthCode__form-control jh-box-input"
                          placeholder={t("Enter Code")}
                          aria-label="Enter Code"
                          required
                          value={code}
                          onChange={onChangeCode}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="d-grid">
                      <ButtonPrimary className="w-100" type="submit">
                        {loading ? (
                          <Spinner animation="border" variant="light" />
                        ) : (
                          t("Submit")
                        )}
                      </ButtonPrimary>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-2">
              <p>
                {t("Didn't receiver authentication code?")}
                <span
                  className="authCode__textSignIn ms-1 cur-pointer"
                  onClick={onResend}
                >
                  {t("Resend")}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthCodePage;
