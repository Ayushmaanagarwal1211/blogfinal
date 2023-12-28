import React, { useContext, useEffect, useState } from 'react'
import './pages.css'
import Topbar from '../topbar/Topbar'
import Header from '../header/Header'
import Posts from '../posts/Posts'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'
import Temp from '../temp/Temp'
export default function Pages() {
 const options={ headers:{'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json'}}
 const [post,posts]=useState([]); 
 const navigate=useNavigate();
const [category,categorie]=useState(['no categories']); 
 useEffect(()=>{
    const fetchnotes=async ()=>{
   const post1=await axios.get('https://blogbackend-xw0e.onrender.com/api/auth/getpost',options)
   await posts(post1)
   localStorage.setItem('id',post1)     
   console.log(post1.data) 
   const ei=[];
  post1.data.map((element)=>{
    console.log(element)
   console.log("the elemeent "+element)
      element.categories.map((elem)=>{
         let count=0;
        ei.forEach((e)=>{if(elem===e){
        count=1
      }})
        if(count===0){ei.push(elem);}else{count=0;}
      })
    })
    categorie(ei)
    console.log(`inside post ${category}`)
  }
   fetchnotes();
   console.log(post.length)
  },[navigate])
  

  return (
    <>
    <Topbar />
    <Header />
    <div className='pages'>
      {
       post.length==0?<div style={{flex:"10",display:"flex",flexDirection:"row"}}></div>:<Posts  array={post} />
      }
      { category.length==0?"": <Sidebar array={category}/>}
    
        </div>
  </>
  )
}
