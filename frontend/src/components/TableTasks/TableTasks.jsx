import React from 'react'
import './TableTasks.sass'
import { Check } from 'phosphor-react'
import api from '../../api/axios'

export default function TableTasks(props) {

    const { setTask, setMsgTask } = props.handleTask
    const { page, setPage } = props.handlePage
    const { user, getData } = props.handleUser

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
                        <input className="checkbox-hidden" type="checkbox" checked={task.checked} onChange={_ => updateCheckbox(task)} />
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

    return (
        <main className="tableTasks-content">
            {user.tasks.length > 0 ? (
                user.tasks.some(props.notTasksFilter) ? (
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
                    <p className="notTask">Não há tarefas {page === 'pendentTasks' ? 'pendentes' : 'concluídas'} no momento!</p>
                )
            ) : (
                <p className="notTask">Não há nenhuma tarefa no momento, <strong className="notTask-redirect" onClick={_ => setPage('createTask')}>crie uma agora!</strong></p>
            )}
        </main>
    )
}