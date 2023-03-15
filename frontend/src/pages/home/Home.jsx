import React, { useContext } from 'react'
import './Home.sass'
import api from '../../api/axios'
import MyContext from '../../context/myContext'
import Menu from '../../components/Menu/Menu'
import useAuth from '../../hooks/useAuth'
import PageHeader from '../../components/PageHeader/PageHeader'
import useTask from '../../hooks/useTask'

export default function Todolist() {

    const { page, setPage } = useContext(MyContext)
    const { getData, user } = useAuth()

    const { task, setTask, setEditTask, editTask } = useTask()

    function createTask(e) {
        e.preventDefault()
        api.post(`/user/${user._id}`, { title: task.title, description: task.description })
            .then(() => {
                getData()
                setPage('allTasks')
                setTask({ title: '', description: '' })
            })
            .catch(err => {
                const msg = document.getElementById('msg-create')
                msg.innerText = err.response.data.msg
            })
    }

    function updateTask(e) {
        e.preventDefault()
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
            <tr key={task.task_id} className="table-body-row" onClick={() => editTaskPage(task)}>
                <td className={`table-body-text table-body-task ${task.checked ? 'table-body-task-checked' : ''}`}>{task.title}</td>
                <td className="table-body-text table-body-createdAt">{task.created_at}</td>
                <td className="table-body-text table-body-status">
                    {task.checked ? <div className="table-body-status-checked">Concluído</div> : <div className="table-body-status-pendent">Pendente</div>}
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

    return (
        <div className="todolist">
            <Menu />
            {page === 'allTasks' || page === 'checkedTasks' || page === 'pendentTasks' ? (
                <section className="tableTasks-page">
                    {page === 'allTasks' ? (
                        <PageHeader label="Todas as tarefas" />
                    ) : false}

                    {page === 'checkedTasks' ? (
                        <PageHeader label="Tarefas concluídas" />
                    ) : false}

                    {page === 'pendentTasks' ? (
                        <PageHeader label="Tarefas pendentes" />
                    ) : false}

                    <main className="tableTasks-content">
                        {user.tasks.length > 0 ? (
                            <table className="table">
                                <thead className="table-header">
                                    <tr className="table-header-row">
                                        <th className="table-header-text table-header-task">Tarefa</th>
                                        <th className="table-header-text table-header-createdAt">Criada em</th>
                                        <th className="table-header-text table-header-status">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {filterTasksOptions()}
                                </tbody>
                            </table>
                        ) : (
                            <p className="notTask">Não há nenhuma tarefa no momento,
                                <strong className="notTask-redirect" onClick={_ => setPage('createTask')}> crie uma agora!</strong></p>
                        )}
                    </main>
                </section>
            ) : false}

            {page === 'createTask' ? (
                <section className="createTask-page">
                    <PageHeader label="Criar tarefa" />
                    <main className="createTask-content">
                        <form className="form">
                            <label className="form-label" htmlFor="input-createTask">Tarefa<sup className="form-label-marked">*</sup></label>
                            <input className="form-input-task" id="input-createTask" type="text" placeholder='Informe a tarefa...' maxLength={50}
                                value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
                            <label className="form-label" htmlFor="input-create-description">
                                Descrição <small className="form-label-optional">- Opcional</small>
                            </label>
                            <textarea className="form-input-description" id="input-create-description" type="text" placeholder='Informe a descrição...'
                                value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} />
                            <div className="form-container-btn">
                                <button type="submit" className="form-btn-create" onClick={e => createTask(e)}>Criar</button>
                                <button type="button" className="form-btn-return" onClick={() => setPage('allTasks')}>Desistir</button>
                            </div>
                        </form>
                        <div id="msg-create"></div>
                    </main>
                </section>
            ) : false}

            {page === 'editTask' ? (
                <section className="editTask-page">
                    <PageHeader label="Editar tarefa" />
                    <main className="createTask-content">
                        <form className="form">
                            <label className="form-label" htmlFor="input-createTask">Tarefa<sup className="form-label-marked">*</sup></label>
                            <input className="form-input-task" id="input-createTask" type="text" placeholder='Informe a tarefa...' maxLength={50}
                                value={editTask.title} onChange={e => setEditTask({ ...editTask, title: e.target.value })} required />
                            <label className="form-label" htmlFor="input-create-description">
                                Descrição <small className="form-label-optional">- Opcional</small>
                            </label>
                            <textarea className="form-input-description" id="input-create-description" type="text" placeholder='Informe a descrição...'
                                value={editTask.description} onChange={e => setEditTask({ ...editTask, description: e.target.value })} />
                            <p className="form-status">Status: <span className={`form-status-click ${editTask.checked ? 'form-status-checked' : 'form-status-pendent'}`}
                                    onClick={_ => updateChecked(editTask)}>{editTask.checked ? 'Concluído' : 'Pendente'}</span>
                            </p>
                            <p className="form-createdAt">Tarefa criada em: <data className="form-createdAt-data">{editTask.created_at}</data></p>
                            <div className="form-container-btn">
                                <button type="submit" className="form-btn-create" onClick={e => updateTask(e)}>Salvar</button>
                                <button type="button" className="form-btn-return" onClick={_ => deleteTask(editTask)}>Excluir</button>
                            </div>
                        </form>
                        <div id="msg-create"></div>
                    </main>
                </section>
            ) : false}
        </div>
    )
}