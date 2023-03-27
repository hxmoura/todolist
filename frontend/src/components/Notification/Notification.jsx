import React from 'react'
import './Notification.sass'

export default function Notification(props) {
    return (
        <>
            {props.state.status === 'visible' ? (
                <div className="notification">
                    <span className="notification-text">{props.state.msg}</span>
                </div>
            ) : false}
        </>
    )
}