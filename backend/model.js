const mongoose = require('mongoose')

const User = mongoose.model('user', {
    username: String,
    password: String,
    tasks: Array
})

module.exports = User