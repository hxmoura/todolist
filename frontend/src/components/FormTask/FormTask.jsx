import React, { useContext } from 'react'
import './FormTask.sass'
import MyContext from '../../context/myContext'
import useTask from '../../hooks/useTask'
// import api from '../../api/axios'
// import useAuth from '../../hooks/useAuth'

export default function FormTask(props) {

    const { page, setPage } = useContext(MyContext)
    const { task, setTask } = useTask()
    // const { getData, logout, user } = useAuth()
    // const [taska, setTask] = useState({ title: '', description: '' })

    return (
        <main className="createTask-content">
            <form className="form">
                <label className="form-label" htmlFor="input-createTask">Tarefa<sup className="form-label-marked">*</sup></label>
                <input className="form-input-task" id="input-createTask" type="text" placeholder='Informe a tarefa...' maxLength={50}
                    value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
                <label className="form-label" htmlFor="input-create-description">
                    Descrição <small className="form-label-optional">- Opcional</small>
                </label>
                <textarea className="form-input-description" id="input-create-description" type="text" placeholder='Informe a descrição...'
                    maxLength={300} value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} />
                {page === 'editTask' ? (
                    <div className="form-container-btn">
                        <button type="submit" className="form-btn-create" onClick={props.save}>Salvar</button>
                        <button type="button" className="form-btn-return" onClick={props.delete}>Excluir</button>
                    </div>
                ) : (
                    <div className="form-container-btn">
                        <button type="submit" className="form-btn-create" onClick={props.create}>Criar</button>
                        <button type="button" className="form-btn-return" onClick={() => setPage('allTasks')}>Voltar</button>
                    </div>
                )
                }
            </form>
            <div id="msg-create"></div>
        </main>
    )
}