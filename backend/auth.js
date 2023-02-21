const jwt = require('jsonwebtoken')
const { SECRET } = process.env

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).send({ msg: 'Acesso não autorizado!' })
    }

    try {
        const data = jwt.verify(token, SECRET)
        req.id = data.id
        return next()
    } catch {
        return res.status(401).send({ msg: 'Acesso não autorizado!' })
    }
}