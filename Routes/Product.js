const express=require('express')
const Product = require('../Models/Product')
const { addProduct, getallProd, getOneProduct, editProduct, deleteProduct, categorietype } = require('../Controllers/Product')
const { isAdmin } = require('../Middelwares/isAdmin')
const ProductRouter=express.Router()


ProductRouter.post('/addproduct',isAdmin,addProduct)

ProductRouter.get('/getallProduct',getallProd)

ProductRouter.get('/getOneProduct/:id',getOneProduct)

ProductRouter.put('/editProduct/:id',isAdmin,editProduct)

ProductRouter.delete('/deleteOneProduct/:id',isAdmin,deleteProduct)

ProductRouter.get('/getProductCat/:categorie', categorietype)















module.exports=ProductRouter