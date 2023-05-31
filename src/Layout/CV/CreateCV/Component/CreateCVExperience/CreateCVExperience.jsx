import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IconPlusAndMinus } from 'Components/Icon'

function CreateCVExperience({ experienceData, addExperience, deleteExperience, changeExperienceData }) {

    const { t } = useTranslation()

    return (
        <Row>
            <Col xs={12}>
                <div className="CreateCV__titleBox">
                    {t("createCV.title.experience")}
                </div>
                <div className="CreateCV__childBox">
                    {
                        experienceData.map((value, index) => (
                            <Row key={index} className="CreateCV__education-child mb-1">
                                <Col xs={11}>
                                    <Row>
                                        <Col xs={12} lg={5}>
                                            <Form.Group>
                                                <Form.Control
                                                    name={index}
                                                    id="companyName"
                                                    value={value.companyName}
                                                    onChange={changeExperienceData}
                                                    className="CreateCV__input"
                                                    placeholder={t("createCV.info.experience.companyName.placeHolder")}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} lg={3}>
                                            <Form.Group >
                                                <Form.Control
                                                    name={index}
                                                    id="timeWork"
                                                    value={value.timeWork}
                                                    onChange={changeExperienceData}
                                                    className="CreateCV__input"
                                                    placeholder={t("createCV.info.experience.timeWork.placeHolder")}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} lg={4}>
                                            <Form.Group>
                                                <Form.Control
                                                    name={index}
                                                    id="title"
                                                    value={value.title}
                                                    onChange={changeExperienceData}
                                                    className="CreateCV__input"
                                                    placeholder={t("createCV.info.experience.title.placeHolder")}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Form.Control
                                                name={index}
                                                id="description"
                                                value={value.description}
                                                onChange={changeExperienceData}
                                                as="textarea"
                                                rows={4}
                                                className="CreateCV__input-textarea"
                                                placeholder={t("createCV.info.description.placeHolder")}
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xs={1} lg={1}>
                                    <IconPlusAndMinus
                                        onAdd={() => addExperience(index)}
                                        onDel={() => deleteExperience(index)}
                                    />
                                </Col>
                            </Row>
                        ))
                    }
                </div>
            </Col>
        </Row>
    )
}

export default CreateCVExperience