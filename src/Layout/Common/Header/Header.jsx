import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { ButtonChangeLanguage } from "Components/Button";
import { useNavigate } from "react-router-dom";
import user_img from "Assets/Images/user.png";
import "./Header.css";
import { Logo } from "..";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { LogOut } from "Config/Redux/Slice/UserSlice";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let sessionInfo = useSelector((state) => state.User.sessionInfo);

  const onLogout = () => {
    dispatch(changeToken(""));
    dispatch(LogOut());
    dispatch(changeCurrentPage(1));
    navigate("/SignIn");
  };

  return (
    <Row className="sticky-nav Header__container">
      <Col className="bg-app-dark">
        <Navbar expand="lg" variant="dark" className="Header__layout">
          <Navbar.Brand className="d-flex flex-row align-items-center">
            <NavLink to="/Home">
              <Logo isDark />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {!!sessionInfo && (
              <Nav className="me-auto">
                <NavDropdown title={t("Jobs")} id="basic-nav-dropdown" menuVariant="dark">
                  <NavDropdown.Item>
                    <NavLink to="/AppliedJob">{t("Applied Jobs")}</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>{t("Saved Jobs")}</NavDropdown.Item>
                  <NavDropdown.Item>{t("Matched Jobs")}</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title={t("Profile & CV")}
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item>{t("CV Manage")}</NavDropdown.Item>
                  <NavDropdown.Item>{t("CV Template")}</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title={t("Companies")}
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item>
                    <NavLink to="/Company">{t("Company List")}</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>{t("Top Company")}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!!sessionInfo && (
              <Nav className="justify-content-end">
                <NavDropdown
                  title={
                    <div className="d-flex flex-row align-items-center">
                      <img
                        alt=""
                        src={user_img}
                        width="40"
                        height="40"
                        className="d-inline-block rounded-circle"
                      />
                      <p className="mb-0 ms-2 Header__layout-text">
                        {sessionInfo?.fullname ?? t("Your Profile")}
                      </p>
                    </div>
                  }
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item>
                    <NavLink to="/EditInfomation">{t("Edit Your Infomation")}</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onLogout}>{t("Logout")}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            <Nav className="justify-content-end">
              <ButtonChangeLanguage />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};

export default Header;
