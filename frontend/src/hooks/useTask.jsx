import { useState } from 'react'

export default function useTask() {

    const [task, setTask] = useState({ title: '', description: '' })
    const [editTask, setEditTask] = useState({ title: '', description: '' })

    return { task, setTask, editTask, setEditTask }
}