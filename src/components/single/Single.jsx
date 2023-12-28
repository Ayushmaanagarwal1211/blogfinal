import React, { useEffect, useRef, useState } from 'react'
import './single.css'
import Topbar from '../topbar/Topbar'
import Sidebar from '../sidebar/Sidebar'
import { useAsyncError, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {FaTrashAlt} from 'react-icons/fa'
import { FaPenToSquare } from 'react-icons/fa6'
export default function Single() {
  const navigate=useNavigate();
  const [post,posts]=useState([]);
  const [name,setname]=useState('')
  const [tempofile,settempofile]=useState('')
  const [newfile1,newfile]=useState('')
  const [show,shows]=useState(0)
  const [array,arrays]=useState([]);
  const {id}=useParams();const [dref,drefs]=useState();
  const [file,files]=useState('')
  const [url,urls]=useState({myfile:""});
  const [cref,crefs]=useState(post.title);
  const [isedit,isediting]=useState(false)
  const options={ headers:{'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json'}}
const clickhandle=async ()=>{
  isediting(true)
  shows(show+1)
}
const titlechange=(e)=>{
  crefs(e.target.value)
}
  const editpost=async()=>{


  const a=prompt("Enter title");
  const fetch=await axios.delete(`https://blogbackend-xw0e.onrender.com/api/auth/deletepost/${id}`,options)
}
const [category,categorie]=useState([]); 
const tref=useRef();
const ddref=useRef();

const editnote=async ()=>{const options1={'authtoken':localStorage.getItem('auth-token'),'Content-Type':'application/json','title':cref}
 await fetch(`https://blogbackend-xw0e.onrender.com/api/auth/updatepost/${id}`,{
    method:"PUT",
    headers:options1,
    body:JSON.stringify({
      title:cref,
      desc:dref,
      pic:file
    })
  })
  isediting(false)
  window.location.reload()
}
const deleteitem=async ()=>{
  console.log("Delete item")
  const fetch=await axios.delete(`https://blogbackend-xw0e.onrender.com/api/auth/deletepost/${id}`,options)
  console.log("Item deleted")
  navigate("/pages")
}
  useEffect(()=>{setname(localStorage.getItem('name'))

    console.log("Hello world")
    const fetchnotes=async ()=>{
   const post1=await  axios.get(`https://blogbackend-xw0e.onrender.com/api/auth/singlepost/${id}`,options)
  posts(post1.data[0])
  arrays(post1.data)
   console.log(post1)
   const ei=[];
   post1.data.map((element)=>{
     console.log(element)
    console.log("the elemeent "+element)
       element.categories.map((elem)=>{
          let count=0;
         ei.forEach((e)=>{if(elem===e){
         count=1
       }})
         if(count===0){ei.push(elem);
        console.log(ei)}
       })
     })
     settempofile(post1.data[0].pic)
     files(post1.data[0].pic)
     console.log("THE SIA PIC ISSSSS",post1.data[0].pic)
     categorie(ei)
     console.log(category.length)

     if(ei.length==0){
      categorie(['No Categories'])
     }
  }
   fetchnotes();
   
  },[navigate])
  const descriptionchange=(e)=>{
    drefs(e.target.value)
  }
  console.log(id)
  const event1=async ()=>{
    console.log("inside dfom")

const event=document.body.querySelector("#fileupload");
console.log(event)
console.log("Happ jpurney")
event.addEventListener('change',async (e)=>{
const formdata=new FormData();
settempofile(URL.createObjectURL(e.target.files[0]))
files('a')
formdata.append('file',e.target.files[0]);
formdata.append('upload_preset','e_image')

if(formdata!=null){

  const d=await fetch("https://api.cloudinary.com/v1_1/dwgd3as6k/upload",{
    method:"POST",
    body:formdata
   })
   const data=await d.json()
  let url=data.url
  console.log(data)
 files(url)
urls(e.target.files[0])

}
})

}

const delayExecution = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
const a=async ()=>{
  if(show===1){
    await delayExecution(2000)
    event1();
  }
}
a()
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
    {
       post.length==0?"": isedit==true?<div className='single'>
       <div className='singlepost'>
         
             
           <div className='bio1' style={{}}>
             <div className='music11' style={{height:"auto",color:"black"}}>
               <input type='lorems1' style={{color:"black",fontSize:"xx-large",position:"relative",height:"80px",width:"80%",wordBreak:"break-word",border:"none",borderBottom:"solid gray 1px",padding:"0px"}} onChange={titlechange} value={cref} ref={tref} id='title' defaultValue={post.title}></input>
               <img style={{height:"35px",alignSelf:"center",cursor:"pointer",width:"35px"}} onClick={editnote} src='https://cdn-icons-png.flaticon.com/128/1827/1827933.png' alt='no'></img>
        <FaTrashAlt size={'0.1rem'}/>
             </div>
             <div style={{width:"80%",height:"40vh",display:"flex",justifyContent:"center"}}>
             <label htmlFor='fileupload'> <img  className='image1'  style={{width:"50vw",height:"40vh",objectFit:"cover",borderRadius:"1%"}} src={tempofile} alt='no'></img></label></div>
              
    <input type='file' id="fileupload" name="avatar "  style={{display:'none',flex:'3'}}></input>
             
             <div className='safak' style={{paddingBottom:"10px"}}>
               <div  style={{display:"inline-block",width:"50%",textAlign:"start"}}><span>Author:{name}</span></div>
               <div style={{display:"inline-block",width:"50%",textAlign:"end"}} >{new Date(post.createdAt).toDateString()}</div>
             </div>
             <textarea rows={14} cols={90} type='text' defaultValue={post.desc} className='lorems1' ref={ddref} style={{lineHeight:"20px",resize:"none",border:"none",borderBottom:"solid gray 1px"}} id='input' onChange={descriptionchange} value={dref} placeholder={post.desc}></textarea>
       
           </div>
       </div>
         
         <Sidebar array={category}/>
     </div>:
    <div className='single' >
      <div className='singlepost'>
        
            
          
            <div className='music11'>
            <div style={{alignContent:"center",height:"auto",width:"90%",textAlign:"center",display:"flex",justifyContent:"center"}}> <h2  style={{fontSize:"xx-large",width:"85%",alignSelf:"center",wordBreak:"break-word",fontWeight:"medium"}}>{post.title}</h2></div> 
            <div onClick={clickhandle} style={{display:"flex",justifyContent:"center",alignContent:'center',height:"70px",justifyItems:"center",alignItems:"center"}}><FaPenToSquare size={'25px'}/></div>

              <div onClick={deleteitem} style={{display:"flex",justifyContent:"center",alignContent:'center',height:"70px",justifyItems:"center",alignItems:"center"}}><FaTrashAlt size={'25px'}/></div>

            </div>
         <div style={{width:"80%",height:"40vh",display:"flex",justifyContent:"center"}}>
              <img  className='image1' style={{border:"solid red 2px",width:"50vw",height:"40vh",objectFit:"cover",borderRadius:"1%"}} src={file} ></img></div>

            
            <div className='safak'>
              <div  style={{display:"inline-block",width:"50%",textAlign:"start"}}><span>Author:{name}</span></div>
              <div style={{display:"inline-block",width:"40%",textAlign:"end"}} >{new Date(post.createdAt).toDateString()}</div>
            </div>
         
            <p className='lorems1' style={{lineHeight:"35px",alignContent:"center",textAlign:"justify",fontSize:"large"}}>{post.desc}</p>
      
          
      </div>
        
        <Sidebar array={category}/>
    </div>
}</>

)
}
