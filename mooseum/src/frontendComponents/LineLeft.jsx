import React from 'react'

const LineLeft = (props) => {
  return (
    <div className="w-[100%] h-[2vw] mt-[2vw] p-[1vw] flex items-center justify-between">
        <h1 className='text-[2vw] pl-[1.8vw] h-[100%] max-w-[18vw] font-[400]'>{props.component}</h1>
        <div className="line h-[0.1vw] mr-[2vw] ml-[2vw] w-[100%] bg-black"></div>
    </div>
  )
}

export default LineLeft