const mongoose=require('mongoose')


const UserSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{required:true,unique:true,type:String},
    password:{type:String,required:true},
    phone:{required:true,type:Number},
    adress:{required:true,type:String},
    role:{
        type:String,
        default:'user'
    }
   
})


module.exports=mongoose.model('Users',UserSchema)