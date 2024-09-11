export const AudioService = {
    toggleMute: () => {
        if (AudioService.stream) {
            AudioService.stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            AudioService.isMuted = !AudioService.isMuted;
        } else {
            console.warn('No audio stream found.');
        }
    },

    setVolume: (volume) => {
        if (AudioService.stream) {
            const audioContext = new AudioContext();
            const gainNode = audioContext.createGain();
            const source = audioContext.createMediaStreamSource(AudioService.stream);
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            gainNode.gain.value = volume / 100;
        } else {
            console.warn('No audio stream found.');
        }
    },

    initializeAudio: async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            AudioService.stream = stream;
            AudioService.isMuted = false;
        } catch (error) {
            console.error('Error accessing the microphone:', error);
        }
    }
};

AudioService.isMuted = false;
AudioService.stream = null;
