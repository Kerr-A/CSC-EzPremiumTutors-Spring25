// admin-panel.js

// Protect admin dashboard
if (localStorage.getItem("role") !== "admin") {
    window.location.href = "admin-login.html"; // Redirect if not admin
  }
  
  // Load appointments
  async function loadAppointments() {
    try {
      const res = await fetch('http://localhost:5000/api/admin/appointments');
      const data = await res.json();
  
      const tbody = document.getElementById('adminAppointmentsBody');
      tbody.innerHTML = "";
  
      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No appointments found.</td></tr>`;
      } else {
        data.forEach(appt => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${appt.studentName}</td>
            <td>${appt.tutorName}</td>
            <td>${appt.date}</td>
            <td>${appt.time}</td>
            <td><button onclick="cancelAppointment('${appt._id}')">Cancel</button></td>
          `;
          tbody.appendChild(row);
        });
      }
    } catch (err) {
      console.error("Error loading appointments:", err.message);
    }
  }
  
  // Cancel appointment
  async function cancelAppointment(id) {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/appointment/cancel/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
  
        alert("Appointment canceled successfully!");
        loadAppointments(); // Reload
      } catch (err) {
        alert("Error canceling appointment: " + err.message);
      }
    }
  }
  
  // Admin logout
  function adminLogout() {
    localStorage.clear();
    window.location.href = "admin-login.html";
  }
  
  // Load everything
  loadAppointments();
  