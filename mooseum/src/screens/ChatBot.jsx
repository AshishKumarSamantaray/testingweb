import React, { useRef } from 'react'
import PreLoader from '../frontendComponents/PreLoader'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
const ChatBot = () => {
  const textRef = useRef(null)
  useGSAP(()=>{
    gsap.to(textRef.current,{
      opacity:1,
      scale:1,
      duration:0.6,
      delay:4.3
    })
  })
  return (
    <>
      <PreLoader/>
      <div className='w-full h-screen flex items-center justify-center'>
        <h1 ref={textRef} className='text-[5vw] text-black font-[800] opacity-0 scale-0'>Chai peeyo Biscoot khao ☕️ 🍪</h1>
      </div>
    </>
  )
}

export default ChatBot