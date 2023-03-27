const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./model')
const { SECRET } = process.env

// AUTHENTICATION
const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body
        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).send({ existingUser: 'Usuário já cadastrado, tente outro!' })
        }
        if (!username) {
            return res.status(400).send({ msg: 'Informe um nome de usuário' })
        }
        if (!password) {
            return res.status(400).send({ msg: 'Informe a senha' })
        }
        if (!confirmPassword) {
            return res.status(400).send({ msg: 'Confirme a senha' })
        }
        if (username.length < 3 || username.length > 24) {
            return res.status(400).send({ msg: 'O nome de usuário deve ter entre 3 e 24 caracteres' })
        }
        if (password.length < 6) {
            return res.status(400).send({ msg: 'A senha deve conter no minimo 6 caracteres' })
        }
        if (password !== confirmPassword) {
            return res.status(400).send({ msg: 'As senhas não conferem' })
        }

        const passwordHash = await bcrypt.hash(password, 12)
        const createUser = new User({ username, password: passwordHash, tasks: [] })
        await createUser.save()
        return res.status(201).send({ msg: 'Usuário cadastrado com sucesso!' })
    } catch (err) {
        return res.status(404).send({ msg: 'Não foi possível fazer o cadastro, tente novamente!' })
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!username) {
            return res.status(400).send({ msg: 'Informe o usuário!' })
        }
        if (!password) {
            return res.status(400).send({ msg: 'Informe a senha!' })
        }
        if (!user) {
            return res.status(400).send({ notUser: 'Usuário não encontrado!' })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(400).send({ invalidPassword: 'Senha inválida!' })
        }

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: 10000 })
        return res.status(201).send({ msg: 'Usuário logado com sucesso!', token })
    } catch (err) {
        return res.status(404).send({ msg: 'Não foi possível fazer o login, tente novamente!' })
    }
}


// TODOLIST
const getUser = async (req, res) => {
    try {
        const id = req.id
        const user = await User.findById(id, '-password')
        return res.status(200).send({ user })
    } catch (err) {
        return res.status(404).send({ msg: 'Não foi possível obter dados!' })
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body
        const id = req.params.id
        const user = await User.findById(id, '-password')

        if (!title) {
            return res.status(400).send({ msg: 'Informe a tarefa!' })
        }
        if (typeof title !== 'string' || typeof description !== 'string') {
            return res.status(400).send({ msg: 'Não foi possível criar a tarefa!' })
        }
        if (title.length > 60) {
            return res.status(400).send({ msg: 'A tarefa deve conter no máximo 60 caracteres!' })
        }

        user.tasks.push({ title, description, checked: false, task_id: new mongoose.mongo.ObjectId(), created_at: new Date().toLocaleDateString('pt-BR') })
        user.save()
        return res.status(200).send({ msg: 'Tarefa criada com sucesso!' })
    } catch (err) {
        return res.status(404).send({ msg: 'Não foi possível criar a tarefa!' })
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id, '-password')

        const taskId = req.params.task
        const task = await user.tasks.find(task => task.task_id == taskId)
        const { title, description, checked } = req.body

        if (!title) {
            return res.status(400).send({ msg: 'Informe a tarefa!' })
        }
        if (typeof title !== 'string' || typeof description !== 'string' || typeof checked !== 'boolean') {
            return res.status(400).send({ msg: 'Não foi possível editar a tarefa!' })
        }
        if (title.length > 60) {
            return res.status(400).send({ msg: 'A tarefa deve conter no máximo 60 caracteres!' })
        }

        task.title = title
        task.description = description
        task.checked = checked

        await user.updateOne(user)
        await user.save()
        return res.status(200).send({ msg: 'Tarefa editada com sucesso!' })
    } catch (err) {
        return res.status(400).send({ msg: 'Não foi possível editar a tarefa!' })
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id, '-password')

        const taskId = req.params.task
        const task = await user.tasks.find(task => task.task_id == taskId)

        const newTaskList = user.tasks.filter(tasks => tasks !== task)
        user.tasks = newTaskList

        await user.save()
        return res.status(200).send({ msg: 'Task deletada com sucesso!' })
    } catch (err) {
        return res.status(404).send({ msg: 'Não foi possível excluir a tarefa!' })
    }
}

module.exports = { getUser, createTask, deleteTask, updateTask, signup, signin }