import React, { useEffect, useState } from 'react'
import { Rate, Progress } from "antd";
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from 'Components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { companyBusiness } from "Business";
import { useLocation } from 'react-router-dom';
import { changeCurrentPath } from 'Config/Redux/Slice/CurrentPathSlice';
import CompanyAddComment from '../CompanyAddComment/CompanyAddComment';
import "./CompanyRatingOveral.css"

function CompanyRating({ companyId, goToRating, currentTab }) {

    const sessionInfo = useSelector((state) => state.User.sessionInfo);
    const { t } = useTranslation();
    const [showAddComment, setShowAddComment] = useState(false)
    const [companyScore, setCompanyScore] = useState({
        score: 0,
        percent: 0
    })

    const location = useLocation();
    const dispatch = useDispatch();

    const handleGoToRatingPage = () => {
        goToRating()
    }

    const goToSignIn = () => {
        let path = location.pathname
        dispatch(changeCurrentPath(path))
    }

    useEffect(() => {
        let isSubscribed = true;
        const getScore = async () => {
            let result = await companyBusiness.GetCompanyScore(companyId);
            if (result.data.httpCode === 200) {
                setCompanyScore({
                    ...companyScore,
                    score: result.data.objectData.score,
                    percent: result.data.objectData.percent
                })
            }
        }
        if (isSubscribed) getScore()
        return () => {
            isSubscribed = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId])

    return (
        <div className="CompanyPage_rating jh-box-item">
            <CompanyAddComment
                companyId={companyId}
                show={showAddComment}
                setShow={setShowAddComment}
            />
            <h4>{t("companyPage.rating.title")}</h4>
            <div className="CompanyPage_rating-start-box">
                <Rate allowHalf disabled className="CompanyPage_rating-start" defaultValue={0} value={companyScore.score} />
                <div className="CompanyPage_rating-number">{companyScore.score}</div>
            </div>
            <hr />
            <div className="CompanyPage_rating-recommend-box">
                <Progress type="circle" size={80} percent={companyScore.percent} strokeColor={{ '0%': '#108ee9', '100%': '#f55742' }} />
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
                            className="CompanyPage_rating-btn"
                            onClick={() => setShowAddComment(true)}
                        >
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