import React, { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
import Cookies from 'js-cookie';
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const token = await Cookies.get("jwt");
      const res = await axios.post(
        `https://chatapplication-ivyf.onrender.com/api/message/send/${selectedConversation._id}`,
        { message },
        {
          credentials: "include",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      console.log("In Use Send Message");
      setMessage([...messages, res.data.newMessage]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
