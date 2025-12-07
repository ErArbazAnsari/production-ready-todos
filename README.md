# Redux Toolkit Todo App

A full-stack todo application built with modern JavaScript and TypeScript technologies. Features user authentication, todo management, and state management using Redux Toolkit.

## Features

-   **User Authentication**: Sign up, login, and logout with JWT-based authentication
-   **Todo Management**: Create, read, update, and delete todos
-   **Responsive UI**: Beautiful interface with Tailwind CSS and Radix UI components
-   **State Management**: Centralized state using Redux Toolkit
-   **Protected Routes**: Authenticated access to todo management features
-   **Dark Mode Support**: Built-in theme toggle functionality
-   **Type Safety**: TypeScript on the backend for better code quality

## Tech Stack

### Frontend (Client)

-   **React 19** - UI library
-   **Redux Toolkit** - State management
-   **React Router v7** - Routing
-   **Tailwind CSS** - Styling
-   **Vite** - Build tool
-   **Axios** - HTTP client
-   **Radix UI** - UI components library

### Backend (Server)

-   **Express.js** - Web framework
-   **MongoDB** - Database
-   **Mongoose** - ODM
-   **TypeScript** - Type safety
-   **JWT** - Authentication
-   **Bcrypt** - Password hashing
-   **Zod** - Validation

## Installation

### Prerequisites

-   Node.js (v16+)
-   MongoDB (local or Atlas)

### Setup

**1. Clone the repository**

```bash
git clone <repository-url>
cd production-ready-todos
```

**2. Setup Backend**

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
ORIGIN_URL=http://localhost:5173
ENVIRONMENT=development
JWT_SECRET=your_jwt_secret
```

**3. Setup Frontend**

```bash
cd ../client
npm install
```

## Running the Project

### Start Backend Server

```bash
cd server
npm run dev        # Development mode with auto-reload
npm run build      # Build TypeScript
npm start          # Production mode
```

The server will run on `http://localhost:5000`

### Start Frontend Client

```bash
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
```

The client will run on `http://localhost:5173`

## API Endpoints

### Authentication

-   `POST /api/auth/signup` - Create new account
-   `POST /api/auth/login` - Login user
-   `POST /api/auth/logout` - Logout user
-   `GET /api/auth/me` - Get current user

### Todos

-   `GET /api/todos` - Get all todos for user
-   `POST /api/todo` - Create new todo
-   `PATCH /api/todo/:id` - Update todo
-   `DELETE /api/todo/:id` - Delete todo

## Key Features Explained

### Redux Store Structure

-   **authSlice** - Manages user authentication state
-   **todoSlice** - Manages todo items and operations

### Protected Routes

TodoList page requires authentication. Unauthenticated users are redirected to login.

### API Communication

Axios client with interceptors for JWT token handling and error management.

## Development

The project uses:

-   ESLint for code quality
-   TypeScript for type safety (backend)
-   Vite for fast frontend development

## Database Models

### User

-   email (unique)
-   password (hashed)
-   name
-   createdAt

### Todo

-   title
-   description
-   completed (boolean)
-   userId (reference)
-   createdAt

## License

MIT
