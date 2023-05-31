import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IconPlusAndMinus } from 'Components/Icon'

function CreateCVEducation({ educationData, addEducation, deleteEducation, changeEducationData }) {

    const { t } = useTranslation()

    return (
        <Row>
            <Col xs={12}>
                <div className="CreateCV__titleBox">
                    {t("createCV.title.education")}
                </div>
                <div className="CreateCV__childBox">
                    {educationData.map((value, index) => (
                        <Row key={index} className="CreateCV__education-child mb-1">
                            <Col xs={11}>
                                <Row>
                                    <Col xs={12} lg={5}>
                                        <Form.Group>
                                            <Form.Control
                                                name={index}
                                                id="schoolName"
                                                onChange={changeEducationData}
                                                value={value.schoolName}
                                                className="CreateCV__input"
                                                placeholder={t("createCV.info.schoolName.placeHolder")}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} lg={3}>
                                        <Form.Group >
                                            <Form.Control
                                                name={index}
                                                id="year"
                                                onChange={changeEducationData}
                                                value={value.year}
                                                className="CreateCV__input"
                                                placeholder={t("createCV.info.year.placeHolder")}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} lg={4}>
                                        <Form.Group>
                                            <Form.Control
                                                name={index}
                                                id="major"
                                                onChange={changeEducationData}
                                                value={value.major}
                                                className="CreateCV__input"
                                                placeholder={t("createCV.info.major.placeHolder")}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={1} lg={1}>
                                <IconPlusAndMinus
                                    onAdd={() => addEducation(index)}
                                    onDel={() => deleteEducation(index)}
                                />
                            </Col>
                        </Row>
                    ))}

                </div>
            </Col>
        </Row>)
}

export default CreateCVEducation