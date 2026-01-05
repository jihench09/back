const express=require('express')
const { isAuth } = require('../Middelwares/isAuth')
const Message = require('../Models/Message')
const { isAdmin } = require('../Middelwares/isAdmin')
const { addMessa, getMessa, upMess, delMess, addRep, getMessUser } = require('../Controllers/Message')
const MessageRouter=express.Router()


MessageRouter.post('/addMessage',isAuth,addMessa)

MessageRouter.get('/getMessage',isAuth,getMessa)
MessageRouter.get('/getUserMessage',isAuth,getMessUser)

MessageRouter.put('/updateMessage/:id',isAdmin,upMess)
MessageRouter.delete('/deleteMessage/:id',isAdmin,delMess)
MessageRouter.put('/addresponse/:id',isAdmin,addRep)






module.exports=MessageRouter