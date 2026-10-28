# CRUD Task Management

A simple full-stack task management application built using React, Node.js, Express.js, and MongoDB.

## Features

- Add new tasks
- View all tasks
- Edit and delete tasks
- Set task status and priority
- Add due dates
- Search tasks
- Filter tasks by status and priority
- View task summary on the dashboard
- Store tasks in MongoDB

## Technologies Used

- **Frontend:** React, Vite, CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose

## Project Structure

```text
CRUD_Task_Management/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/akshaydeshmukh12345/CRUD_Task_Management.git
cd CRUD_Task_Management
```

### 2. Start the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_management
```

Make sure MongoDB is running, then start the backend:

```bash
npm start
```

If `npm start` is not configured, run `node server.js` instead.

### 3. Start the Frontend

Open a new terminal in the project folder and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

## API Endpoints

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a task by ID |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Task Status

- Pending
- In Progress
- Completed

## Task Priority

- High
- Medium
- Low

## Author

**Akshay Deshmukh**

GitHub: [akshaydeshmukh12345](https://github.com/akshaydeshmukh12345)
