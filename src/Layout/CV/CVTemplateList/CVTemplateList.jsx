import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import "./CVTemplateList.css"
import { cvBusiness } from 'Business'
import { CVTemplateListChild } from './Component'
function CVTemplateList() {
    const [templates, setTemplates] = useState([])
    const sortData = (x, y) => {
        if (x.cvTemplateId > y.cvTemplateId)
            return 1
        else return -1
    }
    useEffect(() => {
        const fetchData = async () => {
            let result = await cvBusiness.getListCVTemplate()
            if (result.data.httpCode === 200) {
                let data = result.data?.objectData?.pageData || []
                let sortedData = data.sort(sortData)
                setTemplates(sortedData)
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
                        lg={3} xs={12} md={6}
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