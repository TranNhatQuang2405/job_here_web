import React from "react";
import { useTranslation } from "react-i18next";
import privacy_policy_en from "./privacy_policy_en";
import privacy_policy_vi from "./privacy_policy_vi";

const PrivacyPolicyPage = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: i18n.language === "en" ? privacy_policy_en : privacy_policy_vi,
        }}
      />
    </div>
  );
};

export default PrivacyPolicyPage;