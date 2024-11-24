// Importing required modules
import { Server } from "socket.io"; // Importing the Server class from the 'socket.io' library for real-time communication
import http from "http"; // Importing the HTTP module to create an HTTP server, needed for WebSocket compatibility with Socket.io
import express from "express"; // Importing the Express framework for handling HTTP requests
import { log } from "console";

// Initializing Express app
const app = express();

// Creating an HTTP server instance based on the Express app
// This HTTP server is required because socket.io relies on an HTTP server for WebSocket connections
// Express alone does not natively support WebSocket connections; by using http.createServer(app),
// both HTTP and WebSocket traffic are handled on the same server and port
const server = http.createServer(app);

// Initializing a new instance of socket.io and attaching it to the HTTP server with CORS configurations
const io = new Server(server, {
  cors: {
    origin: "https://chat-application-three-silk.vercel.app", // Allowing requests from this origin
    methods: ["GET", "POST"], // Allowing only GET and POST requests through CORS
  },
});

// Helper function to get the socket ID of a specific receiver
// 'receiverId' is the unique ID of the user, and 'users' is an object mapping user IDs to socket IDs
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

// Object to keep track of connected users and their socket IDs
const users = {};

// Listening for new client connections to the server
io.on("connection", (socket) => {
  console.log("A user connected", socket.id); // Log connection with the unique socket ID

  // Extracting userId from the socket connection's query parameters
  const userId = socket.handshake.query.userId;
  if (userId) {
    // Storing the userId and associated socket ID in the 'users' object for quick lookup
    users[userId] = socket.id;
    console.log(users);
  }

  // Emitting an event to all connected clients with the list of currently connected user IDs
  io.emit("getOnlineUsers", Object.keys(users));

  // Listening for the 'disconnect' event, which triggers when a client disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    
    // Removing the disconnected user's ID from the 'users' object
    delete users[userId];
    
    // Emitting updated list of online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

// Exporting the app, io, and server objects to be used elsewhere in the application
export { app, io, server };
