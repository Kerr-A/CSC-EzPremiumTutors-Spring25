import "../styles.css";

function StudentSchedule() {
  return (
    <div className="schedule-container">
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
          <span>Session History</span>
        </a>
        <a href="/student-schedule" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/planner.png" alt="Schedule" />
          <span><strong>My Schedule</strong></span>
        </a>
      </div>

      {/* Content */}
      <div className="schedule-content">
        <div className="top-bar">
          <div>
            <a href="/student-dashboard" style={{ color: "black", textDecoration: "none" }}>
              ← Go back
            </a>{" "}
            | <span>Dashboard</span>
          </div>
          <a className="appointment-btn" href="/schedule-appointment">
            Schedule an Appointment
          </a>
        </div>

        <h2>Appointments</h2>

        <div className="tabs">
          <button className="active">My Appointments</button>
          <button
            className="inactive"
            onClick={() => (window.location.href = "/student-session-history")}
          >
            History
          </button>
        </div>

        <div className="label-bar">Upcoming Appointments</div>

        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Tutor</th>
              <th>Day</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>04/12/25</td>
              <td>Emily Roberts</td>
              <td>Saturday</td>
              <td>3:00 PM</td>
            </tr>
            <tr>
              <td>04/13/25</td>
              <td>Michael Anderson</td>
              <td>Sunday</td>
              <td>11:00 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentSchedule;
