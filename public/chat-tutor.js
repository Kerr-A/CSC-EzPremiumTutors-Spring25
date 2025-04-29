const socket = io("http://localhost:5000");
const currentUserId = localStorage.getItem("userId");
let receiverId = null;

const usersList = document.getElementById("usersList");
const chatHeader = document.getElementById("chatHeader");
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Fetch students only
async function fetchStudents() {
  const res = await fetch("/api/users");
  const users = await res.json();
  usersList.innerHTML = '<div class="sidebar-header">Students</div>';
  users.forEach(user => {
    if (user.role === "student") {
      const userDiv = document.createElement("div");
      userDiv.className = "user";
      userDiv.innerHTML = `
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Student" />
        <div class="user-name">${user.name}</div>
      `;
      userDiv.onclick = () => startChat(user._id, user.name);
      usersList.appendChild(userDiv);
    }
  });
}

function startChat(id, name) {
  receiverId = id;
  chatHeader.textContent = name;
  loadMessages();
}

async function loadMessages() {
  if (!receiverId) return;
  const res = await fetch(`/api/messages/${currentUserId}/${receiverId}`);
  const messages = await res.json();
  chatMessages.innerHTML = "";
  messages.forEach(m => addMessage(m, m.senderId === currentUserId));
}

function addMessage(m, isSender) {
  const div = document.createElement("div");
  div.className = `message ${isSender ? "sent" : "received"}`;
  div.innerHTML = `<div class="message-content">${m.content}</div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.onclick = () => {
  const content = messageInput.value.trim();
  if (!content || !receiverId) return;
  socket.emit("sendMessage", { senderId: currentUserId, receiverId, content });
  messageInput.value = "";
};

socket.on("receiveMessage", (m) => {
  if (m.senderId === receiverId || m.receiverId === receiverId) {
    addMessage(m, m.senderId === currentUserId);
  }
});

fetchStudents();
