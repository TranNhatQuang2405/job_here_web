import { BlogChild } from 'Components/Blog'
import { ButtonPrimary } from 'Components/Button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { blogBusiness } from 'Business'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import "./YourBlog.css"
import { IconSpinner } from 'Components/Icon'

function YourBlog() {
    const { t } = useTranslation()
    const sessionInfo = useSelector((state) => state.User.sessionInfo);
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [pending, setPending] = useState(false)
    const goToCreateBlog = () => {
        navigate("/CreateBlog")
    }

    const removeBlogId = (blogId) => {
        let newBlogs = blogs.filter(x => x.blogId !== blogId)
        setBlogs(newBlogs)
    }

    useEffect(() => {
        const fetchData = async () => {
            setPending(true)
            let result = await blogBusiness.getOwnerBlog()
            if (result.data.httpCode === 200) {
                setBlogs(result.data.objectData)
            }
            setPending(false)
        }
        if (!sessionInfo)
            navigate("/Home")
        else
            fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="YourBlog__create-box">
                <ButtonPrimary onClick={goToCreateBlog} className="ms-3">
                    {t("blog.create.btn")}
                </ButtonPrimary>
            </div>
            <hr />
            {
                pending ? <IconSpinner /> :
                    blogs.map(blog => (
                        <BlogChild key={blog.blogId} blog={blog} isYour={true} handleRemove={removeBlogId} />
                    ))
            }
        </div>
    )
}

export default YourBlog