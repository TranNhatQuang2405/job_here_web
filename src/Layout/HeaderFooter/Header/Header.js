// import ChangeLanguageButton from "Components/Button/ChangeLanguageButton";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "Assets/Images/logo_no_text.png";
import logo_title from "Assets/Images/title.png";
import user_img from "Assets/Images/user.png";
import "./Header.css";

const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          href="#home"
          className="d-flex flex-row align-items-center"
        >
          <img
            alt="Job Here"
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            style={{ marginRight: 10 }}
          />
          <img src={logo_title} alt="Job Here" height="24" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Jobs" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action">Jobs Applied</NavDropdown.Item>
              <NavDropdown.Item href="#action">Jobs Saved</NavDropdown.Item>
              <NavDropdown.Item href="#action">Jobs Matched</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Profile & CV" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action">CV Manage</NavDropdown.Item>
              <NavDropdown.Item href="#action">CV Template</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Companies" id="basic-nav-dropdown">
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
                    width="30"
                    height="30"
                    className="d-inline-block rounded-circle"
                  />
                  <p className="mb-0">Your Profile</p>
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action">
                Edit Your Infomation
              </NavDropdown.Item>
              <NavDropdown.Item href="#action">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
