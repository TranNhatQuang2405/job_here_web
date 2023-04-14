import React from 'react'
import "./BlogSection.css"


const TYPES = {
    TEXT: 'TEXT',
    IMAGE: 'IMAGE',
    SIDE_BY_SIDE: 'SIDE_BY_SIDE',
}

function BlogSection({ section, index }) {


    const getContentHtml = () => {
        let result = []
        if (section.sectionData) {
            section.sectionData.forEach(data => {
                let textElement
                if (data.type === TYPES.TEXT) {
                    textElement = <div dangerouslySetInnerHTML={{__html: data.content || ""}}></div>
                } else if (data.type === TYPES.IMAGE) {
                    textElement = <img className="BlogSection__child-img" src={data.image} alt=""/>
                } else if (data.type === TYPES.SIDE_BY_SIDE) {
                    textElement = 
                        <div className="BlogSection__child-sideBySide">
                            <img className="BlogSection__child-img50" src={data.image} alt=""/>
                            <div className="BlogSection__child-text50" dangerouslySetInnerHTML={{__html: data.content || ""}}></div>
                        </div>
                }

                result.push(textElement)
            });
        } 
        return result;
    }

    return (
        <div id={`section-${index}`}>
            <h5>{`${index}. ${section.sectionName}`}</h5>
            {getContentHtml().map((Element, index) => 
                <div className="BlogSection__child" key={index}>
                    {Element}
                </div>      
            )}
        </div>
    )
}

export default BlogSection