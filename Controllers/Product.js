const Product = require("../Models/Product")

exports.addProduct=async(req,res)=>{
    try {
        const product= new Product(req.body)
        product.save()

        res.status(200).send({msg:'product added',product})

    } catch (error) {
        res.status(500).send({errors:[{msg:'cannot add product'}]})
    }
}

exports.getallProd=async(req,res)=>{
    try {

        const products= await Product.find()
        res.status(200).send({msg:"listes des produits:",products})

    } catch (error) {
        res.status(500).send({errors:[{msg:'cannot find products'}]})
    }
}

exports.getOneProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product= await Product.findById(id)
        res.status(200).send({msg:'produit:',product})
    } catch (error) {
        res.status(500).send({errors:[{msg:'cannot find one product'}]})
    }
}

exports.editProduct=async(req,res)=>{
try {
            const {id}=req.params
        const updatedProduct= await Product.findByIdAndUpdate(id,{$set:req.body})
            res.status(200).send({msg:"product updated",updatedProduct})
} catch (error) {
    res.status(500).send({errors:[{msg:'cannot Updated one product'}]})
}
}

exports.deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        await Product.findByIdAndDelete(id)
        res.status(200).send({msg:"Product deleted with succes"})
    } catch (error) {
        res.status(500).send({errors:[{msg:'cannot Delete one product'}]})
    }
}

exports.categorietype=async(req,res)=>{
    try {
         const {categorie}=req.params
         const cat= await Product.find({categorie})
         res.status(200).send({msg:'product categorie,',cat})
    } catch (error) {
        res.status(500).send({errors:[{msg:'cannot find categorie'}]})
    }
}
