import React from 'react'
import logo from "Assets/Images/logo_no_text.png";
import logo_title from "Assets/Images/title.png";
import "./Logo.css"

function Logo() {
    return (
        <div className="Logo__layout">
            <img
                alt="Job Here"
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                style={{ marginRight: 10 }}
            />
            <img src={logo_title} alt="Job Here" height="24" />
        </div>
    )
}

export default Logo