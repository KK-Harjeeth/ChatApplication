import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../stateManage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("Received message from socket:", newMessage);
      const notification = new Audio(sound);
      notification.play();

      setMessage((prevMessages) => {
        const updatedMessages = Array.isArray(prevMessages.messages)
          ? [...prevMessages.messages, newMessage]
          : [newMessage];
        console.log("Updated messages state:", updatedMessages);
        return { messages: updatedMessages };
      });
    };

    if (socket) {
      socket.on("newMessage", handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, setMessage]);

  return null; // or return any necessary value if needed
};

export default useGetSocketMessage;
