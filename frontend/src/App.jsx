import { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

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

  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Management</h1>

      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <p>Manage your daily tasks here.</p>
    </div>
  );
}

export default App;
