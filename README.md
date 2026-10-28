# CRUD Task Management

A full-stack Task Management application that allows users to create, view, update, delete, search, and filter tasks. The application stores task data in MongoDB.

## Features

- Create new tasks with a title and description
- View all tasks in a clean dashboard
- Edit existing tasks
- Delete tasks with confirmation
- Set task status: Pending, In Progress, or Completed
- Set task priority: High, Medium, or Low
- Add a due date to tasks
- Search tasks by title
- Filter tasks by status and priority
- View total, completed, and remaining task counts
- Store tasks persistently in MongoDB
- Responsive user interface
- Form validation and error handling

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
CRUD_Task_Management/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Make sure the following are installed:

- Node.js and npm
- MongoDB Community Server, running locally, or an accessible MongoDB instance

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/akshaydeshmukh12345/CRUD_Task_Management.git
cd CRUD_Task_Management
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_management
```

Make sure MongoDB is running before starting the backend.

Start the backend:

```bash
npm start
```

If the `start` script is not configured in `backend/package.json`, use the command supported by your project, such as:

```bash
node server.js
```

The API will run at:

`http://localhost:5000`

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

Keep both the backend and frontend running while using the application.

## API Endpoints

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example Task

```json
{
  "title": "Complete assignment",
  "description": "Finish the task management project",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2026-11-01"
}
```

Supported status values: `Pending`, `In Progress`, `Completed`

Supported priority values: `High`, `Medium`, `Low`

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port used by the backend server |
| `MONGO_URI` | MongoDB connection string |

Use `.env.example` to document the required environment variables. Never commit your actual `.env` file, database credentials, or other secrets.

## Future Improvements

- Pagination and sorting
- User authentication
- User-specific task management
- Improved task notifications

## Author

**Akshay Deshmukh**

GitHub: [akshaydeshmukh12345](https://github.com/akshaydeshmukh12345)
