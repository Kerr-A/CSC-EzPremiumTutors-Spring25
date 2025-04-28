const baseURL = "http://localhost:5000/api"; // adjust if your backend is hosted elsewhere

// Register user (student, tutor, or admin)
async function registerUser(data) {
<<<<<<< HEAD
  const res = await fetch(`${baseURL}/auth/register`, {
=======
  const res = await fetch(`${baseURL}/auth/signup`, {
>>>>>>> 228c8c7 (public/homepage-student.html)
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

<<<<<<< HEAD
  return res.json(); // { token, role }
}

// Forgot password
=======
  return res.json(); // returns { message, user: { name, email, role } }
}

// Forgot password (optional, if you have this route)
>>>>>>> 228c8c7 (public/homepage-student.html)
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

<<<<<<< HEAD
// Optional: Create test user (dev only)
=======
// (Optional) Create test user
>>>>>>> 228c8c7 (public/homepage-student.html)
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

// Expose to global window object
window.auth = {
  registerUser,
  loginUser,
  forgotPassword,
  createTestUser,
<<<<<<< HEAD
};
=======
};
>>>>>>> 228c8c7 (public/homepage-student.html)
