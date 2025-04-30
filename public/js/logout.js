// Logout user and redirect to correct login page
function logoutUser() {
  // Get user role before clearing storage
  const userRole = localStorage.getItem("userRole");

  // Clear storage
  localStorage.clear();
  sessionStorage.clear();

  // Prevent back navigation after logout
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.location.href = userRole === "tutor" ? "login-tutor.html" : "login.html";
  };

  // Redirect to appropriate login page
  if (userRole === "student") {
    window.location.href = "login.html";
  } else if (userRole === "tutor") {
    window.location.href = "login-tutor.html";
  } else {
    window.location.href = "login.html";
  }
}

// Special logout function for modal or other UI
function confirmLogout(role) {
  if (role === 'student' || role === 'tutor') {
    logoutUser();
  } else {
    console.error("Unknown role for logout");
  }
}
