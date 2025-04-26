import { useState } from "react";
import "../styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await window.auth.loginUser(email, password);
      alert("Login successful!");

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      if (res.role === "student") {
        window.location.href = "/homepage-student.html";
      } else if (res.role === "tutor") {
        window.location.href = "/homepage-tutor.html";
      } else {
        alert("Unknown role.");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="login-body home-bg">
      {/* Glowing background */}
      <div className="glow-circle"></div>
      <div className="glow-circle delay-1"></div>
      <div className="glow-circle delay-2"></div>

      <div className="login-container">
        <div className="login-icon">👤</div>
        <h2 className="login-heading">Student Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-signin">
            Sign in
          </button>
          <a href="/forgot-password" className="forgot-link">
            Forgot password?
          </a>
        </form>
        <p className="footer-links">
          A tutor? <a href="/login-tutor">Click here</a>
          <br />
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

