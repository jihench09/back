const jwt = require('jsonwebtoken')
const User = require('../Models/User')


exports.isAuth = async (req, res, next) => {
    try {
        const token = req.header('authorized')
        const decoded = jwt.verify(token, process.env.privatekey)

        if (!decoded) {
           return  res.status(400).send({ errors: [{ msg: 'wrong token' }] })
        }

        const currentUser = await User.findById(decoded.id)

        req.User = currentUser

        next()

    } catch (error) {
        res.status(500).send({ errors: [{ msg: "not authorized" }] })
    }
}