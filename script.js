document.addEventListener('DOMContentLoaded', function() {
    const modelViewer = document.querySelector('model-viewer');
    const toggleViewBtn = document.getElementById('toggleView');
    const resetPositionBtn = document.getElementById('resetPosition');

    // Auto-place the model when a surface is found
    modelViewer.addEventListener('ar-status', (event) => {
        if (event.detail.status === 'session-started') {
            modelViewer.activateAR();
        }
    });

    // Handle model placement
    modelViewer.addEventListener('ar-tracking', (event) => {
        if (event.detail.status === 'tracking') {
            modelViewer.setAttribute('placement-mode', 'automatic');
            // Adjust shadow intensity based on environment lighting
            if (modelViewer.arScale === 'fixed') {
                modelViewer.shadowIntensity = 1;
                modelViewer.shadowSoftness = 1;
                modelViewer.exposure = 1.2;
            }
        }
    });

    // Handle environment lighting changes
    modelViewer.addEventListener('camera-change', () => {
        const lightingIntensity = modelViewer.environmentIntensity;
        // Adjust shadow intensity based on environment lighting
        modelViewer.shadowIntensity = Math.min(1, lightingIntensity * 1.2);
        modelViewer.shadowSoftness = Math.max(0.5, lightingIntensity * 0.8);
    });

    // Toggle between AR and normal view
    toggleViewBtn.addEventListener('click', () => {
        if (modelViewer.hasAttribute('ar')) {
            modelViewer.removeAttribute('ar');
            toggleViewBtn.textContent = 'Enable AR';
        } else {
            modelViewer.setAttribute('ar', '');
            toggleViewBtn.textContent = 'Disable AR';
        }
    });

    // Reset position
    resetPositionBtn.addEventListener('click', () => {
        modelViewer.cameraOrbit = '0deg 75deg 105%';
        modelViewer.cameraTarget = '0m 0m 0m';
    });

    // Handle loading events
    modelViewer.addEventListener('load', () => {
        const center = modelViewer.getCameraTarget();
        const size = modelViewer.getDimensions();
        console.log('Model loaded:', { center, size });
    });

    // Add gesture handling for scaling
    let startX, startY;
    modelViewer.addEventListener('touchstart', (event) => {
        if (event.touches.length === 2) {
            startX = event.touches[0].clientX - event.touches[1].clientX;
            startY = event.touches[0].clientY - event.touches[1].clientY;
        }
    });

    modelViewer.addEventListener('touchmove', (event) => {
        if (event.touches.length === 2) {
            const currentX = event.touches[0].clientX - event.touches[1].clientX;
            const currentY = event.touches[0].clientY - event.touches[1].clientY;
            const scaleChange = (Math.hypot(currentX, currentY) - Math.hypot(startX, startY)) * 0.01;
            modelViewer.scale = `${1 + scaleChange} ${1 + scaleChange} ${1 + scaleChange}`;
        }
    });

    // Progress bar handling
    modelViewer.addEventListener('progress', (event) => {
        const progressBar = document.querySelector('.update-bar');
        progressBar.style.width = `${event.detail.totalProgress * 100}%`;
    });
});
