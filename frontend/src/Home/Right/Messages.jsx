import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthProvider";
import useGetSocketMessage from "../../context/useGetSocketMessage";
function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage()
  const { authUser } = useAuth();
  console.log(authUser);
  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior:"auto",
        });
      }
    }, 100);
  }, [messages]);
  const currentUserId = authUser ? authUser.user._id : null;

  // Initialize variables based on messages structure
  let messageArray = [];

  // Check if messages is an array or an object
  if (Array.isArray(messages)) {
    messageArray = messages; // It's an array
  } else if (typeof messages === 'object' && messages.messages) {
    messageArray = messages.messages; // Extract messages from the object
  }

  const noMessagesFound = messageArray.length === 0;

  return (
    <div className="h-screen overflow-y-auto p-4 max-h-[500px] ">
      {loading ? (
        <Loading />
      ) : noMessagesFound ? (
        <div>
          <p className="text-center mt-[20%]">Say hi! to start the conversation</p>
        </div>
      ) : (
        messageArray.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} currentUserId={currentUserId} />
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;