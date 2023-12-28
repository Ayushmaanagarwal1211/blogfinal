import React, { useState } from 'react'
import './Post.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
export default function Post(props) {
  const navigate=useNavigate();
  const [file,setImageUrl]=useState('')
  const clickhandle=()=>{
    navigate(`/single/${props.id}`)
  }
  const [ii,iis]=useState('')
  
  
  return (
    <>
  
    <div className='post1'>
     <img className='image' loading='eager'  src={props.pic} ></img>
        <div className='bio'>
          <div className='music'>
            <span>{props.author}</span>
            </div>
            <div className='ellipsis-text' style={{width:"100%",textAlign:"center"}}> <h1 className='postheading e' style={{fontFamily:'arvo,serif'}}>{props.des.length>2?props.des.substring(0,10)+"...." :props.des}</h1></div>
            <div style={{paddingBottom:"10px",fontFamily:'arvo,serif'}}>{new Date(props.createdat).toDateString().substring(0,15)}</div>
         <div className='lorems' style={{lineHeight:"30px",fontFamily:'arvo,serif'}}>{props.des}</div>
       <div className='buttonposition'><button type='submit' onClick={clickhandle} className='button'>Read more</button></div>
        </div>
       
    </div></>
  )
}
