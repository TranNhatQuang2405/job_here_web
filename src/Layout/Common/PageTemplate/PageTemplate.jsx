import React from "react";
import { Container } from "react-bootstrap";
import { Footer, Header, Body } from "..";
import { AlertModal } from "Components/Modal/";
import "./PageTemplate.css";
import { Outlet } from "react-router-dom";

const PageTemplate = ({ children }) => {
  return (
    <Container fluid className="Page__body fix_scroll">
      <Header />
      <Body>
        <AlertModal />
        <Outlet />
      </Body>
      <Footer />
    </Container>
  );
};

export default React.memo(PageTemplate);
