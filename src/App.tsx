import './index.css'
import React from 'react'
import ollama from "ollama/browser";
import { useState } from 'react'
import { Chat } from './type/chat'
import logo from './assets/logo.png'
import profile from './assets/profile.png'
import ChatSection from './components/ChatSection'
import PromptForm from './components/PromtForm'

function App() {
  const initialChats: Chat[] = [
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today?",
      role: "assistant",
    },
    {
      id: window.crypto.randomUUID(),
      message: "Hello! How can i help you today? terakhir",
      role: "assistant",
    },
  ];

  const [chats, setChats] = React.useState(initialChats);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const handleAskAi = async (prompt: string) => {
    try {
      const nextChats: Chat[] = [
        ...chats,
        { id: window.crypto.randomUUID(), message: prompt, role: "user" },
      ];

      setChats(nextChats);

      const nextParams = nextChats.map((chat) => ({
        role: chat.role,
        content: chat.message,
      }));

      console.log({ nextParams });

      const response = await ollama.chat({
        model: "deepseek-r1:8b",
        messages: nextParams,
        stream: true,
      });

      const newResponseId = window.crypto.randomUUID();

      setIsStreaming(true);

      for await (const part of response) {
        setChats((prev) => {
          const newChat = prev.find((chat) => chat.id === newResponseId);

          if (newChat) {
            return [
              ...prev.slice(0, -1),
              {
                id: newResponseId,
                message: newChat.message + part.message.content,
                role: "assistant",
              },
            ];
          }

          return [
            ...prev,
            {
              id: newResponseId,
              message: part.message.content,
              role: "assistant",
            },
          ];
        });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      <div className="Container">
        <div className="flex pt-5 fixed justify-between top-0 left-0 right-0 bg-white">
          <div className='flex  items-center'>
            <img src={logo} alt="logo" className='w-10 h-10 ml-8 mr-3 ' />
            <p className="my-auto font-semibold font-sans text-xl">ExturnxAI</p>
          </div>
          <img src={profile} alt="logo" className='w-10 h-10 mr-8' />
        </div>

        <div className='sm:mx-20 md:mx-50 xl:mx-100'>
          <div className="mt-15">
            <img src={logo} alt="logo" className="w-25 h-25 mx-auto my-5" />
            <h1 className='text-center sm:text-xl md:text-2xl xl:text-4xl text-[#a7a0a2] font-bold'>Hi, Ean Fdail</h1>
            <h1 className='text-center sm:text-xl md:text-2xl xl:text-4xl text-[#54464a] font-bold'>Can I help you with anything?</h1>
            <p className='text-center sm:text-xs md:text-sm xl:text-base mt-2 -mb-1'>Ready to assist you with anything you need, from answering</p>
            <p className='text-center sm:text-xs md:text-sm xl:text-base '>questions to providing recommendation. Let's get started!</p>
            
            <ChatSection chats={chats}/>
            
            <div className="fixed bottom-0 left-100 right-100 bg-white">
              <hr className="border-slate-600 mx-4 border-dashed" />
              <PromptForm disabled={isStreaming} onSubmit={handleAskAi} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
