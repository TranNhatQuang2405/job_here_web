import React from 'react'
import { Rate, Progress } from "antd";
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from 'Components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeCurrentPath } from 'Config/Redux/Slice/CurrentPathSlice';
import "./CompanyRatingOveral.css"

function CompanyRating({ companyId, goToRating, currentTab }) {

    const sessionInfo = useSelector((state) => state.User.sessionInfo);
    const { t } = useTranslation();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleGoToRatingPage = () => {
        goToRating()
    }

    const goToSignIn = () => {
        let path = location.pathname
        dispatch(changeCurrentPath(path))
    }

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
                <div>
                    {t("companyPage.rating.content")}
                </div>
            </div>
            <hr />
            {
                currentTab === 0 ?
                    <ButtonPrimary
                        onClick={handleGoToRatingPage}
                        className="CompanyPage_rating-btn">
                        {t("companyPage.rating.btnSeeAll")}
                    </ButtonPrimary>
                    :
                    sessionInfo ?
                        <ButtonPrimary
                            className="CompanyPage_rating-btn">
                            {t("companyPage.rating.btnCreateReview")}
                        </ButtonPrimary>
                        :
                        <ButtonPrimary
                            onClick={goToSignIn} 
                            className="CompanyPage_rating-btn">
                            {t("companyPage.rating.btnLogin")}
                        </ButtonPrimary>
            }
        </div>
    )
}

export default CompanyRating