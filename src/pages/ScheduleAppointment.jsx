import "../styles.css";

function ScheduleAppointment() {
  return (
    <div className="appointment-container" style={{ display: "flex" }}>
      {/* Sidebar */}
      <div className="sidebar" style={sidebarStyles}>
        {sidebarItems.map((item, idx) => (
          <a key={idx} href={item.link} className="sidebar-item" style={sidebarItemStyles}>
            <img src={item.icon} alt={item.label} style={{ width: 30, height: 30, marginBottom: 5 }} />
            <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "black" }}>{item.label}</span>
          </a>
        ))}
      </div>

      {/* Main content */}
      <div className="appointment-content" style={appointmentContentStyles}>
        <a className="back-link" href="/student-dashboard" style={backLinkStyles}>
          ← Go back to dashboard
        </a>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#222" }}>Schedule an Appointment</h2>

        <form action="/appointment-confirmed" method="get" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="form-row" style={{ display: "flex", gap: "1.5rem" }}>
            <div style={formGroupStyles}>
              <label htmlFor="studentName">Your Name</label>
              <input type="text" id="studentName" name="studentName" required placeholder="Enter your full name" />
            </div>
            <div style={formGroupStyles}>
              <label htmlFor="tutor">Select Tutor</label>
              <select id="tutor" name="tutor" required>
                <option value="">-- Choose a Tutor --</option>
                <option value="david">Mr. David</option>
                <option value="clara">Ms. Clara</option>
                <option value="isaac">Dr. Isaac</option>
              </select>
            </div>
          </div>

          <div className="form-row" style={{ display: "flex", gap: "1.5rem" }}>
            <div style={formGroupStyles}>
              <label htmlFor="date">Select Date</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div style={formGroupStyles}>
              <label htmlFor="time">Select Time</label>
              <select id="time" name="time" required>
                <option value="">-- Choose Time --</option>
                {["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"].map((t) => (
                  <option key={t} value={t}>
                    {t.replace("am", " AM").replace("pm", " PM")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={formGroupStyles}>
            <label htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" name="notes" rows="4" placeholder="Include topics to discuss or questions..." />
          </div>

          <button type="submit" style={buttonStyles}>Confirm Appointment</button>
        </form>
      </div>
    </div>
  );
}

// Sidebar data
const sidebarItems = [
  {
    label: "Messages",
    icon: "https://img.icons8.com/ios-filled/50/topic.png",
    link: "/student-messages",
  },
  {
    label: "My Tutors",
    icon: "https://img.icons8.com/ios-filled/50/classroom.png",
    link: "/student-tutors",
  },
  {
    label: "Subjects",
    icon: "https://img.icons8.com/ios-filled/50/book.png",
    link: "/student-subjects",
  },
  {
    label: "Session History",
    icon: "https://img.icons8.com/ios-filled/50/clock--v1.png",
    link: "/student-session-history",
  },
  {
    label: "My Schedule",
    icon: "https://img.icons8.com/ios-filled/50/planner.png",
    link: "/student-schedule",
  },
];

// Inline Styles
const sidebarStyles = {
  width: "90px",
  backgroundColor: "#fcefd4",
  paddingTop: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  minHeight: "100vh",
};

const sidebarItemStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  textDecoration: "none",
};

const appointmentContentStyles = {
  flexGrow: 1,
  padding: "2rem",
  background: "#fff",
  borderRadius: "12px",
  margin: "3rem auto",
  maxWidth: "800px",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
};

const formGroupStyles = {
  display: "flex",
  flexDirection: "column",
};

const backLinkStyles = {
  fontSize: "0.9rem",
  marginBottom: "1.5rem",
  display: "inline-block",
  color: "#333",
  textDecoration: "none",
};

const buttonStyles = {
  padding: "1rem",
  fontSize: "1rem",
  fontWeight: "bold",
  backgroundColor: "#f57c00",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ScheduleAppointment;
