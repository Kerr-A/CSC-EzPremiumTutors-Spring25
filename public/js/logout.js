// logout.js

// Logout user and redirect to correct login page
function logoutUser() {
  // Clear all localStorage items
  localStorage.clear();

  // Check role before clearing (optional safety)
  const userRole = localStorage.getItem("userRole");

  // Redirect based on role
  if (userRole === "student") {
    window.location.href = "login.html"; // student login page
  } else if (userRole === "tutor") {
    window.location.href = "login-tutor.html"; // tutor login page
  } else {
    // Default fallback if role not found
    window.location.href = "login.html";
  }
}

// Special logout function for modal confirmation
function confirmLogout(role) {
  if (role === 'student' || role === 'tutor') {
    logoutUser();
  } else {
    console.error("Unknown role for logout");
  }
}
