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
import { ChangePasswordPage, EditUserInfo } from "Layout/User";
import { JobAppliedPage, JobPage, JobSavedPage } from "Layout/Job";
import { ManageCVPage } from "Layout/CV";
import { CompanyListPage, CompanyPage } from "Layout/Company";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "Config/Provider";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <PageTemplate>
          <Routes>
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/ResetPassword" element={<ResetPasswordPage />} />
            <Route path="/AuthCode" element={<AuthCodePage />} />
            <Route path="/Home" element={<MainPage />} />
            <Route path="/Job" element={<MainPage />} />
            <Route path="/Job/:id" element={<JobPage />} />
            <Route path="/AppliedJob" element={<JobAppliedPage />} />
            <Route path="/SavedJob" element={<JobSavedPage />} />
            <Route path="/CVManage" element={<ManageCVPage />} />
            <Route path="/Company" element={<CompanyListPage />} />
            <Route path="/Company/:id" element={<CompanyPage />} />
            <Route path="/EditInfomation" element={<EditUserInfo />} />
            <Route path="/ChangePassword" element={<ChangePasswordPage />} />
            <Route path="*" element={<Navigate to="/Home" />} />
          </Routes>
        </PageTemplate>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
