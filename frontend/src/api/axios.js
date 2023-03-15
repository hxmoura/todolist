import axios from 'axios'

const api = axios.create({
    baseURL: 'https://todolist-backend-psj5.onrender.com'
})

export default api