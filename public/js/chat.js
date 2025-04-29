const socket = io("http://localhost:5000"); // adjust if server different
let receiverId = null;
let currentUserId = localStorage.getItem("userId"); // store in localStorage at login
// No token needed anymore

const usersPanel = document.getElementById("usersPanel");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Fetch list of users (students fetch tutors, tutors fetch students)
async function fetchUsers() {
  try {
    const res = await fetch("/api/users"); // No token
    const users = await res.json();
    usersPanel.innerHTML = "";
    users.forEach(user => {
      const userDiv = document.createElement("div");
      userDiv.textContent = user.name;
      userDiv.onclick = () => startConversation(user._id, user.name);
      usersPanel.appendChild(userDiv);
    });
  } catch (err) {
    console.error(err);
  }
}

// Start chat with selected user
async function startConversation(userId, userName) {
  receiverId = userId;
  messagesDiv.innerHTML = "";
  try {
    const res = await fetch(`/api/messages/${currentUserId}/${receiverId}`); // No token
    const data = await res.json();
    data.forEach(msg => addMessage(msg, msg.senderId === currentUserId));
  } catch (err) {
    console.error(err);
  }
}

// Send a message
sendBtn.addEventListener("click", async () => {
  const content = messageInput.value.trim();
  if (!content || !receiverId) return;
  socket.emit("sendMessage", { senderId: currentUserId, receiverId, content });
  messageInput.value = "";
});

// Receive message
socket.on("receiveMessage", (data) => {
  if (
    (data.senderId === currentUserId && data.receiverId === receiverId) ||
    (data.senderId === receiverId && data.receiverId === currentUserId)
  ) {
    addMessage(data, data.senderId === currentUserId);
  }
});

// Add new message to screen
function addMessage(data, isSender) {
  const msgDiv = document.createElement("div");
  msgDiv.style.margin = "10px 0";
  msgDiv.style.textAlign = isSender ? "right" : "left";
  msgDiv.innerHTML = `
    <div style="display:inline-block; background:${isSender ? '#dcf8c6' : '#fff'}; padding:8px; border-radius:5px;">
      ${data.content} <br>
      <small>${new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
    </div>
  `;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Load users on page load
fetchUsers();

