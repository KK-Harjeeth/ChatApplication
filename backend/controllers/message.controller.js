// import Conversation from "../models/conversation.model.js";

// export const sendMessage = async(req,res)=>{
//     console.log("message send",req.params.id,req.body.message)
//     try {
//         const {message} = req.body;
//         const {id:receiverId} = req.params;
//         const senderId = req.user._id;  // current logged-in user
//         let conversation = await Conversation.findOne({
//             participants:{$all:[senderId,receiverId]}
//         })
//         if(!conversation){
//             conversation = await Conversation.create({
//                 participants:[senderId,receiverId],
//                 messages:[{sender:senderId,message}]
//             });
//             const newMessage = new Message({
//                 senderId,
//                 receiverId,
//                 message,
//             })

//             if(newMessage){
//                 conversation.messages.push(newMessage._id);
//             }
//             await Promise.all([conversation.save(),newMessage.save()]);
//             res.status(201).json({message:"Message sent successfully!",newMessage})

//         }

//     } catch (error) {
//         console.log("error in sending the message : "+error);
//         res.status(500).json({message:"Internal Server Error"})
//     }

// };
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";
export const sendMessage = async (req, res) => {
    console.log("message send", req.params.id, req.body.message);
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;  // current logged-in user

        // Look for an existing conversation
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            // Create a new conversation if none exists and add both participants to `members`
            conversation = await Conversation.create({
                members: [senderId, receiverId],
                messages: []
            });
        }

        // Create and save a new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Add message ID to conversation's messages array and save
        conversation.messages.push(newMessage._id);
        await conversation.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json({ message: "Message sent successfully!", newMessage });
        
    } catch (error) {
        console.log("error in sending the message : " + error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getMessage = async (req,res)=>{
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] }
            }).populate("messages");
        if (!conversation) {
            return res.status(201).json({message:"No conversation found"});
        }
        const messages = conversation.messages;
        res.status(201).json({messages})
    } catch (error) {
        
        console.log("error in getting the message : " + error);
        res.status(500).json({ message: "Internal Server Error" });
    }
} 