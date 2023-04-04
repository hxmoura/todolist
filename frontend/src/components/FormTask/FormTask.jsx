import React from 'react'
import './FormTask.sass'
import Notification from '../Notification/Notification'
import api from '../../api/axios'

export default function FormTask(props) {

    const { task, setTask, msgTask, setMsgTask } = props.handleTask
    const { page, setPage } = props.handlePage
    const { user, getData } = props.handleUser
    
    const validateWarningClass = (inputArea) => inputArea.status === 'visible' ? 'form-input-task-warning' : ''
    const validateConfirmedClass = (inputArea) => inputArea.status === 'confirmed' ? 'form-input-task-confirmed' : ''

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

    function validateTask() {
        if (!task.title) {
            setMsgTask({ msg: 'Informe a tarefa', status: 'visible' })
        }
        else if (task.title.length > 60) {
            setMsgTask({ msg: 'A tarefa deve conter no máximo 60 caracteres!', status: 'visible' })
        }
        else {
            setMsgTask({ msg: '', status: 'confirmed' })
        }
    }

    return (
        <main className="createTask-content">
            <form className="form">
                <div className="form-container">
                    <label className="form-label" htmlFor="input-createTask">Tarefa<sup className="form-label-marked">*</sup></label>
                    <input className={`form-input-task ${validateWarningClass(msgTask)} ${validateConfirmedClass(msgTask)}`}
                        id="input-createTask" type="text" placeholder='Informe a tarefa...'
                        onKeyUp={validateTask} value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
                    <Notification state={msgTask} />
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="input-create-description">
                        Descrição <small className="form-label-optional">- Opcional</small>
                    </label>
                    <textarea className="form-input-description" id="input-create-description" type="text" placeholder='Informe a descrição...'
                        value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} />
                </div>
                {page === 'editTask' ? (
                    <div className="form-container">
                        <p className="form-createdAt-text">Criado em: <data className="form-createdAt-data">{task.created_at}</data></p>
                        <div>
                            <button type="submit" className="form-btn-create" onClick={e => updateTask(e)}>Salvar</button>
                            <button type="button" className="form-btn-return" onClick={_ => deleteTask(task)}>Excluir</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button type="submit" className="form-btn-create" onClick={e => createTask(e)}>Criar</button>
                        <button type="button" className="form-btn-return" onClick={_ => setPage('allTasks')}>Desistir</button>
                    </div>
                )}
            </form>
        </main>
    )
}