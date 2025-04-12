import { useState } from "react";
import "../styles.css";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from") || "main";
    window.location.href = `/response?from=${from}`;
  };

  return (
    <div className="contact" style={{
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "4rem 1rem",
    }}>
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        <div className="form-row">
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone no:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <label htmlFor="message">Message (optional):</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
