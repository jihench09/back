const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    prix:{type:Number,required:true},
    categorie:{type:String,required:true}
})

module.exports=mongoose.model('Product',productSchema)