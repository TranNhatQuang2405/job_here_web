import { withTranslation } from "react-i18next";
import vi_icon from "Assets/Images/vi_icon.png";
import en_icon from "Assets/Images/en_icon.png";
import { changeAcceptLanguage } from "Config/Redux/Slice/HeaderRequestSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./ButtonChangeLanguage.css";

const ChangeLanguageButton = (props) => {
  const { i18n } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const changeLanguage = () => {

    if (i18n.language === "en") {
      i18n.changeLanguage("vn");
      dispatch(changeAcceptLanguage("vi"));
    } else {
      i18n.changeLanguage("en");
      dispatch(changeAcceptLanguage("en"));
    }
    navigate(0);
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip>
          {t("header.btn.changeLanguage.toolTip")}
        </Tooltip>
      }
    >
      <img
        onClick={changeLanguage}
        alt={i18n.language === "en" ? "English" : "Tiếng Việt"}
        src={i18n.language === "en" ? en_icon : vi_icon}
        className="btn_changeLanguage-img cur-pointer"
      />
    </OverlayTrigger>

  );
};

export default withTranslation("translations")(ChangeLanguageButton);
