import { withTranslation } from "react-i18next";

const ChangeLanguageButton = (props) => {
  const { t, i18n } = props;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      Header
      <h2>{t("English")}</h2>
      <button onClick={() => changeLanguage("vn")}>vn</button>
      <button onClick={() => changeLanguage("en")}>en</button>
    </div>
  );
};

export default withTranslation("translations")(ChangeLanguageButton);
