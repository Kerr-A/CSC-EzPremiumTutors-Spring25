const socket = io("http://localhost:5000");

const userList = document.getElementById("userList");
const searchInput = document.getElementById("searchInput");
const chatHeader = document.getElementById("chatHeader");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

let currentUser = localStorage.getItem("userEmail"); // Logged-in user email
let selectedUser = null; // Currently chatting with

// Load users
async function loadUsers() {
  const isStudent = window.location.pathname.includes("chat-student.html");
  const apiUrl = isStudent
    ? "http://localhost:5000/api/users/tutors" // Student sees tutors
    : "http://localhost:5000/api/users";       // Tutor sees all users

  try {
    const res = await fetch(apiUrl);
    const users = await res.json();

    if (!res.ok) throw new Error(users.message);

    let filteredUsers = isStudent
      ? users
      : users.filter(u => u.role === "student"); // Only students if tutor

    displayUserList(filteredUsers);

    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase();
      const userItems = userList.querySelectorAll(".user-item");
      userItems.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(keyword) ? "" : "none";
      });
    });

  } catch (err) {
    console.error("Failed to load users:", err.message);
    userList.innerHTML = "<p style='padding:1rem;'>Failed to load users.</p>";
  }
}

// Display users
function displayUserList(users) {
  userList.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-item";
    div.innerHTML = `
      <strong>${user.name}</strong><br>
      <small>${user.email}</small>
    `;
    div.dataset.email = user.email;
    div.onclick = () => {
      selectedUser = user.email; // ✅ Correctly set
      console.log("Selected user:", selectedUser);

      chatHeader.textContent = `Chatting with ${user.name}`;
      messagesDiv.innerHTML = "";
      loadOldMessages();

      const allUsers = document.querySelectorAll(".user-item");
      allUsers.forEach(item => item.classList.remove("selected-user"));
      div.classList.add("selected-user");
    };
    userList.appendChild(div);
  });
}

// Load old messages
async function loadOldMessages() {
  if (!selectedUser) return;

  try {
    const res = await fetch(`http://localhost:5000/api/chat/conversation?user1=${currentUser}&user2=${selectedUser}`);
    const messages = await res.json();

    if (!res.ok) throw new Error(messages.message);

    messagesDiv.innerHTML = "";

    messages.forEach(msg => {
      appendMessage(msg);
    });

    scrollToBottom();
  } catch (err) {
    console.error("Failed to load old messages:", err.message);
  }
}

// Send a message
function sendMessage() {
  const content = messageInput.value.trim();
  if (!content) return;

  if (!selectedUser) {
    alert("❗ Please select a user first to chat.");
    return;
  }

  console.log(`Sending from ${currentUser} to ${selectedUser}:`, content);

  socket.emit("sendMessage", {
    senderId: currentUser,
    receiverId: selectedUser,
    content,
    createdAt: new Date(),
  });

  // ❌ Do NOT immediately call appendMessage here
  messageInput.value = "";
}

// Append message
function appendMessage(msg) {
  const div = document.createElement("div");
  div.className = "message " + (msg.senderId === currentUser ? "sent" : "received");
  div.textContent = msg.content;
  messagesDiv.appendChild(div);
}

// Scroll to bottom
function scrollToBottom() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Receive new message in real-time
socket.on("receiveMessage", (msg) => {
  if (msg.senderId === selectedUser || msg.receiverId === selectedUser) {
    appendMessage(msg);
    scrollToBottom();
  }
});

// Initial load
loadUsers();
