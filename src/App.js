import "./App.css";
import SignUpPage from "Layout/Authentication/SignUpPage/SignUpPage";
import { I18nextProvider } from "react-i18next";
import i18n from "./Translate/i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <SignUpPage />
      </div>
    </I18nextProvider>
  );
}

export default App;
