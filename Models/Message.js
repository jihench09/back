const mongoose=require('mongoose')
const messageSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
    subject:{type:String,required:true},
    phone:{type:Number,required:true},
    status:{type:String,default:'new'},
    reply:{type:String,default:' Your message has been received 💌 Our team will answer as soon as possible.'}
},
{timestamps:true})

module.exports=mongoose.model('Message',messageSchema)