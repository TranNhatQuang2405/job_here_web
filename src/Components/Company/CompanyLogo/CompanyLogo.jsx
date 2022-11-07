import React from "react";
import company_default_img from "Assets/Images/company_default_img.webp";

const CompanyLogo = ({ src = company_default_img, alt = "", style = {}, size = 44 }) => {
  return (
    <div
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        border: "1px solid var(--jh-primary-border-color)",
        borderRadius: `${size / 8}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--jh-white-background)",
      }}
    >
      <img src={src} alt={alt} className="img-fluid" />
    </div>
  );
};

export default CompanyLogo;
