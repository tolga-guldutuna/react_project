import React, { useRef, useState } from 'react';
import '../../styles/CameraPreview.css';

function CameraPreview() {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [stream, setStream] = useState(null);
    const [videoQuality, setVideoQuality] = useState('hd');

    const videoConstraints = {
        hd: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
        fullhd: { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } },
        qhd: { width: { ideal: 2560 }, height: { ideal: 1440 }, frameRate: { ideal: 30 } },
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: videoConstraints[videoQuality]
            });
            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
            setIsCameraOn(true);
        } catch (error) {
            console.error("Kameraya erişim hatası:", error);
            if (error.name === 'NotAllowedError') {
                alert('Kameraya erişim izni verilmedi. Lütfen tarayıcı ayarlarından izin verin.');
            } else {
                alert('Kamera açılırken bir hata oluştu.');
            }
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setIsCameraOn(false);
        }
    };

    const toggleCamera = () => {
        if (isCameraOn) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    const handleQualityChange = (event) => {
        setVideoQuality(event.target.value);
        if (isCameraOn) {
            stopCamera();
            startCamera();
        }
    };

    return (
        <div className="camera-preview-container">
            <div className="video-container">
                <div className="video-background" style={{ display: isCameraOn ? 'none' : 'block' }}></div>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                        display: isCameraOn ? 'block' : 'none',
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                    }}>
                </video>
            </div>
            <div className="controls-container">
                <select onChange={handleQualityChange} value={videoQuality} className="dropdown">
                    <option value="hd">HD (1280x720)</option>
                    <option value="fullhd">Full HD (1920x1080)</option>
                    <option value="qhd">QHD (2560x1440)</option>
                </select>
                <button onClick={toggleCamera} className="camera-button">
                    {isCameraOn ? 'Turn off Camera' : 'Turn on Camera'}
                </button>
            </div>
        </div>
    );
}

export default CameraPreview;
