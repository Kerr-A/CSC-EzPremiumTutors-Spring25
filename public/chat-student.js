const socket = io("http://localhost:5000");
const currentUserId = localStorage.getItem("userId");
let receiverId = null;
let receiverName = null;
let typingTimeout = null;

const usersList = document.getElementById("usersList");
const chatHeader = document.getElementById("chatHeader");
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

async function fetchTutors() {
  const res = await fetch("/api/users");
  const users = await res.json();
  usersList.innerHTML = '<div class="sidebar-header">Tutors</div>';
  users.forEach(user => {
    if (user.role === "tutor") {
      const userDiv = document.createElement("div");
      userDiv.className = "user";
      userDiv.innerHTML = `
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Tutor" />
        <div class="user-name">${user.name}</div>
      `;
      userDiv.onclick = () => startChat(user._id, user.name);
      usersList.appendChild(userDiv);
    }
  });
}

function startChat(id, name) {
  receiverId = id;
  receiverName = name;
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

// Typing indicator events
messageInput.addEventListener("input", () => {
  if (receiverId) {
    socket.emit("typing", { senderId: currentUserId, receiverId });
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { senderId: currentUserId, receiverId });
    }, 1000);
  }
});

socket.on("showTyping", ({ senderId }) => {
  if (senderId === receiverId) {
    chatHeader.textContent = `${receiverName} is typing...`;
  }
});

socket.on("hideTyping", ({ senderId }) => {
  if (senderId === receiverId) {
    chatHeader.textContent = receiverName;
  }
});

fetchTutors();
