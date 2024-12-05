import React from 'react'

function Milestone({num, title, description, isActiveNo = 1, containerStyle}: {num: number, title: string, description: string, isActiveNo?: number, containerStyle?: string}) {
  return (
    <div className={`flex flex-col justify-center items-center gap-1 w-[180px] ${containerStyle}`}>
    <div className={`w-10 h-10 rounded-full flex-center ${isActiveNo>=num?'bg-primary-blue':' bg-primary-sky-blue'} mb-1 ${isActiveNo>=num ? ' shadow-neuro-9':'shadow-neuro-3'}`}>
        <span className={`font-bold ${isActiveNo>=num?"text-white":"text-light-gray"}`}>{num}</span>
    </div>
    <span className='text-sm font-bold text-center w-full'>{title}</span>
    <span className='text-sm text-light-gray text-center w-full'>
    {description}
    </span>
    </div>
  )
}

export default Milestone