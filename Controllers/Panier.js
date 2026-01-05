const Panier = require('../Models/Panier')


 exports.getPanier= async (req, res) => {
    try {
                if (req.User.role==='admin' || req.User.role==='super-admin') {
            return res.status(400).send({errors: [{ msg: 'admins cannot  add Cart ' }]})
        }
        const panier = await Panier.findOne({ user: req.User._id }).populate("items.product")
        if (!panier) {
            return res.status(200).send({ msg: "Panier vide", panier: { items: [] } });
        }
        const tenDaysMs=10*24*60*60*1000
        const now=Date.now()
        const lastUpdate=panier.updatedAt? panier.updatedAt.getTime():panier.createdAt.getTime()
        if (now-lastUpdate > tenDaysMs) {
         panier.items=[]
         await panier.save()
         return res.status(200).send({ msg: "Cart expired", panier });
        }
        
        return res.status(200).send({ msg: "Votre panier", panier });


    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'cannot find Cart ' }] })
    }
}


 exports.addPanier=async (req, res) => {
    try {
        if (req.User.role==='admin' || req.User.role==='super-admin') {
            return res.status(400).send({errors: [{ msg: 'admins cannot  add Cart ' }]})
        }
        const { product, quantity } = req.body
        var panier = await Panier.findOne({ user: req.User._id })


        const existingProduct = panier.items.find((el) => el.product.toString() === product)


        if (existingProduct) {
            existingProduct.quantity += quantity
        }
        else { panier.items.push(req.body) }
        await panier.save()
        res.status(200).send({ msg: 'panier added', panier })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'cannot add Cart ' }] })
    }
}

exports.addAllPanier=async (req, res) => {
    try {
                if (req.User.role==='admin' || req.User.role==='super-admin') {
            return res.status(400).send({errors: [{ msg: 'admins cannot  add Cart ' }]})
        }
        const { items } = req.body


        var found = await Panier.findOne({ user: req.User._id })

        items.forEach(element => {
            const { product, quantity } = element

            const existing = found.items.find((el) => el.product.toString() === product)
            if (existing) {
                existing.quantity += quantity

            } else {
                found.items.push({ product, quantity })
            }
        });

        await found.save();

        const PanierUpdated = await Panier.findOne({ user: req.User._id }).populate("items.product")

        res.status(200).send({ msg: "panier updated", PanierUpdated })


    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'cannot add all product to cart ' }] })
    }
}



exports.UpdatePanierProduct= async (req, res) => {
    try {
                if (req.User.role==='admin' || req.User.role==='super-admin') {
            return res.status(400).send({errors: [{ msg: 'admins cannot  add Cart ' }]})
        }
        const { updating, productId } = req.body

        const found = await Panier.findOne({ user: req.User._id })

        if (!found) {
            return res.status(400).send({ msg: 'cart not found' })
        }

        const foundProduct = found.items.find((el) => el.product.toString() === productId )
        if (!foundProduct) {
            return res.status(400).send({ msg: 'product does not exist' })
        }

          if (updating === "increment") {
      foundProduct.quantity += 1;
    } else if (updating === "decrement") {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
      } else {
        foundProduct.quantity = 1; 
      }
    }
        
        const UpdatedProduct = await Panier.findByIdAndUpdate(found._id, { $set: { items: found.items } },{new:true}).populate('items.product')
        return res.status(200).send({ msg: "updated product", UpdatedProduct })
    }

    catch (error) {
        res.status(500).send({ errors: [{ msg: 'cannot Update product in cart ' }] })
    }
}


exports.deleteProductCart=async(req,res)=>{
    try {
                if (req.User.role==='admin' || req.User.role==='super-admin') {
            return res.status(400).send({errors: [{ msg: 'admins cannot  add Cart ' }]})
        }
        const {productId}=req.body
        const found= await Panier.findOneAndUpdate({user:req.User._id},{$pull:{items:{product:productId}}},{new:true}).populate('items.product')
         res.status(200).send({msg:'One Product deleted ',found})

    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'cannot Delete product from cart ' }] })
    }

}



exports.getQuantity=async(req,res)=>{
    try {
                if (req.User.role==='admin' || req.User.role==='super-admin') {
            return res.status(400).send({errors: [{ msg: 'admins cannot  add Cart ' }]})
        }
         const found= await Panier.findOne({user:req.User._id})
         if (!found) {
             return res.status(200).send({ errors: [{ msg: 'cannot count all quantities' }] })
         }
        const totalQuantity= found.items.reduce((somme,item)=>{return somme+item.quantity },0)
        
         res.status(200).send({msg:"la somme est",totalQuantity})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'cannot count all quantities' }] })
    }
   
 }