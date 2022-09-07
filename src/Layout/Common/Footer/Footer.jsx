import React from "react";
import { Nav, Col, Row } from "react-bootstrap";
import { Logo } from "..";
import "./Footer.css";

const Footer = () => {
  return (
    <Row className="Footer__layout">
      <Col md={3}>
        <div className="align-items-center justify-content-center mb-1">
          <Logo />
        </div>
        <Nav className="flex-column">
          <Nav.Item>
            <p className="Footer__item-text">
              <i className="bi bi-geo-alt-fill" style={{ marginRight: 5 }} />
              01 Vo Van Ngan Street, Linh Chieu Ward, Thu Duc City, Ho Chi Minh
              City, Viet Nam
            </p>
          </Nav.Item>
          <Nav.Item>
            <p className="Footer__item-text Footer__text-muted">
              © Copyright JOB HERE COMPANY
            </p>
          </Nav.Item>
          <Nav.Item>
            <p className="Footer__item-text Footer__text-muted">
              <i className="bi bi-telephone-fill" style={{ marginRight: 5 }} />
              037 999 9999
            </p>
          </Nav.Item>
          <Nav.Item>
            <p className="Footer__item-text Footer__text-muted">
              <i className="bi bi-envelope-fill" style={{ marginRight: 5 }} />
              contact@jobhere.com
            </p>
          </Nav.Item>
        </Nav>
      </Col>
      <Col md={{ offset: 1, span: 2 }}>
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
      </Col>
      <Col md={{ offset: 1, span: 2 }}>
        <div className="text-uppercase fw-bold mb-2 Footer__group-text">
          Community
        </div>
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link
              href="https://www.facebook.com/jobhere.tech"
              className="Footer__item-text"
            >
              Facebook Fanpage
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="https://www.youtube.com/channel/UCCSfeNxFPc5vUVI-KA9DMVw"
              className="Footer__item-text"
            >
              Offical Youtube Channel
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="https://www.linkedin.com/"
              className="Footer__item-text"
            >
              Linkedin
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col md={{ offset: 1, span: 2 }}>
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
      </Col>
    </Row>
  );
};

export default Footer;
