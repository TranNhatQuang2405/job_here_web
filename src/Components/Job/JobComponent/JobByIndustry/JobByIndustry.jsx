import { reportBusiness } from 'Business'
import { LoadingSpinner } from 'Components/Loading'
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import default_img from "Assets/Images/avatar_jobhere.png";

import "./JobByIndustry.css"

function JobByIndustry() {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const [pending, setPending] = useState(false)
    const [jobByIndustries, setJobByIndustries] = useState([])

    const viewAllJob = (industryId) => {
        navigate(`/Job?industryId=${industryId}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            setPending(true)
            let result = await reportBusiness.getTotalJobByIndustry({ limit: 8 })
            setPending(false)
            if (result.data.httpCode === 200) {
                setJobByIndustries(result.data.objectData || [])
            }
        }
        fetchData()
    }, [])


    return (
        <div className="jh-box-item p-3 mt-3 mb-3 CompanyTop__bound">
            <h4 className="CompanyTop__title">{t("jobByIndustry.title")}</h4>
            {pending ? (<LoadingSpinner />) : (
                <Row>
                    {
                        jobByIndustries.map((jobByIndustry, index) => (
                            <Col xs={12} md={6} lg={3} key={index}>
                                <div className="JobByIndustry__child" onClick={() => viewAllJob(jobByIndustry.industryId)}>
                                    <div className="JobByIndustry__child-imgBox">
                                        <img
                                            className="JobByIndustry__child-img"
                                            src={jobByIndustry.imageUrl || default_img}
                                            alt="jobByIndustry.industryName" />
                                    </div>
                                    <div className="JobByIndustry__child-text">{jobByIndustry.industryName}</div>
                                    <div className="JobByIndustry__child-job">{`${jobByIndustry.totalJob} ${t("jobByIndustry.job")}`}</div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            )}
        </div>
    )
}

export default JobByIndustry