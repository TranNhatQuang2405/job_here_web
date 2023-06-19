import React, { useState } from 'react'
import { Input } from 'antd'
import { messageBusiness } from 'Business'
import { ButtonPrimary } from 'Components/Button'
import "./MessageInput.css"
import { SendFill } from 'react-bootstrap-icons'
import { Spinner } from 'react-bootstrap'

function MessageInput({ messageData }) {
    const [message, setMessage] = useState("")
    const [pending, setPending] = useState(false)
    const changeMessage = (e) => {
        setMessage(e.target.value)
    }
    const onSubmit = async () => {
        if (message.trim() !== "") {
            setPending(true)
            let params = {
                userId: messageData.userId,
                companyId: messageData.companyId,
                fromUser: true,
                content: message
            }
            await messageBusiness.chat(params)
            setMessage("")
            setPending(false)
        }
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await onSubmit()
        }
    }
    return (
        <div className="MessageInput__box">
            <Input
                value={message}
                onChange={changeMessage}
                size="large"
                onKeyDown={handleKeyDown}

            />
            <ButtonPrimary onClick={onSubmit}>
                {pending ? <Spinner animation='border' size='sm' variant="light" /> : <SendFill size={18} />}
            </ButtonPrimary>
        </div>
    )
}

export default MessageInput