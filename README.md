# AR Model Viewer

A web-based AR application that displays 3D models (GLB/GLTF) in augmented reality using your phone's camera.

## Features

- AR visualization of 3D models
- Real-world surface detection and model anchoring
- Model rotation and zoom capabilities
- Real-world lighting integration
- Gesture support for scaling
- Automatic model placement
- Predefined 3D space dimensions (100cm x 200cm x 30cm)
- High-quality HDR lighting and shadows

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

2. Place your .glb/.gltf model in the `assets` folder
3. Place your HDR environment map in the `assets` folder

4. Serve the project using a local web server. You can use Python's built-in server:
```bash
python -m http.server 8000
```

5. Access the application:
   - Local: http://localhost:8000
   - On mobile device: http://[your-local-ip]:8000

## Usage

1. Open the application on your mobile device
2. Grant camera permissions when prompted
3. Click the "AR View" button
4. Point your camera at a flat surface
5. The model will automatically place itself
6. Use gestures to:
   - Pinch to scale
   - Drag to rotate
   - Two-finger drag to move

## Controls

- AR View: Enter AR mode with real-world placement
- Reset: Return model to default position and orientation

## Technical Details

- Built using `<model-viewer>` web component
- Supports GLB/GLTF formats
- Implements WebXR for AR functionality
- Custom HDR environment mapping
- Dynamic shadow and reflection system
- Constrained to specific dimensions (100cm x 200cm x 30cm)

## Troubleshooting

1. If AR mode doesn't activate:
   - Ensure your device supports AR
   - Check that you're using HTTPS or localhost
   - Grant camera permissions
   - Update your browser to the latest version

2. If model appears too dark or has incorrect lighting:
   - Check that the HDR environment map is loaded correctly
   - Verify the model's materials and textures
   - Adjust exposure and environment intensity in the model-viewer settings

## License

[Your chosen license]
