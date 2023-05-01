import React from 'react'
import "./BlogPage.css"
import { PathTree } from 'Components/Path'
import { useState, useEffect } from 'react'
import { blogBusiness } from 'Business'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { converTimeToDate } from 'Config/Support/TimeSupport'
import { LoadingPage } from 'Layout/Common'
import { BlogRef } from './Component'
import { useTranslation } from 'react-i18next'
import { Col, Row } from 'react-bootstrap'


function BlogPage() {
    const { blogId } = useParams()
    const [pending, setPending] = useState(true)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({
        blogId: "",
        blogName: "",
        content: "",
        description: "",
        createdDate: "",
        userName: "",
        industryName: "",
        industryId: 1,
        blogRefs: []
    })
    useEffect(() => {
        const fetchData = async () => {
            let result = await blogBusiness.getBlogById(blogId, true);
            if (result.data.httpCode === 200) {
                setBlogData(result.data.objectData)
            } else {
                navigate("/Home")
            }
            setPending(false)
        }
        if (pending)
            fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        pending ? <LoadingPage /> :
            <>
                <div className="BlogPage__box jh-box-item">
                    <PathTree lastPath={blogData.blogName} />
                    <div className="BlogPage__industry">{blogData.industryName}</div>
                    <div className="BlogPage__name">{blogData.blogName}</div>
                    <div className="BlogPage__time">{converTimeToDate(blogData.createdDate)}</div>
                    <div className="BlogPage__description">{blogData.description}</div>
                    <div className="BlogPage__mainContent" dangerouslySetInnerHTML={{ __html: blogData.content || "" }}></div>
                    <div className="BlogPage__author">{blogData.userName}</div>
                </div>
                {
                    blogData.blogRefs.length > 0 ?
                        <Row className="mt-2 jh-box-item BlogPage__ref">
                            <Col className="BlogPage__refTitle" xs={12}>{t("blogPage.refTitle")}</Col>
                            {blogData.blogRefs.map(blog => (
                                <BlogRef blog={blog} key={blog.blogId} />
                            ))}
                        </Row> : <></>
                }
            </>
    )
}

export default BlogPage