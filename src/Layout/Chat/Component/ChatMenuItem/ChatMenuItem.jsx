import React from 'react'
import "./ChatMenuItem.css"
import { Avatar } from 'Components/Image'
import { convertToTimeString } from 'Config/Support/TimeSupport'
import { useTranslation } from 'react-i18next'



function ChatMenuItem({ messageData }) {

    const { t } = useTranslation()


    return (
        <div className="ChatMenuItem__box">
            <div className="ChatMenuItem__time">
                {convertToTimeString(messageData.createdDate, t)}
            </div>
            <Avatar url={messageData.companyImageUrl} className="ChatMenuItem__img" width="60px" />
            <div className="ChatMenuItem__mainContent">
                <div className="ChatMenuItem__name">{messageData.companyName}</div>
                <div className="ChatMenuItem__content">{messageData.content}</div>
            </div>
            {
                !messageData.fromUser && !messageData.hasRead && (
                    <div className="ChatMenuItem__hasNew">
                    </div>
                )
            }

        </div>
    )
}

export default ChatMenuItem