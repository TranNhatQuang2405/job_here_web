import React from "react";
import { Container } from "react-bootstrap";
import { Footer, Header, Body } from "..";
import { AlertModal } from "Components/Modal/";
import "./PageTemplate.css";

const PageTemplate = ({ children }) => {
  return (
    <Container fluid className="Page__body fix_scroll">
      <Header />
      <Body>
        <AlertModal />
        {children}
      </Body>
      <Footer />
    </Container>
  );
};

export default PageTemplate;
