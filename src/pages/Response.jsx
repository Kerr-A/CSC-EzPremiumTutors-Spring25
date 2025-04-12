import { useEffect, useState } from "react";
import "../styles.css";

function Response() {
  const [backHref, setBackHref] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");

    if (from === "student") {
      setBackHref("/homepage-student");
    } else if (from === "tutor") {
      setBackHref("/homepage-tutor");
    } else {
      setBackHref("/");
    }
  }, []);

  return (
    <div
      className="response"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        fontFamily: "Arial, sans-serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
        Thank you! Your responses have been submitted
      </h1>
      <a
        href={backHref}
        className="btn-link"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.8rem 1.5rem",
          backgroundColor: "#f57c00",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e65100")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#f57c00")}
      >
        Go back to your homepage
      </a>
    </div>
  );
}

export default Response;
