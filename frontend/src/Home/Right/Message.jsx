import React from 'react';

function Message({ message, currentUserId }) {
  // Determine if the current message is sent by the current user
  const isSender = message.senderId === currentUserId;
  console.log(message.senderId,currentUserId);
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      {/* Render chat bubble based on sender or receiver */}
      {isSender ? (
        // Chat Bubble (Sender)
        <div className="flex justify-end mb-4 p-4">
          <div className="bg-green-900 text-white p-3 rounded-l-lg rounded-br-lg max-w-xs">
            <p className="text-sm">{message.message}</p>
            <span className="text-xs text-gray-200 mt-1 block text-right">{formattedTime}</span>
          </div>
        </div>
      ) : (
        // Chat Bubble (Receiver)
        <div className="flex justify-start mb-4 p-4">
          <div className="bg-gray-300 text-gray-800 p-3 rounded-r-lg rounded-bl-lg max-w-xs">
            <p className="text-sm">{message.message}</p>
            <span className="text-xs text-gray-500 mt-1 block text-right">{formattedTime}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
