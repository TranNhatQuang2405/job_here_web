import React, { useState, useEffect } from 'react'
import { CVContact, CVHobby, CVExperience, CVSkill, CVTitle, CVImage, CVOverall, CVEducation, CVAward, } from '..'
import "./CVBody.css"
import data from "./CVBodyDefaultData.json"
import { Col, Row } from 'react-bootstrap'
import { LoadingSpinner } from 'Components/Loading'

const CVBody = React.forwardRef((props, ref) => {

    const [templateData, setTemplateData] = useState({})
    const [pending, setPending] = useState(true)

    useEffect(() => {
        if(props?.templateData?.structure) {
            const templateDataRe =  props?.templateData;
            templateDataRe.structure = JSON.parse(templateDataRe.structure || {})
            setTemplateData(templateDataRe)
            setPending(false)
        }    
      return () => {
      }
    }, [props.templateData])
    
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

    const getExactElement = (cvDetailType, index) => {
        switch (cvDetailType) {
            case "CONTACT":
                return <CVContact key={index} cvData={cvData["CONTACT"]} />
            case "OVERALL":
                return <CVOverall key={index} cvData={cvData["OVERALL"]} />
            case "IMAGE":
                return <CVImage key={index} cvData={cvData["IMAGE"]} />
            case "EXPERIENCE":
                return <CVExperience key={index} cvData={cvData["EXPERIENCE"]} />
            case "SKILL":
                return <CVSkill key={index} cvData={cvData["SKILL"]} />
            case "EDUCATION":
                return <CVEducation key={index} cvData={cvData["EDUCATION"]} />
            case "TITLE":
                return <CVTitle key={index} cvData={cvData["TITLE"]} />
            case "HOBBY":
                return <CVHobby key={index} cvData={cvData["HOBBY"]} />
            case "AWARD":
                return <CVAward key={index} cvData={cvData["AWARD"]} />
            default:
                return <span className='d-none' key={index}></span>
        }
    }
    if(pending) {
        return <LoadingSpinner />
    }
    return (
        <div style={{ height: heighBoundCV() }}>
            <div className="CVBody__box" ref={ref} style={{ transform: `scale(${scaleCV()})` }}>
                <Row className="CVBody__row">
                    <Col xs={5} className={`CVBody__left ${templateData?.className}`}>
                        {
                            templateData?.structure?.left.map((cvDetailType, index) => (
                                getExactElement(cvDetailType, index)
                            ))
                        }
                    </Col>
                    <Col xs={7} className="CVBody__right CVTemplate-1">
                        {
                            templateData?.structure?.right.map((cvDetailType, index) => (
                                getExactElement(cvDetailType, index)
                            ))
                        }
                    </Col>
                </Row>
            </div>
        </div>

    )
})

export default CVBody