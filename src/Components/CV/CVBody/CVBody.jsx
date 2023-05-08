import React, { useState } from 'react'
import { CVContact, CVHobby, CVExperience, CVSkill, CVTitle, CVImage, CVOverall, CVEducation, CVAward, } from '..'
import "./CVBody.css"
import data from "./CVBodyDefaultData.json"
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
    const [cvData, setCvData] = useState(data)

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