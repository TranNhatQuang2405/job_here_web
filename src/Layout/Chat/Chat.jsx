import React, { useState, useEffect } from 'react'
import SockJsClient from 'react-stomp';
import "./Chat.css"
import { Row, Col } from 'react-bootstrap';
import { ChatBody, ChatMenuItem } from './Component';
import { SOCKET_URL } from 'Config/Api/Host';
import { messageBusiness } from 'Business';
import { useSelector } from 'react-redux';
import { TOPIC_MESSAGES_USER } from 'Config/Support/PathSupport';

function Chat() {
    const email = useSelector(state => state.User.sessionInfo?.email)
    const topic = `${TOPIC_MESSAGES_USER}/${email}`
    const [messages, setMessages] = useState([])
    const [hasChange, setHasChange] = useState(false)
    let onConnected = () => {
    }

    let onMessageReceived = (msg) => {
        setHasChange(prev => !prev)
    }

    useEffect(() => {
        const fetchData = async () => {
            let result = await messageBusiness.getListMessage()
            if (result?.data?.httpCode === 200) {
                setMessages(result?.data?.objectData || [])
            }
        }
        fetchData()

    }, [hasChange])


    return (
        <Row className="Chat__box ">
            <SockJsClient
                url={SOCKET_URL}
                topics={[topic]}
                onConnect={onConnected}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            <Col className="Chat__menu fix_scroll" xs={4}>
                {messages.map((message, index) => (
                    <ChatMenuItem key={index} messageData={message} />
                ))}
            </Col>
            <Col xs={8} className="p-0 Chat__content">
                <ChatBody />
            </Col>
        </Row>
    )
}

export default Chat