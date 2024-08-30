import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
const PreLoader = () => {
    const text1Ref = useRef(null)
    const text2Ref = useRef(null)
    const text3Ref = useRef(null)
    const text4Ref = useRef(null)
    const aiRef = useRef(null)
    const aiTextRef = useRef(null)
    const pageRef1 = useRef(null)
    const pageRef2 = useRef(null)
    const dummyRef = useRef(null)
    const dummyRef2 = useRef(null)
    useGSAP(()=>{
        gsap.from(text1Ref.current, {
            y:"100%",
            duration:0.6,
            delay:0.3,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        },"b"),
        gsap.from(text2Ref.current, {
            y:"100%",
            duration:0.6,
            delay:0.4,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        },"b"),
        gsap.from(text3Ref.current, {
            y:"100%",
            duration:0.6,
            delay:0.5,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        },"b"),
        gsap.from(text4Ref.current, {
            y:"100%",
            duration:0.6,
            delay:0.6,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        },"b"),
        gsap.to(pageRef1.current,{
            x:"-100%",
            duration:1,
            delay:0.6,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        },"c"),
        gsap.to(pageRef2.current,{
            x:"-100%",
            duration:1,
            delay:0.6,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        },"c")
        gsap.to(aiTextRef.current,{
            y:"0%",
            duration:0.8,
            delay:0.1,
            stagger:0.2,
            delay:3.2,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        })
        gsap.to(aiRef.current,{
            scale:9,
            opacity:0,
            display:"none",
            delay:4.2,
            ease: "power1.out"
            // ease: "elastic.out(1,0.75)",
        }),
        gsap.to(dummyRef.current,{
            display:"none",
            delay:4,
            duration:0.9,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        })
        gsap.to(dummyRef2.current,{
            display:"none",
            delay:4,
            duration:0.9,
            ease: "circ.out"
            // ease: "elastic.out(1,0.75)",
        })
    })
  return (
    <>
        <div ref={dummyRef2} className="container min-w-[200vw] overflow-hidden flex h-[100vh] fixed top-[0%] z-[11] bg-white">
            <div ref={pageRef1} className="ticketingtext w-[100%] flex items-center justify-center h-[100vh] ">
                <div className="text w-[60vw] relative z-[1] h-[4.6vw] overflow-hidden ">
                    <div className="textcontainer w-[100%] h-[100%] absolute z-[2] flex items-center justify-center gap-[2vw]">
                        <div ref={text1Ref} className="text1 relative">
                            <h1 className='text-[2.5vw] font-[600] text-black'>TICKETING</h1>
                        </div>
                        <div ref={text2Ref} className="text2 relative">
                            <h1 className='text-[2.5vw] font-[400] text-black'>MADE</h1>
                        </div>
                        <div ref={text3Ref} className="text3 relative">
                            <h1 className='text-[2.5vw] font-[600] text-black'>EASY</h1>
                        </div>
                        <div ref={text4Ref} className="text4 relative">
                            <h1 className='text-[2.5vw] font-[400] text-black'>BY</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={pageRef2} className="AIName relative w-[100%] h-[100vh] flex items-center justify-center bg-transparent">
                <div ref={dummyRef} className="dummy relative w-[100%] h-[100vh] flex items-center justify-center bg-white">
                    <div ref={aiRef} className="ainamecontainer relative min-w-[100vw] flex items-end h-[25vw] ">
                        <div className="cont w-[100%] relative z-[2] h-[100%] overflow-hidden flex items-end justify-center ">
                            <h1 ref={aiTextRef} className='text-[20vw] absolute z-[1] translate-y-[100%] font-[900] text-black'>SangraM<span className='text-[2vw] font-[900]'>AI</span></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PreLoader