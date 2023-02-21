import React from 'react'
import './PageHeader.sass'
import { List } from 'phosphor-react'

export default function PageHeader(props) {
    return (
        <div className="pageHeader">
            <List className="menu-toggle-mobile" size={30} weight="fill" />
            <h2 className="header-title">{props.title}</h2>
        </div>
    )
}