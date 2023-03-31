import React, { useState } from 'react'
import background from "Assets/Images/background_main_page.jpg"
import { Image, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { ButtonPrimary } from 'Components/Button'
import { SearchOutlined } from '@ant-design/icons'
import { ValidateTextAndNum } from 'Config/Validate'
import { useNavigate } from 'react-router-dom'
import "./TopBody.css"

function TopBody() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [keySearch, setKeySearch] = useState("")
    const handleChange = (e) => {
        let val = e.target.value
        if (ValidateTextAndNum(val))
            setKeySearch(val)
    }

    const handleSearch = () => {
        if (keySearch && keySearch.length > 0) {
            navigate(`/Job?q=${keySearch}`)
        }
    }

    return (
        <div className="mainPage__topBody">
            <Row>
                <Col lg={4}>
                    <div className="mainPage__topBody-content">
                        <h3 className="mainPage__topBody-title">{t("mainPage.topBody.title")}</h3>
                        <br />
                        <div className="mainPage__topBody-input">
                            <Input
                                value={keySearch}
                                onChange={handleChange}
                                size="large"
                                placeholder={t("Job, Position Name ...")}
                                prefix={<SearchOutlined className="me-2" />}
                            />
                            <ButtonPrimary onClick={handleSearch}>{t("jobSearch.btn")}</ButtonPrimary>
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