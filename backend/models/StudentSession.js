const form = document.getElementById('bookingForm');
const result = document.getElementById('bookingResult');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const studentName = document.getElementById('studentName').value;
  const tutor = document.getElementById('tutor').value;
  const subject = document.getElementById('subject').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (studentName && tutor && subject && date && time) {
    try {
      const response = await fetch('http://localhost:5000/api/appointment/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentName, tutor, subject, date, time })
      });

      const data = await response.json();

      if (response.ok) {
        result.innerHTML = `
          ✅ <strong>${studentName}</strong>, your session with <strong>${tutor}</strong> for <strong>${subject}</strong> is booked on 
          <strong>${date}</strong> at <strong>${time}</strong>.
        `;
        form.reset();
      } else {
        result.textContent = data.error || "Booking failed.";
      }
    } catch (error) {
      console.error('Error:', error);
      result.textContent = "An error occurred. Please try again.";
    }
  } else {
    result.textContent = "Please complete all fields.";
  }
});
