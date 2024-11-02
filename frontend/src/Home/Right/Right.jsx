// Right.js
import React from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import Type from './Type';
import useConversation from '../../stateManage/useConversation';

function Right() {
  const { selectedConversation } = useConversation();

  return (
    <div className='w-[70%] bg-slate-950 text-white'>
      {selectedConversation ? (
        <>
          <ChatUser />
          <Messages />
          <Type />
        </>
      ) : (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-2xl font-bold mb-4'>Welcome to Chat-Application</h1>
          <i>Every conversation is a chance to bridge worlds, to understand, and to be understood.</i>
        </div>
      )}
    </div>
  );
}

export default Right;