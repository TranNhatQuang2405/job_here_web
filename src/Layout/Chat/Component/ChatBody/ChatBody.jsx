import React from 'react'
import { MessageHeader, MessageInput, MessageLeft, MessageRight } from './Component'
import "./ChatBody.css"

function ChatBody({ currentMessage, childMessages }) {

    if (!currentMessage)
        return <></>
    else
        return (
            <div className="ChatBody__box">
                <MessageHeader messageData={currentMessage} />
                <div className="ChatBody__listMessage fix_scroll">
                    {
                        childMessages && childMessages.map((childMessage, index) => {
                            if (childMessage.fromUser)
                                return <MessageRight key={index} content={childMessage.content} avatar={currentMessage.userImageUrl} />
                            else
                                return <MessageLeft key={index} content={childMessage.content} avatar={currentMessage.companyImageUrl} />
                        })
                    }
                </div>
                <MessageInput messageData={currentMessage} />
            </div>
        )
}

export default ChatBody