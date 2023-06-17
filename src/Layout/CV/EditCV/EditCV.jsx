import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateCVEducation, CreateCVExperience, CreateCVOverall, CreateCVSkill } from '../CreateCV/Component'
import { cvBusiness } from 'Business'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { CVBody } from 'Components/CV'
import { ButtonPrimary } from 'Components/Button'
import { useDispatch } from 'react-redux'
import { warning, success, error } from 'Config/Redux/Slice/AlertSlice'
import { IconSpinner } from 'Components/Icon'
import { Form } from 'react-bootstrap';
import "./EditCV.css"

function EditCV() {
    let { cvId } = useParams()
    const email = useSelector(state => state.User.sessionInfo?.email)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [templateData, setTemplateData] = useState({})
    const [pending, setPending] = useState(false)
    const [editCVData, setEditCVData] = useState({ cvId: null, cvTemplateId: null, cvName: "", cvContent: "" })
    const [cvData, setCvData] = useState({})
    const [pendingInit, setPendingInit] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            let result = await cvBusiness.getCVContent(cvId)
            setPendingInit(false)
            if (result.data.httpCode === 200) {
                setTemplateData({ ...result.data?.objectData?.cvTemplate })
                let cvContent = result.data?.objectData?.cvContent || "{}"
                setCvData(JSON.parse(cvContent))
                setEditCVData({
                    cvId: result.data?.objectData?.cvId,
                    cvTemplateId: result.data?.objectData?.cvTemplate?.cvTemplateId,
                    cvName: result.data?.objectData?.cvName
                })
            } else {
                navigate("/Home")
            }
        }
        fetchData()
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cvId])

    useEffect(() => {
        if (email && cvId) {
            let data = localStorage.getItem(`editCV/${email}/${cvId}`);
            if (data) {
                let storageCVData = JSON.parse(data);
                setCvData(storageCVData)
            }
        }
    }, [email, cvId])

    useEffect(() => {
        const interval = setInterval(() => {
            if (email && cvId) {
                localStorage.setItem(`editCV/${email}/${cvId}`, JSON.stringify(cvData))
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
        if (editCVData && editCVData?.cvName?.trim().length === 0) {
            dispatch(warning({ message: t("createCV.cvName.alert"), title: t("editCV.submit.title") }))
        } else {
            setPending(true)
            let data = editCVData
            data.cvContent = JSON.stringify(cvData)
            let result = await cvBusiness.editCV(data)
            if (result.data.httpCode === 200) {
                dispatch(success({ message: result.data.message, title: t("editCV.submit.title") }))
                setTimeout(() => {
                    navigate("/CVManage?tab=1")
                }, 2000)
            } else {
                dispatch(error({ message: result.data.message, title: t("editCV.submit.title") }))
            }
            setPending(false)
        }
    }

    const cancel = () => {
        navigate("/CVTemplate")
    }

    const changeCVName = (e) => {
        setEditCVData(prev => (
            {
                ...prev,
                cvName: e.target.value
            }
        ))
    }

    if (pendingInit)
        return (
            <div className="jh-box-item CreateCV__box">
                <IconSpinner />
            </div>
        )
    else
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
                            value={editCVData.cvName}
                            onChange={changeCVName}
                            className="CreateCV__cvName"
                            placeholder={t("createCV.cvName.placeHolder")}
                        />
                    </Form.Group>
                    <ButtonPrimary onClick={cancel} secondary={true}>{t("createCV.btn.cancel")}</ButtonPrimary>
                    <ButtonPrimary onClick={createCV}>
                        {pending ?
                            <IconSpinner variant="dark" /> :
                            t("createCV.btn.edit")
                        }
                    </ButtonPrimary>
                </div>
            </div>
        )
}

export default EditCV