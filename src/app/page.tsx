'use client'
import React, { useState } from "react";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import { IMessage } from "./types/Chat";


export default function Page() {
  const [allMessages, setAllMessages] = useState<IMessage[]>([])

  return (
    <div className = "w-screen h-screen flex justify-center bg-black" >
          <Sidebar allMessages = {allMessages}/>
          <Chat  setAllMessages = {setAllMessages}/>
    </div>
  );
}
