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
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notify, setNotify] = useState("null");
  const [account, setAccount] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const onSignIn = () => {
    navigate("/SignIn");
  };

  const onSignUp = () => {};

  const onChangeValueEmail = (e) => {
    setAccount((prev) => ({ ...prev, email: e.target.value }));
  };

  const onChangeValueDisplayName = (e) => {
    setAccount((prev) => ({ ...prev, displayName: e.target.value }));
  };

  const onChangeValuePassword = (e) => {
    setAccount((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <div className="SignUp">
      <div className="SignUp__account-pages pt-3">
        <Row className="justify-content-center">
          <Col lg={4} xs={11}>
            <div className="text-center mb-4">
              <h4 className="SignUp__title">{t("Sign Up")}</h4>
              <p className="text-muted mb-4">
                {t("Get your Job Here account now.")}
              </p>
            </div>

            <Card className="SignUp__card">
              {notify === true ? (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setNotify("null")}
                >
                  {t("You have signed up success!")}
                </Alert>
              ) : notify === false ? (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setNotify("null")}
                >
                  {t("jh-signup-fail")}
                </Alert>
              ) : (
                <></>
              )}
              <Card.Body className="p-4 pb-1">
                <Form onSubmit={onSignUp}>
                  <FormGroup className="mb-3">
                    <FormLabel className="SignUp__form-label">Email</FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-light text-muted-bg border-0">
                        <i className="bi bi-envelope" />
                      </InputGroup.Text>
                      <FormControl
                        type="email"
                        className="signUp-text-color"
                        placeholder={t("Enter Email")}
                        aria-label="Enter Email"
                        value={account.email}
                        onChange={onChangeValueEmail}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel className="SignUp__form-label">
                      {t("Display Name")}
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-light text-muted-bg border-0">
                        <i className="bi bi-person" />
                      </InputGroup.Text>
                      <FormControl
                        type="text"
                        className="signUp-text-color"
                        placeholder={t("Enter Username")}
                        aria-label="Enter Username"
                        value={account.displayName}
                        onChange={onChangeValueDisplayName}
                        minLength={8}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <FormLabel className="SignUp__form-label">
                      {t("Password")}
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-light text-muted-bg border-0">
                        <i className="bi bi-lock" />
                      </InputGroup.Text>
                      <FormControl
                        type="password"
                        className="signUp-text-color"
                        placeholder={t("Enter Password")}
                        aria-label="Enter Password"
                        value={account.password}
                        onChange={onChangeValuePassword}
                        minLength={8}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <Button className="signUp__button w-100" type="submit">
                    {t("Sign Up")}
                  </Button>

                  <div className="mt-3 mb-2 text-center">
                    <p className="text-muted mb-0">
                      {t("By registering you agree to the Job Here's")}
                      <a href="/" className="signUp__textSignIn ms-2">
                        {t("Terms of Service")}
                      </a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="SignUp__sign-in text-center mt-1">
              <p>
                {t("Already have an account?")}
                <span
                  className="cur-pointer ms-2 signUp__textSignIn"
                  onClick={onSignIn}
                >
                  {t("Signin now")}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUpPage;
