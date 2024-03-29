import React, { useState, useEffect, useRef } from 'react'
import { CVBody } from 'Components/CV'
import { ButtonPrimary } from 'Components/Button'
import { useTranslation } from 'react-i18next'
import { cvBusiness } from 'Business'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print'
import "./ViewCV.css"

function ViewCV() {
    let { cvId } = useParams()
    const { t } = useTranslation()
    const [cvData, setCvData] = useState({})
    const email = useSelector(state => state.User.sessionInfo?.email)
    const navigate = useNavigate()
    const cvRef = useRef()

    useEffect(() => {
        const fetchData = async () => {
            let result = await cvBusiness.getCVContent(cvId)
            if (result.data.httpCode === 200) {
                try {
                    let cvContent = JSON.parse(result.data.objectData?.cvContent)
                    setCvData({
                        cvContent: cvContent,
                        templateData: { ...result.data.objectData?.cvTemplate }
                    })
                }
                catch (e) {
                    console.error(e);
                    navigate("/Home")
                }
            } else {
                navigate("/Home")
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cvId])

    const handleClose = () => {
        navigate(-1)
    }

    const handlePrintCV = useReactToPrint({
        content: () => cvRef.current
    });

    const handleEdit = () => {
        navigate(`/CVManage/EditCV/${cvId}`)
    }

    return (
        <div className="jh-box-item p-3">

            <div className="CVTemplatePage__btn">
                <ButtonPrimary secondary={true} onClick={handleClose}>{t("cvTemplate.btn.close")}</ButtonPrimary>
                {
                    email ?
                        <>
                            <ButtonPrimary onClick={handleEdit} className="ms-auto me-3">{t("cvTemplate.btn.editCV")}</ButtonPrimary>
                            <ButtonPrimary onClick={handlePrintCV}>{t("cvTemplate.btn.printCV")}</ButtonPrimary>
                        </> : <></>
                }
            </div>
            <CVBody cvData={cvData.cvContent} templateData={cvData.templateData} ref={cvRef} />
        </div>

    )
}

export default ViewCV