import React from "react";

const CompanyLogo = ({ src, alt, style = {}, size = 44 }) => {
  return (
    <div
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        border: '1px solid var(--jh-primary-border-color)',
        borderRadius: `${size / 8}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: 'var(--jh-white-background)'
      }}
    >
      <img src={src} alt={alt || ""} className="w-100" />
    </div>
  );
};

export default CompanyLogo;
