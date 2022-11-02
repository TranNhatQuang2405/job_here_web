import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Config/Translate/i18n.js";
import PageTemplate from "Layout/Common/PageTemplate/PageTemplate";
import {
  SignInPage,
  SignUpPage,
  ResetPasswordPage,
  AuthCodePage,
} from "Layout/Authentication";
import MainPage from "Layout/MainPage/MainPage.jsx";
import { EditUserInfo } from "Layout/User";
import { JobAppliedPage } from "Layout/Job";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "Config/Provider";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <PageTemplate>
          <Routes>
            <Route path="/SignUp" element={<SignUpPage />}></Route>
            <Route path="/SignIn" element={<SignInPage />}></Route>
            <Route path="/ResetPassword" element={<ResetPasswordPage />}></Route>
            <Route path="/AuthCode" element={<AuthCodePage />}></Route>
            <Route path="/Home" element={<MainPage />}></Route>
            <Route path="/AppliedJob" element={<JobAppliedPage />}></Route>
            <Route path="/EditInfomation" element={<EditUserInfo />}></Route>
            <Route path="*" element={<Navigate to="/SignIn" />} />
          </Routes>
        </PageTemplate>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
