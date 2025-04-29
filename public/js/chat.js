const socket = io("http://localhost:5000");

const userList = document.getElementById("userList");
const searchInput = document.getElementById("searchInput");
const chatHeader = document.getElementById("chatHeader");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

let currentUser = localStorage.getItem("userEmail");
let selectedUser = null;
let typingTimeout;
const unreadMessages = {}; // Track unread counts

const notificationSound = new Audio("https://www.soundjay.com/button/beep-07.wav");

// Load users
async function loadUsers() {
  const isStudent = window.location.pathname.includes("chat-student.html");
  const apiUrl = isStudent
    ? "http://localhost:5000/api/users/tutors"
    : "http://localhost:5000/api/users";

  try {
    const res = await fetch(apiUrl);
    const users = await res.json();

    if (!res.ok) throw new Error(users.message);

    let filteredUsers = isStudent
      ? users
      : users.filter(u => u.role === "student");

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

  users.forEach(async (user) => {
    const lastMsg = await fetchLastMessage(currentUser, user.email);

    const div = document.createElement("div");
    div.className = "user-item";
    div.dataset.email = user.email;
    div.innerHTML = `
      <strong>${user.name}</strong><br>
      <small style="color: #555;">${lastMsg || "No messages yet"}</small>
    `;

    div.onclick = () => {
      selectedUser = user.email;
      unreadMessages[selectedUser] = 0; // Reset unread counter
      chatHeader.textContent = `Chatting with ${user.name}`;
      messagesDiv.innerHTML = "";
      loadOldMessages();
      highlightSelected(div);
      refreshUserList();
    };

    userList.appendChild(div);
  });
}

// Highlight selected user
function highlightSelected(selectedDiv) {
  const allUsers = document.querySelectorAll(".user-item");
  allUsers.forEach(item => item.classList.remove("selected-user"));
  selectedDiv.classList.add("selected-user");
}

// Fetch last message
async function fetchLastMessage(user1, user2) {
  try {
    const res = await fetch(`http://localhost:5000/api/chat/last?user1=${user1}&user2=${user2}`);
    const data = await res.json();
    return data?.content || null;
  } catch (err) {
    console.error("Failed to fetch last message:", err.message);
    return null;
  }
}

// Load chat messages
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

  socket.emit("sendMessage", {
    senderId: currentUser,
    receiverId: selectedUser,
    content,
    createdAt: new Date(),
  });

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

// Handle typing events
function handleTyping(event) {
  if (!selectedUser) return;

  socket.emit("typing", { senderId: currentUser, receiverId: selectedUser });

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit("stopTyping", { senderId: currentUser, receiverId: selectedUser });
  }, 1000);
}

// Update last message and unread badge
function updateUserPreview(msg) {
  const allUsers = document.querySelectorAll(".user-item");
  allUsers.forEach(item => {
    if (item.dataset.email === msg.senderId || item.dataset.email === msg.receiverId) {
      const strongTag = item.querySelector('strong');
      const isUnread = msg.senderId !== currentUser && selectedUser !== item.dataset.email;
      if (isUnread) {
        unreadMessages[item.dataset.email] = (unreadMessages[item.dataset.email] || 0) + 1;
      }
      item.innerHTML = `
        <strong>${strongTag ? strongTag.innerText : ""}</strong><br>
        <small style="color: #555;">${msg.content}${unreadMessages[item.dataset.email] ? " 🔴" : ""}</small>
      `;
    }
  });
}

// Refresh user list (clears red dots when you select someone)
function refreshUserList() {
  const allUsers = document.querySelectorAll(".user-item");
  allUsers.forEach(async (item) => {
    const email = item.dataset.email;
    const strongTag = item.querySelector('strong');
    const lastMsg = await fetchLastMessage(currentUser, email);
    item.innerHTML = `
      <strong>${strongTag ? strongTag.innerText : ""}</strong><br>
      <small style="color: #555;">${lastMsg || "No messages yet"}</small>
    `;
  });
}

// Real-time socket events
socket.on("receiveMessage", (msg) => {
  if (msg.senderId === selectedUser || msg.receiverId === selectedUser) {
    appendMessage(msg);
    scrollToBottom();
  }
  updateUserPreview(msg);
  notificationSound.play();
});

socket.on("showTyping", ({ senderId }) => {
  const allUsers = document.querySelectorAll(".user-item");
  allUsers.forEach(item => {
    if (item.dataset.email === senderId) {
      const strongTag = item.querySelector('strong');
      item.innerHTML = `
        <strong>${strongTag ? strongTag.innerText : ""}</strong><br>
        <small style="color: green;">Typing...</small>
      `;
    }
  });
});

socket.on("hideTyping", ({ senderId }) => {
  const allUsers = document.querySelectorAll(".user-item");
  allUsers.forEach(item => {
    if (item.dataset.email === senderId) {
      const strongTag = item.querySelector('strong');
      fetchLastMessage(currentUser, senderId).then(lastMsg => {
        item.innerHTML = `
          <strong>${strongTag ? strongTag.innerText : ""}</strong><br>
          <small style="color: #555;">${lastMsg || "No messages yet"}</small>
        `;
      });
    }
  });
});

// Initial load
loadUsers();
