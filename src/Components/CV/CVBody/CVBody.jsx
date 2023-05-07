import React, { useState } from 'react'
import { CVContact, CVHobby, CVExperience, CVSkill, CVTitle, CVImage, CVOverall, CVEducation, CVAward, } from '..'
import "./CVBody.css"
import { Col, Row } from 'react-bootstrap'
const CVBody = React.forwardRef((props, ref) => {
    const scaleCV = () => {
        let widthScreen = window.innerWidth
        let widthCV = 794
        if (widthScreen >= widthCV)
            return 1
        else
            return (widthScreen - 16) / widthCV
    }
    const heighBoundCV = () => {
        let percent = scaleCV()
        return 1123 * percent + 16
    }
    const [cvData, setCvData] = useState([
        {
            cvDetailType: "IMAGE",
            left: true,
            content: ""
        },
        {
            cvDetailType: "OVERALL",
            left: true,
            content: "High-performance salesman with X years of experience in areas A, B, C. Strong skills include prospecting, closing sales and communicating. In the past, it has achieved over 15% KPI of the year. Currently looking for an opportunity to become a salesperson and contribute to company X's revenue growth."
        },
        {
            cvDetailType: "SKILL",
            left: true,
            content: [
                "Bán hàng trắng",
                "Mua thuốc lậu",
                "Trộm cướp",
                "Tàng trữ ma tuý"
            ]
        },
        {
            cvDetailType: "HOBBY",
            left: true,
            content: "Teambuilding, tham gia các câu lạc bộ, ca hát, văn nghệ, chơi thể thao"
        },
        {
            cvDetailType: "AWARD",
            left: true,
            content: [
                "SCPS™ - Chuyên viên bán hàng chuyên nghiệp quốc tế",
                "TOEIC 700"
            ]
        },
        {
            cvDetailType: "TITLE",
            left: false,
            content: {
                name: "Nguyen Van A",
                title: "FullStack Developer"
            }
        },
        {
            cvDetailType: "CONTACT",
            left: false,
            content: {
                email: "email@gmail.com",
                phone: "0909123123",
                dateOfBirth: "2022/12/12",
            }
        },
        {
            cvDetailType: "EXPERIENCE",
            left: false,
            content: [
                {
                    companyName: "Công ty A",
                    timeWork: "08/2021 - 08/2022",
                    title: "Nhân viên",
                    description: "Phục vụ nhóm 20 khách hàng lớn đem về doanh thu 5-10 tỉ mỗi năm cho công ty.Đánh giá nhu cầu khách hàng dựa trên mục tiêu công ty, cung và cầu của thị trường."
                },
                {
                    companyName: "Công ty B",
                    timeWork: "08/2022 - 08/2023",
                    title: "Quản lý",
                    description: "Phục vụ nhóm 20 khách hàng lớn đem về doanh thu 5-10 tỉ mỗi năm cho công ty.Đánh giá nhu cầu khách hàng dựa trên mục tiêu công ty, cung và cầu của thị trường."
                }
            ]
        },

        {
            cvDetailType: "EDUCATION",
            left: false,
            content: [
                {
                    schoolName: "DH Tôn Đức Thắng",
                    year: "2016 - 2022",
                    major: "Information Technology"
                }
            ]
        },
    ])

    const getExactElement = (value, index) => {
        switch (value.cvDetailType) {
            case "CONTACT":
                return <CVContact key={index} cvData={value} />
            case "OVERALL":
                return <CVOverall key={index} cvData={value} />
            case "IMAGE":
                return <CVImage key={index} cvData={value} />
            case "EXPERIENCE":
                return <CVExperience key={index} cvData={value} />
            case "SKILL":
                return <CVSkill key={index} cvData={value} />
            case "EDUCATION":
                return <CVEducation key={index} cvData={value} />
            case "TITLE":
                return <CVTitle key={index} cvData={value} />
            case "HOBBY":
                return <CVHobby key={index} cvData={value} />
            case "AWARD":
                return <CVAward key={index} cvData={value} />
            default:
                return <span className='d-none' key={index}></span>
        }
    }

    return (
        <div style={{ height: heighBoundCV() }}>
            <div className="CVBody__box" ref={ref} style={{ transform: `scale(${scaleCV()})` }}>
                <Row className="CVBody__row">
                    <Col xs={5} className="CVBody__left CVTemplate-1">
                        {cvData.map((value, index) => {
                            if (!value.left)
                                return <span className='d-none' key={index}></span>
                            else {
                                return getExactElement(value, index)
                            }
                        })}
                    </Col>
                    <Col xs={7} className="CVBody__right CVTemplate-1">
                        {cvData.map((value, index) => {
                            if (value.left)
                                return <span className='d-none' key={index}></span>
                            else {
                                return getExactElement(value, index)
                            }
                        })}
                    </Col>
                </Row>
            </div>
        </div>

    )
})

export default CVBody