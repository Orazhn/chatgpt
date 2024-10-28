'use client'
import React, { useState, FC, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Modal from "./Modal";
import { IChatList, IMessage } from "../types/Chat";
import { useRouter } from 'next/navigation'
import LoadingIcons from 'react-loading-icons'
import { MdSaveAlt } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { PiChatSlashDuotone } from "react-icons/pi";




interface MessagesComponentProps {
  allMessages: IMessage[] | undefined
}

  const Sidebar: FC<MessagesComponentProps> = ({allMessages}) => {
    const router = useRouter()
    const [sideOpen, setSideOpen] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [chats, setChats] = useState<IChatList[] | undefined>([])
    const [chatsLoading, setChatsLoading] = useState<boolean>(true)

    useEffect(() => {
      const fetchChats = async () => {
        const response = await fetch('/api/chats', {method: 'GET'});
        const data = await response.json()
        setChats(data);
        setChatsLoading(false)
      }
      fetchChats();
    }, [])

    const changeChat = (id:string) => {
      router.push(`/chats/${id}`)
    }

    const deleteChat = async(id: string) => {
      try {
        const response = await fetch('/api/chats', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        });
        router.push(`/`)
        const result = await response.json();
        console.log(result.message); 
      } catch (error) {
        console.error('Error deleting chat:', error);
      }
    }
    return (
        <div>
          <Modal open ={open} setOpen={setOpen} messages={allMessages}></Modal>
        <button onClick={() => setSideOpen(true)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="sm:absolute inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <RxHamburgerMenu className="text-lg xl:text-3xl 2xl:text-7xl sm:text-3xl"/>
      </button>
      {sideOpen &&
      <aside id="default-sidebar" className={`top-0 left-0 z-40 sm:w-2/3 lg:w-72 h-full transition-transform -translate-x-full sm:translate-x-0 sm:fixed dark lg:relative  2xl:w-full overflow-y-auto`} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-hidden bg-gray-50 dark:bg-gray-800 2xl:w-96">
          <ul className="space-y-2 font-medium">
            <li className=" w-full flex justify-between items-center" >
                <Image src="/favicon.ico" width={30} height={30} alt="icon"/>
                <button onClick={() => setSideOpen(false)}  className=" text-gray-900 rounded-lg  dark:text-white">
                    <IoMdClose className="text-xl dark:hover:bg-gray-700 rounded-md  xl:text-3xl 2xl:text-6xl"/>
                </button>
            </li>
            <li onClick={() => setOpen(true)} className="w-full flex justify-center hover:bg-gray-700 rounded-md cursor-pointer border border-gray-700">
                <button className="flex items-center justify-evenly p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 xl:p-2">
                  <MdSaveAlt className="xl:text-xl 2xl:text-6xl" />
                  <span className="ms-3 lg:text-xl xl:text-xl 2xl:text-5xl">Save Chat</span>
                </button>
            </li>
            <li onClick={() => {router.push(`/`)}} className="w-full flex justify-center hover:bg-gray-700 rounded-md cursor-pointer border border-gray-700">
                <button className="flex items-center justify-evenly p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 xl:p-2">
                  <IoChatboxEllipses className="xl:text-xl 2xl:text-6xl" />
                  <span className="ms-3 lg:text-xl xl:text-xl 2xl:text-5xl">New Chat</span>
                </button>
            </li>
            <hr className="border-t-2 border-gray-500 my-4"/>
            {chatsLoading ? 
              <div className="w-full flex justify-evenly items-center flex-col"> 
                <p className="text-center">Loading...</p> 
                <LoadingIcons.TailSpin className="text-xl"/>
              </div>
              :
              <div className="h-full">
                  <p className="text-center font-semibold text-lg py-3">My Chats</p>
                  <ul className="list-none h-full flex flex-col gap-2">
                  {chats?.length ? 
                    chats?.map((chat, index) => 
                      <li key={index} className="w-full flex justify-between hover:bg-gray-700 rounded-md cursor-pointer border border-gray-700 p-2 text-lg items-center">
                          <p onClick={() => changeChat(chat.id)} className="w-full">{chat.name}</p>
                          <div onClick={() => deleteChat(chat.id)} className="p-2 hover:bg-gray-800 rounded-md ransform transition-transform duration-300 hover:scale-110">
                            <MdDeleteOutline />
                          </div>
                      </li>
                    ) :
                    <div className="w-full items-center flex flex-col gap-2 p-2 bg-slate-700 rounded-lg">
                      <p className="font-mono">You have no saved chats</p> 
                      <PiChatSlashDuotone className="text-xl"/>
                    </div>
                  }
                  
                  </ul>
                  
              </div>
             
            }
          </ul>
      </div>
  </aside>
      }
</div>
    );
  }

export default Sidebar