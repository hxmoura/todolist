import { useState, useMemo, useEffect } from 'react'
import api from '../api/axios'

export default function useAuth() {

    const [data, setData] = useState(null)
    const getToken = localStorage.getItem('token')

    function getData() {
        api.defaults.headers.common["Authorization"] = `Bearer ${getToken}`
        api.get('/user')
            .then(resp => setData(resp.data.user))
            .catch(() => logout())
    }

    useEffect(() => {
        api.defaults.headers.common["Authorization"] = `Bearer ${getToken}`
        api.get('/user')
            .then(resp => setData(resp.data.user))
            .catch(() => logout())
    }, [getToken])

    const user = useMemo(() => data, [data])

    function logout() {
        localStorage.removeItem('token')
        window.location.href = '/'
    }
    
    if (!getToken) logout()
    
    return { user, logout, getData }
}