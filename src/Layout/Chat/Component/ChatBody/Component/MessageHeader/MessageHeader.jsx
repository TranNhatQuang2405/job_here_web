import React from 'react'
import "./MessageHeader.css"
import { Avatar } from 'Components/Image'
function MessageHeader({ messageData }) {
    return (
        <div className="MessageHeader__box">
            <div>
                <Avatar width="60px" url={messageData.companyImageUrl} />
            </div>
            <div className="MessageHeader__name">
                <div>{messageData.companyName}</div>
            </div>
        </div>
    )
}

export default MessageHeader