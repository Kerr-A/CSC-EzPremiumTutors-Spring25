const socket = io();
let localStream;
let remoteStream;
let peerConnection;
let room;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const statusDiv = document.getElementById('status');
const roomForm = document.getElementById('roomForm');
const roomInput = document.getElementById('roomInput');

const toggleMicBtn = document.getElementById('toggleMic');
const toggleCamBtn = document.getElementById('toggleCam');
const endCallBtn = document.getElementById('endCall');

const config = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ]
};

roomForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  room = roomInput.value;
  if (!room) return;

  socket.emit('join-room', room);
  statusDiv.textContent = `Joining room ${room}...`;

  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;
});

socket.on('room-joined', () => {
  statusDiv.textContent = `Joined room ${room}. Waiting for peer...`;
});

socket.on('room-full', () => {
  statusDiv.textContent = 'Room is full. Try a different one.';
});

socket.on('ready', async () => {
  statusDiv.textContent = 'Peer found! Connecting...';
  peerConnection = createPeerConnection();

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit('offer', offer, room);
});

socket.on('offer', async (offer) => {
  peerConnection = createPeerConnection();

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, room);
});

socket.on('answer', async (answer) => {
  await peerConnection.setRemoteDescription(answer);
});

socket.on('ice-candidate', async (candidate) => {
  if (peerConnection) {
    try {
      await peerConnection.addIceCandidate(candidate);
    } catch (err) {
      console.error('Error adding ICE candidate:', err);
    }
  }
});

function createPeerConnection() {
  const pc = new RTCPeerConnection(config);

  pc.ontrack = (event) => {
    remoteStream = event.streams[0];
    remoteVideo.srcObject = remoteStream;
  };

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate, room);
    }
  };

  return pc;
}

// UI Buttons
toggleMicBtn.addEventListener('click', () => {
  if (!localStream) return;
  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled;
    toggleMicBtn.textContent = audioTrack.enabled ? 'Mute Mic' : 'Unmute Mic';
  }
});

toggleCamBtn.addEventListener('click', () => {
  if (!localStream) return;
  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack) {
    videoTrack.enabled = !videoTrack.enabled;
    toggleCamBtn.textContent = videoTrack.enabled ? 'Turn Off Camera' : 'Turn On Camera';
  }
});

endCallBtn.addEventListener('click', () => {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach(track => track.stop());
    remoteVideo.srcObject = null;
  }

  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
    localVideo.srcObject = null;
  }

  statusDiv.textContent = 'Call ended.';
});
