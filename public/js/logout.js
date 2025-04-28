// logout.js

// Function to logout user
function logoutUser() {
    // Clear everything related to user login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  
    // Optional: Clear any other app-specific storage if needed
    // localStorage.clear(); // (if you want to wipe everything)
  
    // Redirect user to login page
    window.location.href = "login.html"; // or login-tutor.html / admin-login.html depending on role
  }
  
  // Admin logout (example)
  function adminLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  
    window.location.href = "admin-login.html"; // Admin login page
  }
  
  // Tutor logout (example)
  function tutorLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  
    window.location.href = "login-tutor.html"; // Tutor login page
  }
  