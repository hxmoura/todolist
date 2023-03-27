import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:4000' // Backend - Local
    baseURL: 'https://todolist-backend-psj5.onrender.com' // Backend - Remote
})

export default api