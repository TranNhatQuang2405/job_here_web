import React from 'react'
import "./BlogRef.css"
import { Col } from 'react-bootstrap'
import { CompanyLogo } from 'Components/Company'
import { useNavigate } from 'react-router-dom'
function BlogRef({ blog }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/Blog/${blog.blogId}`)
    }
    return (
        <Col>
            <div className="BlogRef__box" onClick={handleClick} lg={3} md={6} xs={12}>
                <CompanyLogo src={blog.imageUrl} size={200} />
                <div className="BlogRef__name" to={`/Blog/${blog.blogId}`}>{blog.blogName}</div>
            </div>
        </Col>

    )
}

export default BlogRef