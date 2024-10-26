import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function Page() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-evenly items-center bg-main-bg bg-[url('/backgrounds/log_in_page_bg.jpg')] bg-cover bg-center flex-col ">
    <div
        className="flex justify-between items-center rounded-lg text-center">
            <h1 className="text-5xl text-white font-mono sm:text-4xl lg:text-5xl">Welcome back to the world of  <span className="text-blue-500"> AI</span></h1>  
    </div>
    <div className="w-1/2 flex justify-center">
        <SignIn />
    </div>
</div>)
}