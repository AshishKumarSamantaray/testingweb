import React, { useRef } from 'react'
import PreLoader from '../frontendComponents/PreLoader'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import Nav from '../frontendComponents/Nav';
const ChatBot = ({onClose}) => {
  const textRef = useRef(null)
  const modalRef = useRef()
  useGSAP(()=>{
    gsap.to(textRef.current,{
      opacity:1,
      scale:1,
      duration:1,
      delay:0.5,
      ease:"power1.out"
    })
  })
  const closeModal=(e)=>{
    if(modalRef.current === e.target){
      onClose();
    }
  }
  return (
    <>
      {/* <PreLoader/> */}
      <div ref={modalRef} onClick={closeModal} className="cont w-full h-screen bg-transparent z-[98] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
        <div ref={textRef} className="chatai w-[30vw] absolute h-[45vw] bg-white overflow-hidden rounded-[1vw] flex items-center justify-center flex-col">
          <h1 className='text-[2vw] text-black'>Chai Peeyo Biscoot khao ☕️🍪</h1>
          <button onClick={onClose} className='w-[4vw] h-[2vw] rounded-[1vw] items-center justify-center bg-amber-900'>EXIT</button>
        </div>
      </div>
    </>
  )
}

export default ChatBot