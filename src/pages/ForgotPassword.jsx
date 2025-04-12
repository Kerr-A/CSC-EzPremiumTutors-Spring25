// src/pages/ForgotPassword.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      setMessage(data.message || "✅ Password reset successful.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleReset} className="reset-form">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;

