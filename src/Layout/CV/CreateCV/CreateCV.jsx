import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateCVEducation, CreateCVExperience, CreateCVOverall, CreateCVSkill } from './Component'
import "./CreateCV.css"
import { cvBusiness } from 'Business'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { CVBody } from 'Components/CV'
import { ButtonPrimary } from 'Components/Button'

function CreateCV() {
    let { templateId } = useParams()
    const email = useSelector(state => state.User.sessionInfo?.email)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [templateData, setTemplateData] = useState({})
    const [cvData, setCvData] = useState({
        "IMAGE": "",
        "OVERALL": "High-performance salesman with X years of experience in areas A, B, C. Strong skills include prospecting, closing sales and communicating. In the past, it has achieved over 15% KPI of the year. Currently looking for an opportunity to become a salesperson and contribute to company X's revenue growth.",
        "SKILL": [
            "Search for potential customers",
            "Sales closing",
            "Knowledge of a, b, c areas",
            "Maintain customer relationship"
        ],
        "HOBBY": "Teambuilding, joining clubs, singing, performing arts, playing sports",
        "AWARD": [
            "SCPS International Sales Professional",
            "TOEIC 700"
        ],
        "TITLE": {
            "name": "Nguyen Van A",
            "title": "SALES STAFF"
        },
        "CONTACT": {
            "email": "email@gmail.com",
            "phone": "0909123123",
            "dateOfBirth": "2022-12-12"
        },
        "EXPERIENCE": [
            {
                "companyName": "ABC Company",
                "timeWork": "08/2021 - 08/2022",
                "title": "Sales Staff",
                "description": "Support a group of 20 large customers bringing in revenue of 5-10 billion per year for the company. Assess customer needs based on company goals, market supply and demand."
            },
            {
                "companyName": "BCD Company",
                "timeWork": "08/2022 - 08/2023",
                "title": "Manager",
                "description": "Take care of 500 old customers, develop 200 new customers. Consulting 1000+ customers about the company's products and services"
            }
        ],
        "EDUCATION": [
            {
                "schoolName": "Jobhere University",
                "year": "2016 - 2022",
                "major": "Business Administration"
            }
        ]
    })

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
                <ButtonPrimary secondary={true}>{t("createCV.btn.cancel")}</ButtonPrimary>
                <ButtonPrimary>{t("createCV.btn.create")}</ButtonPrimary>
            </div>
        </div>
    )
}

export default CreateCV