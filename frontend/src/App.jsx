import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard.jsx";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchTasks() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Could not load tasks. Please check the backend.");
      return [];
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      const data = await fetchTasks();

      if (!ignore) {
        setTasks(data);
        setLoading(false);
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");
    setEditingId(null);
  }

  async function addTask(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: dueDate || undefined,
      });

      setTasks((previousTasks) => [response.data, ...previousTasks]);

      setSuccess("Task added successfully.");
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || "Could not add task.");
    }
  }

  function startEditing(task) {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || "Pending");
    setPriority(task.priority || "Medium");
    setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    setEditingId(task._id);
    setError("");
    setSuccess("");
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${editingId}`, {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: dueDate || undefined,
      });

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task._id === editingId ? response.data : task,
        ),
      );

      setSuccess("Task updated successfully.");
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || "Could not update task.");
    }
  }

  async function deleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await axios.delete(`${API_URL}/${id}`);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task._id !== id),
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess("Task deleted successfully.");
    } catch (error) {
      setError(error.response?.data?.message || "Could not delete task.");
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = !statusFilter || task.status === statusFilter;

    const matchesPriority = !priorityFilter || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const completedCount = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingCount = tasks.filter((task) => task.status === "Pending").length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const summaryCards = [
    { title: "Total Tasks", count: tasks.length, color: "blue", symbol: "▦" },
    { title: "Pending", count: pendingCount, color: "orange", symbol: "◷" },
    {
      title: "In Progress",
      count: inProgressCount,
      color: "purple",
      symbol: "↻",
    },
    { title: "Completed", count: completedCount, color: "green", symbol: "✓" },
  ];

  return (
    <div className="dashboard-layout">
      <Dashboard />

      <main className="dashboard-main">
        <header className="page-header" id="overview">
          <div>
            <p className="eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Task Dashboard</h1>
            <p className="page-subtitle">
              Organize your work and stay on top of your tasks.
            </p>
          </div>
          <a className="header-button" href="#add-task">
            + New Task
          </a>
        </header>

        <section className="summary-grid">
          {summaryCards.map((card) => (
            <div className="summary-card" key={card.title}>
              <div className={`summary-icon ${card.color}`}>{card.symbol}</div>
              <p>{card.title}</p>
              <h2>{card.count}</h2>
            </div>
          ))}
        </section>

        {error && (
          <p className="message error" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="message success" role="status">
            {success}
          </p>
        )}

        <section className="panel form-panel" id="add-task">
          <div className="panel-heading">
            <div>
              <h2>{editingId ? "Edit Task" : "Create a Task"}</h2>
              <p>Fill in the details below.</p>
            </div>
          </div>

          <form onSubmit={editingId ? handleUpdate : addTask}>
            <div className="field">
              <label htmlFor="task-title">Task Title *</label>
              <input
                id="task-title"
                type="text"
                placeholder="e.g. Complete project"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="task-description">Description</label>
              <textarea
                id="task-description"
                placeholder="What needs to be done?"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows="3"
              />
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="task-status">Status</label>
                <select
                  id="task-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="task-priority">Priority</label>
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="task-due-date">Due Date</label>
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                {editingId ? "Save Changes" : "Add Task"}
              </button>

              {editingId && (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel tasks-panel" id="tasks">
          <div className="panel-heading">
            <div>
              <h2>My Tasks</h2>
              <p>View and manage your tasks.</p>
            </div>
            <span className="task-total">{filteredTasks.length} tasks</span>
          </div>

          <div className="filters">
            <input
              type="search"
              aria-label="Search tasks by title"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              aria-label="Filter by priority"
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {loading ? (
            <p className="empty-state">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="empty-state">No tasks found. Try adding a task.</p>
          ) : (
            <div className="task-grid">
              {filteredTasks.map((task) => (
                <article className="task-card" key={task._id}>
                  <div className="task-card-top">
                    <h3>{task.title}</h3>
                    <span
                      className={`priority-badge ${(task.priority || "Medium").toLowerCase()}`}
                    >
                      {task.priority || "Medium"}
                    </span>
                  </div>

                  <p className="task-description">
                    {task.description || "No description provided."}
                  </p>

                  <div className="task-details">
                    <span
                      className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}
                    >
                      {task.status}
                    </span>
                    <span className="due-date">
                      Due:{" "}
                      {task.dueDate ? task.dueDate.slice(0, 10) : "Not set"}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => startEditing(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="page-footer">TaskFlow · Task Management</footer>
      </main>
    </div>
  );
}

export default App;
