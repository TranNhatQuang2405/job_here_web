import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateCVEducation, CreateCVExperience, CreateCVOverall, CreateCVSkill } from './Component'
import "./CreateCV.css"

function CreateCV() {

    const { t } = useTranslation()
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

    const changeImageData = (url) => {
        setCvData(prev => ({
            ...prev,
            "IMAGE": url
        }))
    }

    const changeOverallData = (overall) => {
        setCvData(prev => ({
            ...prev,
            "OVERALL": overall
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
            />
            <CreateCVSkill
                skillData={cvData.SKILL}
            />
            <CreateCVExperience
                experienceData={cvData.EXPERIENCE}
            />
        </div>
    )
}

export default CreateCV