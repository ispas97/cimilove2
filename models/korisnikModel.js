const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    telephone:{
        type:String,
        required:true
    },
    instagram:{
        type:String,
        required:false
    },
    coverImage:{
        type:Buffer,
        required:false//mozda je jedno od ova dva true
    },
    coverImageType:
    {
        type:String,
        required:false
    },


})

module.exports=mongoose.model('User',userSchema)