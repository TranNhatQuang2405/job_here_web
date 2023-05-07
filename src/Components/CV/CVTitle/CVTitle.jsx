import React from 'react'
import "./CVTitle.css"

function CVTitle({ cvData }) {
    return (
        <div className="CVTitle__box">
            <div className="CVTitle__name">{cvData.content.name}</div>
            <div className="CVTitle__title">{cvData.content.title}</div>
        </div>
    )
}

export default CVTitle