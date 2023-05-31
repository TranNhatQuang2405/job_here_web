import React, { useState } from 'react'
import { Row, Col, Form, Spinner } from 'react-bootstrap'
import { Avatar } from 'Components/Image'
import { useTranslation } from 'react-i18next'
import { PencilSquare } from 'react-bootstrap-icons'
import { uploadBusiness } from 'Business'

function CreateCVOverall({
    imageData,
    overallData,
    titleData,
    contactData,
    changeImageData,
    changeOverallData,
    changeContactData,
    changeTitleData
}) {

    const { t } = useTranslation()
    const [pendingAvatar, setPendingAvatar] = useState(false)

    const handleChangeAvatar = async (e) => {
        if (e.target.files.length > 0) {
            setPendingAvatar(true);
            let result = await uploadBusiness.UploadImage(e.target.files[0]);
            if (result && result.data.httpCode === 200) {
                changeImageData(result.data.objectData.url);
            }
            setPendingAvatar(false);
        }
    }

    return (
        <Row>
            <Col xs={6} lg={2}>
                <div className="CreateCV__titleBox">
                    {t("createCV.title.image")}
                </div>
                <input
                    type="file"
                    className="d-none"
                    id="avatar"
                    name="avatar"
                    onChange={handleChangeAvatar}
                />
                <Avatar
                    width="180px"
                    roundedCircle={false}
                    url={imageData}
                >
                    <div>
                        <Form.Label htmlFor="avatar" className="EditUserInfo__lableAvatar">
                            <PencilSquare size="25" color="black" />
                        </Form.Label>
                    </div>
                    {pendingAvatar ? (
                        <div className="EditUserInfo__loadingAvatar">
                            <Spinner
                                animation="border"
                                variant="light"
                                className="EditUserInfo__loadingAvatar-child"
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </Avatar>
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
                                    value={titleData.name}
                                    id="name"
                                    onChange={changeTitleData}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("createCV.info.title")}</Form.Label>
                                <Form.Control
                                    className="CreateCV__input"
                                    placeholder={t("createCV.info.title.placeHolder")}
                                    id="title"
                                    value={titleData.title}
                                    onChange={changeTitleData}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("createCV.info.email")}</Form.Label>
                                <Form.Control
                                    className="CreateCV__input"
                                    placeholder={t("createCV.info.email.placeHolder")}
                                    id="email"
                                    value={contactData.email}
                                    onChange={changeContactData}
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
                                    id="phone"
                                    value={contactData.phone}
                                    onChange={changeContactData}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} xs={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("createCV.info.dateOfBirth")}</Form.Label>
                                <Form.Control
                                    type='date'
                                    className="CreateCV__input"
                                    id="dateOfBirth"
                                    value={contactData.dateOfBirth}
                                    onChange={changeContactData}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("createCV.info.overall")}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    id="overall"
                                    className="CreateCV__input-textarea"
                                    placeholder={t("createCV.info.overall.placeHolder")}
                                    value={overallData}
                                    onChange={changeOverallData}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default React.memo(CreateCVOverall)