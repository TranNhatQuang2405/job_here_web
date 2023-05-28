import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import "./CVTemplateList.css"
import { cvBusiness } from 'Business'
import { CVTemplateListChild } from './Component'
function CVTemplateList() {
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let result = await cvBusiness.getListCVTemplate()
            if(result.data.httpCode === 200){
                setTemplates(result.data?.objectData?.pageData)
            }
        }
        fetchData()
        return () => {
        }
    }, [])


    return (
        <div className='CVTemplate__box'>
            <Row className="jh-box-item CVTemplate__header">

            </Row>
            <Row className="jh-box-item CVTemplate__body">
                {templates.map((template) => (
                    <Col className="CVTemplate__child"
                        lg={3} xs={1} md={4}
                        key={template.cvTemplateId}
                    >
                        <CVTemplateListChild templateData={template} />
                    </Col>
                ))}
            </Row>
        </div>

    )
}

export default CVTemplateList