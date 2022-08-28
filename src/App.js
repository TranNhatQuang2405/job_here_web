import "./App.css";
import Header from "Layout/HeaderFooter/Header/Header";
import Footer from "Layout/HeaderFooter/Footer/Footer";
import { I18nextProvider } from "react-i18next";
import i18n from './Translate/i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <Header />
        <Footer />
      </div>
    </I18nextProvider>
  );
}

export default App;
