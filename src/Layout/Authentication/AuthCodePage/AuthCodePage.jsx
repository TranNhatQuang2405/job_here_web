import React, { useState } from "react";
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
  Alert,
} from "react-bootstrap";
import "./AuthCodePage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthCodePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [alert, setAlert] = useState(false);

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onAuthCode = (e) => {
    e.preventDefault();
  };

  const onResend = () => {};

  return (
    <div className="AuthCode">
      <div className="AuthCode__account-pages pt-5">
        <Row className="justify-content-center">
          <Col lg={4} xs={11}>
            <div className="text-center">
              <h4 className="AuthCode__title">{t("Authentication Code")}</h4>
              <p className="text-muted mb-1">
                {t("Final step to treate your account.")}
              </p>
            </div>
            <Card className="AuthCode__card mt-2">
              <Card.Body className="p-4">
                <div className="p-3">
                  {alert ? (
                    <Alert
                      variant="danger"
                      dismissible
                      onClose={() => setAlert(false)}
                    >
                      {t("Your authentication code is invalid!")}
                    </Alert>
                  ) : (
                    <></>
                  )}

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
                          className="AuthCode__form-control"
                          placeholder={t("Enter Code")}
                          aria-label="Enter Code"
                          required
                          value={code}
                          onChange={onChangeCode}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="d-grid">
                      <Button className="authCode__button " type="submit">
                        {t("Submit")}
                      </Button>
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