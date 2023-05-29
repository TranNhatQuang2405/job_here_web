import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IconPlusAndMinus } from 'Components/Icon'

function CreateCVExperience() {

    const { t } = useTranslation()

    return (
        <Row>
            <Col xs={12}>
                <div className="CreateCV__titleBox">
                    {t("createCV.title.experience")}
                </div>
                <div className="CreateCV__childBox">
                    <Row className="CreateCV__education-child mb-1">
                        <Col xs={11}>
                            <Row>
                                <Col xs={12} lg={5}>
                                    <Form.Group>
                                        <Form.Control
                                            className="CreateCV__input"
                                            placeholder={t("createCV.info.experience.companyName.placeHolder")}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={3}>
                                    <Form.Group >
                                        <Form.Control
                                            className="CreateCV__input"
                                            placeholder={t("createCV.info.experience.time.placeHolder")}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={4}>
                                    <Form.Group>
                                        <Form.Control
                                            className="CreateCV__input"
                                            placeholder={t("createCV.info.experience.position.placeHolder")}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        className="CreateCV__input-textarea"
                                        placeholder={t("createCV.info.overall.placeHolder")}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={1} lg={1}>
                            <IconPlusAndMinus />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default CreateCVExperience