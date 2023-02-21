import React from 'react'
import './AuthInput.sass'

export default function AuthInput(props) {
    return (
        <div className="AuthInput">
            <input className="auth-input" id={props.label} type={props.type} placeholder={props.placeholder}
                value={props.value} onChange={props.onChange} maxLength={props.max} required />
        </div>
    )
}