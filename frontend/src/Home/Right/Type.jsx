import React, { useState } from 'react'
import useSendMessage from '../../context/useSendMessage'

function Type() {
  const {loading,sendMessages}=useSendMessage()
  const [message,setMessage]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault()
    await sendMessages(message);
    setMessage("");
  }
  return (

    <div>
      <form className="flex items-center p-4 bg-gray border-t border-gray-300" onSubmit={handleSubmit}>
        <input
            type="text"
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
            placeholder="Type a message..."
            className="bg-slate-900 text-white font-bold flex-1 p-3 rounded-lg focus:outline-none"
        />
        <button
            type="submit"
            className="ml-2 p-2 bg-green-900 text-white rounded-lg"
        >
            Send
        </button>
        </form>

    </div>
  )
}

export default Type
