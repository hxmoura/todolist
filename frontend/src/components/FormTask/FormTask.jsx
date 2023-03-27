import React from 'react'
import './FormTask.sass'
import Notification from '../Notification/Notification'

export default function FormTask({ task, setTask, createTask, validateTask, updateTask, deleteTask, msgTask, page, setPage }) {

    const validateWarningClass = (inputArea) => inputArea.status === 'visible' ? 'form-input-task-warning' : ''
    const validateConfirmedClass = (inputArea) => inputArea.status === 'confirmed' ? 'form-input-task-confirmed' : ''

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
                            <button type="submit" className="form-btn-create" onClick={updateTask}>Salvar</button>
                            <button type="button" className="form-btn-return" onClick={deleteTask}>Excluir</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button type="submit" className="form-btn-create" onClick={createTask}>Criar</button>
                        <button type="button" className="form-btn-return" onClick={_ => setPage('allTasks')}>Desistir</button>
                    </div>
                )}
            </form>
        </main>
    )
}