import React from 'react'

export default function Menu() {
    return (
        <section className="menu">
            <nav className="navigation">
                <List onClick={() => handleMenu()} className="menu-toggle" size={30} weight="fill" />
                {expanded ?
                    <img className="menu-logo" src={Logo} alt="Logo" /> :
                    <img className="menu-logo-reduced" src={Logo} alt="Logo" />
                }
                {expanded ? <h1 className="menu-title">Todolist</h1> : false}
                <ul className="navigation-options">
                    <li className="navigation-option navigation-createTask" onClick={() => setPage('createTask')}>
                        <CalendarPlus size={25} weight="fill" />
                        {expanded ? <span className="navigation-text">Nova tarefa</span> : false}
                    </li>
                    <li className={`navigation-option ${activeMenuButton('allTasks')}`} onClick={() => setPage('allTasks')}>
                        <CalendarBlank size={25} weight="regular" />
                        {expanded ? <span className="navigation-text">Todas</span> : false}
                    </li>
                    <li className={`navigation-option ${activeMenuButton('checkedTasks')}`} onClick={() => setPage('checkedTasks')}>
                        <CalendarCheck size={25} weight="regular" />
                        {expanded ? <span className="navigation-text">Concluídas</span> : false}
                    </li>
                    <li className={`navigation-option ${activeMenuButton('pendentTasks')}`} onClick={() => setPage('pendentTasks')}>
                        <CalendarX size={25} weight="regular" />
                        {expanded ? <span className="navigation-text">Pendentes</span> : false}
                    </li>
                </ul>
            </nav>
            <div className="logout-container">
                <button className="navigation-logout" onClick={logout}>
                    <SignOut size={25} weight="fill" />
                    {expanded ? <span className="navigation-text">Sair</span> : false}
                </button>
            </div>
        </section>
    )
}