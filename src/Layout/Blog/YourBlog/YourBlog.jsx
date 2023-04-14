import { BlogChild } from 'Components/Blog'
import { ButtonPrimary } from 'Components/Button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import React from 'react'

import "./YourBlog.css"

function YourBlog() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const goToCreateBlog = () => {
        navigate("/CreateBlog")
    }
    return (
        <div>
            <div className="YourBlog__create-box">
                <ButtonPrimary onClick={goToCreateBlog} className="ms-3">
                    {t("blog.create.btn")}
                </ButtonPrimary>
            </div>
            <hr />
            <BlogChild isYour={true} />
        </div>
    )
}

export default YourBlog