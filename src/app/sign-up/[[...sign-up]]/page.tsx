import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
    return (
        <div className="w-screen h-screen overflow-hidden flex justify-evenly items-center bg-main-bg bg-[url('/backgrounds/sign_up_page_bg.jpg')] bg-cover bg-center flex-col ">
            <div
                className="flex justify-between items-center rounded-lg text-center">
                    <h1 className="text-5xl text-white font-mono sm:text-4xl lg:text-5xl">Dive into the world of  
                    <span className="text-blue-500"> AI</span></h1>
                
            </div>
            <div className="w-1/2 flex justify-center">
                <SignUp />
            </div>
        </div>
    )
        
}