require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 4000

const { verifyToken } = require('./auth')
const { DB_CONNECT } = process.env
const { getUser, createTask, deleteTask, updateTask, signup, signin } = require('./actions')

app.use(express.json())

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://todolist-hxmoura.vercel.app']
    const origin = req.headers.origin

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin)
        app.use(cors())
        next()
    }
})

// AUTHENTICATION
app.post('/signup', signup)
app.post('/signin', signin)

// TODOLIST
app.get('/user', verifyToken, getUser)
app.post('/user/:id', verifyToken, createTask)
app.put('/user/:id/:task', verifyToken, updateTask)
app.delete('/user/:id/:task', verifyToken, deleteTask)

mongoose.set('strictQuery', true)
mongoose.connect(DB_CONNECT)
    .then(() => {
        app.listen(PORT)
        console.log(`Server successfully connected!`)
    })
    .catch(err => console.log(err))