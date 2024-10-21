'use client'
import { useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";


  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div >
        <button onClick={() => setIsOpen(true)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="sm:absolute inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <RxHamburgerMenu className="text-lg xl:text-3xl 2xl:text-7xl sm:text-3xl"/>
      </button>
      {isOpen &&
      <aside id="default-sidebar" className={`top-0 left-0 z-40 sm:w-2/3 lg:w-72 h-full transition-transform -translate-x-full sm:translate-x-0 sm:fixed dark lg:relative  2xl:w-full`} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-hidden bg-gray-50 dark:bg-gray-800 2xl:w-96">
          <ul className="space-y-4 font-medium">
            <li className=" w-full flex justify-between items-center" >
                <Image src="/favicon.ico" width={30} height={30} alt="icon"/>
                <button onClick={() => setIsOpen(false)}  className=" text-gray-900 rounded-lg  dark:text-white">
                    <IoMdClose className="text-xl dark:hover:bg-gray-700 rounded-md  xl:text-3xl 2xl:text-6xl"/>
                </button>
            </li>
            <li className="w-full flex justify-center hover:bg-gray-700 rounded-md cursor-pointer border border-gray-700">
                <button  className="flex items-center justify-evenly p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 xl:p-2">
                  <IoChatboxEllipses className="xl:text-xl 2xl:text-6xl" />
                  <span className="ms-3 lg:text-xl xl:text-xl 2xl:text-5xl">New Chat</span>
                </button>
            </li>
           
          </ul>
      </div>
  </aside>
      }
   
    
    
</div>
    );
  }

export default Sidebar