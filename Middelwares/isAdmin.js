const jwt=require('jsonwebtoken')
const User = require('../Models/User')

exports.isAdmin=async(req,res,next)=>{
try {
            const token = req.header('authorized')
            const decoded = jwt.verify(token, process.env.privatekey)
            const currentUser = await User.findById(decoded.id)

            if (currentUser.role!=='admin' && currentUser.role!=='super-admin') {
                return res.status(400).send({msg:'not admin'})
            }

            req.User =currentUser


            next()
} catch (error) {
    res.status(500).send({ errors: [{ msg: "erreur middelware" }] })
}
}