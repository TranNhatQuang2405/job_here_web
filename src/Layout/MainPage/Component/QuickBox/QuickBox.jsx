import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import QuickBox_blog from "Assets/Images/QuickBox_blog.png"
import QuickBox_CV from "Assets/Images/QuickBox_CV.png"
import { useNavigate } from 'react-router-dom'
import "./QuickBox.css"

function QuickBox() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const goToCreateCV = () => {
        navigate("/CV")
    }

    const goToBlog = () => {
        navigate("/Blog")
    }

    return (
        <div className="QuickBox__body">
            <Row className="QuickBox__bound">
                <Col
                    onClick={goToCreateCV}
                    className="QuickBox__createCV">
                    <div className="QuickBox__item-title">
                        {t("quickBox.createCV.title")}
                    </div>
                    <div className="d-flex w-100">
                        <div className="d-lg-block d-none QuickBox__item-content">
                            {t("quickBox.createCV.content")}
                        </div>
                        <img className="QuickBox__item-img" alt='QuickBox_CV' src={QuickBox_CV} />
                    </div>

                </Col>
                <Col
                    onClick={goToBlog}
                    className="QuickBox__goToBlog">
                    <div className="QuickBox__item-title">
                        {t("quickBox.goToBlog.title")}
                    </div>
                    <div className="d-flex w-100">
                        <div className="d-lg-block d-none QuickBox__item-content">
                            {t("quickBox.goToBlog.content")}
                        </div>
                        <img className="QuickBox__item-img" alt='QuickBox_blog' src={QuickBox_blog} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default QuickBox