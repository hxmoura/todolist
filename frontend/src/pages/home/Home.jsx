import React, { useEffect, useState } from 'react'
import './Home.sass'
import Menu from '../../components/Menu/Menu'
import useAuth from '../../hooks/useAuth'
import PageHeader from '../../components/PageHeader/PageHeader'
import FormTask from '../../components/FormTask/FormTask'
import TableTasks from '../../components/TableTasks/TableTasks'

export default function Home() {
    const { user, getData } = useAuth()
    const [msgTask, setMsgTask] = useState({ msg: '', status: 'hidden' })
    const [task, setTask] = useState({ title: '', description: '' })
    const [page, setPage] = useState('allTasks')

    useEffect(() => {
        page === 'createTask' && setTask({ title: '', description: '' })
        setMsgTask({ msg: '', status: 'hidden' })
    }, [page, setTask])

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
                    <Menu handlePage={{ page, setPage }} />

                    {page === 'allTasks' && (
                        <section className="tableTasks-page">
                            <PageHeader username={user?.username} label="Todas as tarefas" />
                            <TableTasks
                                notTasksFilter={el => el} 
                                handleTask={{ setTask, setMsgTask }} handlePage={{ page, setPage }} handleUser={{ user, getData }}/>
                        </section>
                    )}

                    {page === 'pendentTasks' && (
                        <section className="tableTasks-page">
                            <PageHeader username={user?.username} label="Tarefas pendentes" />
                            <TableTasks
                                notTasksFilter={el => el.checked === false}
                                handleTask={{ setTask, setMsgTask }} handlePage={{ page, setPage }} handleUser={{ user, getData }}/>
                        </section>
                    )}

                    {page === 'checkedTasks' && (
                        <section className="tableTasks-page">
                            <PageHeader username={user?.username} label="Tarefas concluídas" />
                            <TableTasks
                                notTasksFilter={el => el.checked === true}
                                handleTask={{ setTask, setMsgTask }} handlePage={{ page, setPage }} handleUser={{ user, getData }}/>
                        </section>
                    )}

                    {page === 'createTask' && (
                        <section className="createTask-page">
                            <PageHeader username={user?.username} label="Criar tarefa" />
                            <FormTask handleUser={{ user, getData }} handlePage={{ page, setPage }} handleTask={{ task, setTask, msgTask, setMsgTask }}/>
                        </section>
                    )}

                    {page === 'editTask' && (
                        <section className="editTask-page">
                            <PageHeader username={user?.username} label="Editar tarefa" />
                            <FormTask handleUser={{ user, getData }} handlePage={{ page, setPage }} handleTask={{ task, setTask, msgTask, setMsgTask }} />
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}