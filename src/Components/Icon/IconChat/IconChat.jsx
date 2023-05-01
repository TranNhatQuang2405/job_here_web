import React, { useEffect, useState } from 'react'
import { ChatDotsFill } from 'react-bootstrap-icons'
import { messageBusiness } from 'Business'
import SockJsClient from 'react-stomp';
import { SOCKET_URL } from 'Config/Api/Host';
import { TOPIC_MESSAGES_USER } from 'Config/Support/PathSupport';
import { useSelector } from 'react-redux';
import "./IconChat.css"

function IconChat() {
    const email = useSelector(state => state.User.sessionInfo?.email)
    const topicMessages = `${TOPIC_MESSAGES_USER}/${email}`
    const [hasChange, setHasChange] = useState(false)
    const [count, setCount] = useState(0)

    const onMessageReceived = (msg) => {
        setHasChange(prev => !prev)
    }

    useEffect(() => {
        const fetchData = async () => {
            let result = await messageBusiness.countUnreadMessage()
            if (result.data.httpCode === 200) {
                if (count > 9)
                    setCount("9+")
                else
                    setCount(result.data.objectData)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasChange])

    return (
        <div className="IconChat__box">
            <SockJsClient
                url={SOCKET_URL}
                topics={[topicMessages]}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            <ChatDotsFill />
            {count > 0 || count === "9+" ?
                <div className="IconChat__num">
                    {count}
                </div> : <></>
            }
        </div>
    )
}

export default IconChat