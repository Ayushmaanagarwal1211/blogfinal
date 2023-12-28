import Topbar from '../topbar/Topbar'
import './settings.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Context } from '../context/Context'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../popup/Popup'

export default function Settings(props) {
const [popup,showpopup]=useState(false)
    const pref=useRef();
    const [messagem,showmessage]=useState('')
    const naviagte=useNavigate();
    const [without,withouts]=useState(0)
    const [initialname,initial]=useState('')
    const [initialemail,initialemails]=useState('')
const [file,files]=useState('')
const [tempoFile,setTempoFile]=useState('')

    const [lazy,lazys]=useState(false)
    const nref=useRef();
    const [password,passwords]=useState(false)
    const rref=useRef();
    const {state}=useContext(Context)
    const navigate=useNavigate();
    const [data,datas]=useState([])
    const changepassword=(e)=>{
      e.preventDefault()
      console.log(eref.current.value)
      console.log(aref.current.value)
      if(password===false){
      passwords(true)
      }
      else{
        passwords(false)
      }
    }
useEffect(()=>{
  const fetch=async()=>{
    
    const option={ headers:{'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json'}}

    let d=await axios.get("https://blogbackend-xw0e.onrender.com/api/auth/getuser",option)
    console.log("ASSSSSSSSSSSSSSSSSSSSSSSSSSSSSs",d)
    datas(d.data)
    lazys(true)
    files(d.data[0].profilepic)
    setTempoFile(d.data[0].profilepic)
    initial(d.data[0].name)
    initialemails(d.data[0].email)
  }  
  fetch();
console.log(typeof(window.location.href))
},[navigate])   

     const aref=useRef(data.name);
const eref=useRef(data.email);

    const handledelete=async ()=>{
  const options={ headers:{'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json'}}

  await axios.delete("https://blogbackend-xw0e.onrender.com/api/auth/delete",options)
  await localStorage.removeItem("auth-token")
navigate('/login')
window.location.reload()

}
const  togglePasswordVisibility1=()=> {
  const passwordInput1 = document.getElementById("passwordInput1");
  const togglePassword1 = document.getElementById("togglePassword1");
  
  console.log(passwordInput1)
  if (passwordInput1.type === "password") {
    passwordInput1.type = "text";
    togglePassword1.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/709/709612.png')"; /* Replace with your eye-off icon image */
  } else {
    passwordInput1.type = "password";
    togglePassword1.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/2767/2767146.png')"; /* Replace with your eye icon image */
  }
}

const event1=async ()=>{

  await delay(3000)
  console.log("inside dfom")

const event=document.body.querySelector("#fileupload");
console.log(event)
console.log("Happ jpurney")
event && event.addEventListener('change',async (e)=>{
  const formdata=new FormData();
formdata.append('file',e.target.files[0]);
formdata.append('upload_preset','e_image')
  let a=''
  setTempoFile(URL.createObjectURL(e.target.files[0]))
  
  if(formdata!=null){
  
  files('a')
  const d=await fetch("https://api.cloudinary.com/v1_1/dwgd3as6k/upload&quality=10",{
     method:"POST",
     body:formdata
    })
    const data=await d.json()
    console.log("The VALUE OF R",data)
   let url=data.url
  files(url)
  
  }
})


}
useEffect(()=>{
  event1();
 },[navigate])
 function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const handleerror=async (msg)=>{
  showmessage(msg)
  showpopup(true)
await delay(2000)
showpopup(false)
 
}
const handlesubmit=async ()=>{ 
  let options={}
  if(eref.current.value.length==0 ){
  handleerror("Email FIeld Must Not Be Empty")
  return
} 
if(aref.current.value.length==0){
  handleerror("Name Field Must Not Be Empty")
  return;
}
if(!eref.current.value.includes("@gmail.com")){
  handleerror("Please Enter Valid Email")
  return
}
if(password===false){
     options={ headers:{'authtoken':localStorage.getItem('auth-token'),"email":eref.current.value,"name": aref.current.value,'profilepic':file,'Content-Type':'application/json'}}
  const data=await axios.get(`https://blogbackend-xw0e.onrender.com/api/auth/updateaccount`,options)
  window.location.reload()
}

  else if(rref.current===undefined && nref.current===undefined && password===true){
    
    handleerror("Plz fill Both the fields")

  } else if(nref.current.value==="" && rref.current.value==="" && password===true){
    handleerror("Both the fields must not be emmpty")
  } 
   else if(rref.current.value==="" && password===true){
    handleerror("Reenter field does not be empty")
  }
   else if(nref.current.value==="" && password===true){
    handleerror("New password field must not be empty")
  } 
 else if(rref.current.value!==nref.current.value){
  handleerror("Passwords does not match")
 }
   if(rref.current.value===nref.current.value && password===true){
    console.log("hasjdsja")
         options={ headers:{'authtoken':localStorage.getItem('auth-token'),"email":eref.current.value,"password":rref.current.value,"name": aref.current.value,'profilepic':file,'Content-Type':'application/json'}}
         const data=await axios.get(`https://blogbackend-xw0e.onrender.com/api/auth/updateaccount`,options)
         naviagte('/home')
  }
}
    const  togglePasswordVisibility=()=> {
        const passwordInput = document.getElementById("passwordInput");
        const togglePassword = document.getElementById("togglePassword");
        
        console.log(passwordInput)
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          togglePassword.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/709/709612.png')"; /* Replace with your eye-off icon image */
        } else {
          passwordInput.type = "password";
          togglePassword.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/2767/2767146.png')"; /* Replace with your eye icon image */
        }
      }
 const handlechange=(e)=>{
    initial(e.target.value)
 }
 const emailchange=(e)=>{
  initialemails(e.target.value)
 }
  return (
    <>
        <Topbar />
        {lazy &&
        <div className='maincontainer' style={{display:"flex",flexDirection:"row"}}>
            <div className="settings" >
                <div className='update' style={{display:"flex"}}>
                    <h1 className='heading' style={{display:"inline-block",flex:"4.5"}}>Update Your Account</h1>
                    <span className='delete' onClick={handledelete} style={{alignSelf:"center"}}>Delete Your Account</span>
                </div>
                <h3>profile Picture</h3>
                <label htmlFor="fileupload" style={{width:"20px",height:"20px",onjectFit:"cover",alignSelf:"center",position:"relative",top:"100px",paddingLeft:"110px"}}><img className='image-input' src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="no" /></label>
                <div style={{display:"flex"}}>
                <img className='Userprofile' style={{width:"100px",height:"100px",objectFit:"cover",borderRadius:"10%"}} src={tempoFile} alt='No'></img>
                <input type='file'id='fileupload' className='image-input' name='avatar'  style={{display:"none"}}  ></input>
                </div>
                <form  className='form'>
                    <label htmlFor='name11'  className='label'>Username</label>
                    <input type='text' id="name11" value={initialname} onChange={handlechange} ref={aref}  className='input'></input>
                    <label htmlFor='email11'  className='label'>Email</label>

                    <input type='email' id='email11' value={initialemail}  onChange={emailchange} ref={eref}  className='input'></input>
                    <label htmlFor='passwordInput'  className='label'>Password</label>

<Link style={{marginLeft:"14px",marginTop:"5px"}} onClick={changepassword}>Change Password</Link>

{              password && <div className='password'> <div className='eye'><input type='password' id="passwordInput" ref={nref} placeholder="Enter New Password" style={{width:"40%"}} className='input'></input>
                    <span id="togglePassword" onClick={togglePasswordVisibility}></span></div>
                 <div className='eye'>   <input type='password' style={{width:"40%"}} id="passwordInput1" ref={rref} placeholder="Reenter the password" className='input'></input>
                    <span id="togglePassword1" onClick={togglePasswordVisibility1}></span></div>
          </div>      }  
                              </form>
                <div style={{width:"100%",padding:"4%"}}>
                <button className='settingbutton' onClick={handlesubmit} style={{margin:"auto",display:"block",backgroundColor:"darkblue",color:"white",height:"30px",width:"70px",cursor:'pointer'}}>Submit</button>
           </div> </div>
            
        </div>
}
         { popup && <Popup msg={messagem} />}
        

    </>
  )
}
