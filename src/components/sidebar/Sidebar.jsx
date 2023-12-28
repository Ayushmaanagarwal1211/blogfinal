import React, { useContext, useEffect, useRef, useState } from 'react'
import './sidebar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
export default function Sidebar(props) {
  const {array}=props;
  const [file,files]=useState('')
  const ref=useRef([])
  const [id1,ids]=useState('')
  const navigate=useNavigate();const {state,dispatch}=useContext(Context)
  const clickhandle=async (e)=>{
const options={
  headers:{
    'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json'
  }
}


const data=await axios.get(`https://blogbackend-xw0e.onrender.com/api/auth/category?category=${e.target.innerHTML}`,options)
console.log(data)
console.log(state.user)
let count=0;
array.map(element11=>{
count++;

 if(element11.length>0){document.getElementById(`${element11}`).style.backgroundColor='rgb(184, 51, 51)'
 }
})
ids(e.target.id)
console.log("user",state.user) 
console.log(e.target.style.backgroundColor)
if(e.target.id===id1
){
  console.log("Inside 9fd")
  await dispatch({type:"loginsuccess",payload:null})
  e.target.style.backgroundColor='rgb(184, 51, 51)'
  ids('')
  return;

}
await dispatch({type:"loginsuccess",payload:e.target.innerHTML})
e.target.style.backgroundColor='rgb(133, 0, 0)'; }
useEffect(()=>{
  const fetching=async()=>{
  const option={ headers:{'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json'}}

  let d=await fetch("https://blogbackend-xw0e.onrender.com/api/auth/getuser",{headers:option.headers,method:"GET"})
   d=await d.json() 
    console.log("THEEEEEE",d)

files(d[0].profilepic)

}
  fetching()
},[])
  return (
    <div className='sidebar'>
      <div className='about'>
        <p className='aboutme'>About Me</p>
        <img style={{objectFit:"cover",width:"100%",height:"100%",borderRadius:"10%"}}  src={file.length===0?'https://th.bing.com/th/id/OIP.HHVUf3TYqncgpJXyCMmxyAHaHa?pid=ImgDet&rs=1':file} alt='npo'></img>
        
      </div> 
      <div className="categories">
        <p className='aboutme'>Categories</p>
        <ul className='list'>
        {
         array.map((element,index)=>{
          return element.length>0 &&  <li className='listitem' style={{}} onClick={clickhandle} ref={ref[index]} id={element}>{element}</li>
         
          })
}
          </ul>
      </div>
      <div className='folow'>
        <p className='aboutme'>Follow Us</p>
        <ul className='list1'>
          <li style={{cursor:"pointer"}}><img className='background' src='https://cdn-icons-png.flaticon.com/128/5968/5968764.png'></img></li>
            <li style={{cursor:"pointer"}}><img className='background' src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png'></img></li>
            <li style={{cursor:"pointer"}}><img className='background' src='https://cdn-icons-png.flaticon.com/128/5968/5968764.png'></img></li>
            <li style={{cursor:"pointer"}}><img className='background' src='https://cdn-icons-png.flaticon.com/128/3670/3670151.png'></img></li>
        </ul>
      </div>
   </div>
  )
}
