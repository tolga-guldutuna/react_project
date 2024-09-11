import React, { useState, useRef } from 'react';
import socketService from '../../services/SocketService';

export default function VideoChat() {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    const startVideoChat = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);
        socketService.start(stream);
    };

    const hangup = () => {
        socketService.hangup();
        setLocalStream(null);
        setRemoteStream(null);
    };

    const muteAudio = () => {
        const enabled = !isAudioMuted;
        localStream.getAudioTracks()[0].enabled = enabled;
        setIsAudioMuted(!isAudioMuted);
    };

    const muteVideo = () => {
        const enabled = !isVideoMuted;
        localStream.getVideoTracks()[0].enabled = enabled;
        setIsVideoMuted(!isVideoMuted);
    };

    return (
        <div className="container">
            <h1>Random Video Chat</h1>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
            <div className="controls">
                <button onClick={startVideoChat} className="control-button">Start</button>
                <button onClick={hangup} className="control-button">Hang Up</button>
                <button onClick={muteAudio} className="control-button">
                    {isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
                </button>
                <button onClick={muteVideo} className="control-button">
                    {isVideoMuted ? 'Unmute Video' : 'Mute Video'}
                </button>
                {/* Other controls */}
            </div>
        </div>
    );
}
