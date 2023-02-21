import React, { useState, useEffect } from 'react'
import './Home.sass'
import api from '../../api/axios'
// import PageHeader from '../../components/PageHeader/PageHeader'
import Logo from '../../assets/imgs/icon.png'
import { List, CalendarBlank, CalendarCheck, CalendarX, CalendarPlus, SignOut, X } from 'phosphor-react'


export default function Todolist() {

    const [user, setUser] = useState({ username: '', tasks: [] })
    const [task, setTask] = useState({ title: '', description: '' })
    const [editTask, setEditTask] = useState({ title: '', description: '' })
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState('allTasks')
    const getToken = localStorage.getItem('token')

    const [menuExpanded, setMenuExpanded] = useState(true)
    const [menuMobile, setMenuMobile] = useState('')

    useEffect(() => {
        const width = window.screen.width

        if (getToken) {
            api.defaults.headers.common["Authorization"] = `Bearer ${getToken}`
            api.get('/user')
                .then(resp => {
                    setUser(resp.data.user)
                    setLoading(false)
                })
                .catch(() => logout())
        }

        if (width > 425 && width < 950) setMenuExpanded(false)

    }, [getToken])

    if (!getToken) logout()
    if (loading) return

    function logout() {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    async function getData() {
        await api.get('/user')
            .then(resp => {
                setUser(resp.data.user)
                setLoading(false)
            })
            .catch(() => logout())
    }

    function createTask() {
        api.post(`/user/${user._id}`, { title: task.title, description: task.description })
            .then(() => {
                getData()
                setPage('allTasks')
                setTask({ title: '', description: '' })
            })
            .catch(err => {
                const msg = document.getElementById('msg')
                msg.innerText = err.response.data.msg
            })
    }

    function updateTask() {
        api.put(`/user/${user._id}/${editTask.task_id}`, {
            title: editTask.title,
            description: editTask.description,
            checked: editTask.checked
        })
            .then(() => {
                getData()
                setPage('allTasks')
                setEditTask({ title: '', description: '' })
            })
            .catch((err) => console.log(err.response.data))
    }

    async function deleteTask(task) {
        await api.delete(`/user/${user._id}/${task.task_id}`)
        getData()
        setPage('allTasks')
    }

    async function updateChecked(task) {
        const checked = task.checked ? task.checked = false : task.checked = true
        await api.put(`/user/${user._id}/${task.task_id}`, {
            title: task.title,
            description: task.description,
            checked,
        })
        getData()
    }

    function editTaskPage(task) {
        setEditTask(task)
        setPage('editTask')
    }

    function getTasks(filter) {
        return user.tasks.filter(filter).map(task => (
            <tr key={task.task_id} className="table-row" onClick={() => editTaskPage(task)}>
                <td>{task.title}</td>
                <td>{task.created_at}</td>
                <td>
                    <div className={`table-status ${task.checked ? 'table-status-checked' : 'table-status-pendent'}`}></div>
                </td>
            </tr>
        ))
    }


    function filterTasksOptions() {
        const filterAllTasks = taskFilter => taskFilter
        const filterCheckedTasks = taskFilter => taskFilter.checked === true
        const filterPendentTasks = taskFilter => taskFilter.checked === false

        if (page === 'allTasks') {
            return getTasks(filterAllTasks)
        }
        if (page === 'checkedTasks') {
            return getTasks(filterCheckedTasks)
        }
        if (page === 'pendentTasks') {
            return getTasks(filterPendentTasks)
        }
    }

    function activeMenuButton(filter) {
        return page === filter ? 'navigation-option-active' : ''
    }

    function selectMenuOption(filter) {
        setMenuMobile('ocultarMenu')
        setPage(filter)
    }

    window.addEventListener('resize', () => {
        const width = window.screen.width
        width > 425 && width < 950 ? setMenuExpanded(false) : setMenuExpanded(true)
        if (menuMobile === 'mostrarMenu') setMenuMobile('ocultarMenu')
    })

    function toggleMenuMobile() {
        menuMobile === 'mostrarMenu' ? setMenuMobile('ocultarMenu') : setMenuMobile('mostrarMenu')
    }

    return (
        <div className={`todolist ${menuExpanded ? 'todolist-expanded' : 'todolist-reduced'}`}>

            <section id="menu" className={`menu ${menuMobile === 'mostrarMenu' ? 'menu-show' : ''} ${menuMobile === 'ocultarMenu' ? 'menu-hide' : ''}`}>
                <nav className="navigation">
                    {menuMobile === 'mostrarMenu' ? <X onClick={() => toggleMenuMobile()} className="menu-toggle" size={30} weight="fill" /> :
                        <List onClick={() => setMenuExpanded(prevState => !prevState)} className="menu-toggle" size={30} weight="fill" />
                    }
                    {menuExpanded ?
                        <img className="menu-logo" src={Logo} alt="Logo" /> :
                        <img className="menu-logo-reduced" src={Logo} alt="Logo" />
                    }
                    {menuExpanded ? <h1 className="menu-title">Todolist</h1> : false}
                    <ul className="navigation-options">
                        <li className="navigation-option navigation-createTask" onClick={() => selectMenuOption('createTask')}>
                            <CalendarPlus size={25} weight="fill" />
                            {menuExpanded ? <span className="navigation-text">Nova tarefa</span> : false}
                        </li>
                        <li className={`navigation-option ${activeMenuButton('allTasks')}`} onClick={() => selectMenuOption('allTasks')}>
                            <CalendarBlank size={25} weight="regular" />
                            {menuExpanded ? <span className="navigation-text">Todas</span> : false}
                        </li>
                        <li className={`navigation-option ${activeMenuButton('checkedTasks')}`} onClick={() => selectMenuOption('checkedTasks')}>
                            <CalendarCheck size={25} weight="regular" />
                            {menuExpanded ? <span className="navigation-text">Concluídas</span> : false}
                        </li>
                        <li className={`navigation-option ${activeMenuButton('pendentTasks')}`} onClick={() => selectMenuOption('pendentTasks')}>
                            <CalendarX size={25} weight="regular" />
                            {menuExpanded ? <span className="navigation-text">Pendentes</span> : false}
                        </li>
                    </ul>
                </nav>
                <div className="logout-container">
                    <button className="navigation-logout" onClick={logout}>
                        <SignOut size={25} weight="fill" />
                        {menuExpanded ? <span className="navigation-text">Sair</span> : false}
                    </button>
                </div>
            </section>
            <div className={`bg-menu-mobile ${menuMobile === 'mostrarMenu' ? 'bg-menu-mobile-active' : ''}`}></div>


            {page === 'allTasks' || page === 'checkedTasks' || page === 'pendentTasks' ? (
                <section className="tableTasks-page">
                    {page === 'allTasks' ? (
                        <div className="pageHeader">
                            <List onClick={() => toggleMenuMobile()} className="menu-toggle-mobile" size={30} weight="fill" />
                            <h2 className="header-title">Todas as tarefas</h2>
                        </div>
                    ) : false}

                    {page === 'checkedTasks' ? (
                        <div className="pageHeader">
                            <List onClick={() => toggleMenuMobile()} className="menu-toggle-mobile" size={30} weight="fill" />
                            <h2 className="header-title">Tarefas concluídas</h2>
                        </div>
                    ) : false}

                    {page === 'pendentTasks' ? (
                        <div className="pageHeader">
                            <List onClick={() => toggleMenuMobile()} className="menu-toggle-mobile" size={30} weight="fill" />
                            <h2 className="header-title">Tarefas pendentes</h2>
                        </div>
                    ) : false}

                    <div className="tableTasks-content">
                        {user.tasks.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tarefa</th>
                                        <th>Criada em</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterTasksOptions()}
                                </tbody>
                            </table>
                        ) : (
                            <p className="notTask">Não há nenhuma tarefa no momento,
                                <strong className="notTask-redirect" onClick={_ => setPage('createTask')}> crie uma agora!</strong></p>
                        )}
                    </div>
                </section>
            ) : false}

            {page === 'createTask' ? (
                <section className="createTask-page">
                    <div className="pageHeader">
                        <List onClick={() => toggleMenuMobile()} className="menu-toggle-mobile" size={30} weight="fill" />
                        <h2 className="header-title">Criar tarefa</h2>
                    </div>
                    <div className="createTask-content">
                        <input type="text" placeholder='Nome da tarefa' value={task.title}
                            onChange={e => setTask({ ...task, title: e.target.value })} required />
                        <textarea type="text" placeholder='Descrição da tarefa' value={task.description}
                            onChange={e => setTask({ ...task, description: e.target.value })} />
                        <button onClick={createTask}>Criar tarefa</button>
                    </div>
                </section>
            ) : false}

            {page === 'editTask' ? (
                <section className="editTask-page">
                    <div className="pageHeader">
                        <List onClick={() => toggleMenuMobile()} className="menu-toggle-mobile" size={30} weight="fill" />
                        <h2 className="header-title">Editar tarefa</h2>
                    </div>
                    <div className="editTask-content">
                        <input type="text" placeholder='Nome da tarefa' value={editTask.title}
                            onChange={e => setEditTask({ ...editTask, title: e.target.value })} required />
                        <textarea type="text" placeholder='Descrição da tarefa' value={editTask.description}
                            onChange={e => setEditTask({ ...editTask, description: e.target.value })} />
                        <div>Tarefa criada em: {editTask.created_at}</div>
                        <div>Status: <span className={`edit-status ${editTask.checked ? 'edit-status-checked' : 'edit-status-pendent'}`}
                            onClick={_ => updateChecked(editTask)}>{editTask.checked ? 'Concluído' : 'Pendente'}</span>
                        </div>
                        <button onClick={_ => deleteTask(editTask)}>Excluir</button>
                        <button onClick={updateTask}>Salvar</button>
                    </div>
                </section>
            ) : false}
        </div>
    )
}