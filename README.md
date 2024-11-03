# Chat Application

This project is a full-stack chat application with real-time messaging, user authentication, and integrated summarization for long messages using the Gemini API.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Technologies Used](#technologies-used)
3. [Unique Features](#unique-features)
4. [Installation](#installation)
5. [Backend](#backend)
   - [Environment Variables](#environment-variables)
   - [API Endpoints](#api-endpoints)
6. [Frontend](#frontend)
7. [Running the Application](#running-the-application)

---

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
