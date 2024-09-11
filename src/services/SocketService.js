import io from 'socket.io-client';

const socket = io();

const start = (stream, roomId, setRemoteStream) => {
    const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
    });

    peerConnection.ontrack = (event) => {
        const remoteStream = event.streams[0];
        setRemoteStream(remoteStream);
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', { candidate: event.candidate, roomId });
        }
    };

    socket.on('offer', async ({ offer }) => {
        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', { answer, roomId });
    });

    socket.on('answer', async ({ answer }) => {
        await peerConnection.setRemoteDescription(answer);
    });

    socket.on('ice-candidate', async ({ candidate }) => {
        try {
            await peerConnection.addIceCandidate(candidate);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    });

    socket.emit('join-room', roomId);
};

const hangup = (roomId) => {
    socket.emit('leave-room', roomId);
};

const sendMessage = (message, roomId) => {
    socket.emit('message', { message, roomId });
};

const onMessage = (callback) => {
    socket.on('message', callback);
};

export default {
    start,
    hangup,
    sendMessage,
    onMessage
};
