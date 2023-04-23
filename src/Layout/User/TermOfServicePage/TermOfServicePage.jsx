import React from "react";
import { useTranslation } from "react-i18next";
import term_of_service_en from "./term_of_service_en";
import tern_of_service_vi from "./term_of_service_vi";

const TermOfServicePage = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: i18n.language === "en" ? term_of_service_en : tern_of_service_vi,
        }}
      />
    </div>
  );
};

export default TermOfServicePage;
