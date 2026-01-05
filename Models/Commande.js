const mongoose=require('mongoose')
const CommandeSchema=mongoose.Schema({
    
    items:[{
            product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
    },
            quantity:Number,
    
}],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        
        ref:"Users"
    },
    status:{type:String,
            default:"pending"
    },
    commentaire : String,
    date:{  type: Date,
           default: Date.now}
},
{timestamps:true})










module.exports=mongoose.model('Commande',CommandeSchema)