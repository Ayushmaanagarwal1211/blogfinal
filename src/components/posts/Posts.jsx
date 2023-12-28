import React, { useState,useEffect, useContext } from 'react'
import './posts.css'
import Header from '../header/Header'
import Post from '../post/Post'
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
export default function Posts(props) {
  const {array}=props;
  const [mobile,ismobile]=useState(false)
  useEffect(()=>{
    function handleresize(){
      console.log(window.innerWidth)
if(window.innerWidth<730){

  ismobile(true)
}else{
ismobile(false)
}}
window.addEventListener('resize',handleresize)
if(window.innerWidth<700){

  ismobile(true)
}else{
ismobile(false)
}

  },[])
  const navigate=useNavigate();
  const [array1,arrays]=useState([]);
  const {state}=useContext(Context)
  const [file,files]=useState('')
   useEffect(() => {
    if(state.user!=null){
  const a=array.data.filter((category)=>{
    if(category.categories==state.user){
      return category;
    }
  })

  arrays(a)
  console.log("JSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",a)
}
else{
arrays(array.data)
} 
    return ()=>{
      "1"
    }
  }, [state.user]);
 const name=localStorage.getItem('name')
  return (
    <>
    <div className='posts' style={{flexDirection:`${mobile?"column":"row"}`,gap:`${mobile?'20px':""}`,alignItems:`${mobile?"center":""}`}}>
      { array1.map((element)=>{
        console.log("TH EWEWEWEEWE",element)
      return <Post author={name} title={element.title} des={element.desc} id={element._id} pic={element.pic} createdat={element.createdAt}/>
      })
    }
</div>
  </>
  )
}
