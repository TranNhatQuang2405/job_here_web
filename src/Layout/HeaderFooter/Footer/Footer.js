import React from "react";
import Nav from "react-bootstrap/Nav";
import "./Footer.css";
import logo from "Assets/Images/logo_no_text.png";
import logo_title from "Assets/Images/title.png";

const Footer = () => {
  return (
    <div className="Footer__container">
      <div className="row">
        <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-md-0 mb-2">
          <div className="align-items-center justify-content-center mb-1">
            <a href="#">
              <img
                src={logo}
                alt="Job Here"
                width="50"
                height="50"
                style={{ marginRight: 10 }}
              />
              <img src={logo_title} alt="Job Here" height="24" />
            </a>
          </div>
          <Nav className="flex-column">
            <Nav.Item>
              <p className="Footer__item-text">
                <i class="bi bi-geo-alt-fill" style={{marginRight: 5}} />
                01 Vo Van Ngan Street, Linh Chieu Ward, Thu Duc City, Ho Chi
                Minh City, Viet Nam
              </p>
            </Nav.Item>
            <Nav.Item>
              <p className="Footer__item-text Footer__text-muted">
                © Copyright JOB HERE COMPANY
              </p>
            </Nav.Item>
            <Nav.Item>
              <p className="Footer__item-text Footer__text-muted">
                <i class="bi bi-telephone-fill" style={{marginRight: 5}} />
                037 999 9999
              </p>
            </Nav.Item>
            <Nav.Item>
              <p className="Footer__item-text Footer__text-muted">
                <i class="bi bi-envelope-fill" style={{marginRight: 5}} />
                contact@jobhere.com
              </p>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <div className="text-uppercase fw-bold mb-2 Footer__group-text">
            About Job Here
          </div>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Terms of Service
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Privacy Policy
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Help
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <div className="text-uppercase fw-bold mb-2 Footer__group-text">
            Community
          </div>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Facebook Fanpage
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Offical Youtube Channel
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Linkedin
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <div className="text-uppercase fw-bold mb-2 Footer__group-text">
            Profile And CV
          </div>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Manage CV
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                CV Template
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="Footer__item-text">
                Write CV Guide
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
