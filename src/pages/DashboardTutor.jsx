import "../styles.css";

function DashboardTutor() {
  return (
    <div className="dashboard">
      {/* Glowing background */}
      <div className="glow-circle"></div>
      <div className="glow-circle delay-1"></div>
      <div className="glow-circle delay-2"></div>

      {/* Top nav bar */}
      <nav className="top-bar">
        <div>
          <a href="/homepage-tutor" style={{ color: "white" }}>← Home</a>
        </div>
        <div className="top-links">
          <a href="#" style={{ color: "white" }}>My profile</a>
          <span>📅</span>
          <span>⚙️</span>
        </div>
      </nav>

      {/* Page heading */}
      <h1 style={{ color: "white" }}>Tutor Dashboard</h1>

      {/* Grid content */}
      <div className="grid">
        <a href="#" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/user.png" alt="Profile" />
          <p>My profile</p>
        </a>
        <a href="chat.html" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/message-squared.png" alt="Messages" />
          <p>Messages</p>
        </a>
        <a href="#" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/money.png" alt="Payroll" />
          <p>Payroll</p>
        </a>
        <a href="#" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/clock--v1.png" alt="Session History" />
          <p>Session history</p>
        </a>
        <a href="#" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/planner.png" alt="Schedule" />
          <p>My schedule</p>
        </a>
      </div>
    </div>
  );
}

export default DashboardTutor;
