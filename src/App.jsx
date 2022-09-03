import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Translate/i18n";
import PageTemplate from "Layout/Common/PageTemplate/PageTemplate";
import { SignInPage } from "Layout/Authentication";

function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <PageTemplate>
                <SignInPage />
            </PageTemplate>
        </I18nextProvider>
    );
}

export default App;
