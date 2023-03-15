import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function useAuth() {

    const [user, setUser] = useState({ username: '', tasks: [] })
    // const [loading, setLoading] = useState(true)
    const getToken = localStorage.getItem('token')

    useEffect(() => {
        if (getToken) {
            api.defaults.headers.common["Authorization"] = `Bearer ${getToken}`
            api.get('/user')
                .then(resp => {
                    setUser(resp.data.user)
                    // setLoading(false)
                })
                .catch(() => logout())
        }
    }, [getToken])

    if (!getToken) logout()
    // if (loading) return

    function logout() {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    async function getData() {
        await api.get('/user')
            .then(resp => setUser(resp.data.user))
            .catch(() => logout())
    }

    return { logout, user, setUser, getData }
}