"use client";
import { useEffect, useRef } from 'react';
import LoadingIcons from 'react-loading-icons'
import { IoSend } from "react-icons/io5";
import { useChat, Message } from "ai/react"

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger scroll to bottom whenever the messages array changes


  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
    
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
    

  return (
    <div className="w-full flex flex-col h-auto items-center justify-between pt-6 bg-black">
      
      {messages.length > 0 ?
        <div className='bg-gray-900 list-none w-4/5 rounded-xl  h-auto py-5 px-5 text-white 2xl:text-4xl'>
          {messages.map((message : Message) => {
            return (
              <div key={message.id}>
                  {/*  Name of person talking */}
                  {
                      message.role === "assistant"
                      ?
                      <h3 className="text-lg font-semibold mt-2">
                          GPT-4
                      </h3>
                      :
                      <h3 className="text-lg font-semibold mt-2">
                          User
                      </h3>
                  }
                  {message.content.split("\n").map((currentTextBlock: string, index : number) => {
                      if(currentTextBlock === "") {
                          return <p key={message.id + index}>&nbsp;</p> // " "
                      } else {
                          return <p key={message.id + index}>{currentTextBlock}</p> // "Cooper Codes is a YouTuber"
                      }
                  })}
              </div>
            )
          })}
        </div> :
        <div className='text-white h-screen flex flex-col justify-center gap-2 items-center '>
          <p className='text-2xl lg:text-5xl 2xl:text-8xl'>What do u want to know ?</p> 
          <LoadingIcons.SpinningCircles className='text-2xl lg:text-4xl 2xl:text-6xl'></LoadingIcons.SpinningCircles> 
        </div>
      }
      <div ref={messagesEndRef}></div>
        <form className="sticky bottom-0 p-4 w-2/3 flex justify-center gap-2 sm:w-full md:w-2/3" onSubmit={handleSubmit}>
          <input
            className="flex border w-full py-3 px-3 h-14 text-xl border-gray-300 p-2 rounded-xl text-black  2xl:py-16
            2xl:text-5xl"
            placeholder="Write your question..."
            value={input}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-4  bg-white hover:bg-slate-200 rounded-xl 2xl:px-12"
          >
            <IoSend className="text-2xl  text-black transform transition-transform duration-300 hover:scale-110 2xl:text-4xl" />
          </button>
        </form>
          </div>
  )
}

export default Chat