import React from 'react'
import { useTranslation } from 'react-i18next'
import "./CreateCV.css"
import { Avatar } from 'Components/Image'
import { Row, Col, Form } from 'react-bootstrap'
import { IconPlusAndMinus } from 'Components/Icon'

function CreateCV() {

    const { t } = useTranslation()

    return (
        <div className="jh-box-item CreateCV__box">
            <div className="CreateCV__title">{t("createCV.title")}</div>
            <Row>
                <Col xs={6} lg={2}>
                    <div className="CreateCV__titleBox">
                        {t("createCV.title.image")}
                    </div>
                    <Avatar width="180px" roundedCircle={false} />
                </Col>
                <Col xs={12} lg={10}>
                    <div className="CreateCV__titleBox">
                        {t("createCV.title.info")}
                    </div>
                    <div className="CreateCV__childBox">
                        <Row>
                            <Col md={6} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("createCV.info.name")}</Form.Label>
                                    <Form.Control
                                        className="CreateCV__input"
                                        placeholder={t("createCV.info.name.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("createCV.info.title")}</Form.Label>
                                    <Form.Control
                                        className="CreateCV__input"
                                        placeholder={t("createCV.info.title.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("createCV.info.email")}</Form.Label>
                                    <Form.Control
                                        className="CreateCV__input"
                                        placeholder={t("createCV.info.email.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("createCV.info.phone")}</Form.Label>
                                    <Form.Control
                                        type='phone'
                                        className="CreateCV__input"
                                        placeholder={t("createCV.info.phone.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("createCV.info.dateOfBirth")}</Form.Label>
                                    <Form.Control
                                        type='date'
                                        className="CreateCV__input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("createCV.info.overall")}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        className="CreateCV__input-textarea"
                                        placeholder={t("createCV.info.overall.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="CreateCV__titleBox">
                        {t("createCV.title.education")}
                    </div>
                    <div className="CreateCV__childBox">
                        <Row className="CreateCV__education-child mb-1">
                            <Col xs={12} lg={4}>
                                <Form.Group>
                                    <Form.Control
                                        className="CreateCV__input"
                                        placeholder={t("createCV.info.schoolName.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={3}>
                                <Form.Group >
                                    <Form.Control
                                        className="CreateCV__input"
                                        placeholder={t("createCV.info.year.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={4}>
                                <Form.Group>
                                    <Form.Control
                                        className="CreateCV__input"
                                        placeholder={t("createCV.info.major.placeHolder")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={1}>
                                <IconPlusAndMinus />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CreateCV