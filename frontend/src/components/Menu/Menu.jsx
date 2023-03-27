import React from 'react'
import { SignOut, Calendar, Bell, Check, Plus } from 'phosphor-react'
import './Menu.sass'
import ThemeToggle from '../ThemeToogle/ThemeToggle'
import useAuth from '../../hooks/useAuth'

export default function Menu({ page, setPage }) {
    const { logout } = useAuth()
    const activeMenuButton = filter => page === filter ? 'navigation-option-active' : ''

    function hideMenu() {
        const menu = document.getElementById('menu')
        const bg = document.getElementById('bg')
        menu?.classList.remove('menu-show')
        bg?.classList.remove('menu-bg-show')
    }

    window.onresize = () => hideMenu()

    function handleClickMenu(page) {
        setPage(page)
        hideMenu()
    }

    let posX
    let posY

    function handleTouchStart(event) {
        posX = event.touches[0].clientX
        posY = event.touches[0].clientY
    }

    function handleTouchMove(event) {
        let posXDifference = posX - event.changedTouches[0].clientX
        let posYDifference = posY - event.changedTouches[0].clientY
        if (posXDifference > posYDifference && posXDifference > 0) hideMenu()
    }

    return (
        <section>
            <section id="menu" className="menu" onTouchStart={event => handleTouchStart(event)} onTouchMove={event => handleTouchMove(event)}>
                <div className="menu-logo">
                    <Check className="menu-logo-icon" size={35} weight="bold" />
                    <h1 className="menu-logo-title">Todolist</h1>
                </div>
                <nav className="navigation">
                    <button className="menu-createTask" onClick={() => handleClickMenu('createTask')}>
                        <Plus className="menu-createTask-icon" size={20} weight="bold" />
                        <span className="menu-createTask-text">Nova tarefa</span>
                    </button>
                    <h6 className="navigation-title">Tarefas</h6>
                    <ul className="navigation-options">
                        <li className={`navigation-option ${activeMenuButton('allTasks')}`} onClick={() => handleClickMenu('allTasks')}>
                            <Calendar className="navigation-icon" size={25} weight="regular" />
                            <span className="navigation-text">Todas</span>
                        </li>
                        <li className={`navigation-option ${activeMenuButton('pendentTasks')}`} onClick={() => handleClickMenu('pendentTasks')}>
                            <Bell className="navigation-icon" size={25} weight="regular" />
                            <span className="navigation-text">Pendentes</span>
                        </li>
                        <li className={`navigation-option ${activeMenuButton('checkedTasks')}`} onClick={() => handleClickMenu('checkedTasks')}>
                            <Check className="navigation-icon" size={25} weight="regular" />
                            <span className="navigation-text">Concluídas</span>
                        </li>
                    </ul>
                </nav>
                <div className="menu-bottom">
                    <div className="toggle-theme">
                        <ThemeToggle />
                        <small className="navigation-text">Modo escuro</small>
                    </div>
                    <button className="logout" onClick={logout}>
                        <SignOut className="logout-icon" size={25} weight="fill" />
                        <span className="navigation-text">Sair</span>
                    </button>
                </div>
            </section>
            <div id="bg" className="menu-bg" onClick={hideMenu}></div>
        </section>
    )
}