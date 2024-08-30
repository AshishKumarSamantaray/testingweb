import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PreLoader = ({ onAnimationComplete }) => {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const aiRef = useRef(null);
  const aiTextRef = useRef(null);
  const pageRef1 = useRef(null);
  const pageRef2 = useRef(null);

  // Use useGSAP hook to trigger the animation
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onAnimationComplete // This function is passed as prop to notify when animation completes
    });

    tl.from(text1Ref.current, {
      y: "100%",
      duration: 0.4,
      delay: 0.1,
      ease: "circ.out"
    })
      .from(text2Ref.current, {
        y: "100%",
        duration: 0.4,
        delay: 0.1,
        ease: "circ.out"
      })
      .from(text3Ref.current, {
        y: "100%",
        duration: 0.4,
        delay: 0.1,
        ease: "circ.out"
      })
      .from(text4Ref.current, {
        y: "100%",
        duration: 0.4,
        delay: 0.1,
        ease: "circ.out"
      })
      .to(pageRef1.current, {
        x: "-100%",
        duration: 0.4,
        // delay: 0.6,
        ease: "circ.out"
      })
      .to(pageRef2.current, {
        x: "-100%",
        duration: 0.6,
        // delay: 0.6,
        ease: "circ.out"
      })
      .to(aiTextRef.current, {
        y: "0%",
        duration: 0.8,
        // delay: 3.2,
        ease: "circ.out"
      })
      .to(aiRef.current, {
        scale: 99,
        opacity: 0,
        duration: 1,
        display: "none",
        // delay: 4.2,
        ease: "power1.out"
      });
  }, []);

  return (
    <>
      <div ref={aiRef} className="w-full h-[100vh] bg-transparent z-[15] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
        <div className="container w-[30vw] absolute z-[99] h-[45vw] bg-white overflow-hidden rounded-[1vw] ">
          <div className="textwrapper w-[60vw] absolute z-[95] h-[45vw] flex items-center justify-center ">
            <div ref={pageRef1} className="text w-[50%] h-[100%] flex items-center justify-center">
              <div className="ticketing flex items-center justify-center gap-[1vw] w-[90%] h-[5%] overflow-hidden ">
                <h1 ref={text1Ref} className='text-amber-900 text-[1.5vw] font-[700] relative translate-y-[0%]'>TICKETING</h1>
                <h1 ref={text2Ref} className='text-amber-700 text-[1.5vw] font-[500] relative translate-y-[0%]'>MADE</h1>
                <h1 ref={text3Ref} className='text-amber-900 text-[1.5vw] font-[700] relative translate-y-[0%]'>EASY</h1>
                <h1 ref={text4Ref} className='text-amber-700 text-[1.5vw] font-[500] relative translate-y-[0%]'>BY</h1>
              </div>
            </div>
            <div ref={pageRef2} className="ai w-[50%] h-[100%] flex items-center justify-center">
              <div className="textcontainer w-[100%] h-[17%] flex overflow-hidden items-center justify-center ">
                <h1 ref={aiTextRef} className='text-amber-900 relative translate-y-[100%] text-[4vw] tracking-[0.1vw] font-[700]'>SANGRAMITRA</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreLoader;
