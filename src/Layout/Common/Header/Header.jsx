import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import user_img from "Assets/Images/user.png";
import "./Header.css";
import { Logo } from "..";
import { Row, Col } from "react-bootstrap";

const Header = (props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/SignIn");
  };

  return (
    <Row className="sticky-nav">
      <Col className="bg-app-dark">
        <Navbar expand="lg" variant="dark" className="Header__layout">
          <Navbar.Brand
            href="#home"
            className="d-flex flex-row align-items-center"
          >
            <Logo isDark />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="Jobs"
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action">Jobs Applied</NavDropdown.Item>
                <NavDropdown.Item href="#action">Jobs Saved</NavDropdown.Item>
                <NavDropdown.Item href="#action">Jobs Matched</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Profile & CV"
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action">CV Manage</NavDropdown.Item>
                <NavDropdown.Item href="#action">CV Template</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Companies"
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action">Company List</NavDropdown.Item>
                <NavDropdown.Item href="#action">Top Company</NavDropdown.Item>
              </NavDropdown>
            </Nav>
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
                      Your Profile
                    </p>
                  </div>
                }
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action">
                  Edit Your Infomation
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};

export default Header;