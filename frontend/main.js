// STUDENT SIGNUP
async function handleStudentSignup(e) {
  e.preventDefault();

  const name = document.getElementById("studentName").value;
  const email = document.getElementById("studentEmail").value;
  const password = document.getElementById("studentPassword").value;

  try {
    await registerUser({ name, email, password, role: "student" });
    alert("Student signup successful! Redirecting to login...");
    window.location.href = "student-login.html";
  } catch (err) {
    alert("Signup failed: " + err.message);
  }
}

// TUTOR SIGNUP
async function handleTutorSignup(e) {
  e.preventDefault();

  const name = document.getElementById("tutorName").value;
  const email = document.getElementById("tutorEmail").value;
  const password = document.getElementById("tutorPassword").value;

  try {
    await registerUser({ name, email, password, role: "tutor" });
    alert("Tutor signup successful! Redirecting to login...");
    window.location.href = "tutor-login.html";
  } catch (err) {
    alert("Signup failed: " + err.message);
  }
}

// Auto-attach handlers
document.addEventListener("DOMContentLoaded", () => {
  const studentSignupForm = document.getElementById("studentSignupForm");
  if (studentSignupForm) studentSignupForm.addEventListener("submit", handleStudentSignup);

  const tutorSignupForm = document.getElementById("tutorSignupForm");
  if (tutorSignupForm) tutorSignupForm.addEventListener("submit", handleTutorSignup);
});
