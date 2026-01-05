const express = require('express')

const { isAuth } = require('../Middelwares/isAuth')
const { getPanier, addPanier, addAllPanier, UpdatePanierProduct, deleteProductCart, getQuantity } = require('../Controllers/Panier')

const PanierRouter = express.Router()

PanierRouter.get('/Panier', isAuth, getPanier)

PanierRouter.post('/addPanier', isAuth, addPanier)

PanierRouter.post('/addAllPanier', isAuth, addAllPanier)

PanierRouter.put('/UpdatePanierProduct', isAuth,UpdatePanierProduct)

PanierRouter.delete('/DeletePanierProduct',isAuth,deleteProductCart)

PanierRouter.get('/QuantityArticles',isAuth,getQuantity)







module.exports = PanierRouter