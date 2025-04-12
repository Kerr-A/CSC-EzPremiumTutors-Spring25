import { useState } from "react";
import "../styles.css";

function LoginTutor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await window.auth.loginUser(email, password);
      alert("Login successful!");

      // Store credentials
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      if (res.role === "tutor") {
        window.location.href = "/homepage-tutor.html";
      } else {
        alert("You are not a tutor.");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="login-body home-bg">
      {/* Background bubbles */}
      <div className="glow-circle"></div>
      <div className="glow-circle delay-1"></div>
      <div className="glow-circle delay-2"></div>

      {/* Form container */}
      <div className="login-container">
        <div className="login-icon">👤</div>
        <h2 className="login-heading">Tutor Login</h2>
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
          A student? <a href="/login">Click here</a>
          <br />
          Don’t have an account? <a href="/signup-tutor">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginTutor;
