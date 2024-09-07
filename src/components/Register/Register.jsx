import '../login/login.css';
import React, { useEffect, useRef, useState } from 'react'
import Topbar from '../topbar/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../popup/Popup';
import { FaCircleUser } from 'react-icons/fa6';
import {FaEnvelope} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
export default function Register() {
  const [pic,pics]=useState('');
  const [file,files]=useState('')
  const [popup,showpopup]=useState(false)
  const [ismobile,setismobile]=useState(false)
  const [tempfile,settempfile]=useState('')
  const [msg,msgs]=useState('')
  const navigate=useNavigate();
      const uname=useRef(null);
      const email=useRef(null);
      const password=useRef(null);
      useEffect(()=>{
        if(window.innerWidth<1000){
          setismobile(true)
        }else{
          setismobile(false)
        }
      })
const handlechange=async (e)=>{
  const formdata=new FormData();
  files("a")
  settempfile(e.target.files[0])
  formdata.append('file',e.target.files[0])
  formdata.append('upload_preset','e_image')
const d=await fetch("https://api.cloudinary.com/v1_1/dwgd3as6k/upload",{
   method:"POST",
   body:formdata
  })
  const data=await d.json()
  console.log("The VALUE OF R",data)
 let url=data.url
 pics(url)
files(e.target.files[0])
}
const handleclick1=async()=>{
  navigate('/login')
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const handleerror=async (msga)=>{
  showpopup(true)
  msgs(msga)
  await delay(2000)
  showpopup(false)

}
      const handleclick=async ()=>{
       
       if(email.current.value.length===0){
        return handleerror("Not Valid Email")
       }
         const a= isEmailValid(email.current.value)
         if(a===false){
            return handleerror("Not valid email")
         }
         if(password.current.value.length<8){
          return handleerror("Password Must Not Be Less Than 8 Charachters")
         }
      try{
        const data=await axios.post('https://blogbackend-xw0e.onrender.com/api/auth/register',{
          name:uname.current.value,
          email: email.current.value,
          password:password.current.value,
          pic:pic
        })
        // navigate("/login")
                navigate('/login')

      }
      catch(err){
        console.log("Error generated")
      }
      }
   
    
return (

<>

      

    <div className='b' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",color:"white",height:"100vh",width:"100vw",position:"relative"}}>
         <div style={{marginBottom:`${ismobile?"200px":"0px"}`,position:"static",height:"600px",width:"700px",display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}} >   
                <div style={{position:"relative",display:"flex",justifyContent:"center",height:"150px",width:"100%"}}>
                <div style={{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",width:"250px",height:"150px"}}>
                {file==''?<label htmlFor='pictureupload' style={{width:"100px",height:"50px",objectFit:"contain"}}><i class="fa-solid fa-user fa-sm" style={{fontSize:"100px",color:"white"}}></i></label>:   <label htmlFor='pictureupload' style={{width:"100px",height:"100px"}}><img style={{background:"transparent",  mixBlendMode: "inherit",zIndex:"999",opacity:"45",borderRadius:"50%",width:"100px",height:"100px"}} src={file==''?"https://www.bing.com/th?id=OIP.SXkUwphMyUJ5U4OgehuHBQHaHc&w=150&h=151&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2":URL.createObjectURL(tempfile)} alt='"no'></img></label> }
               
            
                <label htmlFor='pictureupload' placeholder='+' style={{color:"white",position:"absolute",bottom:"10px",left:"10px",fontSize:"30px"}} > +</label>
                <input style={{color:"white",display:"none"}} onChange={handlechange} id="pictureupload" type='file'></input>
                <div style={{position:"realtive"}}></div>
               </div>
                </div>
                  <button style={{right:`${ismobile?"40px":"10px"}`,top:`${ismobile?"40px":"10px"}`,width:"100px",position:"absolute",padding:"1%",backgroundColor:"aqua",border:"solid gray 1px",cursor:"pointer",color:"black",borderRadius:"5px",boxShadow:"10,10,10px,10px,rgba(0,0,0,1)"}} onClick={handleclick1}><Link style={{textDecoration:"none",color:"inherit"}} >Signin</Link></button>
                 <div className='box1' style={{position:"relative",minWidth:"200px",height:`${ismobile?"700px":"300px"}`,width:`${ismobile?"500px":"300px"}`}}>
          <form action="" style={{display:"flex",height:"100%",gap:"15%",flexDirection:"column",justifyContent:"start",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"row",gap:'0px'}}><label htmlFor='username' style={{color:"white"}}><div ><FaCircleUser size={'2.5rem'} style={{}} /></div></label>
           <input type='text' id='username' className='inputs' ref={uname} placeholder='Enter your Username' ></input></div>
           <div style={{display:"flex",flexDirection:"row-reverse",gap:'0px'}}>  <label htmlFor='email' style={{color:"white"}}><div ><FaEnvelope size={'1.5rem'} style={{border:"solid white 2px",color:"#1454df",padding:"10px",borderRadius:"50%",backgroundColor:"white"}} /></div></label>
            <input type='email' className='inputs' placeholder='Enter your email' ref={email}></input></div>
            <div style={{display:"flex",flexDirection:"row",gap:'0px'}}> <label htmlFor='password' style={{color:"white"}}><FaLock size={'1.5rem'}  style={{color:"#1454df",padding:"10px",borderRadius:"50%",backgroundColor:"white"}} /></label>
            <input type='password' className='inputs' placeholder='Enter your password' ref={password}></input></div></form>
            <button className='button1' onClick={handleclick} style={{width:"200px",display:"block",margin:"auto",marginTop:"40px",padding:"1%" ,height:"40px",backgroundColor:"aqua" ,color:"black",fontSize:"20px",fontWeight:"semibold",cursor:"pointer"}}>Submit</button>
                  </div></div>
    </div>
    {popup && <Popup msg={msg}/>}
    </>  )
}
