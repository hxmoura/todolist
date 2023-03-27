import React, { useEffect, useState } from 'react'
import './Home.sass'
import api from '../../api/axios'
import Menu from '../../components/Menu/Menu'
import useAuth from '../../hooks/useAuth'
import PageHeader from '../../components/PageHeader/PageHeader'
import FormTask from '../../components/FormTask/FormTask'
import { Check } from 'phosphor-react'

export default function Todolist() {
    const { user, getData } = useAuth()

    const [msgTask, setMsgTask] = useState({ msg: '', status: 'hidden' })
    const [task, setTask] = useState({ title: '', description: '' })
    const [page, setPage] = useState('allTasks')

    useEffect(() => {
        if (page === 'createTask') {
            setTask({ title: '', description: '' })
        }
        setMsgTask({ msg: '', status: 'hidden' })
    }, [page, setTask])

    function createTask(e) {
        e.preventDefault()
        validateTask()
        api.post(`/user/${user._id}`, { title: task.title, description: task.description })
            .then(() => {
                getData()
                setPage('allTasks')
                setTask({ title: '', description: '' })
            })
    }

    function updateTask(e) {
        e.preventDefault()
        validateTask()
        api.put(`/user/${user._id}/${task.task_id}`, {
            title: task.title,
            description: task.description,
            checked: task.checked
        })
            .then(() => {
                getData()
                setPage('allTasks')
                setTask({ title: '', description: '' })
            })
    }

    async function deleteTask(task) {
        await api.delete(`/user/${user._id}/${task.task_id}`)
        getData()
        setPage('allTasks')
    }

    function editTaskPage(task) {
        setMsgTask({ msg: '', status: 'hidden' })
        setTask(task)
        setPage('editTask')
    }

    async function updateCheckbox(task) {
        const checked = !task.checked
        await api.put(`/user/${user._id}/${task.task_id}`, { ...task, checked })
        getData()
    }

    function getTasks(filter) {
        return user.tasks.filter(filter).map(task => (
            <tr key={task.task_id}>
                <td className="status">
                    <label className="checkbox">
                        <input className="checkbox-hidden" type="checkbox" checked={task.checked} onChange={_ => updateCheckbox(task)}/>
                        <span className={`checkbox-new ${task.checked ? 'checkbox-active' : ''}`} onClick={_ => updateCheckbox(task)}>
                            {task.checked && <Check className="checkbox-icon" size={18} weight="bold" />}
                        </span>
                    </label>
                </td>
                <td className={`task ${task.checked ? 'task-checked' : ''}`} onClick={() => editTaskPage(task)}>{task.title}</td>
                <td className={`createdAt ${task.checked ? 'createdAt-checked' : ''}`} onClick={() => editTaskPage(task)}>{task.created_at}</td>
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

    function validateTask() {
        if (!task.title) {
            setMsgTask({ msg: 'O campo é obrigatório', status: 'visible' })
        }
        else if (task.title.length > 60) {
            setMsgTask({ msg: 'A tarefa deve conter no máximo 60 caracteres!', status: 'visible' })
        }
        else {
            setMsgTask({ msg: '', status: 'confirmed' })
        }
    }

    return (
        <div className="background">
            {user === null ? (
                <div className="loading">
                    <svg className="loading-svg" viewBox="25 25 50 50">
                        <circle className="loading-circle" r="20" cy="50" cx="50"></circle>
                    </svg>
                </div>
            ) : (
                <div className="todolist">
                    <Menu page={page} setPage={setPage} />
                    {page === 'allTasks' || page === 'checkedTasks' || page === 'pendentTasks' ? (
                        <section className="tableTasks-page">
                            {page === 'allTasks' && (
                                <PageHeader username={user?.username} label="Todas as tarefas" />
                            )}

                            {page === 'checkedTasks' && (
                                <PageHeader username={user?.username} label="Tarefas concluídas" />
                            )}

                            {page === 'pendentTasks' && (
                                <PageHeader username={user?.username} label="Tarefas pendentes" />
                            )}

                            <main className="tableTasks-content">
                                {user?.tasks.length > 0 ? (
                                    <table className="table-tasks">
                                        <thead>
                                            <tr>
                                                <th className="status">Status</th>
                                                <th className="task">Tarefa</th>
                                                <th className="createdAt">Criado em</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterTasksOptions()}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="notTask">Não há nenhuma tarefa no momento,
                                        <strong className="notTask-redirect" onClick={_ => setPage('createTask')}> crie uma agora!</strong>
                                    </p>
                                )}
                            </main>
                        </section>
                    ) : false}

                    {page === 'createTask' && (
                        <section className="createTask-page">
                            <PageHeader username={user?.username} label="Criar tarefa" />
                            <FormTask createTask={e => createTask(e)} validateTask={validateTask} msgTask={msgTask}
                                task={task} setTask={setTask} page={page} setPage={setPage} />
                        </section>
                    )}

                    {page === 'editTask' && (
                        <section className="editTask-page">
                            <PageHeader username={user?.username} label="Editar tarefa" />
                            <FormTask updateTask={e => updateTask(e)} deleteTask={_ => deleteTask(task)}
                                validateTask={validateTask} msgTask={msgTask} task={task} setTask={setTask} page={page} setPage={setPage} />
                        </section>
                    )}
                </div>

            )}
        </div>
    )
}