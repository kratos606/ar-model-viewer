# AR Model Viewer

A web-based AR application that displays 3D models (GLB/GLTF) in augmented reality using your phone's camera.

## Features

- AR visualization of 3D models
- Real-world surface detection and model anchoring
- Model rotation and zoom capabilities
- Real-world lighting integration
- Gesture support for scaling
- Toggle between standard 3D view and AR mode
- Predefined 3D space dimensions (100cm x 200cm x 30cm)

## Prerequisites

- A mobile device with AR capabilities
- A modern web browser that supports WebXR
- For iOS devices: iOS 12 or later
- For Android devices: ARCore-supported device

## Setup

1. Clone this repository:
```bash
git clone [your-repo-url]
cd ar-model-viewer
```

2. Place your .glb/.gltf model in the `assets` folder and name it `sample-model.glb`
   - For iOS support, also include a .usdz version named `sample-model.usdz`

3. Serve the project using a local web server. You can use Python's built-in server:
```bash
python -m http.server 8000
```

4. Access the application:
   - Local: http://localhost:8000
   - On mobile device: http://[your-local-ip]:8000

## Usage

1. Open the application on your mobile device
2. Grant camera permissions when prompted
3. Click the "Activate AR" button
4. Point your camera at a flat surface
5. Tap the screen to place the 3D model
6. Use gestures to:
   - Pinch to scale
   - Drag to rotate
   - Two-finger drag to move

## Controls

- Toggle View Mode: Switch between AR and standard 3D view
- Reset Position: Return model to default position and orientation

## Technical Details

- Built using `<model-viewer>` web component
- Supports GLB/GLTF and USDZ formats
- Implements WebXR for AR functionality
- Constrained to specific dimensions (100cm x 200cm x 30cm)

## Troubleshooting

1. If AR mode doesn't activate:
   - Ensure your device supports AR
   - Check that you're using HTTPS or localhost
   - Grant camera permissions
   - Update your browser to the latest version

2. If model appears too large/small:
   - Use the scaling gestures to adjust
   - Check model's original dimensions
   - Verify dimension-scale attribute in HTML

## License

[Your chosen license]
