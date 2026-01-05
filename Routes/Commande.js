const express = require('express')
const { isAuth } = require('../Middelwares/isAuth')
const Panier = require('../Models/Panier')
const Commande = require('../Models/Commande')
const { updatedStatus, getAllOrdors, getOneOrder, addOrder } = require('../Controllers/Commande')
const { isAdmin } = require('../Middelwares/isAdmin')
const CommandeRouter = express.Router()



CommandeRouter.post('/addCommande', isAuth, addOrder);

CommandeRouter.get('/getOneCommande', isAuth,getOneOrder)

CommandeRouter.get('/getAllOrdders', isAdmin, getAllOrdors)

CommandeRouter.put('/UpdateStatus/:OrderId', isAdmin,updatedStatus)




module.exports = CommandeRouter