import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../stateManage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessage, messages } = useConversation();

  useEffect(() => {
    const handleNewMessage = async (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      // Use functional update to ensure the latest state
      console.log("In Use Get Socket");
      const newMessages = [...messages, newMessage];
      console.log("newMessages", newMessages);
      setMessage(newMessages);
    };

    if (socket) {
      socket.on("newMessage", handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, setMessage, messages]);
};

export default useGetSocketMessage;
