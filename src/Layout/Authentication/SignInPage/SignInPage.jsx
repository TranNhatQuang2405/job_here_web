import React, { useState } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormCheck,
  FormGroup,
  Button,
  Alert,
} from "react-bootstrap";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notify, setNotify] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const onSignIn = () => {
    navigate("/MainPage");
  };

  const onSignUp = () => {
    navigate("/SignUp");
  };

  const onChangeValueEmail = (e) => {
    setAccount((prev) => ({ ...prev, email: e.target.value }));
  };

  const onChangeValuePassword = (e) => {
    setAccount((prev) => ({ ...prev, password: e.target.value }));
  };

  const onResetPassword = () => {
    navigate("/ResetPassword");
  };

  return (
    <div className="SignIn pt-3">
      <Row className="justify-content-center">
        <Col lg={4} xs={11}>
          <div className="text-center mb-4">
            <h4 className="SignIn__title">{t("Sign In")}</h4>
            <p className="text-muted mb-4">{t("Sign in to continue.")}</p>
          </div>

          <Card className="SignIn__card">
            {notify ? (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setNotify(false)}
              >
                {t("Wrong email or password")}
              </Alert>
            ) : (
              <></>
            )}
            <Card.Body className="p-4">
              <Form onSubmit={onSignIn}>
                <FormGroup className="mb-3">
                  <FormLabel className="SignIn__form-label">{t("Email")}</FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="SignIn__input-text">
                      <i className="bi bi-person" />
                    </InputGroup.Text>

                    <FormControl
                      className="SignIn__form-control SignIn__form-control-lg SignIn__form SignIn__bg-soft-light"
                      placeholder={t("Enter Email")}
                      aria-label="Enter Email"
                      onChange={onChangeValueEmail}
                      value={account.email}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <div className="float-end">
                    <div
                      className="text-muted font-size-13 cur-pointer"
                      onClick={onResetPassword}
                    >
                      {t("Forgot password?")}
                    </div>
                  </div>
                  <FormLabel className="SignIn__form-label">{t("Password")}</FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="SignIn__input-text">
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>

                    <FormControl
                      className="SignIn__form-control SignIn__form-control-lg SignIn__form SignIn__bg-soft-light"
                      placeholder={t("Enter Password")}
                      aria-label="Enter Password"
                      type="password"
                      autoComplete="true"
                      value={account.password}
                      onChange={onChangeValuePassword}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <FormCheck
                    className="SignIn__form-check"
                    type="checkbox"
                    label={t("Remember Me")}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="SignIn__btn-signin w-100"
                >
                  {t("Sign In")}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="SignIn__sign-up mt-3 text-center">
            <p>
              {t("Don't have an account?")}
              <span
                className="ms-1 text-primary cur-pointer"
                onClick={onSignUp}
              >
                {t("Signup now")}
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignInPage;
