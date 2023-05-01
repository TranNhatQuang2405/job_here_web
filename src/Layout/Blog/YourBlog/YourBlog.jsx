import { BlogChild } from 'Components/Blog'
import { ButtonPrimary } from 'Components/Button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { blogBusiness } from 'Business'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import "./YourBlog.css"

function YourBlog() {
    const { t } = useTranslation()
    const sessionInfo = useSelector((state) => state.User.sessionInfo);
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const goToCreateBlog = () => {
        navigate("/CreateBlog")
    }
    useEffect(() => {

        const fetchData = async () => {
            let result = await blogBusiness.getOwnerBlog()
            if (result.data.httpCode === 200) {
                setBlogs(result.data.objectData)
            }
        }
        if (!sessionInfo)
            navigate("/Home")
        else
            fetchData()
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
                blogs.map(blog => (
                    <BlogChild blog={blog} isYour={true} />
                ))
            }
        </div>
    )
}

export default YourBlog