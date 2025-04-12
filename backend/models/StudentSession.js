// Get references to the form and displays the booking result
const form = document.getElementById('bookingForm');
  const result = document.getElementById('bookingResult');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get values from the form fields
    const studentName = document.getElementById('studentName').value;
    const tutor = document.getElementById('tutor').value;
    const subject = document.getElementById('subject').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Simulate booking logic
    if (studentName && tutor && subject && date && time) {
      result.innerHTML = `
        ✅ <strong>${studentName}</strong>, your session with <strong>${tutor}</strong> for <strong>${subject}</strong> is booked on 
        <strong>${date}</strong> at <strong>${time}</strong>.
      `;
      form.reset(); // Optionally clear the form
    } else {
      result.textContent = "Please complete all fields.";
    }
  });