require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

const { verifyToken } = require('./auth')
const { DB_CONNECT } = process.env
const { getUser, createTask, deleteTask, updateTask, signup, signin } = require('./actions')

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    app.use(cors())
    next()
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
        app.listen(4000)
        console.log('Database connected successfully!')
    })
    .catch(err => console.log(err))