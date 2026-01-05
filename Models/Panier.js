const mongoose=require('mongoose')

const PanierSchema=mongoose.Schema({
    items:[{
            product:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:"Product"
    },
            quantity:{
                    type:Number,
                    default:1,
                    min:1
    }
}],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:"Users"
    }
},
{timestamps:true})

module.exports=mongoose.model('Cart',PanierSchema)