const baseURL = "http://localhost:5000/api"; // Change if hosted elsewhere

// 🔐 Secure wrapper for all API calls
async function secureFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
  });

  // 🚨 If token is blacklisted or expired
  if (res.status === 401) {
    alert("Session expired. Redirecting to login...");

    localStorage.clear();
    sessionStorage.clear();

    const role = localStorage.getItem("userRole");
    if (role === "tutor") {
      window.location.href = "login-tutor.html";
    } else {
      window.location.href = "login.html";
    }
    return; // stop execution
  }

  return res;
}

// 🔐 Register user
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

// 🔐 Login user
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

  return res.json(); // { token, user, role }
}

// 🔐 Forgot password
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

// (Optional) Create test user
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

// ✅ Export everything
window.auth = {
  registerUser,
  loginUser,
  forgotPassword,
  createTestUser,
  secureFetch, // 👈 use this for all protected requests
};
