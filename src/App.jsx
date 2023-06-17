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
import {
  AboutUsPage,
  ChangePasswordPage,
  EditUserInfo,
  PrivacyPolicyPage,
  TermOfServicePage,
} from "Layout/User";
import { AllJobPage, JobAppliedPage, JobPage, JobSavedPage } from "Layout/Job";
import { AllBlogPage, BlogPage, CreateBlog, YourBlog, EditBlog } from "Layout/Blog";
import { ManageCVPage, CVTemplateList, CVTemplatePage, CreateCV, ViewCV, EditCV } from "Layout/CV";
import { CompanyListPage, CompanyPage } from "Layout/Company";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "Config/Provider";
import PathProvider from "Config/Provider/PathProvider";
import Chat from "Layout/Chat/Chat";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <PageTemplate>
          <PathProvider>
            <Routes>
              <Route path="/SignUp" element={<SignUpPage />} />
              <Route path="/SignIn" element={<SignInPage />} />
              <Route path="/ResetPassword" element={<ResetPasswordPage />} />
              <Route path="/AuthCode" element={<AuthCodePage />} />
              <Route path="/Home" element={<MainPage />} />
              <Route path="/Job" element={<AllJobPage />} />
              <Route path="/Job/:id" element={<JobPage />} />
              <Route path="/AppliedJob" element={<JobAppliedPage />} />
              <Route path="/SavedJob" element={<JobSavedPage />} />
              <Route path="/CVManage" element={<ManageCVPage />} />
              <Route path="/CVManage/CreateCV/:templateId" element={<CreateCV />} />
              <Route path="/CVManage/EditCV/:cvId" element={<EditCV />} />
              <Route path="/CVTemplate" element={<CVTemplateList />} />
              <Route path="/CVTemplate/:templateId" element={<CVTemplatePage />} />
              <Route path="/ViewCV/:cvId" element={<ViewCV />} />
              <Route path="/Company" element={<CompanyListPage />} />
              <Route path="/Company/:id" element={<CompanyPage />} />
              <Route path="/Blog" element={<AllBlogPage />} />
              <Route path="/Blog/:blogId" element={<BlogPage />} />
              <Route path="/Blog/edit/:blogId" element={<EditBlog />} />
              <Route path="/YourBlog" element={<YourBlog />} />
              <Route path="/CreateBlog" element={<CreateBlog />} />
              <Route path="/EditInfomation" element={<EditUserInfo />} />
              <Route path="/ChangePassword" element={<ChangePasswordPage />} />
              <Route path="/Chat" element={<Chat />} />
              <Route path="/TermOfService" element={<TermOfServicePage />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicyPage />} />
              <Route path="/AboutUs" element={<AboutUsPage />} />
              <Route path="*" element={<Navigate to="/Home" />} />
            </Routes>
          </PathProvider>
        </PageTemplate>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
