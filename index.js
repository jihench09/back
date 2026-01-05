const express=require('express')
const ConnectDB = require('./Config/ConnectDB')
const UserRouter = require('./Routes/User')
const ProductRouter = require('./Routes/Product')
const PanierRouter = require('./Routes/Panier')
const CommandeRouter = require('./Routes/Commande')
const MessageRouter = require('./Routes/Message')
const cors = require('cors')
const app=express()

app.use(cors({
  origin: 'https://695b87bd794266aa8c1e9a09--prettyjihen.netlify.app/',
  credentials: true 
}))






require('dotenv').config()
app.use(express.json())
ConnectDB()


app.use('/users',UserRouter)
app.use('/Product',ProductRouter)
app.use('/Cart',PanierRouter)
app.use('/Order', CommandeRouter)
app.use('/Message',MessageRouter)












app.listen(process.env.port,console.log(`server is running at port ${process.env.port}`))