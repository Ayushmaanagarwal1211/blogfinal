import { Link, useNavigate } from 'react-router-dom'
import Topbar from '../topbar/Topbar'
import './login.css'
import React, { useContext, useRef, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';
import Popup from '../popup/Popup';
import {FaEnvelope} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
export default function Login() {
  localStorage.clear();
 const eref=useRef(null);
 const navigate=useNavigate();
 const [popup,showpopup]=useState(false)
 const [msg,msgs]=useState('')
 const pref=useRef(null);
 const {state,dispatch}=useContext(Context);
 console.log(state)
 const options={headers:{
  "Content-Type":"application/json"
 }}
const post={
  data: [
    {
        email: 'loviagarwal;55@gmail.com',
        password:"mynameislovi"
    }
]
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const handleerror=async (msga)=>{
  showpopup(true)
  msgs(msga)
  await delay(2000)
  showpopup(false)

}
 console.log(dispatch)
 const register=async ()=>{
navigate("/register") }
const handleclick=async ()=>{
  dispatch({type:"loginstart"});

  try{
    console.log(eref.current.value)
    const data=await axios.post('https://blogbackend-xw0e.onrender.com/api/auth/login',{
      email: eref.current.value,
      password:pref.current.value
    })
    if(data.data==="Not valid email"){
      return handleerror(data.data);
    }
    else if(data.data==="Not valid password"){
      return handleerror("Not valid password")
    }
    const pass={
      name:data.data.mainuser.name,
      email:data.data.mainuser.email,
      password:pref.current.value
    }
    localStorage.setItem('auth-token',data.data.token)
    await dispatch({type:"loginmain",payload:pass})
    console.log("mainuser",state.mainuser)
    
    navigate("/pages")
   
  }catch(err){
    dispatch({type:"loginfailure"})
  }
}
console.log(state.mainuser)
  
  return (
    <>
      

    <div className='b' style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",color:"white",height:"100vh",width:"100vw",position:"relative"}}>
               
 <button style={{position:"absolute",width:"100px",right:"40px",top:"40px",padding:"1%" ,backgroundColor:"rgba(0,0,0,0)",borderRadius:"5px",border:"solid gray 1px",cursor:"pointer",color:"white"}} onClick={register} ><Link style={{textDecoration:"none",color:"inherit"}}  >Register</Link></button>
        <div className='box1'>
          <form action="" style={{display:"flex",flexDirection:"column",justifyContent:"start",gap:"40px",width:"100%"}}>
          <div style={{display:"flex",flexDirection:"row",gap:'0px'}}><label htmlFor='username' style={{color:"white"}}><div ><FaEnvelope size={'1.5rem'} style={{border:"solid white 2px",color:"#1454df",padding:"10px",borderRadius:"50%",backgroundColor:"white"}}/></div></label>

          
            <input type='email' id='email' className='inputs' placeholder='Enter your email' ref={eref}></input></div>
            <div style={{display:"flex",flexDirection:"row-reverse",gap:'0px'}}><label htmlFor='username' style={{color:"white"}}><div ><FaLock size={'1.5rem'} style={{border:"solid white 2px",color:"#1454df",padding:"10px",borderRadius:"50%",backgroundColor:"white"}}/></div></label>
            <input type='password' id='password' className='inputs' ref={pref} placeholder='Enter your password'></input></div></form>
            <button className='button1' onClick={handleclick} style={{width:"200px",display:"block",margin:"auto",marginTop:"40px",padding:"1%" ,height:"40px",backgroundColor:"aqua" ,color:"black",fontSize:"20px",fontWeight:"semibold",borderRadius:"20px",cursor:"pointer"}}>Submit</button>
        </div>
    </div>
    {popup && <Popup msg={msg} />}
    </>
  )
}
