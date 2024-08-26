import React, { useRef } from 'react';
import gsap from 'gsap';
import p1i1 from '../../public/assets/img 1.png';
import p1i2 from '../../public/assets/img 2.png';
import p2i1 from '../../public/assets/img 3.png';
import p2i2 from '../../public/assets/img 4.png';
import p3i1 from '../../public/assets/img 5.png';
import p3i2 from '../../public/assets/img 6.png';
import p3i3 from '../../public/assets/img 7.png';
import p3i4 from '../../public/assets/img 8.png';
import LineRight from './LineRight';

const Gallery = () => {
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  const setImageRef = (el, index) => {
    imageRefs.current[index] = el;
  };

  const setTextRef = (el, index) => {
    textRefs.current[index] = el;
  };

  const handleEnter = (index) => {
    gsap.to(imageRefs.current[index], { scale: 1.1, duration: 0.5 });
    gsap.to(textRefs.current[index], { y: "0%", duration: 0.5, ease: 'power1.out' });
  };

  const handleLeave = (index) => {
    gsap.to(imageRefs.current[index], { scale: 1, duration: 0.5 });
    gsap.to(textRefs.current[index], { y: "100%", duration: 0.5, ease: 'power1.out' });
  };

  const createRef = (index) => ({
    imageRef: (el) => setImageRef(el, index),
    textRef: (el) => setTextRef(el, index),
  });

  return (
    <>
      <LineRight component="GALLERY"/>
      <div className="gallery__items w-[100%] max-h-[100vh] flex items-center justify-between ">
        {/* Part 1 */}
        <div className="part1 p-[2vw] w-[25%] h-[100%] flex gap-[2vw] flex-col">
          <div
            className="p1i1 relative w-[100%] h-[18vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
            onMouseEnter={() => handleEnter(0)}
            onMouseLeave={() => handleLeave(0)}
          >
            <img
              ref={createRef(0).imageRef}
              src={p1i1}
              alt="p1i1"
              className="w-[100%] h-[100%] object-cover absolute z-[0]"
            />
            <div
              ref={createRef(0).textRef}
              className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
            >
              <h2 className="italic text-white">Whale skeleton</h2>
              <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
            </div>
          </div>

          <div
            className="p1i2 relative w-[100%] h-[33vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
            onMouseEnter={() => handleEnter(1)}
            onMouseLeave={() => handleLeave(1)}
          >
            <img
              ref={createRef(1).imageRef}
              src={p1i2}
              alt="p1i2"
              className="w-[100%] h-[100%] object-cover absolute z-[0]"
            />
            <div
              ref={createRef(1).textRef}
              className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
            >
              <h2 className="italic text-white">Whale skeleton</h2>
              <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
            </div>
          </div>
        </div>

        {/* Part 2 */}
        <div className="part2 p-[2vw] w-[25%] h-[100%] flex gap-[2vw] flex-col">
          <div
            className="p2i1 relative w-[100%] h-[37vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
            onMouseEnter={() => handleEnter(2)}
            onMouseLeave={() => handleLeave(2)}
          >
            <img
              ref={createRef(2).imageRef}
              src={p2i1}
              alt="p2i1"
              className="w-[100%] h-[100%] object-cover absolute z-[0]"
            />
            <div
              ref={createRef(2).textRef}
              className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
            >
              <h2 className="italic text-white">Whale skeleton</h2>
              <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
            </div>
          </div>

          <div
            className="p2i2 relative w-[100%] h-[14vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
            onMouseEnter={() => handleEnter(3)}
            onMouseLeave={() => handleLeave(3)}
          >
            <img
              ref={createRef(3).imageRef}
              src={p2i2}
              alt="p2i2"
              className="w-[100%] h-[100%] object-cover absolute z-[0]"
            />
            <div
              ref={createRef(3).textRef}
              className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
            >
              <h2 className="italic text-white">Whale skeleton</h2>
              <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
            </div>
          </div>
        </div>

        {/* Part 3 */}
        <div className="part3 p-[2vw] w-[50%] h-[100%] flex gap-[2vw] flex-col">
          <div className="top">
            <div
              className="p3i1 relative w-[100%] h-[15.7vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
              onMouseEnter={() => handleEnter(4)}
              onMouseLeave={() => handleLeave(4)}
            >
              <img
                ref={createRef(4).imageRef}
                src={p3i1}
                alt="p3i1"
                className="w-[100%] h-[100%] object-cover absolute z-[0]"
              />
              <div
                ref={createRef(4).textRef}
                className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
              >
                <h2 className="italic text-white">Whale skeleton</h2>
                <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
              </div>
            </div>
          </div>

          <div className="bottom flex items-center justify-between">
            <div className="left h-[100%] w-[47%] flex gap-[2vw] flex-col">
              <div
                className="p3bi1 relative w-[100%] h-[18vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
                onMouseEnter={() => handleEnter(5)}
                onMouseLeave={() => handleLeave(5)}
              >
                <img
                  ref={createRef(5).imageRef}
                  src={p3i2}
                  alt="p3bi1"
                  className="w-[100%] h-[100%] object-cover absolute z-[0]"
                />
                <div
                  ref={createRef(5).textRef}
                  className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
                >
                  <h2 className="italic text-white">Whale skeleton</h2>
                  <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
                </div>
              </div>

              <div
                className="p3bi2 relative w-[100%] h-[15.4vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
                onMouseEnter={() => handleEnter(6)}
                onMouseLeave={() => handleLeave(6)}
              >
                <img
                  ref={createRef(6).imageRef}
                  src={p3i3}
                  alt="p3bi2"
                  className="w-[100%] h-[100%] object-cover absolute z-[0]"
                />
                <div
                  ref={createRef(6).textRef}
                  className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
                >
                  <h2 className="italic text-white">Whale skeleton</h2>
                  <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
                </div>
              </div>
            </div>

            <div className="right h-[100%] w-[47%]">
              <div
                className="p3bi3 relative w-[100%] h-[35.4vw] z-[2] rounded-[1vw] bg-red-300 overflow-hidden"
                onMouseEnter={() => handleEnter(7)}
                onMouseLeave={() => handleLeave(7)}
              >
                <img
                  ref={createRef(7).imageRef}
                  src={p3i4}
                  alt="p3bi3"
                  className="w-[100%] h-[100%] object-cover absolute z-[0]"
                />
                <div
                  ref={createRef(7).textRef}
                  className="text absolute bottom-[0%] w-[100%] min-h-[4vw] rounded-b-[1vw] z-[1] translate-y-[100%] p-[0.5vw]"
                >
                  <h2 className="italic text-white">Whale skeleton</h2>
                  <h3 className="font-[200] text-[0.8vw] text-white">Lorem ipsum dolor sit</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
