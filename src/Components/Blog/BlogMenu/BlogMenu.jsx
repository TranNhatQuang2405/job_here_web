import React from 'react'
import { useTranslation } from 'react-i18next'
import "./BlogMenu.css"

function BlogMenu({sections, index}) {
    const {t} = useTranslation()
  return (
    <div className="BlogMenu__box">
        <div className="BlogMenu__title">
            {t("blog.blogMenu.title")}
        </div>
        {
            sections.map((sectionName, index) => (
                <a  key={index}
                    className="BlogMenu__item" 
                    href={`#section-${index+1}`}
                >
                    {`${index + 1}. ${sectionName}`}
                </a>
            ))
        }
    </div>
  )
}

export default BlogMenu