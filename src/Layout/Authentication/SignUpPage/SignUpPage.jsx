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

const SignUpPage = () => {
  const navigate = useNavigate();
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
              <h4 className="SignUp__title">Sign up</h4>
              <p className="text-muted mb-4">Get your Chat account now.</p>
            </div>

            <Card className="SignUp__card">
              {notify === true ? (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setNotify("null")}
                >
                  You have signed up success
                </Alert>
              ) : notify === false ? (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setNotify("null")}
                >
                  Your email is wrong or is in use with another user or your
                  password is not match
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
                        placeholder="Enter Email"
                        aria-label="Enter Email"
                        value={account.email}
                        onChange={onChangeValueEmail}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel className="SignUp__form-label">
                      Display Name
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-light text-muted-bg border-0">
                        <i className="bi bi-person" />
                      </InputGroup.Text>
                      <FormControl
                        type="text"
                        className="signUp-text-color"
                        placeholder="Enter Username"
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
                      Password
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-light text-muted-bg border-0">
                        <i className="bi bi-lock" />
                      </InputGroup.Text>
                      <FormControl
                        type="password"
                        className="signUp-text-color"
                        placeholder="Enter Password"
                        aria-label="Enter Password"
                        value={account.password}
                        onChange={onChangeValuePassword}
                        minLength={8}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <Button className="signUp__button w-100" type="submit">
                    Sign up
                  </Button>

                  <div className="mt-3 mb-2 text-center">
                    <p className="text-muted mb-0">
                      By registering you agree to the Job Here
                      <a href="/" className="signUp__textSignIn ms-2">
                        Terms of Use
                      </a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="SignUp__sign-in text-center mt-1">
              <p>
                Already have an account?
                <span
                  className="cur-pointer ms-2 signUp__textSignIn"
                  onClick={onSignIn}
                >
                  Sign in
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
