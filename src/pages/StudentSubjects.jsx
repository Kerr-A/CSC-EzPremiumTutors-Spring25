import "../styles.css";

function StudentSubjects() {
  return (
    <div className="subjects-container">
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
          <span><strong>Subjects</strong></span>
        </a>
        <a href="/student-session-history" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/clock--v1.png" alt="History" />
          <span>Session History</span>
        </a>
        <a href="/student-schedule" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/planner.png" alt="Schedule" />
          <span>My Schedule</span>
        </a>
      </div>

      {/* Main Content */}
      <div className="subjects-content">
        <div className="top-bar">
          <div>
            <a href="/student-dashboard" style={{ color: "black", textDecoration: "none" }}>
              ← Go back
            </a>
          </div>
          <h2>My Subjects</h2>
        </div>

        <div className="subject-grid">
          <div className="subject-card">
            <img src="https://img.icons8.com/ios-filled/50/calculator.png" alt="Math" />
            <h3>Mathematics</h3>
            <p>Algebra, Calculus, Geometry</p>
          </div>
          <div className="subject-card">
            <img src="https://img.icons8.com/ios-filled/50/open-book.png" alt="English" />
            <h3>English Literature</h3>
            <p>Poetry, Novels, Drama</p>
          </div>
          <div className="subject-card">
            <img src="https://img.icons8.com/ios-filled/50/test-tube.png" alt="Science" />
            <h3>Science</h3>
            <p>Physics, Chemistry, Biology</p>
          </div>
          <div className="subject-card">
            <img src="https://img.icons8.com/ios-filled/50/globe.png" alt="Geography" />
            <h3>Geography</h3>
            <p>Maps, Climates, Earth Structure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSubjects;
