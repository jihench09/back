const jwt=require('jsonwebtoken')
const User = require('../Models/User')

exports.Admin=async(req,res,next)=>{
try {
            const token = req.header('authorized')
            const decoded = jwt.verify(token, process.env.privatekey)
            const currentUser = await User.findById(decoded.id)

            if (currentUser.role!=='admin') {
                return res.status(400).send({ errors: [{ msg: 'not authorized to do this action' }] })
            }

            req.User =currentUser


            next()
} catch (error) {
    res.status(500).send({ errors: [{ msg: "erreur middelware" }] })
}
}