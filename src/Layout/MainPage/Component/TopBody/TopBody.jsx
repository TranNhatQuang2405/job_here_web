import React from 'react'
import background from "Assets/Images/background_main_page.jpg"
import { Image, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { ButtonPrimary } from 'Components/Button'
import { SearchOutlined } from '@ant-design/icons'
import "./TopBody.css"

function TopBody() {
    const { t } = useTranslation()

    return (
        <div className="mainPage__topBody">
            <Row>
                <Col lg={4}>
                    <div className="mainPage__topBody-content">
                        <h3 className="mainPage__topBody-title">{t("mainPage.topBody.title")}</h3>
                        <br />
                        <div className="mainPage__topBody-input">
                            <Input
                                size="large"
                                placeholder={t("Job, Position Name ...")}
                                prefix={<SearchOutlined className="me-2" />}
                            />
                            <ButtonPrimary>{t("jobSearch.btn")}</ButtonPrimary>

                        </div>
                    </div>

                </Col>
                <Col lg={8}>
                    <Image
                        className="mainPage__topBody-img"
                        src={background} />
                </Col>
            </Row>
        </div>
    )
}

export default TopBody