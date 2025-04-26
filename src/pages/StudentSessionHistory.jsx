import "../styles.css";

function StudentSessionHistory() {
  return (
    <div className="history-container">
      {/* Sidebar */}
      <div className="sidebar">
        <a href="/student-messages" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/topic.png" alt="Messages" />
          <span>Messages</span>
        </a>
        <a href="/student-tutors" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/classroom.png" alt="Tutors" />
          <span>My Tutors</span>
        </a>
        <a href="/student-subjects" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/book.png" alt="Subjects" />
          <span>Subjects</span>
        </a>
        <a href="/student-session-history" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/clock--v1.png" alt="History" />
          <span><strong>Session History</strong></span>
        </a>
        <a href="/student-schedule" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/planner.png" alt="Schedule" />
          <span>My Schedule</span>
        </a>
      </div>

      {/* Content */}
      <div className="history-content">
        <div className="top-bar">
          <div>
            <a href="/student-dashboard" style={{ color: "black", textDecoration: "none" }}>
              ← Go back
            </a>{" "}
            | <span>Dashboard</span>
          </div>
        </div>

        <h2>Appointments</h2>

        <div className="tabs">
          <button
            className="inactive"
            onClick={() => (window.location.href = "/student-schedule")}
          >
            My Appointments
          </button>
          <button className="active">History</button>
        </div>

        <div className="label-bar">History</div>

        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Tutor</th>
              <th>Day</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>03/06/25</td>
              <td>Michael</td>
              <td>Thursday</td>
              <td>1 hour</td>
            </tr>
            <tr>
              <td>03/07/25</td>
              <td>Robert</td>
              <td>Friday</td>
              <td>2 hours</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentSessionHistory;
