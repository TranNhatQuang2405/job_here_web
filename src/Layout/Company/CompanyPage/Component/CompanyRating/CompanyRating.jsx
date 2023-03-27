import React from 'react'
import { Rate, Progress } from "antd";
import { useTranslation } from 'react-i18next';
import "./CompanyRating.css"

function CompanyRating() {
    const { t } = useTranslation();
    return (
        <div className="CompanyPage_rating jh-box-item">
            <h4>{t("companyPage.rating.title")}</h4>
            <div className="CompanyPage_rating-start-box">
                <Rate allowHalf disabled className="CompanyPage_rating-start" defaultValue={3} value={2.7} />
                <div className="CompanyPage_rating-number">2.7</div>
            </div>
            <hr />
            <div className="CompanyPage_rating-recommend-box">
                <Progress type="circle" size={80} percent={90} strokeColor={{ '0%': '#108ee9', '100%': '#f55742' }} />
                <div className="CompanyPage_rating-recommend-text">
                    {t("companyPage.rating.content")}
                </div>
            </div>

        </div>
    )
}

export default CompanyRating