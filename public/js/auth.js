const baseURL = "http://localhost:5000/api";

// Register user
async function registerUser(data) {
  const res = await fetch(`${baseURL}/auth/register`, {
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

// Login user
async function loginUser(email, password) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // token + role
}


// Forgot password
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

// ✅ Create test user (for local testing)
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

// Expose all auth methods globally
window.auth = {
  registerUser,
  loginUser,
  forgotPassword,
  createTestUser, // Optional but handy during dev
};

