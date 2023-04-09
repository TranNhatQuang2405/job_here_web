import React, { useState } from 'react'
import { ButtonPrimary } from 'Components/Button'
import { Modal, Form, Spinner } from 'react-bootstrap'
import { Rate } from 'antd'
import { error, warning, success } from 'Config/Redux/Slice/AlertSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { companyBusiness } from 'Business'
function CompanyAddComment({ companyId, show, setShow }) {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [commentData, setCommentData] = useState({
        companyId: companyId,
        title: "",
        content: "",
        rateScore: 5,
        recommended: true
    })
    const onHide = () => {
        setCommentData({
            companyId: companyId,
            title: "",
            content: "",
            rateScore: 5,
            recommended: true
        })
        setShow(false)
    }

    const changeStart = (start) => {
        console.log(start)
        setCommentData({
            ...commentData,
            rateScore: start
        })
    }

    const changeIsRecommend = (event) => {
        setCommentData({
            ...commentData,
            recommended: event.target.checked
        })
    }

    const submitAddComment = async () => {
        if (commentData.title.trim().length < 6) {
            dispatch(warning({
                message: t("company.addComment.error.title"),
                title: t("company.addComment.error")
            }))
        } else if (commentData.content.trim().length < 10) {
            dispatch(warning({
                message: t("company.addComment.error.content"),
                title: t("company.addComment.error")
            }))
        } else if (commentData.rateScore <= 0) {
            dispatch(warning({
                message: t("company.addComment.error.rateScore"),
                title: t("company.addComment.error")
            }))
        } else {
            setLoading(true)
            let result = await companyBusiness.AddComment(commentData)
            if (result.data.httpCode === 200) {
                dispatch(success({
                    message: result.data.message,
                    title: t("company.addComment"),
                    onHide: () => navigate(0)
                }))
            } else {
                dispatch(error({
                    message: result.data.message,
                    title: t("company.addComment")
                }))
            }
            setLoading(false)
        }
    }

    const changeTitle = (event) => {
        setCommentData({
            ...commentData,
            title: event.target.value
        })
    }

    const changeContent = (event) => {
        setCommentData({
            ...commentData,
            content: event.target.value
        })
    }

    return (
        <Modal centered show={show} onHide={onHide} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>{t("company.addComment.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label as="h6">{t("company.addComment.label.title")}</Form.Label>
                        <Form.Control
                            type="text"
                            value={commentData.title}
                            onChange={changeTitle}
                            placeholder={t("company.addComment.placeholder.title")}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label as="h6">{t("company.addComment.label.content")}</Form.Label>
                        <Form.Control
                            value={commentData.content}
                            onChange={changeContent}
                            as="textarea"
                            placeholder={t("company.addComment.placeholder.content")}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label as="h6">{t("company.addComment.label.start")}</Form.Label>
                        <div className="ms-3">
                            <Rate
                                onChange={changeStart}
                                className="CompanyPage_rating-start"
                                defaultValue={0}
                                value={commentData.rateScore}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            checked={commentData.recommended}
                            onChange={changeIsRecommend}
                            type="switch"
                            id="custom-switch"
                            label={t("company.addComment.label.isRecommend")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonPrimary onClick={submitAddComment}>
                    {loading ?
                        <Spinner animation='border'></Spinner> :
                        <>{t("company.addComment.btn")}</>
                    }
                </ButtonPrimary>
                <ButtonPrimary onClick={onHide} secondary={true}>
                    {t("company.addComment.close")}
                </ButtonPrimary>
            </Modal.Footer>
        </Modal>
    )
}

export default CompanyAddComment