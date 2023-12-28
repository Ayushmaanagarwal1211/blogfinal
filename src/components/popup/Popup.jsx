import React from 'react'
import './popup.css'
export default function Popup(props) {
    console.log("SDD")
  return (
    <div className='popup'><h5 style={{fontWeight:"normal",justifySelf:"",alignSelf:"start",height:"5px",position:"relative",bottom:"10px"}}>
    {props.msg}</h5>
    <p className='text'></p></div>
  )
}
