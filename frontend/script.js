// STUDENT LOGIN
async function handleStudentLogin(e) {
  e.preventDefault();
  const email = document.getElementById("studentUsername").value;
  const password = document.getElementById("studentPassword").value;

  try {
    const data = await loginUser(email, password);
    localStorage.setItem("token", data.token);

    if (data.role === "student") {
      window.location.href = "homepage-student.html";
    } else {
      alert("This is not a student account.");
    }
  } catch (err) {
    alert("Student login failed: " + err.message);
  }
}

// TUTOR LOGIN
async function handleTutorLogin(e) {
  e.preventDefault();
  const email = document.getElementById("tutorUsername").value;
  const password = document.getElementById("tutorPassword").value;

  try {
    const data = await loginUser(email, password);
    localStorage.setItem("token", data.token);

    if (data.role === "tutor") {
      window.location.href = "homepage-tutor.html";
    } else {
      alert("This is not a tutor account.");
    }
  } catch (err) {
    alert("Tutor login failed: " + err.message);
  }
}

// Auto-attach handlers
document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentLoginForm");
  if (studentForm) studentForm.addEventListener("submit", handleStudentLogin);

  const tutorForm = document.getElementById("tutorLoginForm");
  if (tutorForm) tutorForm.addEventListener("submit", handleTutorLogin);
});
