// src/pages/StudentMessages.jsx
import React from "react";

const StudentMessages = () => {
  return (
    <div className="dashboard">
      <h1 style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>Student Chat</h1>
      <iframe
        src="/chat.html"
        title="Student Chat"
        style={{
          width: "100%",
          height: "90vh",
          border: "none",
          display: "block",
        }}
      ></iframe>
    </div>
  );
};

export default StudentMessages;
