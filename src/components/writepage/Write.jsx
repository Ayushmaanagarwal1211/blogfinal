import React, { useContext, useEffect, useRef, useState } from 'react'
import './write.css'
import Topbar from '../topbar/Topbar'
import axios from 'axios';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/Popup';
export default function Write() {
 const navigate=useNavigate();
  const tref=useRef();
  const [showpopup,setshowpopup]=useState(false)
  const dref=useRef(); 
  const [tempfile,settempfile]=useState('')
  const cref=useRef();
  const [file,files]=useState('')
  const [tempoFile,setTempoFile]=useState('')
  const [url,urls]=useState();
  const {state}=useContext(Context) 
   const [title,titles]=useState('')
   const countRef = useRef(0);
  const [desc,descs]=useState('')
  let reader=new FileReader()
  const handleclick=async ()=>{
    console.log(tref.current.value.length)
    if(tref.current.value.length==0){
      
      setshowpopup(true);
      setTimeout(()=>{
        setshowpopup(false)
      },2000)
      console.log("IUNSIODS")

return
    }
    const post1=await  fetch('https://blogbackend-xw0e.onrender.com/api/auth/createpost',{
      method:'POST',
      headers:{'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json','title':tref.current.value,"url":file

      },
      body:JSON.stringify({
        description:dref.current.value.length==0?" ": dref.current.value,
             category:cref.current.value

      })
    })
    navigate('/pages')
  }
  const event1=async ()=>{
    console.log("inside dfom")

const event=document.body.querySelector("#fileupload");
console.log(event)
console.log("Happ jpurney")
event.addEventListener('change',async (e)=>{
const formdata=new FormData();
console.log(e.target.files[0])
formdata.append('file',e.target.files[0]);
formdata.append('upload_preset','e_image')
let a=''
setTempoFile(URL.createObjectURL(e.target.files[0]))

if(formdata!=null){

files('a')
const d=await fetch("https://api.cloudinary.com/v1_1/dwgd3as6k/upload",{
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
 },[])
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
      });
  }

  return (
    <>
    <Topbar />
    {showpopup && <Popup msg={"Please Enter Title"}/>}
    { (tempoFile!="") &&
    <div style={{height:"270px",width:"100%"}}>
      
    <div>
            <img style={{width:"80vw",height:"40vh",objectFit:"cover",left:"10vw",borderRadius:"1%",position:"absolute",marginTop:"70px"}} src={tempoFile} alt='noo' ></img>
            
            </div>
              </div>
                }
    <div className='mains'>
    <label  style={{fontSize:"xx-large",cursor:'pointer',gridArea:"auto",justifySelf:"end",alignSelf:"center"}} htmlFor='fileupload'>
        <p style={{border:"solid",borderColor:"gray",borderRadius:"20%"}}>+</p>
    </label>
    <input type='file' id="fileupload" name="avatar "  style={{display:'none',flex:'3'}}></input>
    <input type='text' className='title2' style={{fontSize:"xx-large",border:'none',fontWeight:"bold",color:"black"}} ref={tref} placeholder='Title...' ></input>
    <button type='submit' onClick={handleclick} style={{height:"30px",width:"80px",backgroundColor:"aqua",borderRadius:"6px",justifySelf:"center",border:"none",alignSelf:"center"}}>Publish</button>
    <p></p>
    <textarea type='textarea' className='textarea' rows={3} cols={1} style={{gridColumnStart:"2",gridColumnEnd:"4",fontSize:"33px",fontWeight:"bold",border:'none'}} placeholder='Tell Me About Yourself...' ref={dref}></textarea>
    <input type='text' className='category11' style={{fontSize:"xx-large",border:'none',fontWeight:"bold",color:"black"}} ref={cref} placeholder='Category...' ></input>

    </div>
  </>
  )
}
