# Chat Application

This project is a full-stack chat application with real-time messaging, user authentication, and integrated summarization for long messages using the Gemini API.

## Table of Contents
1. [Screenshots](#screenshots)
2. [Project Structure](#project-structure)
3. [Technologies Used](#technologies-used)
4. [Unique Features](#unique-features)
5. [Installation](#installation)
6. [Backend](#backend)
   - [Environment Variables](#environment-variables)
   - [API Endpoints](#api-endpoints)
7. [Frontend](#frontend)
8. [Running the Application](#running-the-application)

---
## Screenshots
<img width="1440" alt="Screenshot 2024-11-02 at 7 36 41 PM" src="https://github.com/user-attachments/assets/8b40e48f-5b4d-42fc-b56d-825b56bfa9de">
&nbsp;
<img width="1440" alt="Screenshot 2024-11-03 at 9 07 35 PM" src="https://github.com/user-attachments/assets/8aaa4dd5-c247-40e9-aa45-5ab85d1138cc">
&nbsp;
<img width="1440" alt="Screenshot 2024-11-03 at 9 07 46 PM" src="https://github.com/user-attachments/assets/1ec4e745-a874-4265-9d41-b65d2eeba19b">



## Project Structure

```plaintext
ChatApplication-main
│
├── backend                # Backend server (Node.js, Express, MongoDB)
│   ├── controllers        # Controllers for handling API requests
│   ├── jwt                # JWT token generation utility
│   ├── middleware         # Middleware for route protection
│   ├── models             # Mongoose models for MongoDB
│   ├── routes             # Route definitions for APIs
│   ├── SocketIO           # Socket.IO setup for real-time communication
│   ├── .env               # Environment variables (not included)
│   ├── index.js           # Entry point for the backend server
│   └── package.json       # Backend dependencies
│
└── frontend               # Frontend client (React, Tailwind CSS)
    ├── public             # Public assets
    ├── src                # Source code for React application
    │   ├── assets         # Static assets (e.g., sounds)
    │   ├── components     # Components for login, loading, signup
    │   ├── context        # Context providers for authentication and Socket.IO
    │   ├── Home           # Home page with Left and Right sections for messaging
    │   ├── stateManage    # State management for conversations
    │   └── utils          # Utility files (e.g., constants)
    ├── README.md          # Frontend readme
    ├── tailwind.config.js # Tailwind CSS configuration
    └── package.json       # Frontend dependencies
```

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, JWT, Socket.IO
- **Frontend**: React, Tailwind CSS, Socket.IO Client, Gemini API

## Unique Features

- **Long Message Summarization**: Integrated with the Gemini API in the frontend to automatically summarize lengthy messages, making conversations more readable and manageable.
  - **Dependency**: The Gemini API integration uses the `@google/generative-ai` library (version ^0.21.0).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/ChatApplication.git
   cd ChatApplication-main
   ```

2. Install dependencies for both backend and frontend:

   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

## Backend

### Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```plaintext
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### API Endpoints
- **User Routes**:
  - `POST /api/users/login` - Login user
  - `POST /api/users/signup` - Register a new user

- **Message Routes**:
  - `POST /api/messages` - Send a new message
  - `GET /api/messages/:conversationId` - Get all messages in a conversation

### Real-Time Communication (Socket.IO)
- The backend has a `SocketIO` configuration that facilitates real-time messaging.

## Frontend

- **Context Providers**: The frontend uses `AuthProvider` and `SocketContext` for managing authentication and socket connections.
- **Components**: Main components include `Login`, `Signup`, `Loading`, `Left`, and `Right`.
- **State Management**: Managed using custom hooks in `stateManage` and `context` directories.

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:
   ```bash
   cd ../frontend
   npm start
   ```

3. Visit the frontend at [http://localhost:3000](http://localhost:3000) and interact with the chat interface.
