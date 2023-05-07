import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import "./CVTemplateList.css"
import { CVTemplateListChild } from './Component'
function CVTemplateList() {
    const [templates, setTemplates] = useState([
        {
            templateId: 1,
            templateName: "Thành đạt 1",
            templateImg: "https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/prosper.png?v=1.0.6",
        },
        {
            templateId: 2,
            templateName: "Thành đạt 2",
            templateImg: "https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/prosper.png?v=1.0.6",
        },
        {
            templateId: 3,
            templateName: "Thành đạt 3",
            templateImg: "https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/prosper.png?v=1.0.6",
        },
        {
            templateId: 4,
            templateName: "Thành đạt 4",
            templateImg: "https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/prosper.png?v=1.0.6",
        },
        {
            templateId: 5,
            templateName: "Thành đạt 5",
            templateImg: "https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/prosper.png?v=1.0.6",
        }
    ])
    return (
        <div className='CVTemplate__box'>
            <Row className="jh-box-item CVTemplate__header">

            </Row>
            <Row className="jh-box-item CVTemplate__body">
                {templates.map((template) => (
                    <Col className="CVTemplate__child"
                        lg={3} xs={1} md={4}
                        key={template.templateId}
                    >
                        <CVTemplateListChild templateData={template} />
                    </Col>
                ))}
            </Row>
        </div>

    )
}

export default CVTemplateList