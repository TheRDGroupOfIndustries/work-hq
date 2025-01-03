"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CustomUser } from '@/lib/types';

const roleRoutes: Record<string, string> = {
  client: "/c/all-projects",
  developer: "/dev/all-projects",
  ceo: "/ceo/all-projects",
  manager: "/ceo/all-projects",
};

function WelcomeButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  console.log("user role: ", user.role);

  return (
    <Button className='bg-white w-fit px-10 py-3 text-black gap-x-4 text-lg font-semibold' onClick={()=>{
      router.replace(roleRoutes[user.role]);
      }}>Let&apos;s Get Started
        <FaArrowRightLong size={24} />
  </Button>
  )
}

export default WelcomeButton
