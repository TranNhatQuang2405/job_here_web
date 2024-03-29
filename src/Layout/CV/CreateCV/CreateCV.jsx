import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateCVEducation, CreateCVExperience, CreateCVOverall, CreateCVSkill } from './Component'
import { cvBusiness } from 'Business'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { CVBody } from 'Components/CV'
import { ButtonPrimary } from 'Components/Button'
import { useDispatch } from 'react-redux'
import { warning, success, error } from 'Config/Redux/Slice/AlertSlice'
import { IconSpinner } from 'Components/Icon'
import { Form } from 'react-bootstrap';
import data from "Components/CV/CVBody/CVBodyDefaultData.json"
import "./CreateCV.css"


function CreateCV() {
    let { templateId } = useParams()
    const email = useSelector(state => state.User.sessionInfo?.email)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [templateData, setTemplateData] = useState({})
    const [pending, setPending] = useState(false)
    const [createCvData, setCreateCvData] = useState({ cvTemplateId: Number(templateId), cvName: "", cvContent: "" })
    const [cvData, setCvData] = useState(data)

    useEffect(() => {
        const fetchData = async () => {
            let result = await cvBusiness.getCVTemplate(templateId)
            if (result.data.httpCode === 200) {
                setTemplateData({ ...result.data.objectData })
            } else {
                navigate("/Home")
            }
        }
        fetchData()
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templateId])

    useEffect(() => {
        if (email && templateId) {
            let data = localStorage.getItem(`createCV/${email}/${templateId}`);
            if (data) {
                let storageCVData = JSON.parse(data);
                setCvData(storageCVData)
            }
        }
    }, [email, templateId])

    useEffect(() => {
        const interval = setInterval(() => {
            if (email && templateId) {
                localStorage.setItem(`createCV/${email}/${templateId}`, JSON.stringify(cvData))
            }
        }, 5000);
        return () => {
            clearInterval(interval)
        }
    })



    const changeImageData = (url) => {
        setCvData(prev => ({
            ...prev,
            "IMAGE": url
        }))
    }

    const changeOverallData = (e) => {
        setCvData(prev => ({
            ...prev,
            "OVERALL": e.target.value
        }))
    }

    const changeContactData = (e) => {
        setCvData(prev => ({
            ...prev,
            "CONTACT": {
                ...prev["CONTACT"],
                [e.target.id]: e.target.value
            },
        }))
    }
    const changeTitleData = (e) => {
        setCvData(prev => ({
            ...prev,
            "TITLE": {
                ...prev["TITLE"],
                [e.target.id]: e.target.value
            },
        }))
    }

    const addDataInList = (index, PARENT, pureData) => {
        let datas = cvData[PARENT]
        datas.splice(index + 1, 0, pureData)
        setCvData(prev => ({
            ...prev,
            [PARENT]: [...datas],
        }))
    }

    const deleteDataInList = (index, PARENT) => {
        let datas = cvData[PARENT]
        if (datas && datas.length > 1 && index < datas.length) {
            datas.splice(index, 1)
        }
        setCvData(prev => ({
            ...prev,
            [datas]: [...datas],
        }))
    }

    const changeDataInList = (e, PARENT) => {
        try {
            let index = e.target.name * 1
            let key = e.target.id
            let value = e.target.value
            let educations = cvData[PARENT]
            if (key && key.trim() !== '')
                educations[index][key] = value
            else
                educations[index] = value
            setCvData(prev => ({
                ...prev,
                [PARENT]: [...educations],
            }))
        } catch (e) {
            console.log(e);
        }
    }

    const addSkill = (index) => {
        addDataInList(index, "SKILL", "")
    }

    const deleteSkill = (index) => {
        deleteDataInList(index, "SKILL")
    }

    const addEducation = (index) => {
        addDataInList(index, "EDUCATION", {
            "schoolName": "",
            "year": "",
            "major": ""
        })
    }

    const deleteEducation = (index) => {
        deleteDataInList(index, "EDUCATION")
    }

    const addAchievement = (index) => {
        addDataInList(index, "AWARD", "")
    }
    const deleteAchievement = (index) => {
        deleteDataInList(index, "AWARD")
    }

    const addExperience = (index) => {
        addDataInList(index, "EXPERIENCE", {
            "companyName": "",
            "timeWork": "",
            "title": "",
            "description": ""
        },)
    }
    const deleteExperience = (index) => {
        deleteDataInList(index, "EXPERIENCE")
    }

    const createCV = async () => {
        if (createCvData && createCvData?.cvName?.trim().length === 0) {
            dispatch(warning({ message: t("createCV.cvName.alert"), title: t("createCV.submit.title") }))
        } else {
            setPending(true)
            let data = createCvData
            data.cvContent = JSON.stringify(cvData)
            let result = await cvBusiness.createCV(data)
            if (result.data.httpCode === 200) {
                dispatch(success({ message: result.data.message, title: t("createCV.submit.title") }))
                setTimeout(() => {
                    navigate("/CVManage?tab=1")
                }, 2000)
            } else {
                dispatch(error({ message: result.data.message, title: t("createCV.submit.title") }))
            }
            setPending(false)
        }
    }

    const cancel = () => {
        navigate("/CVTemplate")
    }

    const changeCVName = (e) => {
        setCreateCvData(prev => (
            {
                ...prev,
                cvName: e.target.value
            }
        ))
    }

    return (
        <div className="jh-box-item CreateCV__box">
            <div className="CreateCV__title">{t("createCV.title")}</div>
            <CreateCVOverall
                imageData={cvData.IMAGE}
                overallData={cvData.OVERALL}
                titleData={cvData.TITLE}
                contactData={cvData.CONTACT}
                changeImageData={changeImageData}
                changeOverallData={changeOverallData}
                changeContactData={changeContactData}
                changeTitleData={changeTitleData}
            />
            <CreateCVEducation
                educationData={cvData.EDUCATION}
                addEducation={addEducation}
                deleteEducation={deleteEducation}
                changeEducationData={(e) => changeDataInList(e, "EDUCATION")}
            />
            <CreateCVSkill
                skillData={cvData.SKILL}
                addSkill={addSkill}
                deleteSkill={deleteSkill}
                changeSkillData={(e) => changeDataInList(e, "SKILL")}
                achievementData={cvData.AWARD}
                addAchievement={addAchievement}
                deleteAchievement={deleteAchievement}
                changeAchievemenData={(e) => changeDataInList(e, "AWARD")}

            />
            <CreateCVExperience
                experienceData={cvData.EXPERIENCE}
                addExperience={addExperience}
                deleteExperience={deleteExperience}
                changeExperienceData={(e) => changeDataInList(e, "EXPERIENCE")}
            />
            <div className="CreateCV__title mt-3">{t("createCV.review")}</div>
            <CVBody templateData={templateData} cvData={cvData}></CVBody>
            <div className="CreateCV__btn">
                <Form.Group>
                    <Form.Control
                        id="cvName"
                        value={createCvData.cvName}
                        onChange={changeCVName}
                        className="CreateCV__cvName"
                        placeholder={t("createCV.cvName.placeHolder")}
                    />
                </Form.Group>
                <ButtonPrimary onClick={cancel} secondary={true}>{t("createCV.btn.cancel")}</ButtonPrimary>
                <ButtonPrimary onClick={createCV}>
                    {pending ?
                        <IconSpinner variant="dark" /> :
                        t("createCV.btn.create")
                    }
                </ButtonPrimary>
            </div>
        </div>
    )
}

export default CreateCV