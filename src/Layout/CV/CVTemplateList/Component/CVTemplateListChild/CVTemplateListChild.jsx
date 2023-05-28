import React from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "./CVTemplateListChild.css"

function CVTemplateListChild({ templateData }) {
    const navigate = useNavigate()
    const gotoTemplatePage = () => {
        navigate(`/CVTemplate/${templateData.cvTemplateId}`)
    }
    return (
        <div className="CVTemplateListChild__box" onClick={gotoTemplatePage}>
            <Image className="CVTemplateListChild__img" src={templateData.imageUrl} />
            <div className="CVTemplateListChild__name">{templateData.templateName}</div>
        </div>
    )
}

export default CVTemplateListChild