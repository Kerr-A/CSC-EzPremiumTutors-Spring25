import "../styles.css";

function DashboardStudent() {
  return (
    <div className="dashboard">
      {/* Background glow */}
      <div className="glow-circle"></div>
      <div className="glow-circle delay-1"></div>
      <div className="glow-circle delay-2"></div>

      {/* Top Navigation */}
      <div className="top-bar">
        <div>
          <a href="/homepage-student" style={{ color: "white" }}>← Home</a>
        </div>
        <div className="top-links">
          <a href="#" style={{ color: "white" }}>My profile</a>
          <a href="/student-schedule" style={{ color: "white", textDecoration: "none" }}>📅</a>
          <span>⚙️</span>
        </div>
      </div>

      {/* Heading */}
      <h1 style={{ color: "white" }}>Students Dashboard</h1>

      {/* Grid of Features */}
      <div className="grid">
        <a href="/student-tutors" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/group-background-selected.png" alt="Tutors" />
          <p>My Tutors</p>
        </a>
        <a href="/student-messages" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/message-squared.png" alt="Messages" />
          <p>Messages</p>
        </a>
        <a href="/student-subjects" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/book.png" alt="Subjects" />
          <p>Subjects</p>
        </a>
        <a href="/student-session-history" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/clock--v1.png" alt="History" />
          <p>Session history</p>
        </a>
        <a href="/student-schedule" className="grid-item">
          <img src="https://img.icons8.com/ios-filled/100/planner.png" alt="Schedule" />
          <p>My schedule</p>
        </a>
      </div>
    </div>
  );
}

export default DashboardStudent;
