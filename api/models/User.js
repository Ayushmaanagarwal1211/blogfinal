const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    ,
    profilepic:{
        type:String,
        required:false
    }
})
module.exports=new mongoose.model('user',schema);