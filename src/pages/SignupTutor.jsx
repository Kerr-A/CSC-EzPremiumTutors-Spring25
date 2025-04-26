import { useState } from "react";
import "../styles.css";

function SignupTutor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await window.auth.registerUser({ name, email, password, role: "tutor" });
      alert("Tutor account created successfully! Redirecting to login...");
      window.location.href = "/login-tutor";
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div className="login-body home-bg">
      <div className="glow-circle"></div>
      <div className="glow-circle delay-1"></div>
      <div className="glow-circle delay-2"></div>

      <div className="login-container">
        <h2 className="login-heading">Tutor Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>👤</span> Username:
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>
            <span>✉️</span> Email:
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>
            <span>🔐</span> Password:
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>
            <span>🔐</span> Confirm Password:
          </label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit" className="btn-signin">
            Sign Up
          </button>
        </form>
        <p className="footer-links">
          Already have an account?{" "}
          <a href="/login-tutor">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default SignupTutor;
