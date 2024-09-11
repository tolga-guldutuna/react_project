import React, { useState } from 'react';
import { AudioService } from '../../services/AudioService';


function AudioSettings() {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        AudioService.toggleMute();
        setIsMuted(!isMuted);
    };

    return (
        <div className="audio-settings">
            <button onClick={toggleMute}>
                {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <label>Volume:</label>
            <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                onChange={(e) => AudioService.setVolume(e.target.value)}
            />
        </div>
    );
}

export default AudioSettings;
