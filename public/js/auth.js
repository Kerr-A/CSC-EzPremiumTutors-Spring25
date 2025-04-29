const baseURL = "http://localhost:5000/api"; // Adjust if your backend is hosted elsewhere

// Register user (student, tutor, or admin)
async function registerUser(data) {
  const res = await fetch(`${baseURL}/auth/register`, { // use /auth/register (standard for you)
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

// Login user (student, tutor, or admin)
async function loginUser(email, password) {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // returns { token, user { name, email, role }, etc. }
}

// Forgot password (optional, if you have this route)
async function forgotPassword(email) {
  const res = await fetch(`${baseURL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to send reset link");
  }

  return res.json();
}

// (Optional) Create a test user (for development only)
async function createTestUser() {
  const res = await fetch(`${baseURL}/auth/create-test-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create test user");
  }

  return res.json();
}

// Expose all auth functions globally
window.auth = {
  registerUser,
  loginUser,
  forgotPassword,
  createTestUser,
};
