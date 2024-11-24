import React, { useEffect, useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
import Cookies from 'js-cookie';
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const token = await Cookies.get("jwt");
          const res = await axios.get(
            `https://chatapplication-ivyf.onrender.com/api/message/get/${selectedConversation._id}`,{
              credentials: "include",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
          );
          console.log("In use Get Mesasge");
          setMessage(res.data.messages);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;
