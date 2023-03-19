import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { ButtonChangeLanguage } from "Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import user_img from "Assets/Images/user.png";
import "./Header.css";
import { Logo } from "..";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { LogOut } from "Config/Redux/Slice/UserSlice";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { ButtonPrimary } from "Components/Button";
import { Avatar } from "Components/Image";

const Header = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const { t } = useTranslation();
	const sessionInfo = useSelector((state) => state.User.sessionInfo);

	const checkLocation = () => {
		let path = location.pathname
		if (path !== "/SignIn")
			return true;
		else
			return false;
	}

	const onLogout = () => {
		dispatch(changeToken(""));
		dispatch(LogOut());
		dispatch(changeCurrentPage(1));
		navigate("/SignIn");
	};

	const goSignIn = () => {
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
					<Nav className="header__btn-language-smallSizeScreen d-block d-lg-none">
						<ButtonChangeLanguage />
					</Nav>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
						{sessionInfo && (
							<Nav className="me-auto">
								<NavDropdown title={t("Jobs")} id="basic-nav-dropdown" menuVariant="dark">
									<NavDropdown.Item as="div">
										<NavLink to="/AppliedJob">{t("Applied Jobs")}</NavLink>
									</NavDropdown.Item>
									<NavDropdown.Item as="div">
										<NavLink to="/SavedJob">{t("SavedJob")}</NavLink>
									</NavDropdown.Item>
									{/* <NavDropdown.Item>{t("Matched Jobs")}</NavDropdown.Item> */}
								</NavDropdown>
								<NavDropdown
									title={t("Profile & CV")}
									id="basic-nav-dropdown"
									menuVariant="dark"
								>
									<NavDropdown.Item as="div">
										<NavLink to="/CVManage">{t("CV Manage")}</NavLink>
									</NavDropdown.Item>
									{/* <NavDropdown.Item>{t("CV Template")}</NavDropdown.Item> */}
								</NavDropdown>
								<NavDropdown
									title={t("Companies")}
									id="basic-nav-dropdown"
									menuVariant="dark"
								>
									<NavDropdown.Item as="div">
										<NavLink to="/Company">{t("Company List")}</NavLink>
									</NavDropdown.Item>
									{/* <NavDropdown.Item>{t("Top Company")}</NavDropdown.Item> */}
								</NavDropdown>
							</Nav>
						)}
						{sessionInfo && (
							<Nav className="justify-content-end">
								<NavDropdown
									title={
										<div className="d-flex flex-row align-items-center">
											<Avatar
												url={sessionInfo?.imageUrl || user_img}
												width="40px"
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
									<NavDropdown.Item as="div">
										<NavLink to="/EditInfomation">{t("Edit Your Infomation")}</NavLink>
									</NavDropdown.Item>
									<NavDropdown.Item as="div">
										<NavLink to="/ChangePassword">{t("Change Password")}</NavLink>
									</NavDropdown.Item>
									<NavDropdown.Item onClick={onLogout}>{t("Logout")}</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						)}
						<Nav className="justify-content-end d-none d-lg-block">
							<ButtonChangeLanguage />
						</Nav>
						{!sessionInfo && checkLocation() &&
							<Nav className="justify-content-end ms-3" onClick={goSignIn}>
								<ButtonPrimary style={{ maxWidth: 120, alignSelf: "flex-end" }}>{t("Sign In")}</ButtonPrimary>
							</Nav>
						}
					</Navbar.Collapse>
				</Navbar>
			</Col>
		</Row>
	);
};

export default Header;
