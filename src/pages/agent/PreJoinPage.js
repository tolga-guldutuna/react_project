import React, { useEffect } from 'react';
import { CameraPreview, AudioSettings, BackgroundOptions, JoinControl } from '../../components/cameraPreview';
import { AudioService } from '../../services/AudioService';
import '../../styles/CameraPreview.css';


function PreJoinPage() {
    useEffect(() => {
        // Sayfa yüklendiğinde mikrofonu başlat
        AudioService.initializeAudio();
    }, []);

    return (
        <div className="app">
            <main className="main-content pre-join-container">
                <div className="camera-container">
                    <CameraPreview />
                </div>
                <div className="controls-container">
                    <AudioSettings />
                    <BackgroundOptions />
                    <JoinControl />
                </div>
            </main>
        </div>
    );
}

export default PreJoinPage;
