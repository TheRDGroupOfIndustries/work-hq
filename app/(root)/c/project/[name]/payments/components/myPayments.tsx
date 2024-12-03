import React from 'react'

export default function MyPayments() {
  return (
    <div className='w-full grid grid-cols-3 gap-4'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
  )
}

function Card() {
    return (
        <div className=' h-[300px] bg-slate-300'></div>
    )
}