export const CameraService = {
    initializeCamera: async (videoElement) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            videoElement.play();
            CameraService.stream = stream;
            CameraService.cameraOn = true;
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    },

    toggleCamera: () => {
        if (CameraService.cameraOn) {
            CameraService.stream.getTracks().forEach(track => track.stop());
            CameraService.cameraOn = false;
        } else {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    CameraService.stream = stream;
                    videoElement.srcObject = stream;
                    CameraService.cameraOn = true;
                })
                .catch(error => console.error('Error re-enabling the camera:', error));
        }
    },

    isCameraOn: () => {
        return CameraService.cameraOn || false;
    }
};

CameraService.cameraOn = false;
CameraService.stream = null;
