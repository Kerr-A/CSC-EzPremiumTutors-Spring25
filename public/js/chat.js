const socket = io("http://localhost:5000");

const userList = document.getElementById("userList");
const searchInput = document.getElementById("searchInput");
const chatHeader = document.getElementById("chatHeader");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

let currentUser = localStorage.getItem("userEmail"); // Logged-in user (student or tutor)
let selectedUser = null; // Person you are chatting with

// Load users on sidebar
async function loadUsers() {
  const isStudent = window.location.pathname.includes("chat-student.html");
  const apiUrl = isStudent
    ? "http://localhost:5000/api/users/tutors" // student sees tutors
    : "http://localhost:5000/api/users";       // tutor sees all users

  try {
    const res = await fetch(apiUrl);
    const users = await res.json();

    if (!res.ok) throw new Error(users.message);

    let filteredUsers = isStudent
      ? users
      : users.filter(u => u.role === "student"); // Only students for tutors

    displayUserList(filteredUsers);

    // Attach search input filter
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

// Display users in sidebar
function displayUserList(users) {
  userList.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-item";
    div.textContent = user.name;
    div.dataset.email = user.email;
    div.onclick = () => {
      selectedUser = user.email;
      chatHeader.textContent = `Chatting with ${user.name}`;
      messagesDiv.innerHTML = "";
      loadOldMessages();

      // Highlight selected user
      const allUsers = document.querySelectorAll(".user-item");
      allUsers.forEach(item => item.classList.remove("selected-user"));
      div.classList.add("selected-user");
    };
    userList.appendChild(div);
  });
}

// Load previous chat messages
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

// Send new message
function sendMessage() {
  const content = messageInput.value.trim();
  if (!content) return;

  if (!selectedUser) {
    alert("❗ Please select a user first to chat.");
    return;
  }

  socket.emit("sendMessage", {
    senderId: currentUser,
    receiverId: selectedUser,
    content,
    createdAt: new Date(),
  });

  appendMessage({
    senderId: currentUser,
    receiverId: selectedUser,
    content,
    createdAt: new Date(),
  });

  messageInput.value = "";
  scrollToBottom();
}

// Append message to chat window
function appendMessage(msg) {
  const div = document.createElement("div");
  div.className = "message " + (msg.senderId === currentUser ? "sent" : "received");
  div.textContent = msg.content;
  messagesDiv.appendChild(div);
}

// Scroll chat to bottom
function scrollToBottom() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Listen for real-time incoming messages
socket.on("receiveMessage", (msg) => {
  if (msg.senderId === selectedUser || msg.receiverId === selectedUser) {
    appendMessage(msg);
    scrollToBottom();
  }
});

// Load users initially
loadUsers();
