function toggleNotifications() {
  const dropdown = document.getElementById("notification-dropdown");
  dropdown.classList.toggle("hidden");
}

// Example: Add a notification dynamically
function addNotification(message) {
  const dropdown = document.getElementById("notification-dropdown");
  const notification = document.createElement("p");
  notification.textContent = message;
  dropdown.appendChild(notification);
}
