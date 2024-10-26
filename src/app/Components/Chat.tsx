"use client";
import React, { useEffect, useRef, FC } from 'react';
import { IoSend } from "react-icons/io5";
import { useChat, Message } from "ai/react";
import { Anybody } from 'next/font/google';
import { Geologica } from 'next/font/google';
import Image from 'next/image';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

import { IMessage } from '../types/Chat';

const anybody = Anybody({ subsets: ['latin'] });
const geologica = Geologica({ subsets: ['latin'] });

interface ChatProps {
  setAllMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  oldmessages?: IMessage[];
}

const Chat: FC<ChatProps> = ({ setAllMessages, oldmessages }) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
    setAllMessages(messages);
  }, [messages, setAllMessages]);

  return (
    <div className="w-full flex flex-col h-auto items-center justify-between bg-black">
      <div className='self-end pr-4 pt-4 absolute'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
            {oldmessages?.length || messages.length ?
              <div
              ref={divRef}
              className={`bg-gray-900 overflow-y-auto w-4/5 rounded-xl mt-5 h-auto py-5 px-5 text-white 2xl:text-4xl ${anybody.className}`}
            >
              {oldmessages?.map((message: Message) => (
                <div key={message.id}>
                  {message.role === 'assistant' ? (
                    <h3 className="text-lg font-semibold mt-4 flex items-stretch gap-2">
                      <Image src="/icons/bot.png" width={30} height={20} alt='gpt' />
                      <span>GPT-4</span>
                    </h3>
                  ) : (
                    <h3 className="text-lg font-semibold mt-4 justify-end items-stretch flex gap-2">
                      <span>User</span>
                      <Image src="/icons/user.png" width={30} height={20} alt='user' />
                    </h3>
                  )}
                  {message.content.split("\n").map((currentTextBlock: string, index: number) => (
                    currentTextBlock === "" ? (
                      <p key={message.id + index}>&nbsp;</p>
                    ) : (
                      <p className={`pt-2 ${message.role === 'user' && 'flex justify-end'}`} key={message.id + index}>
                        {currentTextBlock}
                      </p>
                    )
                  ))}
                </div>
              ))}
              {messages.map((message: Message) => (
            <div key={message.id}>
              {message.role === 'assistant' ? (
                <h3 className="text-lg font-semibold mt-4 flex items-stretch gap-2">
                  <Image src="/icons/bot.png" width={30} height={20} alt='gpt' />
                  <span>GPT-4</span>
                </h3>
              ) : (
                <h3 className="text-lg font-semibold mt-4 justify-end items-stretch flex gap-2">
                  <span>User</span>
                  <Image src="/icons/user.png" width={30} height={20} alt='user' />
                </h3>
              )}
              {message.content.split("\n").map((currentTextBlock: string, index: number) => (
                currentTextBlock === "" ? (
                  <p key={message.id + index}>&nbsp;</p>
                ) : (
                  <p className={`pt-2 ${message.role === 'user' && 'flex justify-end'}`} key={message.id + index}>
                    {currentTextBlock}
                  </p>
                )
              ))}
            </div>
          ))}
            </div>:
            <div 
              className='text-white h-screen flex flex-col justify-center gap-2 items-center '>
                <Image src="/favicon.ico" width={100} height={100} alt='icon'/>
                <p 
                  className={`text-2xl lg:text-5xl text-center 2xl:text-8xl ${geologica.className}`}>
                  Hi there! Feel free to ask anything
                </p> 
            </div>
            }

      <form className="sticky bottom-0 p-4 w-2/3 flex justify-center gap-2 sm:w-full md:w-2/3" onSubmit={handleSubmit}>
        <input
          className="flex border w-full py-3 px-3 h-14 text-xl border-gray-300 p-2 rounded-xl text-black 2xl:py-16 2xl:text-5xl"
          placeholder="Write your question..."
          value={input}
          onChange={handleInputChange}
          autoFocus
        />
        <button
          type="submit"
          className="p-4 bg-white hover:bg-slate-200 rounded-xl 2xl:px-12"
        >
          <IoSend className="text-2xl text-black transform transition-transform duration-300 hover:scale-110 2xl:text-4xl" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
