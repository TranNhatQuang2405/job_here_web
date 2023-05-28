import React, { useState, useEffect } from 'react'
import { CVBody } from 'Components/CV'
import "./CVTemplatePage.css"
import { ButtonPrimary } from 'Components/Button'
import { useTranslation } from 'react-i18next'
import { cvBusiness } from 'Business'
import { useNavigate, useParams } from 'react-router-dom'

function CVTemplatePage() {
    let { templateId } = useParams()
    const { t } = useTranslation()
    const [templateData, setTemplateData] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            let result = await cvBusiness.getCVTemplate(templateId)
            if(result.data.httpCode === 200) {
                setTemplateData({...result.data.objectData})
            } else {
                navigate("/Home")
            }
        }
        fetchData()
        return () => {
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templateId])


    const handleUseTemplate = () => {
        navigate(`/CVManage/CreateCV/${templateId}`)
    }
    return (
        <div>
            <div className="CVTemplatePage__btn">
                <ButtonPrimary secondary={true}>{t("cvTemplate.btn.close")}</ButtonPrimary>
                <ButtonPrimary onClick={handleUseTemplate}>{t("cvTemplate.btn.useTemplate")}</ButtonPrimary>
            </div>
            <CVBody templateData={templateData}></CVBody>
        </div>

    )
}

export default CVTemplatePage