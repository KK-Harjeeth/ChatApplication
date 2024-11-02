import React, { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import { useSocketContext } from "./SocketContext";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );

      const newMessage = res?.data?.newMessage; // Ensure this is the message you expect
      const prevMessages = messages.messages;
      setMessage((prevMessages) => ({
        messages: [...prevMessages, newMessage],
      }));
      socket.emit("newMessage", newMessage); // Emit the message to the socket
      setLoading(false);
    } catch (error) {
      console.log("Error in sending messages", error);
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
