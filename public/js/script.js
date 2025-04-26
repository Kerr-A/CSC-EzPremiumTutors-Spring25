// Handle Student Login
async function handleStudentLogin(e) {
  e.preventDefault();
  const email = document.getElementById("studentEmail").value;
  const password = document.getElementById("studentPassword").value;

  try {
    const data = await auth.loginUser(email, password);
    console.log("✅ Logged in:", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if (data.role === "student") {
      window.location.href = "homepage-student.html"; // ✅ redirection
    } else {
      alert("This is not a student account.");
    }
  } catch (err) {
    alert("Login failed: " + err.message);
  }
}

// Attach on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentLoginForm");
  if (studentForm) {
    studentForm.addEventListener("submit", handleStudentLogin);
  }
});


// TUTOR LOGIN HANDLER
async function handleTutorLogin(e) {
  e.preventDefault();

  const email = document.getElementById("tutorEmail").value;
  const password = document.getElementById("tutorPassword").value;

  try {
    const data = await auth.loginUser(email, password);
    console.log("✅ Tutor login success:", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if (data.role === "tutor") {
      window.location.href = "homepage-tutor.html";
    } else {
      alert("Not a tutor account.");
    }
  } catch (err) {
    console.error("❌ Tutor login failed:", err.message);
    alert("Login failed: " + err.message);
  }
}

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentLoginForm");
  if (studentForm) studentForm.addEventListener("submit", handleStudentLogin);

  const tutorForm = document.getElementById("tutorLoginForm");
  if (tutorForm) tutorForm.addEventListener("submit", handleTutorLogin);
});

