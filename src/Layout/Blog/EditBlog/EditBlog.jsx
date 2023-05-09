import React, { useState, useEffect } from 'react'
import { ButtonPrimary } from 'Components/Button'
import { useTranslation } from 'react-i18next'
import { Col, Form, Row, Spinner } from 'react-bootstrap'
import { blogBusiness, dropdownBusiness } from 'Business'
import { Select } from 'antd'
import "./EditBlog.css"
import { QuillToolBar } from 'Components/Editer'
import { modules, formats } from 'Components/Editer/QuillToolBar/QuillToolBar'
import ReactQuill from 'react-quill'
import { useDispatch } from 'react-redux'
import { warning, success, error } from 'Config/Redux/Slice/AlertSlice'
import { useNavigate, useParams } from 'react-router-dom'

function EditBlog() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { blogId } = useParams()
    const [params, setParams] = useState({})
    const [pending, setPending] = useState(false)
    const [industries, setIndustries] = useState([])
    const handleClose = () => {
        navigate("/YourBlog")
    }
    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            list.push(dropdownBusiness.IndustryDropdown())
            list.push(blogBusiness.getBlogById(blogId))
            let results = await Promise.all(list);
            if (!results.find((x) => x.data.httpCode !== 200)) {
                let industryTmp = results[0].data.objectData.map((item) => ({
                    value: item.industryId,
                    label: item.industryName,
                }));
                setIndustries(industryTmp)
                setParams({ ...results[1]?.data?.objectData })
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeIndustryField = (e) => {
        setParams(prev => ({
            ...prev,
            industryId: e || null
        }))
    }
    const handleChange = (e) => {
        setParams(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    const handleChangeContent = (content, delta, source, editor) => {
        setParams(prev => ({
            ...prev,
            content: content
        }))
    }
    const _filterOption = (input, option) =>
        (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase());

    const _filterSort = (optionA, optionB) =>
        (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase());
    const handleSubmit = async () => {
        let title = t("editBlog.modal.title")
        if (params.blogName.length < 10) {
            dispatch(warning({ "title": title, "message": t("createBlog.warning.blogName") }))
        } else if (params.description.length < 100) {
            dispatch(warning({ "title": title, "message": t("createBlog.warning.description") }))
        } else if (params.industryId === 0 || !params.industryId) {
            dispatch(warning({ "title": title, "message": t("createBlog.warning.industry") }))
        } else if (params.content.length < 300) {
            dispatch(warning({ "title": title, "message": t("createBlog.warning.content") }))
        } else {
            setPending(true)
            let result = await blogBusiness.editBlog(params)
            setPending(false)
            if (result.data.httpCode === 200) {
                dispatch(success({ "title": title, "message": result.data.message, "onHide": handleClose }))
            } else {
                dispatch(error({ "title": title, "message": result.data.message }))
            }
        }
    }

    return (
        <div className="CreateBlog__box jh-box-item">
            <div className="CreateBlog__boxBtn">
                <ButtonPrimary onClick={handleClose} className="me-3" secondary={true}>{t("createBlog.btn.cancel")}</ButtonPrimary>
                <ButtonPrimary onClick={handleSubmit}>
                    {pending ? <Spinner animation='border' size='sm' /> :
                        t("createBlog.btn.save")
                    }
                </ButtonPrimary>
            </div>
            <Form>
                <Row>
                    <Col md={6} lg={8} xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="CreateBlog__title">{t("createBlog.label.name")}</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                id="blogName"
                                value={params.blogName}
                                type="text"
                                placeholder={t("createBlog.placeHolder.name")} />
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={4} xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="CreateBlog__title">{t("createBlog.label.industry")}</Form.Label>
                            <div className="JobSearch__input-data me-3">
                                <span className="JobSearch__input-icon">
                                    <i className="bi bi-briefcase-fill" />
                                </span>
                                <Select
                                    showSearch
                                    className="form-control AllBlogPage__select JobSearch__input jh-box-input"
                                    placeholder={t("createBlog.placeHolder.industry")}
                                    optionFilterProp="children"
                                    filterOption={_filterOption}
                                    filterSort={_filterSort}
                                    onSelect={onChangeIndustryField}
                                    options={industries}
                                    value={params.industryId}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="CreateBlog__title">{t("createBlog.label.description")}</Form.Label>
                            <Form.Control
                                value={params.description}
                                id="description"
                                onChange={handleChange}
                                as="textarea"
                                rows={5}
                                placeholder={t("createBlog.placeHolder.description")} />
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="CreateBlog__title">{t("createBlog.label.content")}</Form.Label>
                            <QuillToolBar />
                            <ReactQuill
                                className="CreateBlog__content"
                                onChange={handleChangeContent}
                                value={params.content}
                                theme="snow"
                                modules={modules}
                                formats={formats} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default EditBlog