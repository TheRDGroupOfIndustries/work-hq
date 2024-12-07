"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

function WelcomeButton() {
  const router = useRouter();

  return (
    <Button className='bg-white w-fit px-10 py-3 text-black gap-x-4 text-lg font-semibold' onClick={()=>{
      router.replace("/c/add-project");
      }}>Let&apos;s Get Started
        <FaArrowRightLong size={24} />
  </Button>
  )
}

export default WelcomeButton
