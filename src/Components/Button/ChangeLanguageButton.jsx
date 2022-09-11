import { withTranslation } from "react-i18next";
import vi from "Assets/Images/vi_icon.png";
import en from "Assets/Images/en_icon.png";

const ChangeLanguageButton = (props) => {
    const { i18n } = props;

    const changeLanguage = () => {
        if (i18n.language === "en") {
            i18n.changeLanguage("vn");
        } else {
            i18n.changeLanguage("en");
        }
    };

    return (
        <div
            onClick={changeLanguage}
            style={{ height: "100%", width: 30, alignSelf: "center" }}
        >
            <img
                alt={i18n.language === "en" ? "Tiếng Việt" : "English"}
                src={i18n.language === "en" ? vi : en}
                className="d-inline-block"
                style={{ height: "100%", width: "100%" }}
            />
        </div>
    );
};

export default withTranslation("translations")(ChangeLanguageButton);
