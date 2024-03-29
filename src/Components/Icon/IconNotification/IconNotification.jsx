import React, { useState, useEffect } from 'react'
import SockJsClient from 'react-stomp';
import { SOCKET_URL } from 'Config/Api/Host';
import { TOPIC_MESSAGES_USER } from 'Config/Support/PathSupport';
import { useSelector } from 'react-redux';
import { BellFill, EnvelopeOpenFill } from 'react-bootstrap-icons';
import { notificationBusiness } from 'Business';
import { useTranslation } from 'react-i18next';
import "./IconNotification.css"
import { convertToTimeString } from 'Config/Support/TimeSupport';
function IconNotification() {
    const { t } = useTranslation()
    const email = useSelector(state => state.User.sessionInfo?.email)
    const topicMessages = `${TOPIC_MESSAGES_USER}/notification/${email}`
    const [hasChange, setHasChange] = useState(false)
    const [count, setCount] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [show, setShow] = useState(false)

    const viewAllNoti = async () => {
        let list = notifications.map(x => {
            if (!x.viewed)
                x.viewed = true
            return x
        })
        setNotifications(list)
        await notificationBusiness.viewNotificationOfUser();
        setCount(0)
    }

    const viewNoti = async (notiId) => {
        let list = notifications.map(x => {
            if (x.notificationId === notiId)
                x.viewed = true
            return x
        })
        setNotifications(list)
        await notificationBusiness.viewNotification(notiId)
        setCount(prev => prev - 1)
    }

    const onMessageReceived = (msg) => {
        setHasChange(prev => !prev)
    }

    useEffect(() => {
        const fetchData = async () => {
            let prepare = []
            prepare.push(notificationBusiness.countNotification())
            prepare.push(notificationBusiness.getLastsNotificationOfUser())
            let results = await Promise.all(prepare)
            if (!results.find((x) => x.data.httpCode !== 200)) {
                if ((results[0].data.objectData * 1) > 9)
                    setCount("9+")
                else
                    setCount(results[0].data.objectData)
                setNotifications(results[1]?.data?.objectData || [])
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasChange, email])

    return (
        <div className="IconChat__box" onClick={() => setShow(prev => !prev)}>
            {email ?
                <SockJsClient
                    url={SOCKET_URL}
                    topics={[topicMessages]}
                    onMessage={msg => onMessageReceived(msg)}
                    debug={false}
                /> : <></>
            }
            <BellFill />
            {count > 0 || count === "9+" ?
                <div className="IconChat__num">
                    {count}
                </div> : <></>
            }
            {show &&
                <div className="IconNotification__notificationList fix_scroll" onClick={(e) => e.stopPropagation()}>
                    <div className="IconNotification__iconViewAll" onClick={viewAllNoti}>
                        <EnvelopeOpenFill />
                    </div>
                    {notifications.map(notification => (
                        <div className="IconNotification__child" onClick={() => viewNoti(notification.notificationId)} key={notification.notificationId}>
                            <div className="IconNotification__title">
                                {notification.notificationTitle}
                            </div>
                            <div className="IconNotification__content">
                                {notification.notificationContent}
                            </div>
                            <div className="IconNotification__time">
                                {convertToTimeString(notification.createdDate, t)}
                            </div>
                            {
                                !notification.viewed ? <div className="IconNotification__new"></div> : <></>
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default IconNotification