import React from "react";
import { useTranslation } from "react-i18next";
import about_us_en from "./about_us_en";
import about_us_vi from "./about_us_vi";

const AboutUsPage = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: i18n.language === "en" ? about_us_en : about_us_vi,
        }}
      />
    </div>
  );
};

export default AboutUsPage;