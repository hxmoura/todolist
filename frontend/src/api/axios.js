import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:4000' // Backend - Local
    baseURL: 'https://todolist-backend-hxmoura.vercel.app' // Backend - Remote
})

export default api