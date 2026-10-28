import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function addTask() {
    if (title.trim() === "") return;

    try {
      // sending a POST request to the backend to add a new task\
      //when it responds state will be update

      const response = await axios.post("http://localhost:5000/api/tasks", {
        title,
      });
      setTasks((previousTasks) => [...previousTasks, response.data]);
      setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task._id !== id),
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function handleUpdate(id) {
    if (title.trim() === "") return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { title: title.trim() },
      );

      setTasks((previousTasks) =>
        previousTasks.map((task) => (task._id === id ? response.data : task)),
      );

      setTitle("");
      setEditingId(null);
    } catch (error) {
      console.log("Error updating task:", error.message);
    }
  }
  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      const data = await fetchTasks();

      if (!ignore) {
        setTasks(data);
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="app">
      <h1>Task Management</h1>

      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button
        onClick={() =>
          editingId !== null ? handleUpdate(editingId) : addTask()
        }
      >
        {editingId !== null ? "Save Changes" : "Add Task"}
      </button>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}

            <button
              onClick={() => {
                setTitle(task.title);
                setEditingId(task._id);
              }}
            >
              Edit
            </button>

            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Manage your daily tasks here.</p>
    </div>
  );
}

export default App;
