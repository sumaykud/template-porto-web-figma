// Three.js Scene Setup
let scene, camera, renderer;
let geometry, material, mesh;
let animationFrame;

function initThreeJS() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // Add abstract 3D object (example: wave-like mesh)
    geometry = new THREE.PlaneGeometry(10, 10, 50, 50);
    material = new THREE.MeshPhongMaterial({
        color: 0xBB86FC,
        wireframe: true,
        side: THREE.DoubleSide
    });
    
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Start animation
    animate();
}

function animate() {
    animationFrame = requestAnimationFrame(animate);
    
    // Update vertices for wave effect
    const time = Date.now() * 0.001;
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5;
        positions.setZ(i, z);
    }
    
    positions.needsUpdate = true;
    
    // Rotate mesh
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    window.addEventListener('resize', onWindowResize);
});

// Cleanup
window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', onWindowResize);
    renderer?.dispose();
});