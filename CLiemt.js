import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callTimer, setCallTimer] = useState('00:00');
  const [repStatus, setRepStatus] = useState('Çevrimdışı');
  const [roomLink, setRoomLink] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const callStartTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on('ice-candidate', async ({ candidate }) => {
      try {
        if (peerConnection) {
          await peerConnection.addIceCandidate(candidate);
        }
      } catch (e) {
        console.error('Error adding received ice candidate', e);
      }
    });

    socketRef.current.on('offer', async ({ offer, roomId: incomingRoomId }) => {
      if (!peerConnection) {
        const pc = new RTCPeerConnection(servers);
        setPeerConnection(pc);

        pc.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit('ice-candidate', { candidate: event.candidate, roomId: incomingRoomId });
          }
        };

        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketRef.current.emit('answer', { answer, roomId: incomingRoomId });
      }
    });

    socketRef.current.on('answer', async ({ answer }) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(answer);
      }
    });

    const params = new URLSearchParams(window.location.search);
    const roomIdParam = params.get('roomId');
    if (roomIdParam) {
      setRoomId(roomIdParam);
      socketRef.current.emit('join-room', roomIdParam);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const servers = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection(servers);
      setPeerConnection(pc);

      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit('ice-candidate', { candidate: event.candidate, roomId });
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current.emit('offer', { offer, roomId });

      startCallTimer();
      setRepStatus('Çevrimiçi');
    } catch (error) {
      console.error('Error starting call:', error);
      alert("Tarayıcınız kamera erişimini desteklemiyor. Lütfen Google Chrome, Firefox veya Microsoft Edge gibi modern bir tarayıcı kullanın.");
    }
  };

  const hangUp = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
	
	
	Murat Ergun, Turkcell Global Bilgi, [20.09.2024 09:27]
socketRef.current.emit('leave-room', roomId);
    stopCallTimer();
    setRepStatus('Çevrimdışı');
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      if (localStream) {
        localStream.getAudioTracks()[0].enabled = prev;
      }
      return !prev;
    });
  };

  const toggleCamera = () => {
    setIsCameraOff(prev => {
      if (localStream) {
        localStream.getVideoTracks()[0].enabled = prev;
      }
      return !prev;
    });
  };

  const startCallTimer = () => {
    callStartTimeRef.current = new Date();
    setRepStatus('Çevrimiçi');
    timerIntervalRef.current = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = Math.floor((currentTime - callStartTimeRef.current) / 1000);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      setCallTimer(${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')});
    }, 1000);
  };

  const stopCallTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setCallTimer('00:00');
    setRepStatus('Çevrimdışı');
  };

  const generateRoomId = () => {
    const newRoomId = Math.random().toString(36).substr(2, 9);
    setRoomId(newRoomId);
    setRoomLink(${window.location.origin}/customer.html?roomId=${newRoomId});
    socketRef.current.emit('join-room', newRoomId);
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomLink).then(() => {
      // You can add a notification here that the link was copied
      console.log('Room link copied to clipboard');
    });
  };

  const logout = () => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? "http://10.12.103.18:8097" 
      : "http://localhost:8097";
    window.location.href = ${baseUrl}/agent/login;
  };

  return (
    <>
      <div className="top-bar">
        <div className="logo">
          <img src="/assets/img/logo.png" alt="Global Bilgi Logo"/>
        </div>
        <div className="status-info">
          <div className="status-item" id="cameraStatus" data-status={isCameraOff ? "off" : "on"}>
            <i className="fas fa-video"></i>
            <span>Kamera:</span>
            <div className="status-indicator"></div>
            <span id="cameraText">{isCameraOff ? "Kapalı" : "Açık"}</span>
          </div>
          <div className="status-item" id="micStatus" data-status={isMuted ? "off" : "on"}>
            <i className="fas fa-microphone"></i>
            <span>Mikrofon:</span>
            <div className="status-indicator"></div>
            <span id="micText">{isMuted ? "Kapalı" : "Açık"}</span>
          </div>
          <div className="status-item">
            <i className="fas fa-user"></i>
            <span>Temsilci</span>
            <span id="repStatus">: {repStatus}</span>
          </div>
          <div className="status-item">
            <i className="fas fa-clock"></i>
            <span id="callTimer">Süre: {callTimer}</span>
          </div>
        </div>
        <div className="logout-side">
          <i className="fa-solid fa-right-from-bracket"></i>
          <button id="logout" className="control-button" onClick={logout}>Çıkış</button>
        </div>
      </div>
      <div className="main-content">
        <div className="video-section">
          <video ref={remoteVideoRef} id="remoteVideo" autoPlay playsInline></video>
          <div className="pip-container">
            <video ref={localVideoRef} id="localVideo" autoPlay muted playsInline></video>
          </div>
        </div>
        <div className="customer-info">
          {/* You may want to create a separate component for this section */}
          <div id="appointmentCustomerSection">
            <h3>Randevu Bilgileri</h3>
            <div className="info-block">
              <label htmlFor="appointmentDate">Randevu Tarihi</label>
              <input type="date" id="appointmentDate" defaultValue="2024-09-06" />
            </div>
            <h3>Müşteri Bilgileri</h3>
            <div className="info-block">
<label htmlFor="customerName">Müşteri Adı</label>
              <input type="text" id="customerName" defaultValue="Nergiz" />
            </div>
            <div className="info-block">
              <label htmlFor="customerEmail">E-Posta</label>
              <input type="email" id="customerEmail" defaultValue="nergiz.ercivan@globalbilgi.com.tr" />
            </div>
            <button id="saveButton" className="control-button">Kaydet</button>
          </div>
          <button id="randevuAyarlamaButton" className="control-button" style={{display: 'none'}}>Randevu Ayarla</button>
          <div id="infoMessageAppointment" style={{display:'none', backgroundColor: '#d9edf7', color: '#31708f', padding: '10px', margin: '10px 0', border: '1px solid #bce8f1', borderRadius: '4px'}}>
            Randevu bilgileri kaydedildi!
          </div>
        </div>
      </div>
      <div className="bottom-controls">
        <button id="startButton" className="control-button" onClick={startCall} disabled={isCallStarted}>Görüşmeyi Başlat</button>
        <button id="muteButton" className="control-button" onClick={toggleMute} disabled={!isCallStarted}>
          {isMuted ? 'Mikrofonu Aç' : 'Mikrofonu Kapat'}
        </button>
        <button id="cameraButton" className="control-button" onClick={toggleCamera} disabled={!isCallStarted}>
          {isCameraOff ? 'Kamerayı Aç' : 'Kamerayı Kapat'}
        </button>
        <button id="hangupButton" className="control-button" onClick={hangUp} disabled={!isCallStarted}>Görüşmeyi Sonlandır</button>
        <div className="link-info">
          <i className="fa-solid fa-link"></i>
          <input type="text" id="roomLink" value={roomLink} readOnly placeholder="Link oluşturun" />
          <button id="generateLinkButton" className="control-button" onClick={generateRoomId}>Linki Oluştur</button>
          <button id="copyButton" className="control-button" onClick={copyRoomLink}>Linki Kopyala</button>
        </div>
        <div id="infoMessage" style={{display:'none', backgroundColor: '#d9edf7', color: '#31708f', padding: '10px', margin: '10px 0', border: '1px solid #bce8f1', borderRadius: '4px'}}>
          Link kopyalandı!
        </div>
      </div>
    </>
  );
};

export default VideoChat;