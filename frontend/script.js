// STUDENT LOGIN
function handleStudentLogin(e) {
    e.preventDefault();
    const username = document.getElementById("studentUsername").value;
    const password = document.getElementById("studentPassword").value;
  
    if (username === "student" && password === "1234") {
      window.location.href = "homepage-student.html";
    } else {
      alert("Invalid student login credentials!");
    }
  }
  
  // TUTOR LOGIN
  function handleTutorLogin(e) {
    e.preventDefault();
    const username = document.getElementById("tutorUsername").value;
    const password = document.getElementById("tutorPassword").value;
  
    if (username === "tutor" && password === "abcd") {
      window.location.href = "homepage-tutor.html";
    } else {
      alert("Invalid tutor login credentials!");
    }
  }
  
  // Auto-attach handlers (optional)
  document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentLoginForm");
    if (studentForm) studentForm.addEventListener("submit", handleStudentLogin);
  
    const tutorForm = document.getElementById("tutorLoginForm");
    if (tutorForm) tutorForm.addEventListener("submit", handleTutorLogin);
  });
  