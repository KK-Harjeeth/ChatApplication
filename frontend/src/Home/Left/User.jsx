import React from 'react'
import useConversation from '../../stateManage/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function User({user}) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div className={`hover:bg-slate-600 duration-300 ${
      isSelected ? "bg-slate-700" : ""
    }`} onClick={() => setSelectedConversation(user)}>
        <div className='flex space-x-4 px-6 py-4 hover:bg-gray-800 cursor-pointer'>
          <div className="relative inline-block">
            {/* default profile picture svg */}
            <svg className='w-16 h-16 rounded-full border-2 border-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#D9D9D9"/>
            <path fill-rule="evenodd" clip-rule="evenodd" 
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
                    fill="#808080"/>
            </svg>

            {isOnline && <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute bottom-0.5 right-0.5"></span>}
          </div>
          <div className='mt-2'>
            <h1 className='font-bold'>{user.name}</h1>
            <span>{user.email}</span>
          </div>
        </div>
    </div>
  )
}

export default User
