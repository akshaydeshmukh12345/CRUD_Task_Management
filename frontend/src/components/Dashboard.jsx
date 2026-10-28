function Dashboard() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">T</div>
        <div>
          <h2>TaskFlow</h2>
          <p>Management</p>
        </div>
      </div>

      <p className="nav-heading">MENU</p>

      <nav className="sidebar-nav">
        <a href="#overview" className="active">
          <span>▦</span> Overview
        </a>
        <a href="#add-task">
          <span>＋</span> Add New Task
        </a>
        <a href="#tasks">
          <span>☷</span> My Tasks
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="profile-avatar">A</div>
        <div>
          <strong>Task Manager</strong>
          <p>Personal Workspace</p>
        </div>
      </div>
    </aside>
  );
}

export default Dashboard;
