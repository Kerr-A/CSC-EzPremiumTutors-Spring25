// public/js/chat.js

const currentUserId = localStorage.getItem("userId");
const userRole = localStorage.getItem("role");

const contactsList = document.getElementById("contacts");
const messagesList = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

let selectedContactId = null;

// Load contacts
async function loadContacts() {
  const res = await fetch(`http://localhost:5000/api/chat/contacts/${currentUserId}`);
  const contacts = await res.json();

  contactsList.innerHTML = "";
  contacts.forEach(contact => {
    const div = document.createElement("div");
    div.className = "contact-item";
    div.textContent = contact.name;
    div.onclick = () => selectContact(contact._id, contact.name);
    contactsList.appendChild(div);
  });
}

// Select a contact
async function selectContact(id, name) {
  selectedContactId = id;
  document.getElementById("contact-name").textContent = `Chat with ${name}`;
  await loadMessages();
}

// Load messages
async function loadMessages() {
  const res = await fetch(`http://localhost:5000/api/chat/conversations/${currentUserId}/${selectedContactId}`);
  const messages = await res.json();

  messagesList.innerHTML = "";
  messages.forEach(msg => {
    const li = document.createElement("li");
    li.className = msg.sender === currentUserId ? "sent" : "received";
    li.textContent = msg.content;
    messagesList.appendChild(li);
  });
}

// Send message
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = messageInput.value;
  if (!content.trim() || !selectedContactId) return;

  const res = await fetch("http://localhost:5000/api/chat/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: currentUserId,
      receiver: selectedContactId,
      content
    })
  });

  messageInput.value = "";
  await loadMessages();
});

// Init
loadContacts();
