import React from "react";

const CompanyLogo = ({ src, alt, style = {}, size = 44 }) => {
  return (
    <div
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size / 8}px`,
        borderWidth: "0.5px",
        borderColor: "#f7f7f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img src={src} alt={alt || ""} className="w-100" />
    </div>
  );
};

export default CompanyLogo;
