const express=require('express')

const UserRouter=express.Router()


const { ValidSignUp, Validation, ValidSignIn } = require('../Middelwares/Validation')
const { SignUp, SignIn, UpdateUser, GetUsers, DeleteUser, updatePass, allusers, deleteClient, updateAdmin, getAdmin, deleteAdmin } = require('../Controllers/User')
const { isAuth } = require('../Middelwares/isAuth')
const User = require('../Models/User')
const { isAdmin } = require('../Middelwares/isAdmin')
const { Admin } = require('../Middelwares/Admin')


UserRouter.post('/SignUp',ValidSignUp,Validation,SignUp)

UserRouter.post('/SignIn',ValidSignIn,Validation,SignIn)

UserRouter.get('/current',isAuth,(req,res)=>res.status(200).send(req.User))



UserRouter.put('/UpdateUser/:id',ValidSignIn,Validation,isAuth,UpdateUser)

UserRouter.put('/UpdatePass/:id',isAuth,updatePass)


UserRouter.delete('/deleteUser/:id' ,isAuth,DeleteUser)

UserRouter.get('/allusers',isAdmin,allusers)

UserRouter.delete('/deleteclient/:id',isAdmin,deleteClient)

UserRouter.put('/updateAdmin',Admin,updateAdmin)

UserRouter.get('/getAdmin',isAdmin,getAdmin)

UserRouter.delete('/deleteAdmin/:id',Admin,deleteAdmin)










module.exports=UserRouter