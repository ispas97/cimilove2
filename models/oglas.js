const mongoose=require('mongoose')
const oglasSchema=new mongoose.Schema({
    naslov:{
        type:String,
        required:true
    },
    adresa:{
        type:String,
        required:false
    },
    description: {
        type: String,
        required:false
      },
    coverImageName: {
        type: String,
        required: false
      },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports=mongoose.model('Oglas',oglasSchema)