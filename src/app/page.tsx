'use client'
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";



export default function Page() {
 
  return (
    <div className = "w-screen h-screen flex justify-center bg-black" >
          <Sidebar/>
          <Chat/>
    </div>
  );
}
