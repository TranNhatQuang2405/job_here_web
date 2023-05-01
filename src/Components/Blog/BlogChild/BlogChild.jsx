import { CompanyLogo } from 'Components/Company'
import React from 'react'
import { Trash2Fill } from 'react-bootstrap-icons'
import { EditFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { converTimeToDate } from 'Config/Support/TimeSupport'
import "./BlogChild.css"

function BlogChild({ blog, isYour = false }) {

    return (
        <div className="BlogChild__bound">
            {isYour ?
                <div className="BlogChild__btn-box">
                    <Trash2Fill className="BlogChild__btn-icon" />
                    <EditFilled className="BlogChild__btn-icon" />
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