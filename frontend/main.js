// STUDENT SIGNUP
function handleStudentSignup(e) {
    e.preventDefault();
    alert("Student signup successful! Redirecting to login...");
    window.location.href = "student-login.html";
  }
  
  // TUTOR SIGNUP
  function handleTutorSignup(e) {
    e.preventDefault();
    alert("Tutor signup successful! Redirecting to login...");
    window.location.href = "tutor-login.html";
  }
  
  // Auto-attach handlers
  document.addEventListener("DOMContentLoaded", () => {
    const studentSignupForm = document.getElementById("studentSignupForm");
    if (studentSignupForm) studentSignupForm.addEventListener("submit", handleStudentSignup);
  
    const tutorSignupForm = document.getElementById("tutorSignupForm");
    if (tutorSignupForm) tutorSignupForm.addEventListener("submit", handleTutorSignup);
  });
  