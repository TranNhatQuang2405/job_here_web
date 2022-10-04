import React from "react";
import "./ButtonPrimary.css";

const ButtonPrimary = ({ children, secondary, onClick, style = {} }) => {
  const _onClick = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <button
      className={secondary ? "jh-btn jh-btn-secondary" : "jh-btn jh-btn-primary"}
      onClick={_onClick}
      style={{ ...style }}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
