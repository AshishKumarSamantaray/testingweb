import React from 'react'
import contactHeader from "../../public/assets/contactheader.png"
import {Link} from "react-router-dom";

const ContactUs = () => {
  return (
      <div className='h-screen w-screen'>
        <div className='w-full h-[50%] bg-cover bg-center'
             style={{backgroundImage: `url(${contactHeader})`}}>
        </div>
        <div className='flex justify-center items-center flex-col  w-full h-[50%]'>
          <br/>
          <h1 className="text-5xl text-black">Contact Us</h1>
          <br/>
          <p className="text-xl font-bold">Email:<Link className="font-normal"
                                                       to="mailto:xyz@gmail.com">xyz@gmail.com</Link></p>
          <p className="text-xl font-bold">Contact No:<span className="font-normal">9999999999</span></p>
          <br/>
          <p className="text-xl ">**Note that we are available from 7:00AM to 7:00PM</p>

        </div>
      </div>
  )
}

export default ContactUs