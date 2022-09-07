import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Translate/i18n";
import PageTemplate from "Layout/Common/PageTemplate/PageTemplate";
import {
  SignInPage,
  SignUpPage,
  ResetPasswordPage,
} from "Layout/Authentication";
import MainPage from "Layout/MainPage/MainPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <PageTemplate>
        <Routes>
          <Route path="/SignUp" element={<SignUpPage />}></Route>
          <Route path="/SignIn" element={<SignInPage />}></Route>
          <Route path="/ResetPassword" element={<ResetPasswordPage />}></Route>
          <Route path="/MainPage" element={<MainPage />}></Route>
          <Route path="*" element={<Navigate to="/SignIn" />} />
        </Routes>
      </PageTemplate>
    </I18nextProvider>
  );
}

export default App;
