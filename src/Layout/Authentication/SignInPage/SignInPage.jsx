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
  Spinner,
  Container,
} from "react-bootstrap";
import { ButtonPrimary } from "Components/Button";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { useTranslation } from "react-i18next";
import { authBusiness } from "Business";
import { SetIsPending } from "Config/Redux/Slice/UserSlice";
import { finishLogin } from "Config/Redux/Slice/CurrentPathSlice";
import { error } from "Config/Redux/Slice/AlertSlice";
const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const path = useSelector((state) => state.CurrentPath.path) || "/Home";

  const onSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    let signIn = await authBusiness.SignIn(account.email, account.password);
    setLoading(false);
    if (signIn.data.httpCode === 200) {
      dispatch(changeToken(signIn.data.objectData.token));
      dispatch(finishLogin())
      dispatch(SetIsPending());
      navigate(path);
    } else {
      dispatch(error({
        message: signIn.data.message,
        title: t("Sign In")
      }))
      setAccount({ email: account.email, password: "" });
    }
  };

  const onSignUp = () => {
    dispatch(SetIsPending());
    navigate("/SignUp")
  };

  const onChangeValueEmail = (e) => {
    setAccount((prev) => ({ ...prev, email: e.target.value }));
  };

  const onChangeValuePassword = (e) => {
    setAccount((prev) => ({ ...prev, password: e.target.value }));
  };

  // const onResetPassword = () => {
  //   dispatch(SetIsPending());
  //   dispatch(changeCurrentPage(3));
  // };

  return (
    <Container className="SignIn pt-3">
      <Row className="justify-content-center">
        <Col lg={6} xs={11}>
          <div className="text-center mb-4">
            <h4 className="SignIn__title">{t("Sign In")}</h4>
            <p className="text-muted mb-4">{t("Sign in to continue.")}</p>
          </div>

          <Card className="SignIn__card">
            <Card.Body className="p-4">
              <Form onSubmit={onSignIn}>
                <FormGroup className="mb-3">
                  <FormLabel className="SignIn__form-label">{t("Email")}</FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="SignIn__input-text">
                      <i className="bi bi-person-fill" />
                    </InputGroup.Text>

                    <FormControl
                      className="SignIn__form-control jh-box-input"
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
                    {/* <div
                      className="text-muted font-size-13 cur-pointer"
                      onClick={onResetPassword}
                    >
                      {t("Forgot password?")}
                    </div> */}
                  </div>
                  <FormLabel className="SignIn__form-label">{t("Password")}</FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="SignIn__input-text">
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>

                    <FormControl
                      className="SignIn__form-control jh-box-input"
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
                <ButtonPrimary
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    t("Sign In")
                  )}
                </ButtonPrimary>
              </Form>
            </Card.Body>
          </Card>

          <div className="SignIn__sign-up mt-3 text-center">
            <p>
              {t("Don't have an account?")}
              <span className="ms-1 text-primary cur-pointer" onClick={onSignUp}>
                {t("Signup now")}
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
