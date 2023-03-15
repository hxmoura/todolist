import React from 'react'
import './PageHeader.sass'
import { List } from 'phosphor-react'
import useAuth from '../../hooks/useAuth'


export default function PageHeader(props) {

    const { user } = useAuth()

    function handleMenuMobile() {
        const menu = document.getElementById('menu')
        const bg = document.getElementById('bg')
        menu.classList.toggle('menu-show')
        bg.classList.toggle('menu-bg-show')
    }

    return (
        <header className="page-header">
            <List onClick={() => handleMenuMobile()} className="page-header-menu" size={30} weight="fill" />
            <small className="page-header-welcome">Olá, {user.username}</small>
            <strong className="page-header-title">{props.label}</strong>
        </header>
    )
}