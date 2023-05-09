import { CompanyLogo } from 'Components/Company'
import React from 'react'
import { Trash2Fill } from 'react-bootstrap-icons'
import { EditFilled } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { converTimeToDate } from 'Config/Support/TimeSupport'
import { confirm, error } from 'Config/Redux/Slice/AlertSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import "./BlogChild.css"
import { blogBusiness } from 'Business'

function BlogChild({ blog, handleRemove, isYour = false }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const onDelete = async () => {
        dispatch(confirm({
            message: t("blog.delete.confirm"),
            title: t("blog.delete.title"),
            onConfirm: (() => handleDelete())
        }))
    }

    const handleDelete = async () => {
        let result = await blogBusiness.deleteBlog(blog.blogId)
        if (result.data.httpCode === 200) {
            handleRemove(blog.blogId)
        } else {
            dispatch(error({ title: t("blog.delete.title"), message: result.data.message }))
        }
    }

    return (
        <div className="BlogChild__bound">
            {isYour ?
                <div className="BlogChild__btn-box">
                    <Trash2Fill onClick={onDelete} className="BlogChild__btn-icon" />
                    <EditFilled onClick={() => navigate(`/Blog/Edit/${blog.blogId}`)}
                        className="BlogChild__btn-icon" />
                </div>
                :
                <></>
            }
            <CompanyLogo src={blog.imageUrl} size={200} className="BlogChild__avatar" />
            <div className="BlogChild__content">
                <Link to={`/Blog/${blog.blogId}`} className="BlogChild__content-title">{blog.blogName}</Link>
                <div className="BlogChild__content-date">{converTimeToDate(blog.createdDate)}</div>
                <div className="BlogChild__content-summary">{blog.description}</div>
                <div className="BlogChild__content-author">{blog.userName}</div>
            </div>
        </div>
    )
}

export default BlogChild