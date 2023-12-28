const express=require('express')
const app=express();
const mongoose=require('mongoose')
const dotenv=require('dotenv');
const auth=require('./routes/auth.js')
const { json } = require('react-router-dom');
const multer=require('multer')
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
 
const path = require('path');
app.use(cors());
app.use('/image',express.static('images'))
// const upload = multer({ dest: './images/' })
app.use(bodyParser.json({ limit: '10mb' }));

dotenv.config();
const storage11 = multer.diskStorage({
    destination:  (req, file, cb)=> {
       cb(null, './images')
    },
    filename:  (req, file, cb)=> {
       cb(null, `${Date.now() + '-' + Math.round(Math.random() * 1E9)}.jpeg`)
    }
  })
  
  const upload =multer({storage:storage11})
app.post('/api/upload',upload.single('avatar'),async (req,res)=>{
    try {
        if (!req.file) {
          throw new Error('No file received');
        }
        console.log(req.file);
        console.log(req.body);
console.log(req.file.filename)
const ur=req.file.filename
        return res.status(200).json({ur:ur});
      } catch (err) {console.log(err)
      }
      
})
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
   
}).then(()=>{
    console.log("backend server running")
})
app.use(upload.single('avatar'))
app.use(express.json())
app.use('/api/auth',auth)
app.get('/check',(req,res)=>{
    console.log("server running");
})
app.listen(5000,()=>{
    console.log("server running at port 5000");
})