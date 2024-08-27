import React from 'react'

const LineLeft = (props) => {
  return (
    <div className="w-[100%]  mb-[2vw] min-h-[2vw] p-[1vw] flex items-center justify-between">
        <h1 className='text-[1.5vw] tracking-[0.5vw] pl-[1.8vw] h-[100%] max-w-[18vw] font-[400]'>{props.component}</h1>
        <div className="line h-[0.1vw] mr-[2vw] ml-[2vw] w-[100%] bg-black"></div>
    </div>
  )
}

export default LineLeft