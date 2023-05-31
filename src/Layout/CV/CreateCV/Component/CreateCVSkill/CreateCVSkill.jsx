import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IconPlusAndMinus } from 'Components/Icon'

function CreateCVSkill({
    skillData,
    changeSkillData,
    addSkill,
    deleteSkill,
    achievementData,
    addAchievement,
    deleteAchievement,
    changeAchievemenData
}) {

    const { t } = useTranslation()

    return (
        <Row>
            <Col xs={12} lg={6}>
                <div className="CreateCV__titleBox">
                    {t("createCV.title.skill")}
                </div>
                <div className="CreateCV__childBox">
                    {
                        skillData.map((value, index) => (
                            <Row key={index} className="CreateCV__education-child mb-1">
                                <Col xs={11} lg={9}>
                                    <Form.Group>
                                        <Form.Control
                                            name={index}
                                            value={value}
                                            onChange={changeSkillData}
                                            className="CreateCV__input"
                                            placeholder={t("createCV.info.skillName.placeHolder")}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={1} lg={3}>
                                    <IconPlusAndMinus
                                        onAdd={() => addSkill(index)}
                                        onDel={() => deleteSkill(index)}
                                    />
                                </Col>
                            </Row>
                        ))
                    }
                </div>
            </Col>
            <Col xs={12} lg={6}>
                <div className="CreateCV__titleBox">
                    {t("createCV.title.achievement")}
                </div>
                <div className="CreateCV__childBox">
                    {
                        achievementData.map((value, index) => (
                            <Row key={index} className="CreateCV__education-child mb-1">
                                <Col xs={11} lg={9}>
                                    <Form.Group>
                                        <Form.Control
                                            value={value}
                                            name={index}
                                            onChange={changeAchievemenData}
                                            className="CreateCV__input"
                                            placeholder={t("createCV.info.achievement.placeHolder")}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={1} lg={3}>
                                    <IconPlusAndMinus
                                        onAdd={() => addAchievement(index)}
                                        onDel={() => deleteAchievement(index)}
                                    />
                                </Col>
                            </Row>
                        ))
                    }

                </div>
            </Col>
        </Row>)
}

export default CreateCVSkill