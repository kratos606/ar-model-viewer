import './style.css'

class ARModelViewer {
    constructor() {
        this.modelViewer = document.querySelector('model-viewer');
        this.resetPositionBtn = document.getElementById('resetPosition');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.modelViewer.addEventListener('ar-status', this.handleARStatus.bind(this));
        this.modelViewer.addEventListener('ar-tracking', this.handleARTracking.bind(this));
        this.modelViewer.addEventListener('camera-change', this.handleCameraChange.bind(this));
        this.modelViewer.addEventListener('load', this.handleModelLoad.bind(this));
        this.resetPositionBtn.addEventListener('click', this.resetPosition.bind(this));
        this.initializeGestureHandling();
        this.modelViewer.addEventListener('progress', this.handleProgress.bind(this));
    }

    handleARStatus(event) {
        if (event.detail.status === 'session-started') {
            this.modelViewer.activateAR();
        }
    }

    handleARTracking(event) {
        if (event.detail.status === 'tracking') {
            this.modelViewer.setAttribute('placement-mode', 'automatic');
            this.updateLightingParameters();
        }
    }

    handleCameraChange() {
        const lightingIntensity = this.modelViewer.environmentIntensity;
        this.modelViewer.shadowIntensity = Math.min(1, lightingIntensity * 1.2);
        this.modelViewer.shadowSoftness = Math.max(0.5, lightingIntensity * 0.8);
    }

    handleModelLoad() {
        const center = this.modelViewer.getCameraTarget();
        const size = this.modelViewer.getDimensions();
        console.log('Model loaded:', { center, size });
    }

    resetPosition() {
        this.modelViewer.cameraOrbit = '0deg 75deg 105%';
        this.modelViewer.cameraTarget = '0m 0m 0m';
    }

    updateLightingParameters() {
        this.modelViewer.shadowIntensity = 1;
        this.modelViewer.shadowSoftness = 1;
        this.modelViewer.exposure = 1.2;
    }

    initializeGestureHandling() {
        let startX, startY;

        this.modelViewer.addEventListener('touchstart', (event) => {
            if (event.touches.length === 2) {
                startX = event.touches[0].clientX - event.touches[1].clientX;
                startY = event.touches[0].clientY - event.touches[1].clientY;
            }
        });

        this.modelViewer.addEventListener('touchmove', (event) => {
            if (event.touches.length === 2) {
                const currentX = event.touches[0].clientX - event.touches[1].clientX;
                const currentY = event.touches[0].clientY - event.touches[1].clientY;
                const scaleChange = (Math.hypot(currentX, currentY) - Math.hypot(startX, startY)) * 0.01;
                this.modelViewer.scale = `${1 + scaleChange} ${1 + scaleChange} ${1 + scaleChange}`;
            }
        });
    }

    handleProgress(event) {
        const progressBar = document.querySelector('.update-bar');
        progressBar.style.width = `${event.detail.totalProgress * 100}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => new ARModelViewer());