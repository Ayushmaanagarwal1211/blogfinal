import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react'
import './contact.css'
import Topbar from '../topbar/Topbar';
export default function Contact() {
    const form = useRef();
    const [show,shows]=useState(false)
    const sendEmail = (e) => {
      e.preventDefault();
      shows(true);
  
      emailjs.sendForm('service_hrz8hfg', 'template_na7xjc4', form.current, 'rId2aw03Pj2ZNq2U5')
        .then((result) => {
            console.log(result.text);
            console.log("message Sent")
        }, (error) => {
            console.log(error.text);
        });
    };
  return (
    <>   <Topbar />  {
     
        show &&<div class="alert alert-primary alert-dismissible  d-flex align-items-center" role="alert" style={{position:"fixed"}}> 
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use href="#info-fill"/></svg>
        <div>
          An example alert with an icon
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

      </div>
    }
    <div className='forma'>
    <form ref={form} className='form11' onSubmit={sendEmail}>
    <label className='labelname121'>Name</label>
    <input type="text" className='inputname121' name="from_name" />
    <label className='labelname121'>Email</label>
    <input type="email" className='inputname121' name="to_email" />
    <label className='labelname121'>Message</label>
    <input name="message" className='inputname121' />
    <button className='submit121' type="submit" value="Send">Submit</button>
  </form></div></>

  )
}
