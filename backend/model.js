const mongoose = require('mongoose')

const User = mongoose.model('todolist', {
    username: String,
    password: String,
    tasks: Array
})

module.exports = User