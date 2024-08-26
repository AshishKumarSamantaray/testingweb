import React, { useRef } from 'react'
import museum from "../../public/videos/backvideo16.mp4"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import Nav from './Nav';
const HomeScreen = () => {
    const h1Ref = useRef();
    useGSAP(()=>{
        gsap.to(h1Ref.current,{
            y:"0%",
            duration:1,
            delay:0.2,
        })
    })
  return (
    <>
        <div className='container min-w-full h-[100vh] relative'>
            <div className="filter h-[100%] w-[100%] absolute bg-black opacity-[0.5] z-[1]"></div>
            <video src={museum} autoPlay muted loop className='absolute w-[100%] h-[100%] z-[0] object-cover'></video>
            <div className='name absolute w-[100%] min-h-[10vw] z-[10] flex items-center justify-center flex-col gap-[0.9vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className="textcont relative  w-[55vw] h-[4vw] z-[10] overflow-hidden flex items-center justify-center">
                    <h1 ref={h1Ref} className='absolute z-[10] text-[4vw] tracking-[1.4vw] align-middle text-white translate-y-[100%]'>SANGRAHAMITRA</h1>
                </div>
                <div className='desc text-white font-[0.6vw] text-[0.7vw]'>ONLINE TICKETING AND CUSTOMER SERVICE SYSTEM POWERED BY AI</div>
                <button className='text-[0.7vw] w-[7.5vw] h-[2.6vw] bg-[#1b0202] text-yellow-600 rounded-[2vw]'>GET TICKETS</button>
            </div>


            <div className="ai absolute z-[10] bottom-[0%] w-[100%] h-[3.3vw] bg-amber-800 flex items-center justify-center">
              <h1 className='text-[1vw] text-white font-thin'>To know more about the <span className='font-bold text-white'>AI</span>, <a href="" className='text-white underline'>Click Here</a></h1>
            </div>
        </div>
    </>
  )
}

export default HomeScreen