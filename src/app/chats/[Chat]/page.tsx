'use client'
import React, {useEffect, useState} from 'react'
import Sidebar from '@/app/Components/Sidebar'
import Chat from '@/app/Components/Chat'
import { IChatList } from '@/app/types/Chat'
import { IMessage } from '@/app/types/Chat'
import LoadingIcons from 'react-loading-icons'


const Page = ({params}: {params: {Chat: string}}) => {
  const [allMessages, setAllMessages] = useState<IMessage[]>([])
  const [oldChat, setOldChat] = useState<IChatList | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
      const fetchChats = async () => {
        const response = await fetch('/api/chats', {method: 'GET'});
        const data:IChatList[] = await response.json()
        setOldChat(data?.find(chat => chat.id === params.Chat));
        setLoading(false)
      }
      fetchChats()
    }, [params.Chat])
   
  return (
      <div className = "w-screen h-screen flex justify-center bg-black">
        
        {loading ? 
          <div className='items-center w-screen h-screen flex justify-center flex-col gap-4'>
            <p className='text-2xl'>Wait a second...</p>
            <LoadingIcons.Oval/>
          </div>
          
          :
          <>
            <Sidebar allMessages = {allMessages}/>
            <Chat  
              setAllMessages = {setAllMessages} 
              oldmessages={oldChat?.messages}
            />
          </>
          
        }
      </div>
    )
}

export default Page



  

  

