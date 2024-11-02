import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../stateManage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessage } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      // Use functional update to ensure the latest state
      setMessage((prevMessages) => [...prevMessages, newMessage]);
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
};

export default useGetSocketMessage;
