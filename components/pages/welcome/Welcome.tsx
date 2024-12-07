import Image from 'next/image'
import React from 'react'
import WelcomeImage from '@/public/Welcome.png'
import Logo from '@/public/logo.png'

import WelcomeButton from './WelcomeButton'

function Welcome() {
  return (
    <div className=''>
        <div className='fixed w-full h-screen z-0'>
            <Image src={WelcomeImage} alt="hero" width={1920} height={1080} className='w-full h-full object-cover' />
        </div>
        <div className='fixed w-full h-screen z-10 gradient-welcome'/>
        <div className='fixed w-full h-[100px] bg-[#7FAAFF] z-20 -bottom-10 left-0 right-0  rounded-full blur-effect'/>
        <div>
            <div className='absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-8'>
                <h1 className='text-2xl text-black text-center'>Hello there! Welcome to the </h1>
                <div className='w-[500px]'>
                  <Image src={Logo} alt="hero" width={1920} height={1080} className='w-full h-full object-cover' />
                </div>
                <WelcomeButton />
            </div>
        </div>
                <div className='fixed bottom-16 w-full left-0 right-0 flex flex-center text-white z-30'>
                  <span className='w-[70%] text-center tracking-wider font-light'>
                    Make project management, development and supervision easier and quick anytime. Let&apos;s get you started by creating your first project!
                  </span>
                </div>
    </div>
  )
}

export default Welcome
