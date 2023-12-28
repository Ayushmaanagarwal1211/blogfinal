const mongoose=require('mongoose')
const schema=require('./User')
const schema1=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,

    },
    desc:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:false
    },
    categories:{
        type:[String],
        required:false
    }

}
,
    {timestamps:true})
module.exports=new mongoose.model('posts',schema1);