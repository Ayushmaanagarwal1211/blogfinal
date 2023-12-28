const express=require("express")
const bcrypt=require('bcrypt')
const router=express.Router();
const User=require("../models/User")
const {body, validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const post=require('../models/posts')
const secret='mynameisayushmaan'
const cors=require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
router.use(cors())
const middleware=require('../middleware/middleware')
//create
router.post('/register',async (req,res)=>{ 
       console.log(req.body.email)

    const salt=await bcrypt.genSalt(10);
    const a=await bcrypt.hash(req.body.password,salt)
    const user= await User({
        name:req.body.name,
        password:a,
        email:req.body.email,
        profilepic:req.body.pic
    })
    const use=await user.save().then(console.log("hlo"))
    res.status(200).send('Done')
})

router.get('/pic',middleware,async(req,res)=>{
    // const a=await User.find({})
    return res.status(200).send(req.user.data.profilepic)
})
//login

router.post('/login',async (req,res)=>{
console.log("hiiiii")
    const user=await User.find({email:req.body.email});
    console.log(user)
        if(user.length===0){
            console.log("nppp")
            return res.status(200).send("Not valid email");
        }
        
        const p=await bcrypt.compare(req.body.password,user[0].password) ;
        if(!p){
            console.log("invalid")
            return res.status(200).send("Not valid password");
        }
        const data={
            token:jwt.sign({data:user[0]},secret),
            mainuser:user[0]
        }
        const token=await jwt.sign({data:user[0]},secret)
       return  res.status(200).send(data);
    
})
//get user
router.get('/getuser',middleware,async (req,res)=>{
    const us=await User.find({_id:req.user.data._id})
    
    return res.status(200).send(us)
})
//update account
router.get('/updateaccount',middleware,async (req,res)=>{
    console.log(req.headers.email)
        if(req.headers.password){
            const salt=await bcrypt.genSalt(10);
     req.headers.password=await bcrypt.hash(req.headers.password,salt)
        }
        console.log(req.user.data._id)
        try{
          const data=  await User.findByIdAndUpdate(req.user.data._id,{
                $set:req.headers
        
            })
            return res.status(200).send("Done")
        }catch{
                return res.send('Please enter valid passowrd')
        }
        
})

//delete account
router.delete('/delete',middleware,async (req,res)=>{
            await User.findByIdAndDelete(req.user.data._id)
        return res.status(200).send('deleted')
    
})


//create new post
router.post('/createpost',middleware,async (req,res)=>{
    const a1=[];
  console.log("The namae",req.headers.url)
a1.push(req.body.category)
        const a=await  post({
            user:req.user.data._id,
            title:req.headers.title,
            desc:req.body.description,
            pic:req.headers.url,
            categories:a1
        }).save();
       return res.status(200).send("done")
    
})

//fect post
router.get('/getpost',middleware,async(req,res)=>{
    
    const a=await post.find({user:req.user.data})
   console.log(a)
    return res.status(200).send(a);
})
router.get('/singlepost/:id',middleware,async(req,res)=>{
const a =await post.find({_id:req.params.id})
return res.status(200).send(a)
})
router.put('/updatepost/:id',middleware,async(req,res)=>{
    console.log(req.body.title)
    await post.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            desc:req.body.desc,
            pic:req.body.pic
        }
    })
    return res.status(200).send("Edited")
    
})
router.delete('/deletepost/:id',middleware,async(req,res)=>{
    await post.findByIdAndDelete(req.params.id)
    return res.status(200).send("Item deleted")
})

//find by category 
router.get('/category',middleware,async(req,res)=>{
   const a=  await post.find({
        categories:{
            $in:req.query.category
        }
    })
    return res.status(200).send(a)

})
module.exports=router