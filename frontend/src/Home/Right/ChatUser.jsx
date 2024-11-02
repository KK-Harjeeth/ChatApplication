import React from 'react'
import useConversation from '../../stateManage/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';
function ChatUser() {
  const {selectedConversation} = useConversation();
  console.log(selectedConversation);
  const { onlineUsers } = useSocketContext();
  const getOnlineUserStatus=(userId)=>{
    return onlineUsers.includes(userId)?"online":"offline"
  }
  return (
    <div className='flex space-x-4 p-5 bg-gray-800'>
      <div className="relative inline-block">
        <svg className='w-14 h-14 rounded-full border-2 border-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#D9D9D9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" 
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
                fill="#808080"/>
        </svg>
      </div>
      <div>
        <h1 className='text-xl'>{selectedConversation?.name}</h1>
        <span className='text-sm'>{getOnlineUserStatus(selectedConversation._id)}</span>
      </div>
    </div>
  )
}

export default ChatUser
