import "../styles.css";

function AppointmentConfirmed() {
  return (
    <div
      style={{
        margin: 0,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "black",
          padding: "3rem",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#28a745", fontSize: "2rem", marginBottom: "1rem" }}>
          Appointment Confirmed!
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
          Your appointment has been successfully scheduled.
          <br />
          You will receive a reminder prior to the session.
        </p>
        <a
          href="/student-dashboard"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#f57c00",
            color: "white",
            fontWeight: "bold",
            borderRadius: "5px",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e65100")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f57c00")}
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default AppointmentConfirmed;
