import React, { useState } from 'react'
import { FC } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoChatboxEllipsesOutline } from 'react-icons/io5' 
import { IMessage } from '../types/Chat'


interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    messages: IMessage[] | undefined
}

const Modal: FC <ModalProps> = ({setOpen, open, messages}) => {
    const [input, setInput] = useState<string>('')
    const [warning, setWarning] = useState<string>('')

    const handleSubmit = async () => {
        if (input.trim().length && messages?.length){
            await fetch('/api/chats', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({input, messages: messages}),
              });
            setOpen(false)
            window.location.reload()
        }else 
            setWarning('name a chat!')
    }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-slate-700 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-600 sm:mx-0 sm:h-10 sm:w-10">
                  <IoChatboxEllipsesOutline className='text-white text-xl'/>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-white">
                      Give a name for your chat
                    </DialogTitle>
                    <div className="mt-2">
                        <input value={input} autoFocus onChange={e => setInput(e.target.value) } type="text" placeholder='exam answers' className='border border-black rounded-md p-1 w-full text-black'/>
                    </div>
                    <p className={`${warning.length && 'text-red-700'} pt-2`}>
                        {warning}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  New Chat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setWarning('')
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}

export default Modal