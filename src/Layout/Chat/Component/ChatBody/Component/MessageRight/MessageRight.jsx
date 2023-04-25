import { Avatar } from 'Components/Image'
import React from 'react'
import "./MessageRight.css"

function MessageRight({ content, avatar }) {
    return (
        <div className="MessageRight__box">
            <Avatar url={avatar} width="40px" />
            <div className="MessageRight__text">{content}</div>
        </div>
    )
}

export default MessageRight