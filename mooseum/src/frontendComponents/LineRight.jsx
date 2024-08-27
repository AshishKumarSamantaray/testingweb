import React from 'react'

const LineRight = (props) => {
  return (
    <div className="w-[100%] h-[7vw] p-[1vw] flex items-center justify-between">
        <div className="line h-[0.1vw] mr-[3vw] ml-[2vw] w-[100%] bg-black"></div>
        <div className='h-[100%] mr-[2vw]  w-[13vw] flex items-center justify-center'>
          <h1 className='text-[2vw] font-[400]'>{props.component}</h1>
        </div>
    </div>
  )
}

export default LineRight