import React, { useContext, useEffect, useState } from 'react'
import './Topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import LocomotiveScroll from 'locomotive-scroll'
import Pages from '../pages/Pages'
import { Context } from '../context/Context'
import axios from 'axios'

export default function Topbar() {
  const navigate=useNavigate();
  
  const [file,files]=useState('')
  const [name,names]=useState('')
  const [showoptions,setshowoptions]=useState(false)

  const [mobile,ismobile]=useState(false)
  const clickhandle=async()=>{
    // let ans=confirm("Are You Sure You want to Log Out?")
    // if(ans){await localStorage.removeItem("auth-token")
    // navigate('/login')
    // window.location.reload()}
  }
  function handleoptionshow(){
    showoptions?setshowoptions(false):setshowoptions(true)
  }
  useEffect(()=>{
    function handleresize(){
      console.log(window.innerWidth)
if(window.innerWidth<600){

  ismobile(true)
}else{
ismobile(false)
}}
window.addEventListener('resize',handleresize)
if(window.innerWidth<600){

  ismobile(true)
}else{
ismobile(false)
}

  },[])
  useEffect(()=>{
    const fetching=async()=>{
    const option={ headers:{'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json'}}

    let d=await axios.get("https://blogbackend-xw0e.onrender.com/api/auth/getuser",option)
  files(d.data[0].profilepic)
  names(d.data[0].name)
  localStorage.setItem('name',d.data[0].name)
  }
    fetching()
  },[])
  const {state}=useContext(Context);
const {user}=useContext(Context);
  return (
    <>
    <div className='topbar' style={{color:"white",backgroundColor:"#500a0a",zIndex:"99"}}>
   {!mobile && <div className="left" style={{justifyContent:"start"}}>
        <ul className='list2'>
          <li style={{cursor:"pointer",opacity:"1"}}></li>
            <li style={{cursor:"pointer",opacity:"1"}}></li>
            <li style={{cursor:"pointer",opacity:"1"}}></li>
            <li style={{cursor:"pointer",opacity:"1"}}></li>
        </ul>
    </div>}

    <div className="middle" style={{flex:`${mobile?"12":'6'}`,justifyContent:`${mobile?"end":"center"}`}}>
   {!mobile? <ul className='list2'>
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={`/pages`} className='link ' >Home</Link></li>
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={'/contact'} className='link' >Contact</Link></li>
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={'/write'} className='link' >Write</Link></li>
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={'/setting'} className='link' >Setting</Link></li>

      <li style={{cursor:"pointer"}}><Link  className='link' onClick={clickhandle} >Logout</Link></li>
    </ul>:<div style={{display:"flex",flexDirection:"row-reverse",alignContent:"center"}}><span className='h' onClick={handleoptionshow}>{`${mobile?'>':"<"}`}</span><ul className={`list2 ${showoptions?"list2animate":"hidden"}`} style={{gap:"12px"}} >
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={`/pages`} className='link ' >Home</Link></li>
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={'/contact'} className='link' >Contact</Link></li>
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={'/write'} className='link' >Write</Link></li>
      <li style={{cursor:"pointer",opacity:"1"}}><Link to={'/setting'} className='link' >Setting</Link></li>

      <li style={{cursor:"pointer"}}><Link  className='link' onClick={clickhandle} >Logout</Link></li>
    </ul> </div>}</div>
   {!mobile && <div className="right">
      
        {
          user!==null?<ul className='list2'><li><img className='background' style={{borderRadius:"100%",height:"30px",width:'30px'}} src={file.length==0?`https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg`:file} alt='no'></img></li>
        <li style={{marginLeft:"16px",marginBottom:"5px",padding:"5%"}}>{name}</li>
        <li></li></ul>:<ul className='list2'><Link to={'/register'} className='link' >Register</Link><Link to={'/login'} className='link' >login</Link></ul>
        }
        
      
    </div>}</div>
  </>
  )
}
